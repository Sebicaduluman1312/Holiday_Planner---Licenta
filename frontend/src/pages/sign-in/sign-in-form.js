import logo from "../../assets/brand/logo4.png";
import { Link } from 'react-router-dom';
import './style.css'
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { incorrectPasswEmailNotification } from "../../utils/notifications";

const SignInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userData = {
        "email": email,
        "password": password
    }
    const url = 'http://localhost:8000/api/auth/login/'

    const loginAccountFetch = () => {
        fetch(url,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if(response.ok)
                return response.json();
            else if(response.status === 401)
                throw new Error('Authentification failed');
            else 
                throw new Error('Server error');

        })
        .then(data => {
            window.location.href = '/home';
        })
        .catch(error => {
            if (error.message === 'Authentification failed') {
                incorrectPasswEmailNotification();
            } else {
                console.error('Problem fetch: ', error)
            }
        })

    }


    return (  
        <div className="left-side w-full md:w-1/2 flex flex-col items-center bg-primary-white">
            <ToastContainer/>
             <div className="logo h-14 w-14 bg-primary-black-blue mb-5 mt-16 rounded-lg">
                <img src={logo} alt="logo_photo" className='h-full w-full p-1'/>
            </div>
            <h1 className="text-2xl text-primary-black font-bold mb-6">Sign in now</h1>
            <div className="flex flex-col w-1/2">

                <div className="text-sm mt-4 font-semibold">Email</div>
                <input type="email" className="input-wrapper border h-10 p-3 mt-2 rounded-md shadow-md text-primary-black focus:outline-none" 
                    value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" />

                <div className="text-sm mt-4 font-semibold">Password</div>
                <input type="password" name="" className="input-wrapper border h-10 p-3 mt-2 rounded-md shadow-md text-primary-black focus:outline-none" 
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

            </div>
            <button className="mt-5 h-10 p-2 w-1/2 border text-primary-white bg-primary-black-blue rounded-lg hover:shadow-md" onClick={loginAccountFetch}>Login into account</button>
            <div className="links-sing-up w-1/2 flex justify-between">
                <Link to="/" className='text-sm mt-5 text-primary-black-blue font-semibold'>Website</Link>
                <Link to="/sign-up" className='text-sm mt-5'>You dont't have an account? <span className='text-primary-black-blue font-semibold'>Sign Up</span></Link>
            </div>
        </div>
    );
}
 
export default SignInForm;