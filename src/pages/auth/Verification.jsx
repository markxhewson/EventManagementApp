import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const Verification = () => {
    const { state } = useLocation();

    const navigation = useNavigate();
    const inputRefs = useRef([]);

    const [verificationCodes, setVerificationCodes] = useState(['', '', '', '', '', '']);

    const { login } = useAuthContext();

    const handleChange = (index, value) => {
        // Only update state if the value is a number
        if (!isNaN(value) && value !== '' && /^\d+$/.test(value)) {
            const updatedCodes = [...verificationCodes];
            updatedCodes[index] = value;
            setVerificationCodes(updatedCodes);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = verificationCodes.join('');

        const data = await fetch('/api/auth/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
            },
            body: JSON.stringify({ verificationCode: code })
        });

        const response = await data.json();

        if (response.error) {
            alert(response.error);
            return;
        }

        alert(response.message);

        if (state.signupVerification) {
            navigation('/login');
        } else {
            login(response.user);
            navigation('/');
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!verificationCodes[index] && index > 0) {
                // If the current input is empty, focus on the previous input
                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            } else {
                // If there's a value, clear it and focus on input before the current one
                const updatedCodes = [...verificationCodes];
                updatedCodes[index] = '';
                setVerificationCodes(updatedCodes);

                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-screen text-gray-600">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-black">Verification</h1>
                <h1 className="text-base text-gray-700 mb-6">Enter the code sent to your preferred authentication method, it may take some time to receive the code.</h1>
                <div className="flex items-center justify-center space-x-2 mb-4">
                    {verificationCodes.map((code, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={code}
                            placeholder="0"
                            maxLength={1}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="p-2 text-2xl form-input w-10 h-16 text-center border border-gray-300 rounded-md"
                            required
                        />
                    ))}
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-2" disabled={verificationCodes.some(code => !code)}>Submit</button>
            </div>
        </form>
    );
};

export default Verification;
