import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faReply, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as RegTU, faThumbsDown as RegTD, faComment as RegC} from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import {GetUserDetails} from '../../../../utils/userDetails';
import LikeReview from './likeReview';
import DislikeReview from './dislikeReview';

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

const ReviewCommunity = ({ reviews, reload }) => {
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [editedComment, setEditedComment] = useState("");
    const [localReviews, setLocalReviews] = useState([]);
    const [localReplies, setLocalReplies] = useState({});
    const [editRating, setEditRating] = useState(0);

    /// ---> adding additional details for author
    const [authorReview, setAuthorReview] = useState({});
    const [authorReply, setAuthorReply] = useState({});

    useEffect(() => {
        const fetchUserDetailsForReviews = async () => {
            const userDetailsPromises = reviews.map(async (review) => {
                const userDetails = await GetUserDetails(review.author);
                

                if ( !(review.id in authorReview) ){
                    setAuthorReview(prevObject => ({
                        ...prevObject,
                        [review.id]: userDetails.data.name,
                        [`${review.id}-photo`]: userDetails.profile.profile_image,
                    }));
                }

            });
        };

        fetchUserDetailsForReviews();
    }, [reviews, authorReview, reload]);


    /// ---> get actual user
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

                if (!response.ok) {
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
    }, [reviews, reload]);

    useEffect(() => {
        setLocalReviews(reviews);
    }, [reviews, reload]);


    /// ---> delete review
    const handleDeleteReview = async (id_review) => {
        const id_object = { id: id_review };
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

            setLocalReviews(prevReviews => prevReviews.filter(review => review.id !== id_review));
        } catch (error) {
            console.error(error);
        } 
    }

    /// ----> edit review
    const handleEditReview = (id_review, comment) => {
        setEditingReview(id_review);
        setEditedComment(comment);
    }

    /// edit rating
    const updateReview = (id, newRating, newComment) => {
        setLocalReviews(prevReviews => 
            prevReviews.map(review => 
                review.id === id ? { ...review, rating: newRating, comment: newComment } : review
            )
        );
    };

    const handleEditRating = (event, newValue) => {

        setEditRating(newValue);
        updateReview(editingReview, newValue);

    };

    const handleSaveEdit = async (id_review) => {
        const updatedReview = {
            id: id_review,
            new_comment: editedComment,
            rating: editRating,
        };

        try {
            const response = await fetch(`http://localhost:8000/api/search/reviews/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedReview)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setLocalReviews(prevReviews => 
                prevReviews.map(review => 
                    review.id === id_review ? { ...review, comment: editedComment } : review
                )
            );
            setEditingReview(null);
        } catch (error) {
            console.error(error);
        } 
    }

    /// -----> view replies

    const [viewReply, setViewReply] = useState({});
    
    const handleViewReply = async (id_review) => {
        if(id_review in viewReply){
            setViewReply(prevObject => {
                const newObject = { ...prevObject };
                delete newObject[id_review];
                return newObject;
            });
        } else {
            setViewReply(prevObject => ({
                ...prevObject,
                [id_review]: true
            }));

            /// fetch for replies
            const getReplies = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/search/reply_review/?id=${id_review}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
        
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
    
                    let data = await response.json();

                    await Promise.all(data.data.map(async (rep) => {
                        const data_user_reply = await GetUserDetails(rep.author);
                        data['username'] = data_user_reply.data.name;
                        

                        if (!(rep.id in authorReply)) {
                            setAuthorReply(prevObject => ({
                                ...prevObject,
                                [rep.id]: data_user_reply.data.name,
                                [`${rep.id}-photo`]: data_user_reply.profile.profile_image,
                            }));
                        }
                    }));

                    setLocalReplies(prevObject => ({
                        ...prevObject,
                        [id_review]: data.data
                    }));
         
                } catch (error) {
                    console.error(error);
                } 
            }
            getReplies();
        }
    };



    /// -------> post reply
    const [postReply, setPostReply] = useState({});
    const [contentReply, setContentReply] = useState({});

    /// stocam textul din reply
    const handleReplyTextPostChange = (id_review, reply) => {
        setContentReply(prevObject => ({
            ...prevObject,
            [id_review]: reply
        }));
    };

    const handlePostReply = (id_review) => {
        
        /// delete reply post component when click 2nd time
        if (id_review in postReply)
        {   
            setPostReply(prevObject => {
                const newObject = { ...prevObject };
                delete newObject[id_review];
                return newObject;
            });
        } else{
            setPostReply(prevObject => ({
                ...prevObject,
                [id_review]: true
            }));
        }
    }   

    /// fetch post reply
    const handleFetchPostReply = async (id_review) => {
        const objectPost = { comment: contentReply[id_review], id: id_review};

        const postReply = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/search/reply_review/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objectPost)
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                ///const data = await response.json();
     
            } catch (error) {
                console.error(error);
            } 
        }

        postReply();
    }

    /// delete reply 

    const handleDeleteReply = async (id_reply, id_review) => {
        const id_object = { id: id_reply };
        try {
            const response = await fetch(`http://localhost:8000/api/search/reply_review/`, {
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

            setLocalReplies(prevReplies => ({
                ...prevReplies,
                [id_review]: prevReplies[id_review].filter(reply => reply.id !== id_reply)
            }));

        } catch (error) {
            console.error(error);
        } 
    };

    /// redirect to user profile
    
    const handleVisitProfile = (id_user) => {
        window.location.href = `http://localhost:3000/profile?visit=${id_user}`;
    }

    return ( 
        <div className="h-96 w-full bg-primary-white rounded-2xl mt-4 p-4 shadow-xl overflow-auto border border-primary-black">
            {
                localReviews ?
                    localReviews
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((review, index) => (
                        <div key={index} id={review.id} className="review w-full p-4 overflow-hidden border border-primary-black rounded-xl mb-2 ">
                           
                            <div className="flex items-center w-full justify-between">
                                <div className="font-semibold ml-2 flex items-center">
                                    {
                                        authorReview[`${review.id}-photo`] ? 
                                        <Avatar className='mr-2' sx={{ bgcolor: '#0077C0' }} src={authorReview[`${review.id}-photo`]}>HP</Avatar>: 
                                        <Avatar className='mr-2' sx={{ bgcolor: '#0077C0' }}>HP</Avatar>

                                    }

                                    <div className='flex flex-col'>
                                        <div>
                                            {
                                                authorReview[review.id] ? <span className="cursor-pointer" onClick={() => handleVisitProfile(review.author)}>{authorReview[review.id]}</span> : <p></p> 
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

                                {editingReview === review.id ? (
                                    <CustomRating name="half-rating-read" onChange={handleEditRating} value={review.rating} precision={0.5} className='text-primary-black'/>
                                ) : (
                                    <CustomRating name="half-rating-read" value={review.rating} precision={0.5} className='text-primary-black' readOnly />
                                )}
                            </div>

                            <div className="content text-sm mt-2 ml-4">
                                {editingReview === review.id ? (
                                    <>
                                        <textarea
                                            className="w-full p-2 border border-primary-black rounded"
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                        />
                                        <button
                                            className="mt-1 mb-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-primary-black"
                                            onClick={() => handleSaveEdit(review.id)}
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    review.comment
                                )}
                            </div>
                            
                            {
                                postReply[review.id] === true ? (
                                    <div className='replies-area h-48 mt-2 ml-20 mb-4 rounded-xl w-5/6 bg-primary-white border border-primary-black flex flex-col'>
                                        <p className='p-4 ml-2 text-sm font-semibold'>Reply to {userName}:</p>
                                        <textarea className='text-sm ml-6 h-20 w-5/6 border p-4 border-primary-black rounded-lg' placeholder='Write your reply' onChange={(e) => handleReplyTextPostChange(review.id, e.target.value)}></textarea>
                                        <button className="p-2 w-24 mt-2 ml-6 text-sm mb-2 bg-blue-500 text-white rounded hover:bg-primary-black" onClick={() => handleFetchPostReply(review.id)}>
                                            Send reply
                                        </button>
                                    </div>
                                ) : <div></div>
                            }

                            {
                                viewReply[review.id] === true ? (
                                    <div className='replies-area h-60 mt-2 ml-20 mb-4 border rounded-xl w-5/6 bg-primary-white border-primary-black overflow-auto'>
                                        {localReplies[review.id] ? localReplies[review.id]
                                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                            .map((reply_review, index) => (
                                                <div key={index} className='reply-review-area flex flex-col p-4 border-b border-primary-black'>
                                                    <div className='flex justify-between'>
                                                        <div className='flex'>
                                                            {
                                                                authorReply[reply_review.id] ? 
                                                                <Avatar className='mr-2' sx={{ bgcolor: '#0077C0' }} src={authorReply[`${reply_review.id}-photo`]}></Avatar>
                                                                : 
                                                                <Avatar className='mr-2' sx={{ bgcolor: '#0077C0' }}></Avatar>

                                                            }
                                                            
                                                            <div className='flex flex-col'>
                                                                <p className='text-xs font-semibold'>
                                                                    {
                                                                        authorReply[reply_review.id] ? <span className='cursor-pointer' onClick={() => handleVisitProfile(reply_review.author)}>{authorReply[reply_review.id]}</span> : 'Hp user'
                                                                    }
                                                                </p>
                                                                <p className='text-xs font-thin'>{new Date(reply_review.created_at).toISOString().slice(0, 16).replace('T', '  ')}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {userId === reply_review.author && (
                                                                <FontAwesomeIcon 
                                                                    icon={faTrash} 
                                                                    style={{ height: '15px', width: '20px', color:"red" }} 
                                                                    className='cursor-pointer mr-2' 
                                                                    onClick={() => handleDeleteReply(reply_review.id, review.id)} // Adăugarea review.id aici
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className='text-sm mt-2 mb-2'>
                                                        {reply_review.comment}
                                                    </div>
                                                </div>
                                            )) : <div></div>
                                        }

                                    </div>
                                ) : <div></div>
                            }
                            
                            <div className='flex w-full justify-between'>
                                <div className={`status-${review.id} flex ml-10 mt-2 items-center`}>
                                    <LikeReview review={review} id_user={userId} reload={reload} />

                                    <div className='replies flex items-center ml-4 cursor-pointer' onClick={() => handleViewReply(review.id)}>
                                        <FontAwesomeIcon icon={RegC} style={{ height: '15px', width: '20px' }} />
                                        <p className='text-sm'>View Replies</p>
                                    </div>

                                    <div className='reply flex items-center ml-4 cursor-pointer' onClick={() => handlePostReply(review.id)}>
                                        <FontAwesomeIcon icon={faReply} style={{ height: '15px', width: '20px' }}/>
                                        <p className='text-sm'>Reply</p>
                                    </div>
                                </div>
                                
                                {userId === review.author && (
                                    <div className='flex items-center mt-2 text-sm gap-4'>
                                        <FontAwesomeIcon 
                                            icon={faEdit} 
                                            style={{ height: '15px', width: '20px', color:"#0077C0" }} 
                                            className='cursor-pointer'
                                            onClick={() => handleEditReview(review.id, review.comment)}
                                        />
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            style={{ height: '15px', width: '20px', color:"red" }} 
                                            className='cursor-pointer' 
                                            onClick={() => handleDeleteReview(review.id)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )) 
                : <div></div>
            }
        </div>
    );
}

export default ReviewCommunity;
