import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
        try {
          const response = await fetch('http://81.0.246.142:3001', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75'
            }
          });
          const data = await response.json();
          onSearch(data);
        } catch (error) {
          console.error('Error searching for events:', error);
        }
      };
    
  return (
    <div className="mt-8">
      <div className="flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for events..."
          className="px-4 py-1 border border-gray-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleSearch}
          className="px-2 bg-gray-500 text-white rounded-r-sm hover:bg-gray-600"
        >
          Search
        </button>
      </div>
      {/* <div className="mt-4">
        <ul>
          {searchResults.map(event => (
            <li key={event.id}>
              <div>Name: {event.name}</div>
              <div>Description: {event.description}</div>
              <div>Start Date: {event.start_date}</div>
              <div>Location: {event.location}</div>
              <div>Created By: {event.createdBy}</div>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default SearchBar;
