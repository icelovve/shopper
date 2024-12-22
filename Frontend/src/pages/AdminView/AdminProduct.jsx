import AdminLayout from "../../components/layout/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../data/productsSlice";
import NewProduct from "../../components/share/NewProduct";
import axios from "axios";
import Swal from "sweetalert2";
import EditProduct from "../../components/share/EditProduct";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const AdminProduct = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedProduct,setSelectedProduct] = useState('');
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState('respectively');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // กรองข้อมูล
    const filteredItems = items.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    // เรียงข้อมูล
    const sortedItems = filteredItems.sort((a, b) => {
        if (sortOrder === "lowToHigh") return a.price - b.price;
        if (sortOrder === "highToLow") return b.price - a.price;
        if (sortOrder === "topRating") return b.rating_rate - a.rating_rate;
        return a.id - b.id; 
    });

    // คำนวณข้อมูลที่จะแสดงในแต่ละหน้า
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedItems.slice(indexOfFirstRow, indexOfLastRow);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            Swal.fire({
                icon: "warning",
                iconColor: '#b91c1c ',
                text: "Please login to access the Admin Products",
                confirmButtonColor: '#b91c1c  '
            }).then(() => {
                navigate("/login");
            });
        }
    }, [navigate]);

    // ฟังก์ชันจัดการหน้า
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleOpenModalAdd = () => {
        setIsModalOpen(true);
    };

    const handleCloseModalAdd = () => {
        setIsModalOpen(false);
    };

    const handleOpenModalEdit = (items) => {
        setSelectedProduct(items);  
        setIsModalEditOpen(true); 
        // console.log('Editing product:', items); // ตรวจสอบข้อมูลสินค้า
    };
    

    const handleCloseModalEdit = () => {
        setIsModalEditOpen(false);
    }

    if (status === 'failed') {
        return <div className="w-full text-center mt-10 text-red-500">Error: {error}</div>;
    }

    if (!items.length) {
        return <div className="w-full text-center mt-10">No products available.</div>;
    }

    const createAddProduct = async (image, title, description, category, price, rating_rate, rating_count) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("rating_rate", rating_rate);
        formData.append("rating_count", rating_count);

        try {
            const res = await axios.post('http://localhost:3000/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            await Swal.fire({
                title: "Add New Product Success!",
                text: "New products added.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });

            console.log(res.data.data);
        } catch (e) {
            console.error("Error in creating product:", e.response ? e.response.data : e.message);
        }
    };

    const createEditProduct = async (id, formData) => {
        try {
            const formDataObject = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key] !== undefined) {
                    formDataObject.append(key, formData[key]);
                }
            }
    
            const res = await axios.put(`http://localhost:3000/product/${id}`, formDataObject, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log(res.data);
    
            await Swal.fire({
                title: "Update Product Success!",
                text: "Update products.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (e) {
            console.error("Error in Edit product:", e.response ? e.response.data : e.message);
        }
    };
    
    const handleDeleteProduct = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                iconColor: '#b91c1c',
                showCancelButton: true,
                confirmButtonColor: "#b91c1c",
                cancelButtonColor: "#9ca3af",
                confirmButtonText: "Yes, delete",
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`http://localhost:3000/product/${id}`);
                if (response.status === 200) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    dispatch(fetchProducts());
                }
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
            Swal.fire({
                title: "Error",
                text: "There was an error deleting the product. Please try again later.",
                icon: "error",
            });
        }
    };
    
    return (
        <AdminLayout title='Product Management'>
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
                    <Link to="/admin-dashboard" className="hover:text-red-700 font-bold">Dashboard</Link>
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
                    <Link to="#" className="font-bold">Product Management</Link>
                </nav>

                {/* Main Content */}
                <div className="w-full">
                    <h1 className="font-bold text-2xl mb-6">Product Management</h1>
                    <div className="flex justify-between items-center w-full">
                        {/* Search Form */}
                        <form className="w-full max-w-lg">
                            <label htmlFor="default-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full py-2.5 pl-10 pr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search for products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </form>

                        {/* Add New Product Button */}
                        <button onClick={handleOpenModalAdd} className="bg-red-700 text-white py-2.5 px-4 rounded-md hover:bg-red-800 flex items-center">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 16 16" 
                                fill="currentColor" 
                                className="size-4 mr-1.5"
                            >
                                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                            </svg>
                            Add new product
                        </button>
                    </div>

                    {/* Product Sort By... */}
                    <div className="flex justify-end mt-6">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Sort By
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {[
                                        { label: 'Respectively', value: 'respectively' },
                                        { label: 'Top Rating', value: 'topRating' },
                                        { label: 'Price Low to High', value: 'lowToHigh' },
                                        { label: 'Price High to Low', value: 'highToLow' },
                                    ].map(({ label, value }, index) => (
                                        <MenuItem key={index}>
                                            <a
                                                href="#"
                                                onClick={() => setSortOrder(value)}
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                            >
                                                {label}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

                    {/*  Product Table */}
                    <div className="relative overflow-x-auto border sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-white border-b">
                                <tr className="text-center">
                                    <th scope="col" className="px-6 py-5" width='6%'>ID</th>
                                    <th scope="col" className="px-6 py-5" width='7%'>Image</th>
                                    <th scope="col" className="px-6 py-5" width='35%'>Title</th>
                                    <th scope="col" className="px-6 py-5" width='13%'>Category</th>
                                    <th scope="col" className="px-6 py-5" width='11%'>Price</th>
                                    <th scope="col" className="px-6 py-5" width='7%'>Rating</th>
                                    <th scope="col" className="px-6 py-5" width='7%'>Quantity</th>
                                    <th scope="col" className="px-6 py-5" width='12%'>Action</th>
                                    <th scope="col" className="px-6 py-5" width='2%'>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((product) => (
                                    <tr key={product.id} className="bg-white border-b">
                                        <td className="px-6 py-4 text-center">{product.id}</td>
                                        <td className="px-6 py-4 text-center">
                                            <img src={product.image} alt={product.title} className="w-14 h-14 object-contain " />
                                        </td>
                                        <td className="px-6 py-4">{product.title}</td>
                                        <td className="px-6 py-4 text-center">{product.category}</td>
                                        <td className="px-6 py-4 text-center">฿{product.price}</td>
                                        <td className="px-6 py-4 text-yellow-400 mt-5 flex items-center text-center">
                                            {product.rating_rate}
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M11 0L13.09 7.36H21L14.47 11.74L16.55 19.1L11 14.73L5.45 19.1L7.53 11.74L1 7.36H8.91L11 0Z" />
                                            </svg>
                                        </td>
                                        <td className="px-6 py-4 text-center">{product.rating_count}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700" 
                                                onClick={() => handleOpenModalEdit(product)} // ส่ง product ไป
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="text-red-700 hover:text-red-800 ml-2" 
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center hover:text-gray-800">
                                            <Link 
                                                // to={`/admin-product/${product.id}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                        <select onChange={handleRowsPerPageChange} value={rowsPerPage} className="border p-2">
                            {[5,10, 20, 50, 100].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <div className="flex space-x-2">
                            {Array.from({ length: Math.ceil(filteredItems.length / rowsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-2.5 py-1.5 rounded ${currentPage === index + 1 ? "bg-red-700 text-white" : "bg-gray-200 border"
                                        }`}
                                >
                                    {index + 1}
                                </button> 
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Component ADD and EDIT Product */}
            {isModalOpen && (
                <NewProduct 
                    createAddProduct={createAddProduct} 
                    onClose={handleCloseModalAdd} 
                />
            )}
            {isModalEditOpen && (
                <EditProduct
                    items={selectedProduct}  
                    createEditProduct={createEditProduct} 
                    onClose={handleCloseModalEdit}
                />
            )}
        </AdminLayout>
    );
};

export default AdminProduct;