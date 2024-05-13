import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

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
    


    return ( 
        <div className="details flex flex-col ml-20 mb-12 gap-1">
            <div className="flex items-center justify-center">
                <p className="text-2xl font-semibold">{props.props.name}</p>
                <button className='bg-primary-black flex items-center justify-center ml-6 p-2 rounded-full  hover:bg-primary-black-blue' onClick={handleOpen}>
                    <FontAwesomeIcon icon={faPen} className='text-primary-white'/>
                </button>
            </div>
            <p className="text-sm text-primary-black">{props.props.status}</p>
            <p className="text-sm text-primary-black">
                <FontAwesomeIcon icon={faLocationArrow} className='text-primary-gray mr-1'/>
                {props.props.city}, {props.props.country}
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

        </div>
    );
}
 
export default DetailComponent;