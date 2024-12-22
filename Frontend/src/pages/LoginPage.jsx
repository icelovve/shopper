import AuthLayout from "../components/layout/AuthLayout";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
    return (
        <AuthLayout>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <Link className="flex justify-center items-center" to={"/"}>
                            <svg
                                className="h-10 w-10 text-red-700   "
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                z                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1={12} y1="22.08" x2={12} y2={12} />
                            </svg>
                            <span className="self-center text-red-700 text-2xl font-bold mx-1">
                                SHOPPER
                            </span>
                        </Link>
                        <div className="mt-8 flex flex-col items-center">
                            <h1 className="text-xl xl:text-2xl font-extrabold">Sign up</h1>

                            {/* //TODO: Add google signin */}
                            <div className="w-full flex-1 mt-6">
                                <div className="flex flex-col items-center">
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            console.log(credentialResponse);
                                        }}
                                        onError={() => {
                                            console.log("Login Failed");
                                        }}
                                    />
                                </div>
                                <div className="my-10 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign up with e-mail
                                    </div>
                                </div>
                                <div className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <button className="mt-5 tracking-wide font-semibold bg-red-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy={7} r={4} />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by templatana's
                                        <a
                                            href="#"
                                            className="border-b border-gray-500 border-dotted"
                                        >
                                            Terms of Service
                                        </a>
                                        and its
                                        <a
                                            href="#"
                                            className="border-b border-gray-500 border-dotted"
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center text-center lg:flex">
                        <div className="bg-gray-50">
                            <img src="../../src/assets/bg-login.jpg" alt="bg-login" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;