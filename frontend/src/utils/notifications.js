import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Flip = require('react-toastify').Flip;
export const emailExistsNotification = () => {
    toast.warn('Email already used!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });            
}

export const unequalPasswordsNotification = () => {
    toast.warn('Passwords dont\'t match!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });  
}

export const incorrectPasswEmailNotification = () => {
    toast.error('Incorrect email or password!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
    });
}