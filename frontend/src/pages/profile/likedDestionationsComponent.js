import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const LikedDestinationsComponent = () => {
    
    const [destinations, setDestinations] = useState([]);

    let url = '';
    
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);

    if (urlParams.has('visit')) {

        const paramValue = urlParams.get('visit');
        url = `http://localhost:8000/api/user/like/?visit=${paramValue}`;

    } else {
        url = `http://localhost:8000/api/user/like/`;
    }


    useEffect(() => {
        const fetchLikedDestinations = async () => {
            await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if(!response.ok)
                    throw new Error('Problem fetch API for liked destinations!');
                return response.json()
            })
            .then(data => {
                setDestinations(data.message);
            })
            .catch(error => {
                console.error('Problem fetch: ', error)
            });
        }

        fetchLikedDestinations();
    }, []);

    const handleDetailsClick = (id_location) => {
        window.location.href = `http://localhost:3000/details?location=${id_location}`;
    };
    
    return ( 
        <div className="destinations p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-primary-white-blue rounded-xl justify-items-center">
            {destinations.map((destination, index) => (
                <Card sx={{ width: 280 }} id={destination.fsq_id} key={index}>
                    <CardMedia
                        sx={{ height: 180, objectFit: 'cover' }}
                        image={destination.photo_url}
                        title={destination.name}
                    />
                    <CardContent sx={{height: 100}}>
                    <Typography gutterBottom variant="h7" component="div">
                        {destination.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div" className="flex justify-between">
                        <span> 
                            {destination.country}, {destination.locality}
                        </span>
                        <div className="flex items-center">
                            {destination.destination_category}
                            <img src={destination.category_icon} alt={destination.destination_category} className="bg-primary-black-blue ml-2 h-6 w-6" />
                        </div>
                    </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleDetailsClick(destination.fsq_id)}>Details</Button>
                    </CardActions>
                </Card>
            ))}

        </div>
    );
}
 
export default LikedDestinationsComponent;