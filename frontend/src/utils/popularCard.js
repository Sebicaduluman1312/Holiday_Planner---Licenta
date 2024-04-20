const PopularCard = (props) => {

    const details = props.details;

    return ( 
        <div className="destination h-80 w-80  bg-primary-black-blue rounded-lg flex flex-col items-center relative">
            <div className="image-location h-full w-full rounded-lg overflow-hidden">
                <img src={details.photo_url} alt="photo_destination" className="h-full w-full object-cover rounded-lg"/>
            </div>
            <div className="data-about-location h-full w-full rounded-lg flex flex-col absolute top-0 left-0 bottom-0 right-0" >
                <div className="other-details w-full flex justify-between items-center p-2 text-sm font-semibold text-primary-white">
                    <div className="category h-full w-1/2">
                        <div className="flex h-1/2 items-center">
                            <img src={details.category_icon} alt="category_icon" className="h-1/2"/>
                            {details.destination_category}
                        </div>

                    </div>
                    <div className="location h-full w-1/2 flex flex-col items-end">
                        <div className="h-1/2 flex justify-center items-center">
                            <p>{details.locality}</p>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full flex justify-between items-end popular-namep-2">
                    <p className="text-xl text-primary-white p-4 font-semibold">{details.name} - {details.country}</p>
                </div>
            </div>
        </div>
     );
}
 
export default PopularCard;