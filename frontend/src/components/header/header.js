import './header.css'
import Logo from "./logo";
import Nav from "./navBar";

const NavBar = () => {

    return (

        <header className="bg-gray-custom nav-bar sitcky top-0 z-[30] flex-wrap mx-auto flex w-full items-center justify-between">
            <Logo />
            <Nav />
        </header>

    );
}
 
export default NavBar;