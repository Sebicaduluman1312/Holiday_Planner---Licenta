import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEnvelope, faThumbsUp, faClipboard, faPhone, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import LikedDestinationsComponent from './likedDestionationsComponent';
import UserPlansComponent from './userPlansComponent';
import LikedPlans from './likedPlansComponent';

const ExtraInfo = (props) => {

    const urlParams = new URLSearchParams(window.location.search);

    const [planSection, setPlanSection] = useState(false);
    const [destinationsSection, setDestinationSection] = useState(false);
    const [likedPlanSection, setLikedPlanSection] = useState(true);


    const handleUserPlans = () => {
        setPlanSection(true);
        setDestinationSection(false);
        setLikedPlanSection(false);
    }

    const handleUserDestinations = () => {
        setPlanSection(false);
        setDestinationSection(true);
        setLikedPlanSection(false);
    }

    const handleUserLikedPlans = () => {
        setPlanSection(false);
        setDestinationSection(false);
        setLikedPlanSection(true);
    }


    return (
        <div className="w-screen flex flex-col items-center bg-primary-white mt-2">
            <div className="category-section w-5/6 flex flex-col">
                <div className="h-10 bg-primary-white flex place-items-center justify-evenly mb-4">
                    <div className='hover:bg-primary-gray p-2 rounded-xl cursor-pointer' onClick={handleUserPlans}>
                        <FontAwesomeIcon icon={faEnvelope} className='text-primary-black mr-2'/>
                        My plans
                    </div>
                    <div className='hover:bg-primary-gray p-2 rounded-xl cursor-pointer' onClick={handleUserLikedPlans}>
                        <FontAwesomeIcon icon={faHeart} className='text-primary-black mr-2'/>
                        Liked destinations
                    </div>
                    {
                        !urlParams.has('visit') ? <div className='hover:bg-primary-gray p-2 rounded-xl cursor-pointer' onClick={handleUserDestinations}>
                        <FontAwesomeIcon icon={faThumbsUp} className='text-primary-black mr-2'/>
                        Liked plans
                        </div> : <></>
                    }
                </div>

                {
                    planSection ? 
                        <UserPlansComponent /> : likedPlanSection ? 
                            <LikedDestinationsComponent /> : destinationsSection ? 
                                <LikedPlans/> : <></>
                }

            </div>
        </div>
    );
}
 
export default ExtraInfo;