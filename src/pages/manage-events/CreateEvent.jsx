import Modal from 'react-modal';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ZodInput, { ZodTextarea } from '../../components/ZodInput';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import makeAnimated from 'react-select/animated';

const eventSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    location: z.string().min(1).max(255),
    start_date: z.date({ coerce: true }),
    end_date: z.date({ coerce: true }),
    image: z.any(),
    max_registrations: z.number({ coerce: true }).int().min(0),
    interests: z.any()
});

const CreateEvent = ({ isOpen, onClose }) => {

    const [ interests, setInterests ] = useState([]);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        async function load() {
            try {
                const resp = await fetch('/api/interests', {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                    },
                });
                if (!resp.ok) throw new Error();
    
                const data = await resp.json();
                setInterests(
                    data.map(d => ({ value: d.id, label: d.name }))
                );
            }
            catch(err) {
                console.error(err);
            }
        }
        load();
    }, []);

    const { control, handleSubmit, register, setValue } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            name: '',
            description: '',
            location: '',
            start_date: '',
            end_date: '',
            image: '',
            max_registrations: '',
            interests: []
        }
    })

    const onCreate = async(values) => {
        try {
            values.start_date = values.start_date.valueOf();
            values.end_date = values.end_date.valueOf();

            // Construct multipart form data object for file upload
            const formData  = new FormData();
            for(const name in values) {
                // Array items need to be appended individually
                if (Array.isArray(values[name])) {
                    values[name].forEach((v) => {
                        formData.append(name, v);
                    });
                }
                else formData.append(name, values[name]);
            }
            // Set image field to the individual file instead of FileList object
            if (values.image?.[0]) {
                formData.append('image', values.image[0]);
            }
            else {
                formData.delete('image');
            }

            const resp = await fetch('/api/events', {
                headers: {
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                },
                method: 'POST',
                body: formData
            });
            if (!resp.ok) throw new Error();
            await onClose();
        } catch(err) {
            console.error(err);
            alert('An error occurred. Please try again later.');
        }
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName='fixed inset-0 bg-black/80 z-50'
        >
            <div className='fixed inset-0 flex items-center justify-center p-4 w-screen h-screen'>
                <div className='max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md'>
                    <h1 className="text-2xl font-semibold">Create event</h1>
                    <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-2 mt-4">
                        <ZodInput control={control} fieldName='name' type='text' placeholder='Name' className='w-full' />
                        <ZodTextarea control={control} fieldName='description' type='text' placeholder='Description' className='w-full' />

                        <ZodInput control={control} fieldName='location' type='text' placeholder='Location' className='w-full' />
                        <ZodInput control={control} fieldName='max_registrations' type='number' placeholder='Maximum Registrations' className='w-full' />

                        <Select
                            {...register('interests')}
                            onChange={(val) => {
                                setValue('interests', val.map(v => v.value))
                            }}
                            defaultValue={[]}
                            components={animatedComponents}
                            isMulti
                            name="interests"
                            placeholder="Tags"
                            options={interests}
                            classNames={{
                                container: () => 'w-full',
                                control: () => '!border-gray-300',
                                placeholder: () => '!text-gray-400 ps-1'
                            }}
                        />

                        <div className='flex items-center gap-2 mt-4'>
                            <label className='text-gray-700 flex-shrink-0'>Start time:</label>
                            <ZodInput control={control} fieldName='start_date' type='datetime-local' className='flex-grow !py-1 !px-2' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className='text-gray-700 flex-shrink-0'>End time:</label>
                            <ZodInput control={control} fieldName='end_date' type='datetime-local' className='flex-grow !py-1 !px-2' />
                        </div>
                        <div className='flex items-center justify-between gap-2 mt-4'>
                            <label className='text-gray-700 flex-shrink-0'>Image:</label>
                            <input
                                {...register('image')}
                                type="file"
                                accept="image/*"
                                placeholder="Image"
                                className="text-gray-700"
                            />
                        </div>

                        <div className='flex justify-between mt-4'>
                            <button type='button' onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Cancel
                            </button>
                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default CreateEvent;