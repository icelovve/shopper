import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const EditProduct = ({ items, onClose, createEditProduct }) => {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        description: "",
        category: "",
        price: "",
        rating_rate: "",
        rating_count: "",
    });

    useEffect(() => {
        if (items) {
            setFormData({
                image: items.image || "",
                title: items.title || "",
                description: items.description || "",
                category: items.category || "",
                price: items.price || "",
                rating_rate: items.rating_rate || "",
                rating_count: items.rating_count || "",
            });
        }
    }, [items]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const { title, description, category, price, rating_rate, rating_count, image } = formData;
    
        const formDataToSend = {
            title,
            description,
            category,
            price,
            rating_rate,
            rating_count,
        };
    
        if (image) {
            formDataToSend.image = image;
        }

        try{
            await createEditProduct(items.id, formDataToSend);
            onClose();
        }catch(e){
            console.log('Error creating : ',e);
        }
    
    };
        
    return (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-[1000] bg-black bg-opacity-50 overflow-auto font-sans">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-3xl p-6 relative flex flex-col space-y-4">
                <h4 className="text-xl font-semibold text-center text-gray-800 mt-2">
                    Edit Product
                </h4>
                <hr className="my-4 border-gray-200" />

                {/* แสดงข้อมูลสินค้าที่เลือก */}
                <div className="space-y-2">
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
                                min="0"
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
                                name="rating_rate"
                                min = '0'
                                max='5.0'
                                value={formData.rating_rate}
                                onChange={handleChange}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                            <input
                                type="number"
                                name="rating_count"
                                min = '0'
                                value={formData.rating_count}
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
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

EditProduct.propTypes = {
    items: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    createEditProduct: PropTypes.func.isRequired,
};

export default EditProduct;