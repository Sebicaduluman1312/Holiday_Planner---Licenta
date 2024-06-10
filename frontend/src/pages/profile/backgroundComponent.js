import { useState } from "react";
import { Modal } from '@mui/material';


const BackgroundComponent = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return ( 
        <div className="flex items-center justify-center">
            <div className="background bg-black h-60 w-screen" onClick={handleOpen}>
                <img src={props.photo} alt="" className="h-full w-full object-cover cursor-pointer"/>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            className="h-screen w-screen flex items-center justify-center"
            >
                <div className="h-4/5 w-4/5 flex items-center justify-center rounded-xl">
                    <img src={props.photo} alt="" className="h-full w-full object-cover rounded-xl" />
                </div>                
            </Modal>
        </div>
     );
}
 
export default BackgroundComponent;