import SignUp from "./sign-up";
import About from "./about";
import Reviews from "./reviews";
import ContactUs from "./contact";

const MainPageContent = () => {
    return ( 
        <div className="hero-container w-full h-full bg-primary-white">
            <SignUp />
            <About />
            <Reviews />
            <ContactUs />
        </div>
     );
}
 
export default MainPageContent;