import { useState, useEffect } from "react";
import ReviewContainer from "./review_container";
import Rating from '@mui/material/Rating';
import ReviewCommunity from "./review_community_container";
import CreateReview from "./createReview";


const ReviewLocation = ({rating, id}) => {
    
    const [apiReviews, setApiReviews] = useState([]);
    const [communityReviews, setCommunityReviews] = useState([]);
    const [communityRating, setCommunityRating] = useState(0);
    const [reloadReviews, setReloadReviews] = useState(false);


    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/search/reviews/?fsq_id=${id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if(!response.ok) {
                    throw new Error(`Error: ${response.error}`);
                }

                const data = await response.json();
                setCommunityReviews(data.comunity_reviews);
                setApiReviews(data.api_reviews.content);


            } catch (error) {
                console.error(error);
            }
        }

        fetchReviews();
    }, [id, reloadReviews]);

    useEffect(() => {
        if (communityReviews.length > 0) {
            let sum = 0;
            communityReviews.forEach((review) => {
                sum += review.rating;
            });

            const average = sum / communityReviews.length;
            setCommunityRating(average);
        }
    }, [communityReviews]);


    ///rerender

    const handleReviewSubmitted = () => {
        setReloadReviews(!reloadReviews);
    };


    return ( 
        <div className="w-5/6 mb-10 mt-6">
            <h2 className="text-2xl font-semibold">Location reviews</h2>
            <p className="mt-2 text-normal font-thin text-100-gray">See what others are saying about this location</p>

            <div className="flex items-center mt-6 ">
                <h2 className="text-2xl font-semibold mr-4">According to Forsquare community this location is {rating} out of 10</h2>
                <Rating name="customized-10" defaultValue={rating} max={10} readOnly/>
            </div>

            <ReviewContainer reviews={apiReviews} />

            <div className="flex items-center mt-6">
                <h2 className="text-2xl font-semibold mr-4">According to our community this locations is {communityRating.toFixed(1)} out of 5</h2>
                <Rating name="customized-10" value={communityRating} max={5} readOnly/>
            </div>
            <ReviewCommunity reviews={communityReviews} reload={reloadReviews}/>

            <h2 className="text-2xl mt-6 font-semibold">Add a Review</h2>
            <CreateReview id_location={id} handleReviewSubmitted={handleReviewSubmitted}/>

        </div>
    );
}
 
export default ReviewLocation;