import DocumentTitle from 'react-document-title'
import Navbar from '../share/Navbar'
import Footer from '../share/Footer'
import BackToTop from '../share/BackToTop'
import Cart from '../share/Cart'
import { useState } from 'react'
import PropTypes from 'prop-types';

const MainLayout = ({ children, title }) => {
	const [showCart, setShowCart] = useState(false);

	const toggleCart = () => {
		setShowCart((prev) => !prev);
	};

	return (
		<DocumentTitle title={`${title}`}>
			<div className='flex flex-col min-h-screen'>
				<header>
					<Navbar toggleCart={toggleCart} showCart={showCart} />
				</header>
				<main className='flex-grow bg-gray-50 pt-20 pb-12'>
					{children}
					{showCart && <Cart />}
					<BackToTop />
				</main>
				<footer>
					<Footer />
				</footer>
			</div>
		</DocumentTitle>
	)
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default MainLayout