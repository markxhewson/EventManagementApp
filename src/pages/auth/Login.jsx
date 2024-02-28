import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import loginUser from "../../util/loginUser";

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
        <div className="flex flex-col h-full min-h-screen p-4 gap-28">
            <div className="flex flex-col justify-center items-center h-24 mt-8">
                <h1 className="text-orange-800 text-5xl font-bold">EVENTBLOOM</h1>
                <h1 className="text-slate-600 text-4xl ">LOGIN</h1>
            </div>

            <div className="flex flex-col justify-center items-center gap-12">
                <div className="flex flex-row justify-center items-center gap-16 h-96">
                    <div className="text-center w-96">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Username"
                            className="w-64 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            className="w-64 p-2 mt-4 rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
                            required
                        />
                    </div>
                </div>
                <button onClick={handleLogin} className="bg-red-700 text-center justify-center items-center rounded-xl p-2 w-80 text-2xl font-bold">LOGIN</button>
            </div>
        </div>
    );
};

export default Login;
