import Script from 'react-load-script';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../data/productsSlice';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';


const MobileBanking = (props) => {
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
            defaultPaymentMethod: 'mobile_banking',
            otherPaymentMethods: [],
        });
    };

    const omiseCardHandler = () => {
        if (!OmiseCard || !product) {
            console.error('OmiseCard or product is not initialized.');
            return;
        }
    
        const { total, createMobileBanking } = props;
        OmiseCard.open({
            amount: Math.round(total * 100),
            onCreateTokenSuccess: (token) => {
                console.log('Token created:', token);
                createMobileBanking(product.title, total, token, product.id)
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        <p className='ml-4'>Pay with Mobile Banking</p>
                    </div>
                </button>
            </form>
        </div>
    );
}

MobileBanking.propTypes = {
    total: PropTypes.number.isRequired,
    createMobileBanking: PropTypes.func.isRequired,
};

export default MobileBanking;