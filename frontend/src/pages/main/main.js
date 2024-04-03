import GetStarted from "./get-started";
import About from "./about";
import Reviews from "./reviews";
import ContactUs from "./contact";

const MainPageContent = () => {
    return ( 
        <div className="hero-container w-full h-full bg-primary-white">
            <GetStarted />
            <About />
            <Reviews />
            <ContactUs />
        </div>
     );
}
 
export default MainPageContent;