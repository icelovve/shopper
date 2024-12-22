import Script from 'react-load-script';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';


const PayTrueMoney = (props) => {
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
            defaultPaymentMethod: 'truemoney',
            otherPaymentMethods: [],
        });
    };

    const omiseCardHandler = () => {
        if (!OmiseCard || !product) {
            console.error('OmiseCard or product is not initialized.');
            return;
        }
    
        const { total, createTrueMoney } = props;
        OmiseCard.open({
            amount: Math.round(total * 100),
            onCreateTokenSuccess: (token) => {
                console.log('Token created:', token);
                createTrueMoney(product.title, total, token, product.id)
                    .catch((error) => console.error('Payment creation failed:', error));
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className='ml-4'>Pay with True Money Wallet</p>
                    </div>
                </button>
            </form>
        </div>
    );
}

PayTrueMoney.propTypes = {
    total: PropTypes.number.isRequired,
    createTrueMoney: PropTypes.func.isRequired,
};

export default PayTrueMoney;