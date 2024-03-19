import { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar";
import CreateEvent from "./CreateEvent";
import { FaEye } from "react-icons/fa";

export default function ManageEvents() {

    const [ events, setEvents ] = useState([]);
    const [ past, upcoming ] = useMemo(() => {
        const past = [];
        const upcoming = [];

        for (const e of events ?? []) {
            if (e.start_date < Date.now()) past.push(e);
            else upcoming.push(e);
        }

        past.sort((a, b) => b.start_date - a.start_date);
        upcoming.sort((a, b) => a.start_date - b.start_date);

        return [ past, upcoming ];
    }, [ events ]);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            const resp = await fetch('/api/events', {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                },
            });
            if (!resp.ok) throw new Error();

            const data = await resp.json();
            setEvents(data);
        } catch(err) {
            alert('An error occurred. Please try again later.');
        }
    }

    /* Create modal states */
    const [ openCreateModal, setOpenCreateModal ] = useState(false);

    return (
        <div className='px-5 md:px-24 py-10'>
            <Navbar />
            
            {/* Header and add button */}
            <div className='flex justify-between items-center mb-3'>
                <h1 className='text-white text-3xl'>UPCOMING EVENTS</h1>
                <button
                    className="border-white border-2 py-2 px-4 rounded bg-transparent text-white hover:bg-white hover:text-black transition-colors"
                    onClick={() => setOpenCreateModal(true)}
                >
                    Create Event
                </button>
                {/* Create modal */}
                <CreateEvent
                    isOpen={openCreateModal}
                    onClose={async () => {
                        await fetchEvents();
                        setOpenCreateModal(false);
                    }}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
                {
                    upcoming.map((e) => <EventItem key={e.id} event={e} />)
                }
                { events !== undefined && upcoming.length === 0 && <p className='text-white my-5'>No upcoming events</p>}
            </div>
            {
                past.length > 0 && (
                    <>
                        <h1 className='text-white text-3xl mb-3 mt-5'>PAST EVENTS</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
                            {
                                past.map((e) => <EventItem key={e.id} event={e} />)
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

function EventItem({ event }) {

    const { name, image_url, start_date, end_date, location, views } = event;

    const date = new Date(start_date).toLocaleDateString();
    const startTime = new Date(start_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(end_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    return (
        <div className='rounded-xl hover:scale-105 transition-transform cursor-pointer relative bg-neutral-800'>
            <img className='rounded-xl min-h-[200px] object-cover' src={image_url ?? "img_placeholder.jpg"} alt="Event" />
            <div className={`absolute bottom-0 left-0 w-full bg-black px-4 py-2 ${image_url ? 'bg-opacity-80' : 'bg-opacity-25'}`}>
                <p className='text-white text-ellipsis text-nowrap overflow-hidden'>{ name }</p>
                <p className='text-sm text-neutral-500 text-ellipsis text-nowrap overflow-hidden'>
                    { location }
                </p>
                <p className='text-sm text-neutral-500 font-semibold'>
                    { date } | { startTime } - { endTime }
                </p>
            </div>

            <div className="rounded-lg absolute top-2 right-2 bg-black bg-opacity-25 px-2 py-1">
                <p className='text-white flex items-center'>
                    <FaEye />
                    <span className='text-sm ms-2'>{ views }</span>
                </p>
            </div>
        </div>
    )
}