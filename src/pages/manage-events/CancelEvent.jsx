import { useState } from 'react';
import Modal from 'react-modal';

const CancelEvent = ({ event, isOpen, onClose }) => {

    const [ sendAlert, setSendAlert ] = useState(false);
    
    const onUpdate = async() => {
        // Update event status
        try {
            const resp = await fetch(`/api/events/status/${event.id}`, {
                headers: {
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75",
                    'content-type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    status: 'cancelled',
                    sendAlerts: sendAlert
                })
            });
            if (!resp.ok) throw new Error();
            await onClose();
        } catch(err) {
            console.error(err);
            alert('An error occurred. Please try again later.');
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName='fixed inset-0 bg-black/80 z-50'
        >
            <div className='fixed inset-0 flex items-center justify-center p-4 w-screen h-screen'>
                <div className='max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md'>
                    <h1 className="text-2xl text-red-500 font-semibold">Cancel event</h1>
                    <p className='text-black mt-2'>Are you sure you want to cancel this event?</p>
                    <p className='text-neutral-500 text-xs italic'>Please note that this action is irreversible!</p>

                    <div className='my-3'>
                        <label className="flex items-center">
                            <input checked={sendAlert} onChange={(e) => setSendAlert(e.target.checked)} type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-sm">Send cancellation alerts to registered users</span>
                        </label>
                        <span className='text-neutral-500 text-xs'>
                            {"Depending on users' contact preferences, this may not reach all users"}
                        </span>
                    </div>

                    <div className='flex items-center justify-end gap-3 mt-4'>
                        <button onClick={onClose} className="bg-transparent hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button onClick={onUpdate} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CancelEvent;