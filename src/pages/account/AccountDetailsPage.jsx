import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AccountDetailsPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');

    const { user, login } = useAuthContext();

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phone || '');
            setRole(user.role || '');
        }
    }, [user]);

    const handleUpdate = async () => {
        const data = await fetch('http://81.0.246.142:3001/users/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                phone: phoneNumber,
            }),
        });

        const response = await data.json();

        if (response.ok) {
            alert(response.error);
            return;
        }

        alert('Account details updated successfully');
        login(response);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-6">Your Account Details</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username:</label>
                        <input type="text" className="p-2 form-input mt-1 block w-full" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" className="p-2 form-input mt-1 block w-full" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password:</label>
                        <input type="password" className="p-2 form-input mt-1 block w-full" placeholder="Enter a new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number:</label>
                        <input type="tel" className="p-2 form-input mt-1 block w-full" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role:</label>
                        <input type="text" className="p-2 form-input mt-1 block w-full" placeholder="Role of User" value={role} readOnly />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-24" onClick={handleUpdate}>Update</button>
                        <Link to="/" type="submit" className="text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-24">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountDetailsPage;
