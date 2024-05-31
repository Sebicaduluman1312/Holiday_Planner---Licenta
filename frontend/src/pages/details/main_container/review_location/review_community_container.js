import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faReply, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as RegTU, faThumbsDown as RegTD, faComment as RegC} from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react';


const CustomRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#0077C0', 
    },
    '& .MuiRating-iconHover': {
      color: '#0077C0', 
    },
    '& .MuiRating-iconEmpty': {
      color: '#0077C0', 
    },
});

const ReviewCommunity = ({reviews}) => {

    //request pentru id-user pentru a vedea daca putem edita review-ul
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/auth/user/`, {
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
                setUserName(data.user.name);
                setUserId(data.user.id);

            } catch (error) {
                console.error(error);
            }
        }

        fetchUserDetails();
    }, []);


    const handleDeleteReview = async (id_review) => {

        const id_object = {
            id: id_review
        };
        console.log(id_object);

        try {
            const response = await fetch(`http://localhost:8000/api/search/reviews/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id_object)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            const reviewElement = document.getElementById(id_review);
            reviewElement.remove();

        } catch (error) {
            console.error(error);
        } 
    }


    return ( 
        <div className="h-96 w-full bg-primary-white rounded-2xl mt-4 p-4 shadow-xl overflow-auto border border-primary-black">
            {
                reviews ?
                    reviews
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((review, index) => (
                        <div key={index} id={review.id} className="review w-full p-4 overflow-hidde border border-primary-black rounded-xl mb-2 ">
                           
                            <div className="flex items-center w-full justify-between">
                                <div className="font-semibold ml-2 flex items-center">
                                    <Avatar className='mr-2' sx={{ bgcolor: '#0077C0' }}>HP</Avatar>

                                    <div className='flex flex-col'>
                                        <div>
                                            {
                                                userName ? userName : <p>Forsquare user</p>
                                            }
                                        </div>
                                        <div className='text-xs font-thin'>
                                            {review.created_at ? (
                                                <span>
                                                    {new Date(review.created_at).toISOString().slice(0, 16).replace('T', '  ')}
                                                </span>
                                            ) : (
                                                <span>No date available</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <CustomRating name="half-rating-read" defaultValue={review.rating/2} precision={0.5} className='text-primary-black' readOnly />
                            </div>

                            <div className="content text-sm mt-2 ml-4">
                                {review.comment}
                            </div>
                            
                            <div className='flex w-full justify-between'>
                                <div className='flex ml-10 mt-2 items-center'>
                                    <div className='like flex items-center cursor-pointer'>
                                        <FontAwesomeIcon icon={RegTU} style={{ height: '15px', width: '20px' }} />
                                        <p>{review.likes}</p>
                                    </div>
                                    <div className='dislike flex items-center ml-4 cursor-pointer'>
                                        <FontAwesomeIcon icon={RegTD} style={{ height: '15px', width: '20px' }} />
                                        <p>{review.dislikes}</p>
                                    </div>

                                    <div className='replies flex items-center ml-4 cursor-pointer'>
                                        <FontAwesomeIcon icon={RegC} style={{ height: '15px', width: '20px' }} />
                                        <p className='text-sm'>View Replies</p>
                                    </div>

                                    <div className='reply flex items-center ml-4 cursor-pointer'>
                                        <FontAwesomeIcon icon={faReply} style={{ height: '15px', width: '20px' }} />
                                        <p className='text-sm'>Reply</p>
                                    </div>
                                </div>
                                
                                {
                                    userId === review.author ?
                                        <div className='flex items-center mt-2 text-sm gap-4'>
                                        <FontAwesomeIcon icon={faEdit} style={{ height: '15px', width: '20px', color:"#0077C0" }} className='cursor-pointer'/>
                                        <FontAwesomeIcon icon={faTrash} style={{ height: '15px', width: '20px', color:"red" }} className='cursor-pointer' onClick={() => handleDeleteReview(review.id)}/>
                                    </div> : <div></div>

                                } 
                            </div>

                        </div>
                    )) 
                : <div></div>
            }
        </div>
    );
}
 
export default ReviewCommunity;