import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const CustomRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#0077C0', 
    },
    '& .MuiRating-iconHover': {
      color: '#0077C0', 
    },
    '& .MuiRating-iconEmpty': {
      color: '#0077C0', 
    },
  });

const ReviewContainer = ({reviews}) => {

    return ( 
        <div className="h-80 w-full bg-primary-white rounded-2xl mt-4 p-4 shadow-xl overflow-auto border border-primary-black">
            {
                reviews ?
                    reviews
                    .slice(1)
                    .map((review, index) => (
                        <div key={index} className="review w-full p-4 overflow-hidde border border-primary-black rounded-xl mb-2 ">
                            <div className="flex items-center w-full justify-between">
                                <div className="font-semibold ml-2 flex items-center">
                                    <Avatar className='mr-2' sx={{ bgcolor: '#0077C0' }}>HP</Avatar>

                                    {
                                        review.name ? review.name : <span>Forsquare user</span>
                                    }
                                </div>
                                <CustomRating name="half-rating-read" defaultValue={3.5} precision={0.5} className='text-primary-black' readOnly />
                            </div>
                            <div className="content text-sm mt-2 ml-4">
                                {review.text}
                            </div>

                        </div>
                    )) 
                : <div></div>
            }
        </div>
    );
}
 
export default ReviewContainer;