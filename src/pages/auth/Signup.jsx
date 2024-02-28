import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../../util/registerUser";

const Signup = () => {
    const navigation = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        registerUser(formData)
            .then((data) => {
                if (!data) {
                    alert('Failed to register');
                    return;
                }

                alert('Registered successfully');
                navigation('/login');
            })
    };

    return (
        <div className="flex flex-col h-full min-h-screen p-4 gap-12">
            <div className="flex flex-col justify-center items-center h-24 mt-8">
                <h1 className="text-orange-800 text-5xl font-bold">EVENTBLOOM</h1>
                <h3 className="text-slate-200 text-sm">Sign up today to take advantage of one of our many services!</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center gap-16 h-96">
                    <div className="text-center w-96">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-64 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-64 p-2 mt-4 rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-64 p-2 mt-4 rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-64 p-2 mt-4 rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
                            required
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-64 p-2 mt-4 rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
                            required
                        >
                            <option value="attendee">Attendee</option>
                            <option value="organiser">Organiser</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="bg-red-700 text-center justify-center items-center rounded-xl p-2 w-80 text-2xl font-bold">SIGN UP</button>
            </form>
        </div>
    );
};

export default Signup;
