import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faReply, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as RegTU, faThumbsDown as RegTD, faComment as RegC} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

const LikeReview = ({review, id_user}) => {

    const [likes, setLikes] = useState(review.likes);
    const [dislikes, setDislikes] = useState(review.dislikes);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const [likeUsers, setLikeUsers] = useState(null);
    const [dislikeUsers, setDislikeUsers] = useState(null);

    useEffect(() => {

        const fetchUsersLike = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/search/like_review/?id=${review.id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.error}`);
                }

                const data = await response.json();
                data.data.map((like) => {
                    if (like.user === id_user) {
                        setIsLiked(true);
                        setIsDisliked(false);
                    }
                });
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsersLike(); 
    }, []);

    useEffect(() => {
        const fetchUsersDislike = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/search/dislike_review/?id=${review.id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.error}`);
                }

                const data = await response.json();
                data.data.map((dislike) => {
                    if(dislike.user === id_user) {
                        setIsLiked(false);
                        setIsDisliked(true);
                    }
                });
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsersDislike();
    }, []);


    const handlePostLike = async () => {
        const like_object = { review_id: review.id };

        try {
            const response = await fetch(`http://localhost:8000/api/search/like_review/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(like_object)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json()
            console.log(data.data);
            setLikes(data.data.likes);
            setDislikes(data.data.dislikes);
            setIsLiked(true);
            setIsDisliked(false);

        } catch (error) {
            console.error(error);
        } 
    }

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
            setLikes(data.data.likes);
            setDislikes(data.data.dislikes);
            setIsDisliked(true);
            setIsLiked(false);

        } catch (error) {
            console.error(error);
        } 
    }



    return ( 
        <div className='flex items-center'>
            <div className='like flex items-center cursor-pointer' >
                {
                    isLiked ? 
                        <FontAwesomeIcon icon={faThumbsUp} style={{ height: '15px', width: '20px' }} /> : 
                        <FontAwesomeIcon icon={RegTU} style={{ height: '15px', width: '20px' }} onClick={handlePostLike}/>

                }
                <p>{likes}</p>
            </div>

            <div className='dislike flex items-center ml-4 cursor-pointer'>
                {
                    isDisliked ? 
                        <FontAwesomeIcon icon={faThumbsDown} style={{ height: '15px', width: '20px' }} /> :
                        <FontAwesomeIcon icon={RegTD} style={{ height: '15px', width: '20px' }} onClick={handlePostDislike}/>
                }
                <p>{dislikes}</p>
            </div>
        </div>
    );
}
 
export default LikeReview;