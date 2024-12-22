import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addToCart } from "../data/productsSlice";
import MainLayout from "../components/layout/MainLayout";

const DisplayProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { items: products, status, error } = useSelector((state) => state.products);
    const product = products.find((item) => item.id === parseInt(id));
    const [clicked,setClicked] = useState(false);

    useEffect(() => {
        if (!products.length) {
            console.log("Fetching products...");
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    // Debugging information
    useEffect(() => {
        console.log("Product ID:", id);
        console.log("Products:", products);
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
                         <div className="mt-6  flex justify-center-start max-w-xs">
                            {/* Add to cart */}
                            <button
                                type="button"
                                className={`w-full flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 button ${clicked ? "clicked" : ""}`}
                                onClick={handleAddToCart}
                            >
                                <svg
                                    className="h-6 w-6 mr-2 cart"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 28 28"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={9} cy={19} r={2} />
                                    <circle cx={17} cy={19} r={2} />
                                    <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
                                </svg>
                                <span className="add-to-cart">Add to Cart</span>
                            </button>
                            {/* Buy now Product */}
                            <Link
                                to={`/product/${product.id}/payment`}
                                className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 me-2 mb-2"
                            >
                                <button type="button" onClick={scrollToTop} className=" font-medium text-sm w-full">Buy Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DisplayProduct;