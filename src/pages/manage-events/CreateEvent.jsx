import Modal from 'react-modal';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ZodInput, { ZodTextarea } from '../../components/ZodInput';

const eventSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    location: z.string().min(1).max(255),
    start_date: z.date({ coerce: true }),
    end_date: z.date({ coerce: true })
});

const CreateEvent = ({ isOpen, onClose }) => {

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            name: '',
            description: '',
            location: '',
            start_date: '',
            end_date: ''
        }
    })

    const onCreate = async(values) => {
        try {
            values.start_date = values.start_date.valueOf();
            values.end_date = values.end_date.valueOf();

            const resp = await fetch('/api/events', {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                },
                method: 'POST',
                body: JSON.stringify(values)
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
                            <input type="file" placeholder="Image" className="text-gray-700" />
                        </div>

                        <div className='flex justify-between mt-4'>
                            <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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