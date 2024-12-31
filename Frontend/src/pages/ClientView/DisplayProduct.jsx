import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addToCart } from "../../data/productsSlice";
import MainLayout from "../../components/layout/MainLayout";

const DisplayProduct = () => {
    const [user, setUser] = useState('');
    const dispatch = useDispatch();
    const { id } = useParams();
    const { items: products, status, error } = useSelector((state) => state.products);
    const product = products.find((item) => item.id === parseInt(id));
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (!products.length) {
            console.log("Fetching products...");
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        } else {
            console.log("No user data found in localStorage.");
        }
    }, []);

    useEffect(() => {
        console.log("Product ID:", id);
        console.log("Selected Product:", product);
    }, [products, id, product]);

    if (status === "loading") {
        return <div className="w-full text-center mt-10">Loading products...</div>;
    }

    if (status === "failed") {
        return <div className="w-full text-center mt-10 text-red-500">Error: {error}</div>;
    }

    if (!product) {
        return <p className="text-center mt-12 text-lg font-semibold">Product not found.</p>;
    }

    const handleAddToCart = () => {
        setClicked(true);
        if (product) {
            dispatch(addToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                img: product.image,
            }));
        }
        setTimeout(() => {
            setClicked(false);
        }, 700);
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "auto" });

    return (
        <MainLayout title={product.title}>
            <div className="pt-12 mx-8 md:mx-32">
                {/* Breadcrumb */}
                <nav className="font-medium text-sm mb-6">
                    <Link to="/" className="hover:text-red-700">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/product-list" className="hover:text-red-700">Product</Link>
                    <span className="mx-2">/</span>
                    <span>{product.title}</span>
                </nav>

                {/* Product Container */}
                <div className="bg-white border rounded-md p-14 md:flex items-center space-y-8 md:space-y-0 mt-10">
                    <div className="flex-shrink-0 p-8 transition-transform duration-300 hover:scale-110">
                        <img src={product.image} alt={product.title} className="h-72 w-72 object-contain" />
                    </div>
                    <div className="text-left md:ml-12">
                        <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                        <div className="flex items-center mt-3">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.round(product.rating_rate) ? "text-yellow-300" : "text-gray-200"}`}
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M11 0L13.09 7.36H21L14.47 11.74L16.55 19.1L11 14.73L5.45 19.1L7.53 11.74L1 7.36H8.91L11 0Z" />
                                </svg>
                            ))}
                            <span className="ml-3 text-sm bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded">
                                {product.rating_rate.toFixed(1)}
                            </span>
                        </div>
                        <h2 className="text-3xl font-semibold text-red-600 mt-4">฿ {parseFloat(product.price).toFixed(2)}</h2>
                        <p className="text-gray-700 mt-4">Category: <span className="text-blue-600 font-medium">{product.category}</span></p>
                        <p className="text-gray-600 mt-4">{product.description}</p>
                        <p className="mt-4 text-green-600 font-semibold">In Stock: {product.rating_count}</p>
                        {/* Add to cart and buy product */}
                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8 w-80">
                            <button
                                type="button"
                                className={`flex items-center w-full h-10 justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 button ${clicked ? "clicked" : ""}`}
                                role="button"
                                onClick={handleAddToCart}
                                disabled={user.email === 'admin@gmail.com'}
                            >
                                <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                </svg>
                                Add to Cart
                            </button>
                            <Link
                                to={user.email !== 'admin@gmail.com' ? `/product/${product.id}/payment` : "#"}
                                title
                                className={`text-white w-full h-10 bg-red-700 mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center ${user.email === 'admin@gmail.com' ? 'cursor-not-allowed opacity-50' : ''}`}
                                role="button"
                                onClick={user.email !== 'admin@gmail.com' ? scrollToTop : (e) => e.preventDefault()}
                            >
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DisplayProduct;