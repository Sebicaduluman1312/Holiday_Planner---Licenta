import { useEffect, useState } from "react";
import CardComponent from "./cardComponent";

const TouristicAttractions = () => {
    
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const paramsObject = {};
    params.forEach((value, key) => {
        paramsObject[key] = value.trim();
    });

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:8000/api/search/location/?category=${paramsObject['category']}&location=${paramsObject['location']}&sort=RELEVANCE`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                setData(result);

            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return ( 
        <div className="h-full w-3/4 bg-primary-white rounded-tr-xl rounded-br-xl flex flex-col items-center">
            <div className="text-2xl mt-6 text-primary-black">Destinations for {paramsObject['location']}</div>
            <div className="destinations grid grid-cols-3 gap-10 mt-6 mb-6">
                
                {   loading ? <div>Loading</div> :
        
                    Object.entries(data).map(([key, value]) =>
                        value.map((item, index) => (
                            <CardComponent key={index} props={item}/>
                    )))
                    
                }

            </div>
        </div>
    );
}
 
export default TouristicAttractions;