import Script from 'react-load-script';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';


const PayInternetBanking = (props) => {
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
            otherPaymentMethods: [],
        });
    };

    const omiseCardHandler = () => {
        if (!OmiseCard || !product) {
            console.error('OmiseCard or product is not initialized.');
            return;
        }

        const { total, createInternetBanking } = props;
        OmiseCard.open({
            amount: Math.round(total * 100),
            onCreateTokenSuccess: (token) => {
                console.log('Token created:', token);
                createInternetBanking(product.title, total, token, product.id);
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
                    className="w-full text-gray-800 hover:text-white border border-gray-300 hover:bg-red-700 focus:outline-none focus:ring-red-700 font-medium text-sm px-3.5 py-1.5 text-center me-2 rounded-md"
                    onClick={handleClick}
                >
                    <div className='flex justify-start'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="size-6" 
                            viewBox="0 0 20 20"
                            strokeWidth={1.5}
                        >
                            <path 
                                fill="currentColor" 
                                d="M10 2L3 6v1h14V6zM5 8l-.2 7h2.5L7 8zm4 0l-.2 7h2.5L11 8zm4 0l-.2 7h2.5L15 8zM3 18h14v-2H3z"
                            />
                        </svg>
                        <p className='ml-4'>Pay with Internet Banking</p>
                    </div>
                </button>
            </form>
        </div>
    );
}

PayInternetBanking.propTypes = {
    total: PropTypes.number.isRequired,
    createInternetBanking: PropTypes.func.isRequired,
};

export default PayInternetBanking;