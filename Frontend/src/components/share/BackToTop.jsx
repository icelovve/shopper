import { motion } from 'framer-motion';

const BackToTop = () => {

    // Back To Top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    const fadeInLeft = {
        initial: {
            opacity: 0,
            x: -50,
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 50,
                damping: 20,
                duration: 0.8,
                delay: 0.3,
            },
        },
    };

    return (
        <>
            <motion.button {...fadeInLeft}
                className="animate-bounce fixed bottom-10 right-10 bg-red-700 hover:bg-red-900 text-white font-bold py-3 px-3 rounded-full z-50"
                onClick={scrollToTop}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                    />
                </svg>
            </motion.button>
        </>
    )
}

export default BackToTop
