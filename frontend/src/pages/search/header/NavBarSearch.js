import { Link } from "react-router-dom";
import logo from "../../../assets/brand/logo4.png";
import { logOut } from "../../../utils/auth";
import { useHistory } from 'react-router-dom';


const NavBarSearch = () => {

    const history = useHistory();

    const handleLogoImage = () => history.push('/home');
    const handleLogOut = () => logOut();


    return ( 
        <div className="nav-elements w-5/6 mx-auto flex items-center justify-evenly mt-6">
            <div className="logo w-1/3 flex justify-start items-center">
                <img src={logo} alt="logo_photo" className='h-12 w-12 p-1  bg-primary-black-blue rounded-lg cursor-pointer' onClick={handleLogoImage}/>
                <h1 className="ml-4 text-primary-black-blue text-xl font-bold">HP</h1>
                <div>
                    <input type="text" placeholder="Type here a new location" className="border h-8 border-gray-300 focus:border-primary outline-none rounded-md px-3 py-2 w-80 ml-10" />
                </div>
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
 
export default NavBarSearch;