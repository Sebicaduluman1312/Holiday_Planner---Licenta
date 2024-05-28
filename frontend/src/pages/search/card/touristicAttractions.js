import { useEffect, useState } from "react";
import CardComponent from "./cardComponent";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function splitIntoChunks(array, chunkSize) {
    const chunks = [];
    for (let i=0; i < array.length; i+= chunkSize)
        chunks.push(array.slice(i, i + chunkSize));

    return chunks;
}


const TouristicAttractions = () => {
    
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const paramsObject = {};
    params.forEach((value, key) => {
        paramsObject[key] = value.trim();
    });

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [destinations, setDestinations] = useState([]);

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

                if (result.api_locations && result.database_locations) {

                    let concatenate_response = result.api_locations.concat(result.database_locations);
                    setDestinations(concatenate_response);

                }


            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const pagination = splitIntoChunks(destinations, 6);

    const [actualPage, setActualPage] = useState(1);

    const handlePages = (event, page) => {
        setActualPage(page);
    }

    return ( 
        <div className="h-full w-3/4 bg-primary-white rounded-tr-xl rounded-br-xl flex flex-col items-center">
            <div className="text-2xl mt-6 text-primary-black">Destinations for {paramsObject['location']}</div>
            <div className="destinations grid grid-cols-3 gap-10 mt-6 mb-6">
                
                {   loading ? <div>Loading</div> :
        
                    pagination[actualPage - 1].map((element, elementIndex) => (
                        <CardComponent key={elementIndex} props={element}/>
                    ))
                                
                }
            </div>
            <Stack spacing={2}>
                <Pagination count={pagination.length} defaultPage={1} onChange={handlePages} />
            </Stack>
        </div>
    );
}
 
export default TouristicAttractions;