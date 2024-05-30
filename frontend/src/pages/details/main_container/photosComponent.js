import { useState } from "react";
import { Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const PhotoComponent = ({ photos, name }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainPhoto, setMainPhoto] = useState(photos[0]);


    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    if (!photos || !photos.length) {
        return <div>No photos available</div>;
    }

    const handleChangePhoto = (photo) => {
        setMainPhoto(photo);
    }

    return (
        <div className="mt-10 w-4/6 ml-4 flex bg-primary-white">
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={photos[0]}
                    alt="photo"
                    style={{ height: "500px", width: "600px", objectFit: "cover" }}
                    className="rounded-tl-2xl rounded-bl-2xl cursor-pointer"
                />
                {isHovered && (
                    <button
                        className="absolute inset-0 flex items-center justify-center w-full h-full border-3 border-primary-white bg-black bg-opacity-50 text-white text-lg font-semibold hover:bg-opacity-50 transition duration-300 cursor-pointer rounded-tl-2xl rounded-bl-2xl"
                        onClick={handleOpen}
                    >
                        View Gallery
                    </button>
                )}
                <Modal
                    open={isModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    className="flex items-center justify-center"
                >
                    <div className="h-4/5 w-4/5 bg-primary-white rounded-xl overflow-auto flex flex-col">
                        <div className="flex h-20 items-center justify-between pl-6 pt-6 pr-6 pb-2 border-b-2 border-primary-black">
                            <p className="font-semibold">Photos for {name}</p>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className="photos flex flex-grow overflow-hidden">
                            <div className="actual_photo h-full w-3/5 bg-primary-white p-4">
                                <img src={mainPhoto} alt="" className="object-cover h-full w-full rounded-xl"/>
                            </div>
                            <div className="galery h-full w-2/5 bg-primary-white ml-2 overflow-auto">
                                <div className="grid grid-cols-2 gap-2 p-4">
                                    {photos.map((item, index) => (
                                        <div key={index} className="w-full h-full relative overflow-hidden rounded-md cursor-pointer">
                                            <img
                                                src={item}
                                                alt={`photo-${index}`}
                                                className="object-cover h-full w-full"
                                            />
                                            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-50 transition-opacity duration-300" onClick={() => handleChangePhoto(item)}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="flex flex-col ml-1 justify-between" style={{ height: "500px" }}>
                {photos.slice(1, 4).map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`photo-${index}`}
                        style={{ height: "165px", width: "200px", objectFit: "cover" }}
                        className={`hover:brightness-75 transition duration-300 cursor-pointer ${index === 0 ? 'rounded-tr-2xl' : ''} ${index === 2 ? 'rounded-br-2xl' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default PhotoComponent;
