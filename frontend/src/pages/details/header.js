import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useState, useEffect } from 'react';

const TitleAttraction = ({data, id_location, photo_url, title, address, category, category_icon, country, locality}) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [isLiked, setIsLiked] = useState(null);

    const data_to_fetch = data;
    delete data_to_fetch['address'];
    delete data_to_fetch['rating'];
    delete data_to_fetch['counts'];
    data_to_fetch['photo_url'] = photo_url;
    delete data_to_fetch['photos'];
    data_to_fetch['fsq_id'] = id_location;

    const data_to_send = {
        data: data_to_fetch
    }

    useEffect(() => {
        const checkIfLocationIsLiked = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user/is_liked/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data_to_send),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                
                if(result.message === 'true')
                    setIsLiked(true);
                else
                    setIsLiked(false);

            } catch (error) {
                console.log(error.message);
            } 
        }
        checkIfLocationIsLiked();
    }, [data]);

    const handleLikeAction = async (event) => {
        if (event.target.checked) {
            try {
                const response = await fetch('http://localhost:8000/api/user/like/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data_to_send),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
            } catch (error) {
                console.log(error.message);
            }
            setIsLiked(true);
        } else {
            try {
                const response = await fetch('http://localhost:8000/api/user/like/', {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data_to_send),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
            } catch (error) {
                console.log(error.message);
            }
            setIsLiked(false);
        }
    };

    return (
        <div className="w-5/6 mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-primary-black font-bold">{title} - {country}, {locality}</h1>
                {isLiked !== null && (
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={handleLikeAction} checked={isLiked}/>
                )}
            </div>
            <div className="aditional flex flex-col">
                <div className="flex ml-4 items-center">
                    <div className="h-6 w-6 bg-primary-black-blue rounded mr-2 mt-2">
                        <img src={category_icon} alt="category_icon" className="rounded-l"/>
                    </div>
                    <p className="mt-2 text-sm">{category}</p>
                    <div className="flex items-center mt-2 ml-6">
                        <FontAwesomeIcon icon={faMapMarked} style={{color: "#0077C0", height:"1.5rem", width:"1.5rem"}}/>
                        <p className="text-sm text-primary-black ml-2">{address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TitleAttraction;
