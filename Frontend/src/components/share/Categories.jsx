import { Link } from "react-router-dom";

const categories = [
    {
        name: "Electronics & Gadgets",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
            </svg>
        ),
        link: '#'     
    },
    {
        name: "Home Appliances",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
        ),
        link:'#'
    },
    {
        name: "Fashion & Bags Leather",
        icon: (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 3L2 6L3 10L6 9.5V20C6 20.5523 6.44771 21 7 21H17C17.5523 21 18 20.5523 18 20V9.5L21 10L22 6L16.5 3M7.5 3C7.5 3 9 7 12 7C16 7 16.5 3 16.5 3M7.5 3C7.5 3 10 4 12 4C14 4 16.5 3 16.5 3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        link:'#'
    },
    {
        name: "Health and Beauty",
        icon: (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 14V10C21 9.44772 20.5523 9 20 9H15L15 4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V9L4 9C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H9L9 20C9 20.5523 9.44771 21 10 21H14C14.5523 21 15 20.5523 15 20V15L20 15C20.5523 15 21 14.5523 21 14Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        link:'#'
    },
    {
        name: "Food and Beverages",
        icon: (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3.01611L12.0161 3M1 11H23M3 11H21V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V11ZM21 8H3C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        link:'#'
    },
    {
        name: "Sports and Outdoor Activities",
        icon: (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19ZM1 9H4C4.55228 9 5 9.44772 5 10V14C5 14.5523 4.55228 15 4 15H1V9ZM23 9H20C19.4477 9 19 9.44772 19 10V14C19 14.5523 19.4477 15 20 15H23V9ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        link:'#'
    },
    {
        name: "Gifts and Decor",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        ),
        link:'#'
    },
    {
        name: "Books and Entertainment",
        icon: (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.00001C8 2.33333 6 2.33333 2 5.00001V21C6 18.5 8 18.5 12 21M12 5.00001V21M12 5.00001C16 2.33333 18 2.33333 22 5.00001V21C18 18.5 16 18.5 12 21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        link:'#'
    },
];

const Categories = () => {
    return (
        <div className="flex justify-around gap-4 items-center mt-6 text-sm w-4/6 text-center mx-auto ">             
            {categories.map((category, index) => (                 
                <Link key={index} className="flex flex-col items-center" to={category.link}>                     
                    {category.icon}                     
                    <p className="mt-1">{category.name}</p>                 
                </Link>             
            ))}         
        </div>   
    )
}

export default Categories