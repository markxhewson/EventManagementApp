import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { AiFillInfoCircle } from "react-icons/ai";
import { Tooltip } from 'react-tooltip';

const AccountDetailsPage = () => {
    const [emailNotifications, setEmailNotifications] = useState(0);
    const [smsNotifications, setSmsNotifications] = useState(0);
    const [twoFactorAuth, setTwoFactorAuth] = useState(0);
    const [preferredAuth, setPreferredAuth] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');

    const { user, login } = useAuthContext();

    useEffect(() => {
        if (user) {
            setEmailNotifications(Number(user.emailNotifications) || 0);
            setSmsNotifications(Number(user.smsNotifications) || 0);
            setTwoFactorAuth(Number(user.twoFactorAuth) || 0);
            setPreferredAuth(user.preferredAuth || '');

            setUsername(user.username || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phone || '');
            setRole(user.role || '');
        }
    }, [user]);

    const handleUpdate = async () => {
        const data = await fetch('/api/users/' + user.id, {
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
                emailNotifications: emailNotifications,
                smsNotifications: smsNotifications,
                twoFactorAuth: twoFactorAuth,
                preferredAuth: preferredAuth,
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
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold">Your Account Details</h1>
                <h1 className='text-base text-gray-700 mb-6'>Update your account here</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='mb-4 flex flex-col'>
                        <label className="block text-gray-700">Notifications</label>
                        <div className="flex flex-row p-2">
                            <label className='text-gray-700'>Email</label>
                            <input type="range" min="0" max="1" value={emailNotifications} onChange={(e) => setEmailNotifications(parseInt(e.target.value))} className="w-12 ml-4" />
                        </div>
                        <div className="flex flex-row p-2">
                            <label className='text-gray-700'>SMS</label>
                            <input type="range" min="0" max="1" value={smsNotifications} onChange={(e) => setSmsNotifications(parseInt(e.target.value))} className="w-12 ml-[21px]" />
                        </div>
                    </div>
                    <div className='mb-4 flex flex-col'>
                        <label className="block text-gray-700">Security</label>
                        <div className="flex flex-row p-2">
                            <label className='text-gray-700'>2FA</label>
                            <input type="range" min="0" max="1" value={twoFactorAuth} onChange={(e) => setTwoFactorAuth(parseInt(e.target.value))} className="w-12 ml-[25px]" />
                            <Tooltip id="my-tooltip" />
                            <AiFillInfoCircle data-tooltip-id="my-tooltip" data-tooltip-content="Logging in requires users to verify their identity via email or phone for security." className="text-2xl ml-2" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Preferred Authentication Method</label>
                            <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="email"
                                        name="verification"
                                        value="email"
                                        className="form-radio"
                                        onChange={(e) => setPreferredAuth(e.target.value)}
                                        checked={preferredAuth === 'email' || preferredAuth === ''}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="sms"
                                        name="verification"
                                        value="sms"
                                        className="form-radio"
                                        onChange={(e) => setPreferredAuth(e.target.value)}
                                        checked={preferredAuth === 'sms' || preferredAuth === ''}
                                    />
                                    <label htmlFor="sms">SMS</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input type="text" className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password</label>
                        <input type="password" className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md" placeholder="Enter a new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input type="tel" className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <input
                            type="text"
                            className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
                            placeholder="Role of User"
                            value={role}
                            readOnly
                        />
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
