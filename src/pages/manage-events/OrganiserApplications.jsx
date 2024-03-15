import { useEffect, useState } from "react";
import Navbar from "../Navbar";

const OrganiserApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const data = await fetch('/api/applications/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                }
            });

            if (!data.ok) {
                alert('An error occurred. Please try again later');
                return;
            }

            const response = await data.json();
            setApplications(response);

            console.log(response)
        };

        fetchApplications();
    }, []);

    const handleApplication = async (id, approved) => {
        const data = await fetch(`/api/applications/approve/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
            },
            body: JSON.stringify({ approved })
        });

        if (!data.ok) {
            alert('An error occurred. Please try again later');
            return;
        }

        const response = await data.json();
        alert(response.message);
    };

    return (
        <div className='px-5 md:px-24 py-10'>
            <Navbar />

            <h1 className='text-white text-3xl mb-3'>ORGANISER APPLICATIONS</h1>
            <div className='flex flex-col gap-3'>
                {applications.length == 0 && <p className='text-red-700'>No applications have been submitted.</p>}
                {applications.map((app) => (
                    <div key={app.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold">{app.user.username}</h1>
                            <p className="text-lg text-gray-700">{new Date(app.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 text-sm">
                            <h3>Email: {app.user.email.toUpperCase()}</h3>
                            <h3>Phone: {app.user.phone}</h3>
                        </div>
                        <div className="mt-4 mb-4">
                            <h3 className="block text-gray-700 text-xl">Why do you want to be an organiser?</h3>
                            <p className="text-gray-700 text-sm">{app.why}</p>
                        </div>
                        <div>
                            <h3 className="block text-gray-700 text-xl">Do you have any ideas for an event?</h3>
                            <p className="text-gray-700 text-sm">{app.ideas}</p>
                        </div>
                        <div className="mt-6">
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-24" onClick={() => handleApplication(app.id, true)}>Accept</button>
                            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2 w-24" onClick={() => handleApplication(app.id, false)}>Reject</button>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
};

export default OrganiserApplications;