import { useEffect, useState } from "react";
import { popularFetch } from "../../utils/popularFetch";

const PopularSearch = () => {

    const [popularSearches, setPopularSearches] = useState([]);

    useEffect(() => {
        const fetchPopularSearches = async () => {
            try {
                const data = await popularFetch();
                setPopularSearches(data);
            } catch (error) {
                console.log('Error displaying popular searches: ', error);
            }
        };

        fetchPopularSearches();

    }, []);


    return (
        <div className="popular-container flex flex-col items-center mb-8 w-5/6">
            <p className="text-lg font-semibold">Popular Search</p>
            <div className="popular-searches w-4/5 grid grid-cols-5 gap-4 mt-4 text-sm font-semibold text-primary-black">
                { 
                    popularSearches.map((search, index) => (
                        <button className="border border-primary-black rounded-xl p-2 px-6 shadow-md hover:bg-primary-black-blue hover:text-primary-white hover:border-primary-white transition-colors duration-300 ease-in-out" key={index}>{search.location}</button>
                    )) 
                }
            </div>
        </div>
    );
}
 
export default PopularSearch;