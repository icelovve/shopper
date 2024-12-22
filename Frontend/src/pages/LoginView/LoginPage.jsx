import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const RegisterView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // const handleLoginAdmin = (event) => {
    //     event.preventDefault();
    //     if (email === user.email && password === user.password) {
    //         localStorage.setItem("isLoggedIn", "true");
    //         Swal.fire({
    //             icon: "success",
    //             text: `Welcome ${user.userName}`,
    //             showConfirmButton: false,
    //             timer: 1500,
    //         }).then(() => {
    //             navigate("/admin-dashboard");
    //         });
    //     } else {
    //         Swal.fire({
    //             icon: "error",
    //             text: "Invalid email or password!",
    //         });
    //     }
    // };

    const handleLogin = (event) => {
        event.preventDefault();

        axios.post("http://localhost:3000/login", {
            email,
            password,
        })
        .then((res) => {
            console.log("Login Success -->",res.data.user);

            Swal.fire({
                icon: "success",
                text: `ยินดีต้อนรับ ${res.data.user.username}`,
                showConfirmButton: false,
                timer: 1500
            });

            // จัดเก็บสถานะการล็อกอินใน localStorage
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("user", JSON.stringify(res.data.user))

            // ตรวจสอบสิทธิ์จาก email
            if (email === "admin@gmail.com") {
                navigate("/admin-dashboard"); // ผู้ดูแลระบบ
            } else {
                navigate("/"); // ผู้ใช้ทั่วไป
            }
        })
        .catch((e) => {
            console.error("Error -->", e);
            Swal.fire({
                icon: "error",
                text: "บัญชีนี้ไม่มีอยู่ในระบบ หรือรหัสผ่านไม่ถูกต้อง",
                showConfirmButton: false,
                timer: 1500
            });
        });
    };

    return (
        <AuthLayout title="Login">
            <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center">
                <div className="max-w-4xl w-full bg-white shadow-lg sm:rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Section */}
                        <div className="hidden lg:flex bg-red-700 text-white items-center justify-center">
                            <div className="text-center px-10">
                                <h2 className="text-3xl mt-8 font-bold">Welcome to Shopper!</h2>
                                <p className="mt-4 text-lg">
                                    Join us to explore the best shopping experience.
                                </p>
                                <img
                                    src="../../src/assets/bg-login.jpg"
                                    alt="Register"
                                    className="mt-6 w-full max-w-xs"
                                />
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="p-6 sm:p-12">
                            <Link className="flex justify-center items-center mb-6" to={"/"}>
                                <svg
                                    className="h-10 w-10 text-red-700"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1={12} y1="22.08" x2={12} y2={12} />
                                </svg>
                                <span className="self-center text-red-700 text-2xl font-bold ml-2">
                                    SHOPPER
                                </span>
                            </Link>
                            {/* <h1 className="text-xl xl:text-2xl font-extrabold text-center">
                                Sign in
                            </h1> */}
                            <div className="mt-8">
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        console.log(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                    className="w-full flex justify-center"
                                />
                                <div className="my-4 mb-9 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign in with email
                                    </div>
                                </div>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 transition-all duration-300 focus:outline-none"
                                    >
                                        Sign In
                                    </button>
                                    <p className="text-sm text-center text-gray-700 mt-4">
                                        Don't have an account?
                                        <Link
                                            className="text-red-700 font-medium mx"
                                            to="/register"
                                        >
                                            Register here
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterView;
