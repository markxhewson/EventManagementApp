import React, { useEffect, useMemo, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SearchBar = ({ className }) => {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);

  const [past, upcoming, cancelled] = useMemo(() => {
    const past = [];
    const upcoming = [];
    const cancelled = [];

    for (const e of events ?? []) {
      if (e.status === 'cancelled') cancelled.push(e);
      else if (e.start_date < Date.now()) past.push(e);
      else upcoming.push(e);
    }

    past.sort((a, b) => b.start_date - a.start_date);
    upcoming.sort((a, b) => a.start_date - b.start_date);

    return [past, upcoming, cancelled];
  }, [events]);

  const getFilteredEvents = () => {
    if (search === '') {
      return [];
    }

    return upcoming.filter((e) => {
      console.log(e)
      const nameMatch = e.name.toLowerCase().includes(search.toLowerCase());
      const description = e.description.toLowerCase().includes(search.toLowerCase());
      const location = e.location.toLowerCase().includes(search.toLowerCase());
      const status = e.status.toLowerCase().includes(search.toLowerCase());
      return nameMatch || description || location || status;
    });
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetch('api/events/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75'
          }
        });

        if (!data.ok) {
          throw new Error('Error fetching events');
        }

        const response = await data.json();
        setEvents(response);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    getEvents();
  }, []);

  return (
    <div className={className}>
      <div className="flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for events..."
          className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 w-24"
        />
      </div>
      <h1 className="mt-8 text-3xl">SEARCH RESULTS</h1>
      {getFilteredEvents().length < 1 && <p className='text-red-600 mt-3'>Use the search bar to lookup key words in events!</p>}
      {getFilteredEvents().length > 1 && <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        {
          getFilteredEvents().length > 0 && getFilteredEvents().map((e) => <EventItem key={e.id} event={e} />)
        }
      </div>}
      <h1 className="mt-8 text-3xl">UPCOMING EVENTS</h1>
      {events !== undefined && upcoming.length === 0 && <p className='text-white mt-8'>No upcoming events</p>}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        {
          upcoming.length > 0 && upcoming.map((e) => <EventItem key={e.id} event={e} />)
        }
      </div>
    </div>

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


export default SearchBar;
