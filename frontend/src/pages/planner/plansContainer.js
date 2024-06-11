const PlansComponent = () => {
    return ( 

        <div className="h-full w-1/2 border border-primary-black rounded-xl mr-2 p-2">
            <h1 className="text-2xl font-semibold ml-2 mt-2 text-primary-black-blue">Your Holiday Plans</h1>
            <div className="h-5/6 w-full overflow-auto mt-4">
                <div className="plan w-full h-40 bg-primary-white-blue rounded-xl shadow-md mb-6">
                    <div className="h-full w-1/3 bg-primary-black rounded-tl-xl rounded-bl-xl">

                    </div>
                </div>
                <div className="plan w-full h-40 bg-primary-white-blue rounded-xl shadow-md mb-6">

                </div>
                <div className="plan w-full h-40 bg-primary-white-blue rounded-xl shadow-md mb-6">

                </div>
                <div className="plan w-full h-40 bg-primary-white-blue rounded-xl shadow-md mb-6">

                </div>
            </div>
        </div>
    
    );
}
 
export default PlansComponent;