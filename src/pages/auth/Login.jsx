import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import loginUser from "../../util/loginUser";
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuthContext();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please enter your username and password');
            return;
        }

        loginUser(username, password).then((data) => {
            if (!data) {
                alert('An error occurred while logging in');
                return;
            }

            localStorage.setItem('token', data.token);
            login(data.user);
            
            alert('Logged in successfully')
        });
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold">Login</h1>
                <h1 className="text-base mb-6 text-gray-700">Come see our events!</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
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
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-24">Login</button>
                    <Link to="/" className="text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-24">Back</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
