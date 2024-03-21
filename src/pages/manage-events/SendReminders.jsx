import Modal from "react-modal";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodTextarea } from "../../components/ZodInput";

const schema = z.object({
    message: z.string().min(1).max(255)
});

export default function SendReminders({ event, isOpen, onClose }) {

    const { id, name, start_date, end_date, location } = event;
    const date = new Date(start_date).toLocaleDateString();
    const startTime = new Date(start_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(end_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    const defaultMsg = `This is a reminder that "${name}" is coming up soon on ${date}.\n${startTime} to ${endTime} at ${location}.`;

    const { control, handleSubmit, setValue } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            message: defaultMsg
        }
    });

    const onSubmit = async(values) => {
        try {
            const resp = await fetch(`/api/events/${id}/reminders`, {
                headers: {
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75",
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(values)
            });
            if (!resp.ok) throw new Error();
            
            try {
                const data = await resp.json();
                // Display errors
                if (data.sendErrors && Array.isArray(data.sendErrors)) {
                    const disabledContactErrors = data.sendErrors.filter(e => e.code === 'CONTACT_PREFS_DISABLED');
                    if (disabledContactErrors.length > 0) {
                        alert(
                            `Reminder not sent to the following users due to disabled contact preferences.\n
                            ${disabledContactErrors.map(e => e.username).join('\n')}`
                        );
                    }

                    const failedErrors = data.sendErrors.filter(e => e.code === 'SEND_FAILED');
                    if (failedErrors.length > 0) {
                        console.error('Failed to send reminders to the following users: ', failedErrors);
                        alert(
                            `Failed to send reminders to the following users. Please check the logs for more details.\n
                            ${failedErrors.map(e => e.username).join('\n')}`
                        );
                    }
                }
            }
            catch(err) {/* No error */}
            finally {
                await onClose();
            }
        }
        catch(err) {
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
                    <h1 className="text-2xl text-black font-semibold">Send reminders</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ZodTextarea
                            control={control}
                            fieldName='message'
                            placeholder='Reminder message to send'
                            className='w-full mt-3 min-h-[100px] resize-none whitespace-pre-wrap'
                        />
                        <span className='text-neutral-500 text-xs'>
                            Note: The reminder will not be sent to users on the waiting list.
                        </span>

                        <div className='flex items-center justify-end gap-3 mt-4'>
                            <button
                                type='button'
                                onClick={() => {
                                    setValue('message', defaultMsg);
                                    onClose();
                                }}
                                className="bg-transparent hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}