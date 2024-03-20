import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../../util/registerUser";
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();

    const { setIsAwaitingAuth } = useAuthContext();

    const [interests, setInterests] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        type: '',
        interests: []
    });

    useEffect(() => {
        const fetchInterests = async () => {
            const data = await fetch('/api/interests', {
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
            setInterests(response);
        };

        fetchInterests();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addInterestToFormData = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            console.log('added interest ', name)
            setFormData({ ...formData, interests: [...formData.interests, name] });
        } else {
            console.log('removed interest ', name)
            setFormData({ ...formData, interests: formData.interests.filter(interest => interest !== name) });
        }
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        let formattedPhone = value.replace(/\s/g, '');

        // remove all chars
        formattedPhone = formattedPhone.replace(/\D/g, '');

        // if the first character is not +, insert it to the start
        if (formattedPhone.charAt(0) !== '+') {
            formattedPhone = '+' + formattedPhone;
        }

        setFormData({ ...formData, phone: formattedPhone });
    };

    const handleVerificationTypeChange = (e) => {
        // Update the type property in formData based on the selected verification option
        const { value } = e.target;
        setFormData({ ...formData, type: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        if (!getPasswordStrength(formData.password)) {
            alert('Password does not meet the requirements');
            return;
        }

        if (!formData.type) {
            alert('Please select how you want to receive your verification code');
            return;
        }

        registerUser(formData)
            .then((data) => {
                if (!data) {
                    alert('Failed to register');
                    return;
                }

                if (data.error) {
                    alert(data.error);
                    return;
                }

                alert('Registered successfully');

                setIsAwaitingAuth(true);
                navigate('/verification', { state: { signupVerification: true } });
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
                    <label className="block text-gray-400 text-sm">ex. securePassword123!</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 top-[48px] flex items-center pr-3">
                        {getPasswordStrength(formData.password) ? (
                            <FaCheckCircle className="text-green-500" />
                        ) : (
                            <FaTimesCircle className="text-red-500" />
                        )}
                    </div>
                </div>

                <div className="flex flex-row mb-4 text-[13px]">
                    <div className="flex flex-col">
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
                    </div>
                    <div className="flex flex-col ml-4">
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
                        onChange={handlePhoneChange}
                        placeholder="Phone"
                        className="p-2 form-input mt-1 block w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                {/* using similar styling, ask the user if they want their verification code through email or sms with a slider*/}
                <div className="mb-6">
                    <label className="block text-gray-700">Receive Verification Code</label>
                    <label className="block text-gray-400 text-sm pb-1">Choose how you want to receive your verification code</label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input type="radio" id="email" name="verification" value="email" className="form-radio" onChange={handleVerificationTypeChange} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="sms" name="verification" value="sms" className="form-radio" onChange={handleVerificationTypeChange} />
                            <label htmlFor="sms">SMS</label>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Your Interests</label>
                    <label className="block text-gray-400 text-sm pb-1">Choose the areas you are interested in</label>
                    <div className="flex flex-wrap items-start gap-2">
                        {interests.map((interest) => (
                            <div key={interest.id} className="flex items-center gap-2 text-[12px]">
                                <input type="checkbox" id={interest.id} name={interest.name} value={interest.name} className="form-checkbox" onChange={addInterestToFormData} />
                                <label htmlFor={interest.id}>{interest.name}</label>
                            </div>
                        ))}
                    </div>
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
