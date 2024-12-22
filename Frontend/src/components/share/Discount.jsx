import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import discountImage_1 from "../../assets/discount.png";

const Discount = () => {
    const images = [
        { img: discountImage_1, link: "#" },
        { img: discountImage_1, link: "#" },
        { img: discountImage_1, link: "#" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    });

    return (
        <div className="relative w-full mx-auto mt-14 overflow-hidden">
            {/* Carousel Wrapper */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <Link
                        to={image.link}
                        key={index}
                        className="flex-shrink-0 w-full flex justify-center items-center"
                    >
                        <img
                            src={image.img}
                            alt={`Slide ${index}`}
                            className="w-4/6 h-auto mx-auto"
                        />
                    </Link>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                            currentIndex === index ? "bg-amber-400" : "bg-gray-100"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Discount;