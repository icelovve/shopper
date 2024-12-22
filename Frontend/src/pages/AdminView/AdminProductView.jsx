import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../data/productsSlice";

const AdminProductView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ใช้ useNavigate สำหรับการเปลี่ยนเส้นทาง
    const { id } = useParams();
    const { items: products } = useSelector((state) => state.products);
    const product = products.find((item) => item.id === parseInt(id));

    useEffect(() => {
        if (!products.length) {
            console.log("Fetching products...");
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        console.log("Product ID:", id);
        console.log("Selected Product:", product);
    }, [products, id, product]);

    // ฟังก์ชันสำหรับเปลี่ยน ID
    const handleNavigate = (step) => {
        const newId = parseInt(id) + step;
        if (products.some((item) => item.id === newId)) {
            navigate(`/admin-product/product-view/${newId}`); // เปลี่ยน URL ไปยัง ID ใหม่
        } else {
            alert("ไม่มีสินค้าที่คุณเลือก");
        }
    };
    
    return (
        <AdminLayout title={`ADMIN View : ${product.title}`}>
            <div className="flex flex-col items-center w-full">
                {/* Breadcrumb Navigation */}
                <nav className="font-medium text-sm mb-6 flex items-center space-x-2 w-full">
                    <Link to="/" className="hover:text-red-700 flex items-center font-bold">
                        <svg
                            className="h-6 w-6 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
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
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                    <Link to="/admin-dashboard" className="hover:text-red-700 font-bold">
                        Dashboard
                    </Link>
                    <span className="mx-0">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                    <Link to="/admin-product" className="hover:text-red-700 font-bold">
                        Product Management
                    </Link>
                    <span className="mx-0">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                    <Link to="#" className="font-bold">{product.title}</Link>
                </nav>

                {/* Product Card */}
                <div className="bg-white border rounded-lg w-80 p-4 flex flex-col items-center mt- hover:shadow-lg transition-shadow">
                    <div className="w-full flex-shrink-0 hover:scale-105 transition-transform duration-300">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-contain rounded" />
                    </div>
                    <div className="text-center mt-4">
                        <h1 className="text-lg font-bold text-gray-800">{product.title.slice(0, 20)}...</h1>
                        <div className="flex justify-center items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.round(product.rating_rate) ? "text-yellow-300" : "text-gray-200"}`}
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M11 0L13.09 7.36H21L14.47 11.74L16.55 19.1L11 14.73L5.45 19.1L7.53 11.74L1 7.36H8.91L11 0Z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                                {product.rating_rate.toFixed(1)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{product.description.slice(0, 80)}...</p>
                        <p className="mt-3 text-green-600 font-medium">In Stock: {product.rating_count}</p>
                        <p className="text-xl font-semibold text-red-500 mt-3">
                            ฿ {parseFloat(product.price).toFixed(2)}
                        </p>
                    </div>
                </div>


                {/* Navigation Buttons */}
                <div className="flex justify-center mt-6">
                    <button
                        className="mx-1 px-4 py-2 bg-red-700 rounded hover:bg-red-800 text-white"
                        onClick={() => handleNavigate(-1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>

                    </button>
                    <button
                        className="mx-1 px-4 py-2 bg-red-700 rounded hover:bg-red-700 text-white"
                        onClick={() => handleNavigate(1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProductView;