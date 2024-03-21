import { useEffect, useMemo, useState } from "react";
import { FaDownload } from "react-icons/fa";

export default function EventRegistrations({ event }) {
    const { id, max_registrations } = event;
    const [ data, setData ] = useState([]);

    useEffect(() => {
        async function fetchRegistrations() {
            try {
                const resp = await fetch(`/api/registrations/event/${id}`, {
                    headers: {
                        'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                    },
                });
                if (!resp.ok) throw new Error();
    
                const data = await resp.json();
                setData(data);
            } catch(err) {
                console.error(err);
                alert('An error occurred. Please try again later.');
            }
        }
        fetchRegistrations();
    }, [ id ]);

    /**
     * All registrations after `max_registrations` is considered as waiting list
     */
    const [ registrations, waitingList ] = useMemo(() => {
        let registrations = data;
        let waitingList = [];

        if (max_registrations && data.length > max_registrations) {
            registrations = data.slice(0, max_registrations);
            waitingList = data.slice(max_registrations);
        }

        return [ registrations, waitingList ];
    }, [data, max_registrations]);

    const getPDF = () => {
        // Create a fake form to submit, so that we can include the "api-key" in the body
        const form = document.createElement("form");
        form.target = '_blank';
        form.action = `/api/registrations/event/${id}/pdf`;
        form.method = "POST";

        // Include API key
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "api-key";
        input.value = "43d44abf-qlgl-6322-jujw-3b3a9e711f75"

        // Submit form in the new tab
        form.append(input);
        document.body.appendChild(form);
        form.submit();

        // Cleanup
        input.remove();
        form.remove();
    }

    return (
        <div className='p-10 mx-12 mb-12 lg:mx-24 flex-grow rounded-md bg-neutral-500/15 backdrop-blur-3xl'>
            <div className='flex items-center justify-between'>
                <h1 className='text-white text-3xl font-semibold'>
                    Registrations
                    { event.status === 'paused' && <span className='italic'> (Paused)</span> }
                </h1>
                <button
                    onClick={getPDF}
                    className='flex items-center justify-center text-white py-2 px-5 rounded hover:bg-white hover:text-black transition-colors duration-500'
                >
                    <FaDownload className="me-3" />
                    Download PDF
                </button>
            </div>
            <div className='flex flex-col gap-5 mt-5 overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-black'>
                            <th className='text-white py-2 px-4 text-start'>#</th>
                            <th className='text-white py-2 px-4 text-start'>Username</th>
                            <th className='text-white py-2 px-4 text-start'>Email</th>
                            <th className='text-white py-2 px-4 text-start'>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registrations.length === 0 && (
                                <tr className='bg-neutral-800'>
                                    <td colSpan='4' className='text-white py-4 px-4 text-center'>No registrations yet</td>
                                </tr>
                            )
                        }
                        {
                            registrations.map((r, i) => (
                                <tr key={r.id} className={i % 2 === 0 ? 'bg-neutral-800' : 'bg-neutral-700'}>
                                    <td className='text-white py-2 px-4'>{i + 1}</td>
                                    <td className='text-white py-2 px-4'>{r.username}</td>
                                    <td className='text-white py-2 px-4'>{r.email}</td>
                                    <td className='text-white py-2 px-4'>{r.phone}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                waitingList.length > 0 && (
                    <div className='mt-8'>
                        <h1 className='text-white text-3xl font-semibold'>Waiting List</h1>
                        <div className='flex flex-col gap-5 mt-5 overflow-x-auto'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='bg-black'>
                                        <th className='text-white py-2 px-4 text-start'>#</th>
                                        <th className='text-white py-2 px-4 text-start'>Username</th>
                                        <th className='text-white py-2 px-4 text-start'>Email</th>
                                        <th className='text-white py-2 px-4 text-start'>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        waitingList.map((r, i) => (
                                            <tr key={r.id} className={i % 2 === 0 ? 'bg-neutral-800' : 'bg-neutral-700'}>
                                                <td className='text-white py-2 px-4'>{registrations.length + i + 1}</td>
                                                <td className='text-white py-2 px-4'>{r.username}</td>
                                                <td className='text-white py-2 px-4'>{r.email}</td>
                                                <td className='text-white py-2 px-4'>{r.phone}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    )
}