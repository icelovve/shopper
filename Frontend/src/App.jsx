import Home from "./pages/ClientView/Home";
import DisplayProduct from "./pages/ClientView/DisplayProduct";
import ProductPage from "./pages/ClientView/ProductPage";
import PaymentPage from "./pages/ClientView/PaymentPage";
import ErrorPage from "./pages/ClientView/ErrorPage";
import LoginPage from "./pages/LoginView/LoginPage";
import ContactPage from "./pages/ClientView/ContactPage";
import PaymentSuccess from "./pages/ClientView/PaymentSuccess";
import AdminPage from "./pages/AdminView/AdminPage";
import AdminProduct from "./pages/AdminView/AdminProduct";
import AdminProductView from './pages/AdminView/AdminProductView';
import RegisterPage from "./pages/LoginView/RegisterPage";
import ProfilePage from "./pages/ClientView/ProfilePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <GoogleOAuthProvider ClientId="88898713687-973fi9pi8h8p73jtg2lis811nmk17nae.apps.googleusercontent.com">
            <BrowserRouter
                future={{
                    v7_relativeSplatPath: true,
                }}
            >
                <Routes>

                    {/* Home Page */}
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Home />} />

                    {/* Product List */}
                    <Route path="/product-list" element={<ProductPage />} />

                    {/* Display Product */}
                    <Route path="/product/:id" element={<DisplayProduct />} />

                    {/* Payment */}
                    <Route path="/product/:id/payment" element={<PaymentPage />} />
                    
                    {/* Login */}
                    <Route path="/login" element={<LoginPage />} />
                    
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Contact */}
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Profile */}
                    <Route path="/profile" element={<ProfilePage/>} />

                    {/* Payment successful */}
                    <Route path="product/:id/payment/payment-success" element={<PaymentSuccess />} />
                    
                    {/* ERROR 404 */}
                    <Route path="*" element={<ErrorPage />} />
                    
                    {/* Admin View */}
                    <Route path="/admin-dashboard" element={<AdminPage />} />
                    <Route path="/admin-product" element={<AdminProduct />} />
                    <Route path="/admin-product/:id" element={<AdminProductView />} />
                    
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;