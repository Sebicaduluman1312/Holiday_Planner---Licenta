import { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PopularCard from "../../utils/popularCard";
import RecomendedCard from "../../utils/recomendedCard";

const RelatedComponents = ({latitude, longitude, fsq_id}) => {

    const coordinates = {lat: latitude, lon: longitude};
    const [relatedPlaces, setRelatedPlaces] = useState(null);


    useEffect(() => {

        const fetchRelated = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/search/related/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(coordinates)
                });

                if(!response.ok) {
                    throw new Error(`Error: ${response.error}`);
                }

                const data = await response.json();
                console.log(data);
                setRelatedPlaces(data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchRelated();
    }, []);


    return ( 
        <div className="w-5/6">
            <h3 className="text-2xl font-semibold mb-4">Similar experiences</h3>
            <div className="places w-full flex justify-between gap-2">

                    {relatedPlaces ? (
                        
                        relatedPlaces.data
                            .filter(dest => dest.fsq_id !== fsq_id)
                            .slice(0, 5)
                            .map((dest, index) => (
                                <RecomendedCard key={index} details={dest} />

                        ))) : <div> </div>    
                    }
            </div>
        </div>
    );
}
 
export default RelatedComponents;