import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DisplayProduct from "./pages/DisplayProduct";
import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PaymentSuccess from "./pages/PaymentSuccess";

const App = () => {
    return (
        <GoogleOAuthProvider ClientId="88898713687-973fi9pi8h8p73jtg2lis811nmk17nae.apps.googleusercontent.com">
            <BrowserRouter
                future={{
                    v7_relativeSplatPath: true,
                }}
            >
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Home />} />
                    <Route path="/product-list" element={<ProductPage />} />

                    {/* Display Product */}
                    <Route path="/product/:id" element={<DisplayProduct />} />

                    {/* Payment */}
                    <Route path="/product/:id/payment" element={<PaymentPage />} />
                    
                    {/* Login */}
                    <Route path="/login" element={<LoginPage />} />\
                    
                    {/* Contact */}
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Payment successful */}
                    <Route path="product/:id/payment/payment-success" element={<PaymentSuccess />} />
                    
                    {/* ERROR 404 */}
                    <Route path="*" element={<ErrorPage />} />
                    
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;
