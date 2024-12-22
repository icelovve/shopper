import { useState, useEffect } from 'react';  
import Script from 'react-load-script';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';
import { useParams } from 'react-router-dom';  
import PropTypes from 'prop-types';


const PayPromptPay = (props) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [OmiseCard, setOmiseCard] = useState(null);

    const dispatch = useDispatch();
    const { id } = useParams();
    const { items: products } = useSelector((state) => state.products);
    
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);
    
    const product = products.find((item) => item.id === parseInt(id));
    
    const handleLoadScript = () => {
        if (window.OmiseCard) {
            setOmiseCard(window.OmiseCard);
            window.OmiseCard.configure({
                publicKey: 'pkey_test_61v0z3i9yp7fkkgn5ow',
                currency: 'THB',
                frameLabel: 'SHOPPER',
                submitLabel: 'PAY NOW',
                buttonLabel: 'Pay with Omise',
            });
            setIsScriptLoaded(true);
        }
    };

    const creditCardConfigure = () => {
        if (!OmiseCard) {
            console.error('OmiseCard is not initialized.');
            return;
        }
        OmiseCard.configure({
            defaultPaymentMethod: 'promptpay',
            otherPaymentMethods: [],
        });
    };

    const omiseCardHandler = () => {
        if (!OmiseCard || !product) { 
            console.error('OmiseCard or product is not initialized.');
            return;
        }

        const { total, createPromptPay } = props;
        OmiseCard.open({
            amount: Math.round(total * 100),
            onCreateTokenSuccess: (token) => {
                console.log('Token created:', token);
                createPromptPay(product.title, total, token); 
            },
            onFormClosed: () => {
                console.log('Payment form closed.');
            },
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (isScriptLoaded && OmiseCard) {
            creditCardConfigure();
            omiseCardHandler();
        } else {
            console.error('OmiseCard script not loaded or initialized.');
        }
    };

    return (
        <div className="own-form">
            <Script
                url="https://cdn.omise.co/omise.js"
                onLoad={handleLoadScript}
                onError={() => console.error('Failed to load Omise script.')}
            />
            <form>
                <button
                    id="credit-card"
                    type="button"
                    className="w-full text-gray-800 hover:text-white border border-gray-300 hover:bg-red-700 focus:outline-none focus:ring-red-700 font-medium text-sm px-3.5 py-1.5 text-center me-2 rounded-md"
                    onClick={handleClick}
                >
                    <div className='flex justify-start'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="size-6"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" 
                            />
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                             />
                        </svg>
                        <p className='ml-4'>Pay with PromptPay</p>
                    </div>
                </button>
            </form>
        </div>
    );
};

PayPromptPay.propTypes = {
    total: PropTypes.number.isRequired,
    createPromptPay: PropTypes.func.isRequired,
};


export default PayPromptPay;