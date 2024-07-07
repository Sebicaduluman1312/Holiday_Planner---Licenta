import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faCheck, faLocationArrow, faPhone, faUserPlus, faUsers, faEnvelope, faCompass, faTrash, faEye} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import ChangePhotoComponent from './changePhoto';
import ChangeBackgroundComponent from './changeBackground';
import ChangeDetailsComponent from './changeDetails';



const DetailComponent = (props) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [profilePhoto, setProfilephoto] = useState(true);
    const [backgroundPhoto, setBackgroundPhoto] = useState(false);
    const [details, setDetails] = useState(false);
    const [ownerUser, setOwnerUser] = useState(null);

    const handleProfilephoto = () => {
        setProfilephoto(true);
        setBackgroundPhoto(false);
        setDetails(false);
    }
    
    const handleBackgroundphoto = () => {
        setProfilephoto(false);
        setBackgroundPhoto(true);
        setDetails(false);
    }
    
    const handleDetails = () => {
        setProfilephoto(false);
        setBackgroundPhoto(false);
        setDetails(true);
    }

   useEffect (() => {
        const fetchUserDataLoggedIn = async () => {
            let url = `http://localhost:8000/api/auth/user/`;

            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setOwnerUser(data.user.id);
            }
        }

        fetchUserDataLoggedIn();

   }, []);

    
    /// following sistem
    /// --> follow user, unfollow 
    /// --> get followers, get following
    const [isFriend, setIsFriend] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [numberFollowers, setNumberFollowers] = useState(null);
    const [numberFollowing, setNumberFollowing] = useState(null);

    useEffect(() => {
        const fetchUsersFollows = async () => {
            try {
                let url = ''
                if(props.props.visiting == true) {
                    url = `http://localhost:8000/api/user/follow/?visit=${props.props.id}`;
                } else {
                    url = `http://localhost:8000/api/user/follow/`;
                }
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                
                const data = await response.json();

                setFollowers(data.followers);
                setFollowing(data.following);
                setNumberFollowers(followers.length);
                setNumberFollowing(following.length);

                data.followers.map((user) => {
                    if(user == ownerUser){
                        setIsFriend(true);
                    }
                });
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsersFollows();
    }, [ownerUser, numberFollowers, numberFollowing]);

    const handleFollow = async () => {
        const data_follow = {id: props.props.id}
        try {
            const response = await fetch(`http://localhost:8000/api/user/follow/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_follow)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.error}`);
            }

            const data = await response.json();
            setIsFriend(true);
            setNumberFollowers(numberFollowers + 1);

        } catch (error) {
            console.error(error);
        }
    }

    const handleUnfollow = async () => {
        const data_follow = {id: props.props.id}
        try {
            const response = await fetch(`http://localhost:8000/api/user/follow/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_follow)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.error}`);
            }

            const data = await response.json();
            setIsFriend(false);
            setNumberFollowers(numberFollowers - 1);


        } catch (error) {
            console.error(error);
        }
    }

    /// display followes, following
    const[openFollowers, setOpenFollowers] = useState(false);
    const handleOpenFollowers = () => setOpenFollowers(true);
    const handleCloseFollowers = () => setOpenFollowers(false);

    const[openFollowing, setOpenFollowing] = useState(false);
    const handleOpenFollowing = () => setOpenFollowing(true);
    const handleCloseFollowing = () => setOpenFollowing(false);

    /// info followers
    const[followersInformation, setFollowersInformation] = useState([]);
    useEffect(() => {
        const fetchFollowersInfo = async () => {
            try {
                const promises = followers.map(async (followerId) => {
                    const response = await fetch(`http://localhost:8000/api/auth/user_details/?id=${followerId}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (!response.ok) {
                        throw new Error(`Error fetching data for follower ID ${followerId}`);
                    }

                    const data = await response.json();
                    return data;
                });

                const results = await Promise.all(promises);
                setFollowersInformation(results);

            } catch (error) {
                console.error('Failed to fetch follower information:', error);
            }
        };

        fetchFollowersInfo();

    }, [followers]);

    const [followingInformation, setFollowingInformation] = useState([]);
    useEffect(() => {
        const fetchFollowingInfo = async () => {
            try {
                const promises = following.map(async (followingId) => {
                    const response = await fetch(`http://localhost:8000/api/auth/user_details/?id=${followingId}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (!response.ok) {
                        throw new Error(`Error fetching data for follower ID ${followingId}`);
                    }

                    const data = await response.json();
                    return data;
                });

                const results = await Promise.all(promises);
                setFollowingInformation(results);

            } catch (error) {
                console.error('Failed to fetch follower information:', error);
            }
        };

        fetchFollowingInfo();

    }, [following]);

    ///redirect to user page
    const handleRedirectUserProfile = (id) => {
        window.location.href = `http://localhost:3000/profile?visit=${id}`;
    }

    return ( 
        <div className="details flex flex-col ml-20 mb-12 gap-1">
            <div className="flex flex-col mt-12">
                <div className='flex'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={faUsers} className='text-primary-gray mt-1 mr-2'/>
                        <p className='font-semibold cursor-pointer' onClick={handleOpenFollowers}>Followers {numberFollowers} </p>
                    </div>
                    <div className='ml-10 flex'>
                        <FontAwesomeIcon icon={faUserPlus} className='text-primary-gray mt-1 mr-2'/>
                        <p className='font-semibold cursor-pointer' onClick={handleOpenFollowing}>Following {numberFollowing}</p>
                    </div>
                </div>
                <div className='flex mt-4'>
                    <p className="text-2xl font-semibold">{props.props.name}</p>
                    {/* Folow/Edit */}
                    {
                        !props.props.visiting ? 
                            <button className='bg-primary-black flex items-center justify-center ml-6 p-2 rounded-full  hover:bg-primary-black-blue' onClick={handleOpen}>
                                <FontAwesomeIcon icon={faPen} className='text-primary-white'/>
                            </button> : !isFriend ? 
                                <button className='bg-primary-black flex items-center justify-center ml-6 p-2 rounded-full  hover:bg-primary-black-blue' onClick={handleFollow}>
                                    <FontAwesomeIcon icon={faPlus} className='text-primary-white ml-2'/>
                                    <span className='text-primary-white ml-2 mr-2'>Follow user</span>
                                </button> : 
                                <button className='bg-primary-black flex items-center justify-center ml-6 p-2 rounded-full  hover:bg-primary-black-blue' onClick={handleUnfollow}>
                                    <FontAwesomeIcon icon={faCheck} className='text-primary-white ml-2'/>
                                    <span className='text-primary-white ml-2 mr-2'>Unfollow user</span>
                                </button>
                    }

                </div>
            </div>
            <p className="text-sm text-primary-black mt-2">{props.props.status}</p>
            <p className="text-sm text-primary-black">
                <FontAwesomeIcon icon={faLocationArrow} className='text-primary-gray mr-2'/>
                {props.props.city}, {props.props.country}
                <FontAwesomeIcon icon={faPhone} className='text-primary-gray ml-10 mt-1 mr-2'/>
                {props.props.phone}
                <FontAwesomeIcon icon={faEnvelope} className='text-primary-gray ml-10 mt-1 mr-2'/>
                {props.props.email}
            </p>

            <Modal keepMounted  open={open} onClose={handleClose}>
                <div className="modal-edit-profile fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md h-4/5 w-2/5 flex flex-col items-center">
                    <div className="menu-edit flex justify-evenly w-full border-b-4 border-primary-black-blue pb-2">
                        <button className='font-semibold hover:bg-primary-gray p-2 rounded-xl' onClick={handleProfilephoto}>Profile photo</button>
                        <button className='font-semibold hover:bg-primary-gray p-2 rounded-xl' onClick={handleBackgroundphoto}>Cover photo</button>
                        <button className='font-semibold hover:bg-primary-gray p-2 rounded-xl' onClick={handleDetails}>Details</button>
                    </div>
                    {
                        profilePhoto ? <ChangePhotoComponent /> :
                            backgroundPhoto ? <ChangeBackgroundComponent /> :
                                details ? <ChangeDetailsComponent props={props.props} /> : <div>minus</div>
                    }
                </div>
            </Modal>

            <Modal keepMounted  open={openFollowers} onClose={handleCloseFollowers}>
                <div className="modal-followers fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white pt-4 pb-4 rounded-md shadow-md h-4/5 w-2/6 flex flex-col">
                    <div className='w-full border-b-2 border-primary-black flex items-center justify-center'>
                        <FontAwesomeIcon icon={faUsers} className='text-primary-black mb-2 mr-2'/>
                        <p className='font-semibold text-lg text-primary-black mb-2'>Followers</p>
                    </div>
                    
                    <div className='mt-6 ml-10 overflow-auto'>
                        {
                            followersInformation ?
                                followersInformation.map((user, index) =>(
                                    <div key={index} className='flex justify-between' >
                                        <div className='flex mt-4 w-2/3 cursor-pointer'>
                                            <Avatar alt={user.data.name} src={user.profile.profile_image} sx={{ width: 56, height: 56 }}></Avatar>
                                            <div className='ml-6'>
                                                <p className='text-lg font-semibold'>{user.data.name}</p>
                                                <div className='flex mt-1'>
                                                    <FontAwesomeIcon icon={faCompass} className='text-primary-black mb-2 mr-2'/>
                                                    <p className='font-thin text-sm'>{user.profile.city}, {user.profile.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-1/3 items-center'>
                                            {
                                                user.data.id == ownerUser ?
                                                    <div className='text-sm mt-4'>(Me)</div>:
                                                    <button className='bg-primary-black p-2 mt-4 mr-2 rounded-xl text-primary-white hover:bg-primary-black-blue' onClick={() => handleRedirectUserProfile(user.data.id)}>
                                                        <FontAwesomeIcon icon={faEye} className='text-primary-white mr-2'/>
                                                        View profile
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                )) : <div></div>
                        }
                    </div>
                </div>
            </Modal>

            <Modal keepMounted  open={openFollowing} onClose={handleCloseFollowing}>
                <div className="modal-following fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white pt-4 pb-4 rounded-md shadow-md h-4/5 w-2/6 flex flex-col">
                        <div className='w-full border-b-2 border-primary-black flex items-center justify-center'>
                            <FontAwesomeIcon icon={faUserPlus} className='text-primary-black mb-2 mr-2'/>
                            <p className='font-semibold text-lg text-primary-black mb-2'>Following</p> 
                        </div>

                        <div className='mt-6 ml-10 overflow-auto'>
                            {
                                followingInformation ? 
                                    followingInformation.map((user, index) =>(
                                        <div key={index} className='flex cursor-pointer'>
                                        <div className='flex w-2/3 cursor-pointer'>
                                            <Avatar alt={user.data.name} src={user.profile.profile_image} sx={{ width: 56, height: 56 }}></Avatar>
                                            <div className='ml-6'>
                                                <p className='text-lg font-semibold'>{user.data.name}</p>
                                                <div className='flex mt-1'>
                                                    <FontAwesomeIcon icon={faCompass} className='text-primary-black mb-2 mr-2'/>
                                                    <p className='font-thin text-sm'>{user.profile.city}, {user.profile.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-1/3 items-center '>
                                            {
                                                user.data.id == ownerUser ?
                                                    <div className='text-sm mt-1'>(Me)</div>:
                                                    <button className='bg-primary-black p-2 mt-2 mr-2 rounded-xl text-primary-white hover:bg-primary-black-blue' onClick={() => handleRedirectUserProfile(user.data.id)}>
                                                        <FontAwesomeIcon icon={faEye} className='text-primary-white mr-2'/>
                                                        View profile
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                    )) : <div></div>
                            }
                        </div>
                </div>
            </Modal>

        </div>
    );
}
 
export default DetailComponent;