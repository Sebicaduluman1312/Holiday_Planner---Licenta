import SlidingImages from "../sign-up/sliding-images";
import SignInForm from "./sign-in-form";

const SignIn = () => {
    return ( 
        <div className="sign-in-hero h-screen w-screen flex">
            <SlidingImages />
            <SignInForm />
        </div>
     );
}
 
export default SignIn;