import { useState } from "react";
import { Modal } from '@mui/material';


const ProfilePhoto = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
          <div className="profilePhoto h-40 w-40 bg-primary-black-blue ml-40 mb-40  rounded-full border-4 border-white shadow-lg cursor-pointer" onClick={handleOpen}>
            <img src={props.props.photo} alt="" className="h-full w-full rounded-full object-cover"/>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            className="h-screen w-screen flex items-center justify-center"
            >
                <div className="h-4/5 w-1/2 flex items-center justify-center rounded-xl">
                    <img src={props.props.photo} alt="" className="h-full w-full object-contain rounded-xl" />
                </div>                
            </Modal>
        </div>
      );
}
 
export default ProfilePhoto;