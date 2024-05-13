import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEnvelope, faThumbsUp, faClipboard, faPhone, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import LikedDestinationsComponent from './likedDestionationsComponent';

const ExtraInfo = (props) => {

    const [planSection, setPlanSection] = useState(false);
    const [destinationsSection, setDestinationSection] = useState(false);
    const [likedPlanSection, setLikedPlanSection] = useState(false);
    const [postSection, setPostSection] = useState(false);


    const handleUserPlans = () => {
        setPlanSection(true);
        setDestinationSection(false);
        setLikedPlanSection(false);
        setPostSection(false);
    }

    const handleUserDestinations = () => {
        setPlanSection(false);
        setDestinationSection(true);
        setLikedPlanSection(false);
        setPostSection(false);
    }

    const handleUserLikedPlans = () => {
        setPlanSection(false);
        setDestinationSection(false);
        setLikedPlanSection(true);
        setPostSection(false);
    }

    const handleUserPosts = () => {
        setPlanSection(false);
        setDestinationSection(false);
        setLikedPlanSection(false);
        setPostSection(true);
    }



    return (
        <div className="w-screen flex">
            <div className="extra-infos w-2/6 flex flex-col items-left justify-start bg-primary-gray gap-4 pl-16 pr-16 rounded-tr-xl">
                <div className="flex items-center justify-between mt-4">
                    <div className="font-semibold">
                        <FontAwesomeIcon icon={faUsers} className='text-primary-black mr-2'/>
                        Followers 0
                    </div>
                    <div className="font-semibold">
                        <FontAwesomeIcon icon={faUserPlus} className='text-primary-black mr-2'/>
                        Following 0
                    </div>
                </div>
                <div className="text-sm">
                    <FontAwesomeIcon icon={faEnvelope} className='text-primary-black mr-2'/>
                    {props.email}
                </div>
                <div className="text-sm mb-4">
                    <FontAwesomeIcon icon={faPhone} className='text-primary-black mr-2'/>
                    {props.phone}
                </div>

                {
                    destinationsSection ? 
                        <div>Filter your destinations</div> : <div></div>

                }

            </div>
            <div className="category-section w-4/6 flex flex-col">
                <div className="h-10 bg-primary-white flex place-items-center justify-evenly">
                    <div className='hover:bg-primary-gray p-2 rounded-xl cursor-pointer' onClick={handleUserPlans}>
                        <FontAwesomeIcon icon={faEnvelope} className='text-primary-black mr-2'/>
                        My plans
                    </div>
                    <div className='hover:bg-primary-gray p-2 rounded-xl cursor-pointer' onClick={handleUserDestinations}>
                        <FontAwesomeIcon icon={faHeart} className='text-primary-black mr-2'/>
                        Liked destinations
                    </div>
                    <div className='hover:bg-primary-gray p-2 rounded-xl cursor-pointer' onClick={handleUserLikedPlans}>
                        <FontAwesomeIcon icon={faThumbsUp} className='text-primary-black mr-2'/>
                        Liked plans
                    </div>
                    <div className='hover:bg-primary-gray p-2 rounded-xl cursor-pointer' onClick={handleUserPosts}>
                        <FontAwesomeIcon icon={faClipboard} className='text-primary-black mr-2'/>
                        My Posts
                    </div>
                </div>

                {
                    planSection ? 
                        <div>Plan</div> : destinationsSection ? 
                            <LikedDestinationsComponent /> : likedPlanSection ? 
                                <div>Liked plans</div> : postSection ? 
                                    <div>My post</div> : <div>Nimic</div>
                }

            </div>
        </div>
    );
}
 
export default ExtraInfo;