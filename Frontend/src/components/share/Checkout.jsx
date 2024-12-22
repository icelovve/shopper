import Script from 'react-load-script';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Checkout = (props) => {
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

    const internetBankingConfigure = () => {
        if (!OmiseCard) {
            console.error('OmiseCard is not initialized.');
            return;
        }
        OmiseCard.configure({
            defaultPaymentMethod: 'internet_banking',
            otherPaymentMethods: ['credit_card','mobile_banking_kbank','mobile_banking_ktb	','mobile_banking_bbl','mobile_banking_bay','mobile_banking_scb','promptpay'],
        });
    };

    const omiseCardHandler = () => {
        if (!OmiseCard || !product) {
            console.error('OmiseCard or product is not initialized.');
            return;
        }

        const { total, createInternetBanking ,createCreditCard,createPromptPay} = props;
        OmiseCard.open({
            amount: Math.round(total * 100),
            onCreateTokenSuccess: (token) => {
                console.log('Token created:', token);
                createInternetBanking(product.title, total, token, product.id);
                createPromptPay(product.title, total, token); 
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
            internetBankingConfigure();
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
                    id="internet-banking"
                    type="button"
                    className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:outline-none focus:ring-red-700 font-medium text-sm px-3.5 py-2 text-center me-2 rounded-md"
                    onClick={handleClick}
                >
                    <div className='flex justify-start'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" 
                            />
                        </svg>    
                        <p className='ml-4'>Continue to Payment</p>
                    </div>
                </button>
            </form>
        </div>
    );
}

Checkout.propTypes = {
    total: PropTypes.number.isRequired,
    createInternetBanking: PropTypes.func.isRequired,
    createCreditCard: PropTypes.func.isRequired,
    createPromptPay: PropTypes.func.isRequired,
};

export default Checkout;