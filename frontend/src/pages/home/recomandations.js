const RecomandationComponent = () => {

    //stocam aici destinatiile dupa care le expunem in div



    return ( 
        <div className="recomandation-container flex justify-center items-center flex-col w-full bg-primary-white-blue">
            <div className="recomandation-head mt-10 mb-10 w-5/6 flex justify-between">
                <div className="content-header w-2/5">
                    <p className="text-primary-black font-bold text-2xl">Best destinations</p>
                    <p className="text-primary-black text-md font-normal mt-2">Based on the invaluable insights gathered from the collective experiences of our users, 
                        we've tailored our approach to meet your needs</p>
                </div>
                <div className="move-buttons">
                    <button className="move-left border border-black p-4 mr-10">1</button>
                    <button className="move-right border border-black p-4">2</button>
                </div>
            </div>
            <div className="best-destinations w-5/6 flex items-start justify-between mb-10">
                <div className="destination-1 h-60 w-60  bg-black rounded-lg flex flex-col items-center">
                    <div className="image-location bg-white h-4/5 w-full rounded-lg">

                    </div>
                    <div className="data-about-location h-1/5 w-full rounded-lg" >

                    </div>
                </div>
                <div className="destination-1 h-60 w-60  bg-black rounded-lg flex flex-col items-center">
                    <div className="image-location bg-white h-4/5 w-full rounded-lg">

                    </div>
                    <div className="data-about-location h-1/5 w-full rounded-lg" >

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RecomandationComponent;