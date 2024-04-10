import GetStarted from "./get-started";
import About from "./about";
import Reviews from "./reviews";
import ContactUs from "./contact";
import NavBar from "../../components/header/header";

const MainPageContent = () => {
    return ( 
        <div className="hero-container w-full h-full bg-primary-white">
            <NavBar />
            <GetStarted />
            <About />
            <Reviews />
            <ContactUs />
        </div>
     );
}
 
export default MainPageContent;