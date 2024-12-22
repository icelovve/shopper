import { useState } from "react";
import PropTypes from "prop-types";

const NewProduct = ({ createAddProduct, onClose }) => {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        description: "",
        category: "",
        price: "",
        ratingRate: "",
        ratingCount: "",
    });

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle file input for image
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    // Save
    const handleSave = async () => {
        const { image, title, description, category, price, ratingRate, ratingCount } = formData;
        try{
            await createAddProduct(image, title, description, category, price, ratingRate, ratingCount);
            onClose();
        }catch(err){
            console.log(err);
            
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-[1000] bg-black bg-opacity-50 overflow-auto font-sans">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-3xl p-6 relative flex flex-col space-y-4">
                <h4 className="text-lg font-semibold text-center text-gray-800 mt-2">
                    Add New Product
                </h4>
                <hr className="my-4 border-gray-200" />
                <div className="space-y-2">
                    {/* Image Input */}
                    <input
                        type="file"
                        className="block w-full text-sm text-gray-900 border-gray-300 rounded-lg bg-gray-50 p-2 cursor-pointer"
                        onChange={handleFileChange}
                    />

                    {/* Title Input */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Category and Price Inputs */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input
                                type="number"
                                name="price"
                                min = '0'
                                value={formData.price}
                                onChange={handleChange}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Rating Inputs */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Rating</label>
                            <input
                                type="number"
                                name="ratingRate"
                                min = '0'
                                max='5'
                                value={formData.ratingRate}
                                onChange={handleChange}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                            <input
                                type="number"
                                name="ratingCount"
                                min = '0'
                                value={formData.ratingCount}
                                onChange={handleChange}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="mt-6 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition w-20"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        className="mt-6 bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition w-20"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

NewProduct.propTypes = {
    createAddProduct: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NewProduct;