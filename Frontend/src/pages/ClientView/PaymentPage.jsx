import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';
import MainLayout from "../../components/layout/MainLayout";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PayPromptPay from '../../components/share/PayPromptPay';
import PayCreditCard from '../../components/share/PayCreditCard';
import PayInternetBanking from '../../components/share/PayInternetBanking';
import PayTrueMoney from '../../components/share/PayTrueMoney';
import MobileBanking from '../../components/share/MobileBanking';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { items: products, status, error } = useSelector((state) => state.products);
    const [count, setCount] = useState(1);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        setIsAuthenticated(isLoggedIn === "true");
    });

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }

        if (!products.length) {
            console.log("Fetching products...");
            dispatch(fetchProducts());
        }

        if (paymentSuccess) {
            setTimeout(() => {
                navigate(`/product/${id}/payment/payment-success`);
            }, 2000)
        }

    }, [dispatch, products.length, paymentSuccess, navigate, id]);

    if (status === "loading") {
        return <div className="w-full text-center mt-10">Loading products...</div>;
    }

    if (status === "failed") {
        return <div className="w-full text-center mt-10 text-red-500">Error: {error}</div>;
    }

    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return (
            <MainLayout title="Payment">
                <div className="pt-12 text-center text-gray-700">
                    <h2 className="text-xl font-bold">Product not found</h2>
                    <Link to="/" className="text-red-700 hover:underline">
                        Return to Home
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const maxCount = product?.rating_count
    const plusProduct = () => count < maxCount && setCount((prevCount) => prevCount + 1);
    const minusProduct = () => count > 1 && setCount((prevCount) => prevCount - 1);

    const shipping = 35;
    const tax = ((parseFloat(product.price) / 100) * 0) * count;
    const discount = 0;
    const total = ((parseFloat(product.price)) * count) + shipping + tax - discount;

    const handlePriceChange = () => {
        if (total < 20) {
            alert('Please purchase products over ฿20')
        }
    }

    const createCreditCard = async (name, total, token) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/checkout-credit-card',
                data: {
                    token,
                    productId: product.id,
                    name,
                    count,
                    total
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                setPaymentSuccess(true);
            }

        } catch (error) {
            console.error('Credit card creation error:', error);
        }
    }

    const createInternetBanking = async (name, total, token) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/checkout-internet-banking',
                data: {
                    token,
                    productId: product.id,
                    name,
                    count,
                    total
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { authorizeUri } = res.data;
            if (authorizeUri) {
                window.location.href = authorizeUri;
            }

            if (res.status === 200) {
                setPaymentSuccess(true);
            }
        } catch (error) {
            console.error('Internet banking creation error:', error);
        }
    };

    const createPromptPay = async (name, total, token) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/checkout-prompt-pay',
                data: {
                    token,
                    name,
                    total
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { scannable_code } = res.data;
            if (scannable_code) {

                //window.location.href = scannable_code

                // สร้าง popup ขนาด 400x400 และแสดง QR Code
                const popup = window.open('', 'QR Code', 'width=400,height=400');
                popup.document.body.innerHTML = `
                    <h2 style="text-align: center;">Scan QR Code</h2>
                    <img src="${scannable_code}" alt="QR Code" style="display: block; margin: 0 auto; max-width: 100%;" />
                `;
            }

        } catch (error) {
            console.error('Prompt pay creation error:', error);
        }
    };

    const createTrueMoney = async (name, total, token) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/checkout-true-money',
                data: {
                    token,
                    name,
                    total
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { authorizeUri } = res.data;
            if (authorizeUri) {
                window.location.href = authorizeUri;
            }

        } catch (error) {
            console.error('True money creation error:', error);
        }
    };

    const createMobileBanking = async (name, total, token) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/checkout-mobile-banking',
                data: {
                    token,
                    productId: product.id,
                    name,
                    count,
                    total
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { authorizeUri } = res.data;
            if (authorizeUri) {
                window.location.href = authorizeUri;
            }

            if (res.status === 200) {
                setPaymentSuccess(true);
            }
        } catch (error) {
            console.error('Mobile banking creation error:', error);
        }
    };

    return (
        <MainLayout title={`Payment - ${product.title}`}>
            <div className="pt-12">
                {/* Breadcrumbs */}
                <div className="ml-32 font-medium w-1/6">
                    <Link to="/" className="text-sm hover:text-red-700">Home</Link>
                    <span className="mx-2 font-bold">/</span>
                    <Link to="/product-list" className="text-sm hover:text-red-700">Product</Link>
                    <span className="mx-2 font-bold">/</span>
                    <Link
                        to={`/product/${product.id}`}
                        className="text-sm hover:text-red-700 truncate w-32 overflow-hidden"
                    >
                        {product.title}
                    </Link>
                    <span className="mx-2 font-bold">/</span>
                    <span className="mx-2">Payment</span>
                </div>

                {/* Main Content */}
                <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto mt-12">
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Checkout Section */}
                        <div className="md:col-span-2 bg-white border p-7 rounded-md">
                            <h2 className="text-2xl font-bold text-gray-800">CHECKOUT</h2>
                            <hr className="border-gray-300 mt-4 mb-8" />
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <div className="col-span-2 flex items-center gap-4">
                                        <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                            <img src={product.image} className="w-full h-full object-contain" alt={product.title} />
                                        </div>
                                        <div className="w-96">
                                            <h3 className="text-base font-bold text-gray-800 truncate overflow-hidden">{product.title}</h3>
                                            <h6 className="text-xs text-red-500 cursor-pointer mt-0.5">Remove</h6>
                                            <div className="flex gap-4 mt-4">
                                                <button
                                                    type="button"
                                                    className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-2.5 fill-current"
                                                        viewBox="0 0 124 124"
                                                        onClick={minusProduct}
                                                    >
                                                        <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                                                    </svg>
                                                    <span className="mx-2.5">{count}</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-2.5 fill-current"
                                                        viewBox="0 0 42 42"
                                                        onClick={plusProduct}
                                                    >
                                                        <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <h4 className="text-lg font-bold text-red-700">฿ {parseFloat(product.price).toFixed(2)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="bg-white border rounded-md p-4 md:sticky top-0">
                            <div className="flex border border-gray-300 hover:bor overflow-hidden rounded-md">
                                <input
                                    type="email"
                                    placeholder="Promo code"
                                    className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
                                />
                                <button type="button" className="flex items-center justify-center font-semibold tracking-wide bg-gray-800 px-4 text-sm text-white">
                                    Apply
                                </button>
                            </div>
                            <ul className="text-gray-800 mt-8 space-y-4">
                                <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">฿{discount.toFixed(2)}</span></li>
                                <li className="flex flex-wrap gap-4 text-base">Shipping <span className="ml-auto font-bold">฿{shipping.toFixed(2)}</span></li>
                                {/* <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">฿{tax.toFixed(2)}</span></li> */}
                                <li className="flex flex-wrap gap-4 text-base font-bold ">Total <span className="ml-auto text-xl">฿{total.toFixed(2)}</span></li>
                            </ul>
                            <div
                                className={`mt-8 space-y-2 ${total > 20 && total <= 150000 && isAuthenticated ? '' : 'pointer-events-none opacity-50'}`}
                                onClick={
                                    total > 20 && total <= 150000 && isAuthenticated
                                        ? handlePriceChange
                                        : undefined
                                }
                            >
                                {/* ข้อความแจ้งเตือน */}
                                {total <= 20 && (
                                    <p className="text-xs text-red-700 mb-3">
                                        *Minimum payment amount THB 20.00
                                    </p>
                                )}
                                {total > 150000 && (
                                    <p className="text-xs text-red-700 mb-3">
                                        *Maximum payment amount THB 150,000.00
                                    </p>
                                )}
                                {isAuthenticated === false && (
                                    <p className="text-xs text-red-700 mb-3">
                                        *Please login to proceed with payment
                                    </p>
                                )}

                                {/* การชำระเงิน */}
                                <PayPromptPay
                                    createPromptPay={createPromptPay}
                                    product={product}
                                    total={total}
                                    count={count}
                                />
                                <PayCreditCard
                                    product={product}
                                    total={total}
                                    createCreditCard={createCreditCard}
                                    count={count}
                                />
                                <MobileBanking
                                    product={product}
                                    total={total}
                                    count={count}
                                    createMobileBanking={createMobileBanking}
                                />
                                <PayInternetBanking
                                    product={product}
                                    total={total}
                                    createInternetBanking={createInternetBanking}
                                    count={count}
                                />
                                <PayTrueMoney
                                    createTrueMoney={createTrueMoney}
                                    product={product}
                                    total={total}
                                    count={count}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PaymentPage;