import logo from '../../assets/brand/logo4.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUpForm = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const  userData = {
        "name" : username,
        "email" : email,
        "password" : password
    };
    const url = 'http://localhost:8000/api/auth/register/';

    const createAccountRequest = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }).then(res => {
            if (!res.ok){
                throw new Error('Network response was not ok!');
            }
            return res.json();
        })
        .then(data => {
            console.log('Response from the server:', data );
            window.location.href = '/sign-in'
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        });
    }

    return ( 
        <div className="left-side w-full md:w-1/2 flex flex-col items-center bg-primary-white">
            <div className="logo h-14 w-14 bg-primary-black-blue mb-5 mt-16 rounded-lg">
                <img src={logo} alt="logo_photo" className='h-full w-full p-1'/>
            </div>
            <h1 className="text-2xl font-bold mb-6">Sign up now</h1>
            <form className="flex flex-col w-1/2">

                <label className="text-sm mt-4 font-semibold">Username</label>
                <input type="text" className="border h-10 p-3 mt-2 rounded-md shadow-md text-primary-black focus:outline-none" value={username} 
                    onChange={(e) => setUserName(e.target.value)} placeholder="enter your username"/>

                <label  className="text-sm mt-4 font-semibold">Email</label>
                <input type="email" className="border h-10 p-3 mt-2 rounded-md shadow-md text-primary-black focus:outline-none" value={email} 
                    onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com"/>

                <label htmlFor="" className="text-sm mt-4 font-semibold">Password</label>
                <input type="password" className="border h-10 p-3 mt-2 rounded-md shadow-md text-primary-black focus:outline-none" value={password}
                   onChange={(e) => setPassword(e.target.value)} placeholder="set your password"/>

                <label htmlFor="" className="text-sm mt-4 font-semibold">Confirm password</label>
                <input type="password" className="border h-10 p-3 mt-2 rounded-md shadow-md text-primary-black focus:outline-none" value={rePassword}
                   onChange={(e) => setRePassword(e.target.value)}  placeholder="verify your password"/>

            </form>
            <button className="mt-5 h-10 p-2 w-1/2 border text-primary-white bg-primary-black-blue rounded-lg hover:shadow-md" onClick={createAccountRequest}>Create Account</button>
            <div className="links-sing-up w-1/2 flex justify-between">
                <Link to="/" className='text-sm mt-5 text-primary-black-blue font-semibold'>Website</Link>
                <Link to="/sign-in" className='text-sm mt-5'>Already have an account? <span className='text-primary-black-blue font-semibold'>Sign In</span></Link>
            </div>
        </div>
     );
}
 
export default SignUpForm;