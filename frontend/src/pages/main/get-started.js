const GetStarted = () => {


    return ( 
        <div className="sign-up-container flex p-10 bg-primary-white-blue">
            <div className="left-sign-up w-1/2 flex flex-col justify-center items-left">
                <h1 className="text-5xl text-left text-primary-black font-bold mt-20">Plan your perfect holiday</h1>
                <p className="text-left mt-2 text-primary-black">Find the best destinations, create your plan, and make unforgettable memories.</p>
                <div className="email-section mt-5 flex items-center justify-left mb-20">
                    <input className="border border-gray-500 w-1/2 rounded-md px-4 py-2" type="text" placeholder="Enter your email"/> 
                    <button className="px-4 py-2 bg-primary-black text-primary-white font-semibold rounded-md ml-5 hover:bg-primary-black-blue">Sign Up</button>
                </div>
            </div>
            <div className="right-sign-up w-1/2 ml-5 bg-primary-white h-96">

            </div>

        </div>
     );
}
 
export default GetStarted;