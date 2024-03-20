import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import verifyToken from "../util/verifyToken";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [events, setEvents] = useState([]);

  const { isLoggedIn, user } = useAuthContext();

  const getUserEvents = async () => {
    try {
      const data = await fetch('/api/users/' + user.id + '/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75'
        }
      });

      if (!data.ok) {
        throw new Error('Failed to fetch user events');
      }

      const response = await data.json();
      setEvents(response);
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  }

  useEffect(() => {
    getUserEvents();
  }, []);

  return (
    <>
      <div className={!isLoggedIn || (user && !user.authenticated) ? 'hidden' : 'absolute'}>
        <div className="fixed bottom-5 right-5">
          <div className="p-4 w-auto max-w-xs bg-red-700 rounded-md text-white">
            <h1 className="text-lg mb-2">Account Not Verified!</h1>
            <p className="mb-4 text-sm">Your account is not authenticated. Please verify your account to access all features.</p>
            <Link to={{ pathname: "/verification", state: { signupVerification: true } }} className="block text-center bg-white text-red-700 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white">
              VERIFY NOW
            </Link>
          </div>
        </div>
      </div>

      <div className="px-16 py-10 h-screen">
        <Navbar />

        <div className="flex flex-row gap-24">
          <div className="flex-1">
            <div className="text-white">
              <SearchBar className="flex flex-col" />
              <div className="mt-8">
                <h1 className="text-3xl">EVENTS YOU SIGNED UP FOR</h1>
                {events.length === 0 && <p className='text-red-600 mt-3'>You have not signed up for any events!</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {
                    events.map((e) => <EventItem key={e.id} event={e} />)
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex-2">
            <Reviews className="bg-gray-100 p-9 mb-4 flex justify-center h-full rounded-xl" />
          </div>
        </div>
      </div>


    </>
  );
};

function EventItem({ event }) {
  const { id, name, image_url, start_date, end_date, location, views, status } = event;

  const date = new Date(start_date).toLocaleDateString();
  const startTime = new Date(start_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(end_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className='h-auto rounded-xl transition-transform cursor-pointer relative bg-neutral-800'>
      <img className='rounded-xl w-96 h-auto object-cover' src={image_url ?? "/img_placeholder.jpg"} alt="Event" />
      <div className={`absolute bottom-0 left-0 w-full bg-black px-2 py-1 ${image_url ? 'bg-opacity-80' : 'bg-opacity-25'}`}>
        <p className={`text-white text-sm text-ellipsis text-nowrap overflow-hidden${status === 'cancelled' ? ' line-through !text-red-500' : ''}`}>{name}</p>
        <p className='text-xs text-neutral-500 text-ellipsis text-nowrap overflow-hidden'>
          {location}
        </p>
        <p className='text-xs text-neutral-500 font-semibold'>
          {date} | {startTime} - {endTime}
        </p>
      </div>

      <div className="rounded-lg absolute top-1 right-1 bg-black bg-opacity-25 px-1 py-0.5">
        <p className='text-white flex items-center text-xs'>
          <FaEye />
          <span className='ms-1'>{views}</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
