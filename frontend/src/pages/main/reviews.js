const Reviews = () => {
    return ( 
        <div className="review-container bg-primary-black flex flex-col items-center justify-center">
            <h1 className="text-5xl text-primary-white font-bold mt-5">Reviews</h1>
            <div className="cards-container mt-10 w-full">
                <li className="reviews flex text-primary-white w-full items-center justify-evenly h-60 mb-20">
                    <ul className="w-60 h-60 bg-primary-white rounded-lg">
                        <div className="item1">item1</div>
                    </ul>
                    <ul className="w-60 h-60 bg-primary-white rounded-lg">
                        <div className="item2">item2</div>
                    </ul>
                    <ul className="w-60 h-60 bg-primary-white rounded-lg">
                        <div className="item3">item3</div>
                    </ul>
                </li>
            </div>
        </div>
     );
}
 
export default Reviews;