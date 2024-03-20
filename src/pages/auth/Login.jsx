import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import loginUser from "../../util/loginUser";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verificationType, setVerificationType] = useState('email');
    
    const navigate = useNavigate();
    const { login, setIsAwaitingAuth } = useAuthContext();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload

        if (!username || !password) {
            alert('Please enter your username and password');
            return;
        }

        loginUser(username, password).then(async (data) => {
            if (!data) {
                alert('Incorrect username or password.');
                return;
            }

            if (data.user.twoFactorAuth) {
                setIsAwaitingAuth(true);
                navigate('/verification', { state: { signupVerification: false } });
                
                await fetch('/api/auth/send-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
                    },
                    body: JSON.stringify({ userId: data.user.id, type: verificationType })
                });

                return;
            }

            localStorage.setItem('token', data.token);
            login(data.user);
            
            alert('Logged in successfully')
            navigate('/');
        });
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold">Login</h1>
                <h1 className="text-base mb-6 text-gray-700">Come see our events!</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        className="p-2 form-input mt-1 block w-full text-gray-700 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="p-2 form-input mt-1 block w-full text-gray-700 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-24">Login</button>
                    <Link to="/" className="text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-24">Back</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
