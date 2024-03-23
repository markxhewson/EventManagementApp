import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { useAuthContext } from '../context/AuthContext';


const EventList = () => {
    // State to store events fetched from the backend
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const { user } = useAuthContext();

    const fetchEvents = async () => {
        try {

            // Make a GET request to fetch events from the API
            const response = await fetch('/api/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await response.json();
            setEvents(data.map(event => ({
                ...event,
                start_date: new Date(event.start_date).toLocaleDateString(),
                end_date: new Date(event.end_date).toLocaleDateString()
            })));
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect hook to fetch events when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    // Function to handle user signup for an event
    const handleSignUp = async (eventId, userId) => {
        try {
            // Make a POST request to sign up for the event
            const response = await fetch(`/api/registrations/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75',
                },
                body: JSON.stringify({ userId, eventId }) // Include userId and eventId in the request body
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            // Optionally update the UI after successful sign-up
            // For example, you could show a success message or update the event list
            alert('Successfully signed up for the event!');
        } catch (error) {
            if (error) alert(error);
            else alert('Failed to sign up for the event');
        }
    };

    return (
        <div className="px-16 py-10 h-screen">
            {/* Render the Navbar component */}
            <Navbar />
            {/* Display the list of events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map through the events and render each event as a card */}
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="min-h-[200px] rounded-xl transition-transform cursor-pointer relative bg-neutral-800"
                    >
                        <img className='rounded-xl w-full h-full object-cover' src={event.image_url ?? "/img_placeholder.jpg"} alt="Event" />
                        <div className={`absolute bottom-0 left-0 w-full bg-black px-4 py-2 ${event.image_url ? 'bg-opacity-80' : 'bg-opacity-25'}`}>
                            <p className={`text-white text-ellipsis text-nowrap overflow-hidden${event.status === 'cancelled' ? ' line-through !text-red-500' : ''}`}>{event.name}</p>
                            <p className='text-sm text-neutral-500 text-ellipsis text-nowrap overflow-hidden'>{event.location}</p>
                            <p className='text-sm text-neutral-500 font-semibold'>{event.start_date} | {event.end_date}</p>
                        </div>
                        <div className="rounded-lg absolute top-2 right-2 bg-black bg-opacity-25 px-2 py-1">
                            <p className='text-white flex items-center'>
                                <FaEye />
                                <span className='text-sm ms-2'>{event.views}</span>
                            </p>
                        </div>
                        {/* Signup button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent event card click propagation
                                handleSignUp(event.id, user.id);
                            }}
                            className="absolute bottom-2 right-2 hover:scale-105 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default EventList;
