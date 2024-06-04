import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faReply, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as RegTU, faThumbsDown as RegTD, faComment as RegC} from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const DislikeReview  = ({review, id_user, updateLikes}) => {

    const [dislikes, setDislikes] = useState(review.dislikes);

    const handlePostDislike = async () => {
        const dislike_object = { review_id: review.id };

        try {
            const response = await fetch(`http://localhost:8000/api/search/dislike_review/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dislike_object)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json()
            setDislikes(data.data);
            updateLikes(review.id, review.likes-1);

        } catch (error) {
            console.error(error);
        } 
    }

    return ( 
        <div className='dislike flex items-center ml-4 cursor-pointer'>
            <FontAwesomeIcon icon={RegTD} style={{ height: '15px', width: '20px' }} onClick={handlePostDislike}/>
            <p>{dislikes}</p>
        </div>
    );
}
 
export default DislikeReview ;