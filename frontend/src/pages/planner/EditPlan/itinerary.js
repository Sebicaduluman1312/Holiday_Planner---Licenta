import { DndProvider } from "react-dnd";
import DaysComponent from "./daysSchedule";
import LikedLocations from "./myAttractions";
import { HTML5Backend } from "react-dnd-html5-backend";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

const Itinerary = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const [isLiked, setIsLiked] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const checkIfLocationIsLiked = async () => {
            try{
                const planId = urlParams.get('plan');

                const response = await fetch(`http://localhost:8000/api/planner/check_like_plan/?plan_id=${planId}`, {
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
                
                if(result.message === 'true')
                    setIsLiked(true);
                else
                    setIsLiked(false);

            } catch (error) {
                console.log(error.message);
            } 
        }
        checkIfLocationIsLiked();
    }, []);


    const handleLikeAction = async (event) => {
        if (event.target.checked) {

            /// Like card
            try {
                const planId = urlParams.get('plan');

                const response = await fetch(`http://localhost:8000/api/planner/like_plan/?plan_id=${planId}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                console.log(result)

            } catch (error) {
                console.log(error.message);
            }
            setIsLiked(true);

        } else {

            /// Dislike card
            try {
                const planId = urlParams.get('plan');

                const response = await fetch(`http://localhost:8000/api/planner/like_plan/?plan_id=${planId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.log(error.message);
            }
            setIsLiked(false);

        }
    };

    return (
        <div className="flex flex-col mt-10 mb-10 w-5/6">
            <div className="flex items-center">
                {
                    !urlParams.has('visit') ? 
                        <h1 className="text-2xl font-bold">Create your itinerary</h1>
                        : <h1 className="text-2xl font-bold">Itinerary</h1>
                }
                {
                    urlParams.has('visit') ? <div className="ml-6"><Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={handleLikeAction} checked={isLiked} className="h-6 w-6"/></div>
                    : <></>
                }
            </div>

            <DndProvider backend={HTML5Backend}>
                <div className="itinerary w-full flex">
                    <DaysComponent />
                    {
                        !urlParams.has('visit') ? <LikedLocations /> : <></>
                    }
                </div>
            </DndProvider>
        </div>
    );
}
 
export default Itinerary;