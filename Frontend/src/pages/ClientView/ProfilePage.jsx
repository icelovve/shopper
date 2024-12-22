import { useState, useEffect } from "react";
import MainLayout from './../../components/layout/MainLayout';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [setIsContactUsVisible] = useState(false);
    const [activeOrderStatus, setActiveOrderStatus] = useState("All");
    const [user, setUser] = useState("");

    const tabs = [
        { id: "account", label: "My Account" },
        { id: "orderHistory", label: "My Orders" },
        { id: "contactUs", label: "Contact Us" },
    ];

    const orderStatuses = [
        { key: "All", label: "All" },
        { key: "PendingPayment", label: "Pending Payment" },
        { key: "PreparingForShipping", label: "Preparing for Shipping" },
        { key: "Shipped", label: "Shipped" },
        { key: "Received", label: "Received" },
        { key: "OrderCancelled", label: "Order Cancelled" },
    ];

    const statusCounts = {
        Pending: 5,
        Packaged: 3,
        Delivering: 2,
        Cancelled: 1,
    };

    const statusEvents = {
        Pending: { key: "Pending" },
        Packaged: { key: "Packaged" },
        Delivering: { key: "Delivering" },
        Received: { key: "Received" },
        Cancelled: { key: "Cancelled" },
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        } else {
            console.log("No user data found in localStorage.");
        }
    });
    
    const handleTabClick = (tab) => {
        setActiveTab(tab.id);
        setIsContactUsVisible(tab.id === "contactUs");
    };

    const getStatusCount = (statusKey) => {
        return statusCounts[statusEvents[statusKey]?.key] || "";
    };

    return (
        <MainLayout title="Profile">
            <div className="max-w-6xl mx-auto mt-10 my-12 px-4">
                <div className="flex justify-center mb-8">
                    <h1 className="font-semibold text-3xl">
                        {tabs.find((tab) => tab.id === activeTab)?.label}
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-gray-50 border rounded-lg shadow-sm p-4">
                            <ul className="divide-y divide-gray-100">
                                {tabs.map((tab) => (
                                    <li
                                        key={tab.id}
                                        className={`list-none py-3 cursor-pointer transition-colors duration-200 hover:text-red-700 ${activeTab === tab.id ? "text-red-700 font-medium" : ""
                                            }`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full">
                        {/* Show Account Info */}
                        {activeTab === "account" && (
                            <div className="md:w-3/4">
                                <div className="bg-gray-50 border rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-semibold mb-6">Account Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-gray-500">
                                                Name :
                                                <span className="text-gray-600">
                                                    { user.user.username }
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">
                                                Email : <span className="text-gray-600">{ user.user.email }</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">
                                                Phone :
                                                {/* <span className="text-gray-600">{ user.user.phone }</span> */}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border rounded-lg mt-6 shadow-sm p-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold mb-6">My Address</h2>
                                        <button className="text-red-700 text-sm font-sans mb-6">Add Address</button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-gray-500">
                                                Address :
                                                <span className="text-gray-600">
                                                    {/* {user.user.address} {user.user.province} {user.user.district} {user.user.subdistrict} {user.user.postcode} */}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Show Order History */}
                        {activeTab === "orderHistory" && (
                            <div className="w-4/5">
                                <div className="space-y-4">
                                    <ul className="w-full flex bg-gray-50 border gap-4 rounded-lg whitespace-nowrap justify-between font-semibold p-2 px-4 m-0 text-center">
                                        {orderStatuses.map((status, index) => (
                                            <li
                                                key={index}
                                                className={`py-2 list-none cursor-pointer ${activeOrderStatus === status.key
                                                        ? "border-b-3 border-red-700 text-red-700"
                                                        : ""
                                                    }`}
                                                onClick={() => setActiveOrderStatus(status.key)}
                                            >
                                                {status.label} {getStatusCount(status.key)}
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-center">No orders yet</p>
                                </div>
                            </div>
                        )}

                        {/* Show Contact Us */}
                        {activeTab === "contactUs" && (
                            <div className="md:w-3/4">
                                <div className="bg-gray-50 border rounded-lg shadow-sm py-6 px-12">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <img
                                            src="https://www.washworldproducts.com/img/linead.jpg"
                                            alt="Contact via Line"
                                            className="w-32 h-32 border"
                                        />
                                        <h3 className="text-xl font-semibold">Need Help?</h3>
                                        <p className="text-gray-600">You can contact us via Line</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProfilePage;
