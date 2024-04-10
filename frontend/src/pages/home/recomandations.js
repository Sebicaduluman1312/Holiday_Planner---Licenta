import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect } from 'react';
import PopularCard from "../../utils/popularCard";



const RecomandationComponent = () => {

    const [destinations, setDestinations] = useState([]);
    const url = 'http://localhost:8000/api/search/popular/';
    
    useEffect(() => {
        const fetchPopularDestinations = async () => {
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if(!response.ok)
                    throw new Error('Problem fetch API for popular destinations!');
                return response.json()
            })
            .then(data => {
                setDestinations(data.content);
            })
            .catch(error => {
                console.error('Problem fetch: ', error)
            });
        }

        fetchPopularDestinations();
    }, []);
    

    const responsive = {
        superLargeDesktop: {breakpoint: { max: 2000, min: 1700 }, items: 4},
        desktop: {breakpoint: { max: 1700, min: 1260 }, items: 3},
        tablet: {breakpoint: { max: 1260, min: 800 }, items: 2},
        mobile: {breakpoint: { max: 800, min: 0 }, items: 1}
    };

    return ( 
        <div className="recomandation-container flex justify-center items-center flex-col w-full bg-primary-white-blue">
            <div className="recomandation-head mt-10 mb-10 w-5/6 flex justify-between">
                <div className="content-header w-2/5">
                    <p className="text-primary-black font-bold text-2xl">Best destinations</p>
                    <p className="text-primary-black text-md font-normal mt-2">Based on the invaluable insights gathered from the collective experiences of our users, 
                        we've tailored our approach to meet your needs</p>
                </div>
                
            </div>
            <div className="best-destinations w-5/6 mb-14">
                <Carousel 
                    className='h-full w-full ' 
                    responsive={responsive}
                    // infinite={true}
                    // autoPlay={true}
                    // autoPlaySpeed={4000}
                >
                    {
                        destinations.map((dest, index) => (
                            <PopularCard key={index} details={dest} />
                        ))
                    }
                </Carousel>
            </div>
        </div>
     );
}
 
export default RecomandationComponent;