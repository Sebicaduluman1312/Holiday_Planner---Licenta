import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUmbrellaBeach, faHotel, faUtensils, faCoffee, faLandmark, faTree, faCartPlus, faPalette} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const Categories = () => {

    const history = useHistory();
    const originalURL = window.location.href;

    const handleClickCategory = (event) => {
        let text = event.target.textContent;

           

        text = text.substring(0, text.length - 1);

        const startIndex = originalURL.indexOf('category=') + 'category='.length;
        const endIndex = originalURL.indexOf('&', startIndex);


        if(text === 'Attraction'){
            const modifiedURL = originalURL.substring(0, startIndex) + 'all' + originalURL.substring(endIndex);
            window.location.href = modifiedURL;

        } else if(text === 'Arts and entertainmen'){
            const modifiedURL = originalURL.substring(0, startIndex) + 'arts_entertainment' + originalURL.substring(endIndex);
            window.location.href = modifiedURL;
        } else {
            const modifiedURL = originalURL.substring(0, startIndex) + text.toLowerCase() + originalURL.substring(endIndex);
            window.location.href = modifiedURL;
        }

    };

    return ( 
        <div className="flex w-5/6 p-4 items-center justify-start gap-10 border-2 border-primary-black mt-2 rounded-md mb-2">

            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faUmbrellaBeach} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Attractions</span>
            </div>
            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faHotel} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Hotels</span>
            </div>
            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faUtensils} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Restaurants</span>
            </div>
            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faCoffee} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Cafes</span>
            </div>
            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faLandmark} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Museums</span>
            </div>
            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faTree} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Parks</span>
            </div>
            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faCartPlus} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Supermarkets</span>
            </div>
            <div className="cursor-pointer hover:text-primary-black-blue">
                <FontAwesomeIcon icon={faPalette} style={{color: "#0077C0"}} className='mr-2' />
                <span onClick={handleClickCategory}>Arts and entertainment</span>
            </div>
            
        </div>
    );
}
 
export default Categories;