import { useEffect, useState } from "react";
import NavBarSearch from "../search/header/NavBarSearch";
import TitleAttraction from "./header";
import MainDetail from "./main_container/main_detail";
import RelatedComponents from "./relatedPlaces";
import DescriptionComponent from "./description";
import LocationComponent from "./main_container/location";
import ReviewLocation from "./main_container/review_location/reviewComponent";

const LocationDetails = () => {

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const location_id = urlParams.get('location');
    const [details, setDetails] = useState(null);

    useEffect(() => {

        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/search/details/?fsq_id=${location_id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if(!response.ok) {
                    throw new Error(`Error: ${response.error}`);
                }

                const data = await response.json();
                setDetails(data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchDetails();
    }, []);



    return ( 
        <div className="w-screen bg-primary-white flex flex-col items-center">
            <NavBarSearch />
            {details && details.data ? (
                <TitleAttraction data={details.data} id_location={location_id} photo_url={details.data.photos[0]} title={details.data.name} address={details.data.address} category={details.data.destination_category} category_icon={details.data.category_icon} country={details.data.country} locality={details.data.locality}/>
            ) : (
                <p></p>
            )}
            
            {details && details.data ? (
                <MainDetail photos={details.data.photos} locality={details.data.locality} name={details.data.name}/>
            ) : (
                <p></p>
            )}

            {details && details.data ? (
                <LocationComponent lat={details.data.lat} lon={details.data.lon} />
            ) : (
                <p></p>
            )}


            {details && details.data ? (
                <RelatedComponents latitude={details.data.lat} longitude={details.data.lon} fsq_id={location_id}/>
            ) : (
                <p></p>
            )}

            {details && details.data ? (
                <ReviewLocation rating={details.data.rating} id={location_id}/>
            ) : (
                <p></p>
            )}

        </div>
    );
}
 
export default LocationDetails;