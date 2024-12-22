import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../data/productsSlice";

const ProductList = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <div className="w-full text-center mt-10">Loading products...</div>;
    }

    if (status === 'failed') {
        return <div className="w-full text-center mt-10 text-red-500">Error: {error}</div>;
    }

    if (!items.length) {
        return <div className="w-full text-center mt-10">No products available.</div>;
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    return (
        <div className="w-4/6 mx-auto mt-8 p-6">
            <div className="flex justify-center">
                <h2 className="text-lg text-red-700">ALL PRODUCT</h2>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                {items.length > 0 ? (
                    items.map((product) => (
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
                                <h3 className="truncate text-sm text-gray-900">
                                    {product.title}
                                </h3>
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
                                                className={`w-4 h-4 ${i < Math.round(product.rating_rate) ? "text-yellow-300" : "text-gray-200"}`}
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
                                            <path
                                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))) : (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 flex items-center justify-center">
                        <p className="text-center text-gray-700 text-sm">Product not found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductList