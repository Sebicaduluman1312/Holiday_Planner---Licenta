import Rating from '@mui/material/Rating';


import { useState, useEffect } from "react";

const CreateReview = ({id_location, handleReviewSubmitted}) => {

    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');

    const handleReviewText = (event) => {
        setComment(event.target.value);
    }

    const handleSwitchRating = (event, newValue) => {
        setRating(newValue);
    }

    const handleSubmitReview = async () => {
        const review = {
            rating: rating,
            comment: comment,
            destination_id: id_location,
        };

        console.log(review);
        
        try {
            const response = await fetch(`http://localhost:8000/api/search/reviews/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(review)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            handleReviewSubmitted();

        } catch (error) {
            console.error(error);
        }
    };

    return ( 
        <div className="h-80 w-full border border-primary-black mt-4 rounded-xl shadow-xl p-6">
            <div className='flex items-center mb-4'>
                <p className='mr-4'>Set rating value: </p>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} onChange={handleSwitchRating} />
            </div>
            <div>
                <p>Review: </p>
                <textarea className='w-full h-36 mt-2 text-sm border border-primary-black rounded-l p-4' onChange={handleReviewText} placeholder='Write your review'></textarea>
            </div>
            <div className='w-full flex flex-col items-end'>
                <button className='rounded-xl text-primary-white bg-primary-black-blue mt-4 p-2 hover:bg-primary-black' onClick={handleSubmitReview}>Submit review</button>
            </div>
        </div>
    );
}
 
export default CreateReview;