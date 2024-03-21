import { Navigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { FaBan, FaClock, FaDownload, FaEdit, FaFileImage, FaMap, FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import EditEvent from "./EditEvent";
import CancelEvent from "./CancelEvent";
import EventRegistrations from "./EventRegistrations";

export default function ManageEventDetails() {

    const { id } = useParams();
    const eventId = Number(id); // Parse number

    const [ event, setEvent ] = useState();

    useEffect(() => {
        fetchEvents(eventId);
    }, [ eventId ]);

    async function fetchEvents(eventId) {
        try {
            const resp = await fetch(`/api/events/${eventId}`, {
                headers: {
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                },
            });
            if (!resp.ok) throw new Error();

            const data = await resp.json();
            setEvent(data);
        } catch(err) {
            console.error(err);
            alert('An error occurred. Please try again later.');
        }
    }

    // Go back to event dashboard if invalid event id
    if (!eventId) {
        return <Navigate to='manage-events' />;
    }
    if (!event) {
        return <div><Navbar /> <p className='text-white text-xl text-center my-5'>Loading...</p></div>
    }

    const { image_url } = event;

    return (
        <div className='w-screen h-screen'>
            <Navbar />

            {/* Blurred image as the background */}
            <div className='w-full h-full fixed left-0 z-0'>
                <div
                    className='w-full h-full absolute top-0 left-0 z-20 backdrop-blur bg-black/80'
                ></div>
                <img className='w-full h-full object-cover absolute top-0 left-0 z-10' src={image_url ?? "/img_placeholder.jpg"} alt="Background" />
            </div>

            {/* Event details */}
            <div className='flex flex-col w-screen relative'>
                <EventHeader event={event} refresh={fetchEvents} />
                <EventRegistrations event={event} />
            </div>
        </div>
    );
}

const EventHeader = ({ event, refresh }) => {

    const { id, name, description, image_url, start_date, end_date, location, max_registrations, views, interests, status } = event;

    const date = new Date(start_date).toLocaleDateString();
    const startTime = new Date(start_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(end_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    const [ showEdit, setShowEdit ] = useState(false);
    const [ showCancel, setShowCancel ] = useState(false);

    const updateEventStatus = async(status) => {
        // Update event status
        try {
            const resp = await fetch(`/api/events/status/${id}`, {
                headers: {
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75",
                    'content-type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            if (!resp.ok) throw new Error();
            await refresh(id);
        } catch(err) {
            console.error(err);
            alert('An error occurred. Please try again later.');
        }
    }

    const getEventRegistrations = () => {
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

    const getEventPoster = () => {
        const answer = confirm("Would you like the event name, date, and location to be included in the poster?");
        if (!answer) {
            return window.open(image_url, '_blank');
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = image_url;
        image.onload = () => {
            if (image.height < 300 || image.width < 300) {
                alert('The image is too small to add text. Please upload a larger image.');
                canvas.remove();
                image.remove();

                return window.open(image_url, '_blank');
            }

            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);

            context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            context.fillRect(0, canvas.height - 200, canvas.width, 200);

            context.font = 'bold 50px Arial';
            context.fillStyle = 'white';
            context.fillText(name, 25, canvas.height - 140);

            context.font = '25px Arial';
            context.fillText(date, 25, canvas.height - 100);
            context.fillText(`${startTime} - ${endTime}`, 25, canvas.height - 70);
            context.fillText(`Location: ${location}`, 25, canvas.height - 20);

            const base64Url = canvas.toDataURL('image/jpeg', 1);
            const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${name}</title>
            </head>
            <body style="margin:0;">
                <img style="height:100%;" src="${base64Url}" alt="Event Poster">
            </body>
            </html>
            `;
            const newTab = window.open('about:blank', '_blank');
            newTab.document.open();
            newTab.document.write(html);
            newTab.document.close();

            canvas.remove();
            image.remove();
        };
    };

    return (
        <div className='flex flex-col lg:flex-row gap-y-5 lg:items-center p-10 m-12 lg:mx-24 flex-grow rounded-md bg-neutral-500/15 backdrop-blur-3xl'>
            <div className='flex items-center flex-shrink-0 relative'>
                <img
                    className='object-cover rounded-md h-[200px]'
                    src={image_url ?? "/img_placeholder.jpg"}
                    alt="Event"
                />
            </div>
            <div className='px-5 lg:px-10 flex-grow'>
                <h1 className='text-white text-3xl font-semibold'>
                    { status !== 'cancelled' ? name : (
                        <span className='text-red-500 line-through'>&nbsp;{name}&nbsp;</span>
                    ) }
                </h1>
                <p className='text-white whitespace-pre-wrap text-sm mt-2'>{description}</p>
                <p className='text-white mt-2 flex items-center flex-nowrap'>
                    <FaMap className='me-2' />
                    {location}
                </p>
                <p className='text-white flex items-center flex-nowrap'>
                    <FaClock className='me-2' />
                    <span>{ date }</span>&nbsp;| { startTime } - { endTime }
                </p>
                <div className='flex flex-wrap gap-2 mt-2'>
                    {
                        interests.map((i) => (
                            <span key={i.interestId} className='text-white bg-neutral-800 px-2 py-1 rounded-md text-sm'>{i.name}</span>
                        ))
                    }
                </div>
                <p className='text-white text-sm mt-2 flex items-center flex-nowrap'>
                    <span className='me-2'>Max registrations:</span>
                    <span className='me-3'>{ max_registrations || 'No Limit' }</span>
                    <span className='me-2'>Views:</span>
                    <span>{ views }</span>
                </p>
            </div>
            <ul className='lg:ms-auto flex flex-col gap-2 py-2 flex-shrink-0'>
                <li>
                    <button
                        onClick={() => setShowEdit(true)}
                        className='flex items-center justify-center w-full text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors duration-500'
                    >
                        <FaEdit className="me-3" />
                        Edit Details
                    </button>
                </li>
                {
                    !!image_url && (
                        <button
                            onClick={getEventPoster}
                            className='flex items-center justify-center w-full text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors duration-500'
                        >
                            <FaFileImage className="me-3" />
                            Get Poster
                        </button>
                    )
                }
                <li>
                    <button
                        onClick={getEventRegistrations}
                        className='flex items-center justify-center w-full text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors duration-500'
                    >
                        <FaDownload className="me-3" />
                        Get registration list
                    </button>
                </li>
                {
                    status === 'active' && (
                        <li>
                            <button
                                onClick={() => updateEventStatus('paused')}
                                className='text-red-500 flex items-center justify-center w-full py-2 px-4 rounded hover:bg-red-500 hover:text-black transition-colors duration-500'
                            >
                                <FaRegPauseCircle className="me-3 text-lg" />
                                Pause registrations
                            </button>
                        </li>
                    )
                }
                {
                    status === 'paused' && (
                        <li>
                            <button
                                onClick={() => updateEventStatus('active')}
                                className='text-green-500 flex items-center justify-center w-full py-2 px-4 rounded hover:bg-green-500 hover:text-black transition-colors duration-500'
                            >
                                <FaRegPlayCircle className="me-3 text-lg" />
                                Resume registrations
                            </button>
                        </li>
                    )
                }
                {
                    status !== 'cancelled' && (
                        <li>
                            <button
                                onClick={() => setShowCancel(true)}
                                className='text-red-500 flex items-center justify-center w-full py-2 px-4 rounded hover:bg-red-500 hover:text-black transition-colors duration-500'
                            >
                                <FaBan className="me-3 text-lg" />
                                Cancel Event
                            </button>
                        </li>
                    ) 
                }
            </ul>

            <EditEvent
                event={event}
                isOpen={showEdit}
                onClose={async() => {
                    await refresh(id);
                    setShowEdit(false)
                }}
            />
            <CancelEvent
                event={event}
                isOpen={showCancel}
                onClose={async() => {
                    await refresh(id);
                    setShowCancel(false)
                }}
            />
        </div>
    );
}
