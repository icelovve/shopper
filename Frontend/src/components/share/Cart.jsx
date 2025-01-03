import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../data/productsSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.products.cart);
    const [isOpen, setIsOpen] = useState(true);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleClose = () => {
        setIsOpen(false);
    };

    const removeItem = (id) => {
        dispatch(removeFromCart({ id })); 
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-lg h-4/6 bg-white shadow-lg rounded-3xl p-6 relative flex flex-col">
                <div className="flex justify-end">
                    <button onClick={handleClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-700 float-right"
                            viewBox="0 0 320.591 320.591"
                        >
                            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                        </svg>
                    </button>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mt-2">Shopping Cart</h4>
                <hr className="my-4 border-gray-200" />
                <div className="space-y-4 mt-6 overflow-y-auto flex-1 px-1.5">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex flex-wrap items-center justify-between">
                                <div className="flex items-center">
                                    <img src={item.img} className="w-16 h-16 p-2 shrink-0 rounded-md" />
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-800 truncate w-60 overflow-hidden">{item.name}</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {item.quantity} Item{item.quantity > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-base font-bold text-gray-800 mr-4">
                                        ฿ {parseFloat(item.price).toFixed(2)}
                                    </span>
                                    <button onClick={() => removeItem(item.id)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-[18px] fill-red-700 hover:fill-red-950 inline cursor-pointer"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-xs">No item in the cart</p>
                    )}

                </div>
                <div className="flex mt-6">
                    <span className="text-base font-bold text-gray-800 flex-1">Total</span>
                    <span className="text-base font-bold text-gray-800">฿{parseFloat(total).toFixed(2)}</span>
                </div>
                <div className="flex max-sm:flex-col gap-4 mt-6 justify-center">
                    <Link to='/' className="w-full" onClick={handleClose}>
                        <button 
                            type="button" className="text-sm px-5 py-2.5 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md tracking-wide">Continue Shopping</button>
                    </Link>
                    <Link to="/payment" className="w-full">
                        <button type="button" className="text-sm px-5 py-2.5 w-full bg-red-700 hover:bg-red-800 text-white rounded-md tracking-wide">Payment</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;