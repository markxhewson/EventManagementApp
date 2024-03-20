import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const OrganiserSignup = () => {
    const [reason, setReason] = useState('');
    const [ideas, setIdeas] = useState('');

    const navigate = useNavigate();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reason || !ideas) {
            alert('Please fill in all fields');
            return;
        }

        const data = await fetch('/api/applications/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
            },
            body: JSON.stringify({ userId: user.id, why: reason, ideas })
        });

        if (!data.ok) {
            alert('An error occurred. Please try again later');
            return;
        }

        alert('Application submitted successfully');
        navigate('/');
    };

    return (
        <div className="px-5 md:px-24 py-10 flex justify-center items-center h-screen">
            <Navbar />

            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Apply to be an Organiser</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="reason" className="block text-gray-700">Why do you want to be an organiser?</label>
                        <textarea id="reason" className="p-2 form-textarea mt-1 block w-full border border-gray-300 rounded-md" rows="4" placeholder="Enter your reason" value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ideas" className="block text-gray-700">Do you have any ideas for an event?</label>
                        <textarea id="ideas" className="p-2 form-textarea mt-1 block w-full border border-gray-300 rounded-md" rows="4" placeholder="Enter your ideas" value={ideas} onChange={(e) => setIdeas(e.target.value)}></textarea>
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit Application</button>
                        <Link to="/" className="text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-24">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrganiserSignup;
