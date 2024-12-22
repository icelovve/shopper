import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const ErrorPage = () => {
    let text = "Oops! The page you're looking for doesn't exist."
    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-red-700 font-extrabold text-6xl">404</h1>
                <p className="text-gray-700 font-medium text-xl mt-4">{text}</p>
                <Link 
                    to="/" 
                    className="mt-6 px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
                >
                    Go Back to Home
                </Link>
            </div>
        </MainLayout>
    );
};

export default ErrorPage;