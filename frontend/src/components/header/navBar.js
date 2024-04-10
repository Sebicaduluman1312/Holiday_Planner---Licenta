import './header.css';
import { NavLink } from 'react-router-dom';
import {X, Menu} from 'lucide-react'
import { useState } from 'react';


const NavLinks = () => {
    
    const loggedOutLinks = ['About', 'Reviews', 'Contact', 'Sign up'];
    const loggedInLinks = ['Explore', 'Comunity Trips', 'Settings'];
    let loggedIn = false;  

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return ( 
        loggedIn ?
            loggedInLinks.map((link, index) => (
                <NavLink to="/" key={index}>
                    <button className='links text-sm text-primary-white font-medium'>{link}</button>
                </NavLink>
            )) :
            loggedOutLinks.map((link, index) => ( 
                link === 'Sign up' ? 
                    <NavLink to='/sign-up' key={index}>
                        <button className='links text-sm font-medium' > {link} </button>
                    </NavLink> :

                    <button key={index} className='links text-sm font-medium' onClick={() => scrollToSection(`section-${link}`)} >{link}</button>
            )) 
    );
}
 

const Nav = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const toggle = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            <nav className="flex justify-end  w-1/3 mr-10">
                <div className="hidden justify-between w-full md:flex">
                    <NavLinks />
                </div>
                <div className='md:hidden'>
                    <button onClick={toggle}>
                        {openMenu ? <X className='X'/> : <Menu className='Menu'/>}
                    </button>
                </div>
            </nav>
            {
                openMenu && (
                    <div className="flex basis-full flex-col items-center">
                        <NavLinks />
                    </div>
                )
            }
        </>

    );
}
 
export default Nav;