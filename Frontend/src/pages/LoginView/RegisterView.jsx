import AuthLayout from "../../components/layout/AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import bgImage from "../../assets/bg-login.jpg";
import Swal from 'sweetalert2'

const RegisterView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Invalid email format!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long!");
            return;
        }

        setError("");
        
        axios.post("http://localhost:3000/register", {
            username: userName,
            email,
            password,
        })
        .then((res) => {
            console.log("Success -->", res);
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            Swal.fire({
                icon: "success",
                text: "You have successfully created an account.",
                showConfirmButton: false,
                timer: 1500
              });
        })
        .catch((e) => {
            console.error("Error -->", e);
            setError("Failed to register. Please try again.");
            Swal.fire({
                icon: "error",
                text: "System error has occurred. Please register later.",
                showConfirmButton: false,
                timer: 1500
              });
        });
    };



    return (
        <AuthLayout title="Register">
            <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center">
                <div className="max-w-4xl w-full bg-white shadow-lg sm:rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        
                        {/* Left Section */}
                        <div className="p-8 sm:p-12 flex flex-col justify-center">
                            <Link className="flex justify-center items-center mb-8" to={"/"}>
                                <svg className="h-10 w-10 text-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1={12} y1="22.08" x2={12} y2={12} />
                                </svg>
                                <span className="self-center text-red-700 text-2xl font-bold mx-1">SHOPPER</span>
                            </Link>
                            <div className="mb-8 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Create Account
                                </div>
                            </div>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Full Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                                        placeholder="User Name"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>

                                {/* Confirm Password */}
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fas fa-check-circle"></i>
                                    </span>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-red-700 text-white rounded-lg font-semibold shadow-lg hover:bg-red-800 transition-all duration-300"
                                >
                                    Create Account
                                </button>
                                <p className="text-center text-sm mt-4 text-gray-700">Already have an account? <Link className="text-red-700 mx-1" to='/login'>Login Now</Link></p>
                            </form>
                        </div>

                        {/* Right Section */}
                        <div className="lg:block bg-red-700 text-white flex items-center justify-center">
                            <div className="text-center px-10">
                                <h2 className="text-3xl mt-8 font-bold">Welcome to Shopper!</h2>
                                <p className="mt-4 text-lg">Join us to explore the best shopping experience.</p>
                                <img src={bgImage} alt="Register" className="mt-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterView;