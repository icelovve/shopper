import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';

const RecommendedProduct = () => {
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
        <div className="w-4/6 mx-auto mt-8 bg-white p-6 border border-gray-200">
            <div className="flex justify-between">
                <h2 className="text-lg text-red-700">RECOMMENDER PRODUCT</h2>
                <Link to='/product-list' className="text-blue-600 flex items-center space-x-1 text-base" onClick={scrollToTop}>
                    <span>See All</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 26 26"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
            <hr className="my-5 border-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {items.length > 0 ? (
                    items.slice(8, 13).map((product) => (
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
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                                        {product.rating_rate.toFixed(1)}
                                    </span>
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

export default RecommendedProduct