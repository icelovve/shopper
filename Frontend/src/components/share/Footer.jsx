const Footer = () => {
    return (
        <footer className="bg-Stone-600 pt-12 pb-5">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Footer Section 1 - Company */}
                    <div>
                        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg 
                                className="h-8 w-8 text-red-700" 
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
                            <span className="self-center text-2xl font-bold whitespace-nowrap">SHOPPER</span>
                        </a>
                        <ul className="space-y-2 mt-4">
                            <li className="flex items-center mt-6">
                                <svg 
                                    className="h-8 w-8 " 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth={2} 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >  
                                    <circle 
                                        cx={12} 
                                        cy={12} 
                                        r={10} 
                                    />  
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                                </svg>
                                <h1 className="text-xl font-semibold ml-2">Our Store Locations</h1>
                            </li>
                            <li><p className="mt-6">29 Holles Place, Dublin 2 D02 YY46</p></li>
                            <li><p>68 Jay Street, Suite 902 New Side Brooklyn, NY 11201</p></li>
                        </ul>
                    </div>

                    {/* Footer Section 2 - Top Categories */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
                        <ul className="space-y-2">
                            <li><a href="#">Televisions</a></li>
                            <li><a href="#">Washing Machines</a></li>
                            <li><a href="#">Air Conditioners</a></li>
                            <li><a href="#">Laptops</a></li>
                            <li><a href="#">Accessories</a></li>
                        </ul>
                    </div>

                    {/* Footer Section 3 - Important Links */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Important Links</h2>
                        <ul className="space-y-2">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Faq</a></li>
                            <li><a href="#">Latest Posts</a></li>
                            <li><a href="#">Order Track</a></li>
                        </ul>
                    </div>

                    {/* Footer Section 4 - Newsletter */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
                        <p className="mb-4">Enter your email to receive our latest updates about our products.</p>
                        <form className="flex space-x-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full py-2 px-4 rounded-lg border border-black text-gray-800"
                            />
                            <button type="submit" className="bg-red-700 text-white py-2 px-6 rounded-lg hover:bg-red-800">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 text-center">
                    <p>© {new Date().getFullYear()} Shopper. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
