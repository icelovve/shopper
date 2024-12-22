import { useState, useEffect } from 'react';  
import Script from 'react-load-script';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';
import { useParams } from 'react-router-dom';  
import PropTypes from 'prop-types';


const PayCreditCard = (props) => {
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
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: [],
        });
    };

    const omiseCardHandler = () => {
        if (!OmiseCard || !product) { 
            console.error('OmiseCard or product is not initialized.');
            return;
        }

        const { total, createCreditCard } = props;
        OmiseCard.open({
            amount: Math.round(total * 100),
            onCreateTokenSuccess: (token) => {
                console.log('Token created:', token);
                createCreditCard(product.title, total, token); 
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
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="size-6"
                        >
                            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                            <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                        </svg>
                        <p className='ml-4'>Pay with Credit Card</p>
                    </div>
                </button>
            </form>
        </div>
    );
};

PayCreditCard.propTypes = {
    total: PropTypes.number.isRequired,
    createCreditCard: PropTypes.func.isRequired,
};


export default PayCreditCard;