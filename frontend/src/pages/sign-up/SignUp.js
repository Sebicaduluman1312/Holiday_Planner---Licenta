import SignUpForm from "./sign-up-form";
import SlidingImages from "./sliding-images";

const SignUp = () => {
    return ( 
        <div className="sign-up-hero h-screen w-screen flex">
            <SignUpForm />
            <SlidingImages />
        </div>
     );
}
 
export default SignUp;