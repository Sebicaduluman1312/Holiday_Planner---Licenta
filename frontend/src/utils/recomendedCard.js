import Rating from '@mui/material/Rating';

const RecomendedCard = (props) => {

    const handleRedirect = (id) => {
        window.location.href = `http://localhost:3000/details?location=${id}`;
    };


    return ( 
        <div className="w-1/4 h-96 flex flex-col rounded-xl cursor-pointer" onClick={() => handleRedirect(props.details.fsq_id)}>
            <img src={props.details.photo_url} alt="" className="h-3/5 object-cover rounded-xl"/>
            <p className="text-normal font-semibold pl-2 pt-2 pr-2 mt-2">{props.details.name}</p>
            <div className='flex ml-2 mt-1'>
                <div className="h-6 w-6 bg-primary-black-blue">
                    <img src={props.details.category_icon} alt="rounded-xl" />
                </div>
                <p className="text-sm font-normal text-primary-gray pl-2 pb-2 pr-2">{props.details.destination_category}</p>
            </div>
            <Rating name="half-rating-read" defaultValue={props.details.rating/2} precision={0.5} readOnly className='pl-2 pr-2'/>
        </div>
    );
}
 
export default RecomendedCard;