import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            Swal.fire({
                icon: "warning",
                iconColor: "#b91c1c",
                text: "Please login to access the admin panel",
                confirmButtonColor: "#b91c1c"
            }).then(() => {
                navigate("/login");
            });
        }
    }, [navigate]);

    return (
        <AdminLayout title="Dashboard">
            <div className="flex flex-col items-center w-full">
                {/* Breadcrumb Navigation */}
                <nav className="font-medium text-sm mb-6 flex items-center space-x-2 w-full">
                    <Link to="/" className="hover:text-red-700 flex items-center font-bold">
                        <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Home
                    </Link>
                    <span className="mx-0">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                    <Link to="#" className="font-bold">Dashboard</Link>
                </nav>

                {/* Main Content */}
                <div className="w-full">
                    <h1 className="font-bold text-2xl mb-4">Dashboard</h1>
                    <div className="flex justify-between items-center w-full">

                    </div>
                </div>
            </div>
        </AdminLayout>
    );  
}

export default AdminPage;