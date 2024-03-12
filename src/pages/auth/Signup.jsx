import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../../util/registerUser";
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Signup = () => {
    const navigation = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        console.log(getPasswordStrength(formData.password));
        if (!getPasswordStrength(formData.password)) {
            alert('Password does not meet the requirements');
            return;
        }

        registerUser(formData)
            .then((data) => {
                if (!data) {
                    alert('Failed to register');
                    return;
                }

                if (data.error) {
                    console.log("hey")
                    console.log(data)
                    alert(data.error);
                    return;
                }

                alert('Registered successfully');
                navigation('/login');
            })
    };

    const getPasswordStrength = (password) => {
        return (
            password.length > 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
        );
    };

    const hasOneLowerCase = (password) => /[a-z]/.test(password);
    const hasOneUpperCase = (password) => /[A-Z]/.test(password);
    const hasOneNumber = (password) => /[0-9]/.test(password);
    const hasOneSpecialCharacter = (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const hasMinimumLength = (password) => password.length >= 8;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-screen text-gray-600">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-black">Sign Up</h1>
                <h1 className="text-base mb-6 text-gray-700">Access one of our many cancer awareness events!</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 top-[27px] flex items-center pr-3">
                        {getPasswordStrength(formData.password) ? (
                            <FaCheckCircle className="text-green-500" />
                        ) : (
                            <FaTimesCircle className="text-red-500" />
                        )}
                    </div>
                </div>

                <div className="flex flex-col mb-4 text-sm">
                    <h3 className="flex items-center">
                        {hasOneLowerCase(formData.password) ? (
                            <><FaCheckCircle className="text-green-500 mr-2" /><div className="text-green-500 mr-2">At least one lowercase letter</div></>
                        ) : (
                            <><FaTimesCircle className="text-red-500 mr-2" /><div className="text-red-500 mr-2">At least one lowercase letter</div></>
                        )}
                    </h3>
                    <h3 className="flex items-center">
                        {hasOneUpperCase(formData.password) ? (
                            <><FaCheckCircle className="text-green-500 mr-2" /><div className="text-green-500 mr-2">At least one uppercase letter</div></>
                        ) : (
                            <><FaTimesCircle className="text-red-500 mr-2" /><div className="text-red-500 mr-2">At least one uppercase letter</div></>
                        )}
                    </h3>
                    <h3 className="flex items-center">
                        {hasOneNumber(formData.password) ? (
                            <><FaCheckCircle className="text-green-500 mr-2" /><div className="text-green-500 mr-2">At least one number</div></>
                        ) : (
                            <><FaTimesCircle className="text-red-500 mr-2" /><div className="text-red-500 mr-2">At least one number</div></>
                        )}
                    </h3>
                    <h3 className="flex items-center">
                        {hasOneSpecialCharacter(formData.password) ? (
                            <><FaCheckCircle className="text-green-500 mr-2" /><div className="text-green-500 mr-2">At least one special character</div></>
                        ) : (
                            <><FaTimesCircle className="text-red-500 mr-2" /><div className="text-red-500 mr-2">At least one special character</div></>
                        )}
                    </h3>
                    <h3 className="flex items-center">
                        {hasMinimumLength(formData.password) ? (
                            <><FaCheckCircle className="text-green-500 mr-2" /><div className="text-green-500 mr-2">Minimum of 8 characters</div></>
                        ) : (
                            <><FaTimesCircle className="text-red-500 mr-2" /><div className="text-red-500 mr-2">Minimum of 8 characters</div></>
                        )}
                    </h3>
                </div>


                <div className="mb-4">
                <label className="block text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Phone Number & Area Code</label>
                    <label className="block text-gray-400 text-sm">ex. +44 7123 456789</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-24" onClick={handleSubmit}>Sign Up</button>
                    <Link to="/login" className="text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-24">Login</Link>
                </div>
            </div>
        </form>
    );
};

export default Signup;
