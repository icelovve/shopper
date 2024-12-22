import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../data/productsSlice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const ProductList = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);
    const [sortOrder, setSortOrder] = useState("respectively");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(25);

    const sortedItems = [...items].sort((a, b) => {
        if (sortOrder === "lowToHigh") {
            return a.price - b.price; // จากราคาต่ำไปสูง
        } else if (sortOrder === "highToLow") {
            return b.price - a.price; // จากราคาสูงไปต่ำ
        } else if (sortOrder === "respectively") {
            return a.id - b.id; // ตาม id
        } else if (sortOrder === "topRating") {
            return b.rating_rate - a.rating_rate; // ดาวสูงไปต่ำ
        }
        return 0;
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedItems.slice(indexOfFirstRow, indexOfLastRow);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === "loading") {
        return <div className="w-full text-center mt-10">Loading products...</div>;
    }

    if (status === "failed") {
        return <div className="w-full text-center mt-10 text-red-500">Error: {error}</div>;
    }

    if (!items.length) {
        return <div className="w-full text-center mt-10">No products available.</div>;
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="w-4/6 mx-auto mt-8 p-6">
            <div className="flex justify-center">
                <h2 className="text-lg text-red-700">ALL PRODUCTS</h2>
            </div>
            <hr className="my-5 border-gray-300" />

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
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
                    >
                        <div className="py-1">
                            {[
                                { label: "Respectively", value: "respectively" },
                                { label: "Top Rating", value: "topRating" },
                                { label: "Price Low to High", value: "lowToHigh" },
                                { label: "Price High to Low", value: "highToLow" },
                            ].map(({ label, value }, index) => (
                                <MenuItem key={index}>
                                    <button
                                        onClick={() => setSortOrder(value)}
                                        className="block px-4 w-full py-2 text-sm text-gray-700 text-start hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                    >
                                        {label}
                                    </button>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                {currentRows.length > 0 ? (
                    currentRows.map((product) => (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            onClick={scrollToTop}
                            className="bg-white shadow-sm border border-gray-100 hover:scale-105 transition-transform duration-200 p-4 flex flex-col"
                        >
                            <img
                                className="m-auto rounded-lg h-32 w-28 p-2 mt-4 text-sm hover:scale-110 transition-transform duration-200"
                                src={product.image}
                                alt={product.title}
                            />
                            <div className="mt-2 flex-grow">
                                <h3 className="truncate text-sm text-gray-900">{product.title}</h3>
                                <div className="mt-1">
                                    <h5 className="font-semibold tracking-tight text-red-700">
                                        ฿ {parseFloat(product.price).toFixed(2)}
                                    </h5>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="flex items-center space-x-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < Math.round(product.rating_rate) ? "text-yellow-300" : "text-gray-200"
                                                }`}
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M11 0L13.09 7.36H21L14.47 11.74L16.55 19.1L11 14.73L5.45 19.1L7.53 11.74L1 7.36H8.91L11 0Z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 cursor-pointer fill-gray-400 inline-block"
                                            viewBox="0 0 68 68"
                                        >
                                            <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 flex items-center justify-center">
                        <p className="text-center text-gray-700 text-sm">Product not found</p>
                    </div>
                )}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center mt-6">
                <div className="flex space-x-2">
                    {Array.from({ length: Math.ceil(items.length / rowsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-2.5 py-1.5 rounded ${currentPage === index + 1 ? "bg-red-700 text-white" : "bg-gray-200"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
