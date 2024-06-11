import { Link } from "react-router-dom";
import logo from "../../assets/brand/logo4.png";
import { logOut } from "../../utils/auth";


const NavBar = () => {

    const handleLogOut = () => {
        logOut();
    }

    return (
        <div className="nav-elements w-5/6 mx-auto flex items-center justify-evenly mt-6">
            <div className="logo w-1/3 flex justify-start items-center">
                <img src={logo} alt="logo_photo" className='h-12 w-12 p-1  bg-primary-black-blue rounded-lg'/>
                <h1 className="ml-4 text-primary-black-blue text-xl font-bold">HP</h1>
            </div>
            <div className="flex items-center justify-evenly w-1/3 ">
                <Link to='/home' className='text-sm text-primary-gray font-semibold group relative hover:text-primary-black-blue'>
                    Home
                    <span className="absolute inset-x-0 bottom-[-3px] h-0.5 bg-primary-black-blue transform scale-x-0 transition-transform origin-center group-hover:scale-x-100"></span>
                </Link>
                <Link to='/planner' className='text-sm text-primary-gray font-semibold group relative hover:text-primary-black-blue'>
                    Create plan
                    <span className="absolute inset-x-0 bottom-[-3px] h-0.5 bg-primary-black-blue transform scale-x-0 transition-transform origin-center group-hover:scale-x-100"></span>
                </Link>
                <Link to='/map' className='text-sm text-primary-gray font-semibold group relative hover:text-primary-black-blue'>
                    Map Plan
                    <span className="absolute inset-x-0 bottom-[-3px] h-0.5 bg-primary-black-blue transform scale-x-0 transition-transform origin-center group-hover:scale-x-100"></span>
                </Link>
                <Link to='/blog' className='text-sm text-primary-gray font-semibold group relative hover:text-primary-black-blue'>
                    Blog
                    <span className="absolute inset-x-0 bottom-[-3px] h-0.5 bg-primary-black-blue transform scale-x-0 transition-transform origin-center group-hover:scale-x-100"></span>
                </Link>
            </div>
            <div className="settings w-1/3 flex items-center justify-end ">
                <button className="text-sm text-primary-black-blue font-semibold mr-6">
                    <Link to='/profile'>Profile</Link>
                </button>
                <button className="text-sm text-primary-white font-semibold  bg-primary-black-blue rounded-lg px-8 py-2" onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    );
}
 
export default NavBar;