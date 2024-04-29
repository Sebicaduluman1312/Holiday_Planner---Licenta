import { useHistory } from 'react-router-dom';


const AutocompleteModal = (props) => {
    const destinations = props.destinations;
    let category = props.category;
    const modalOn = props.modalOn;


    const history = useHistory();

    const redirectToSearchPage = (city) => {
        const location = city.split(',')[0].trim();
        
        if (category === 'Search all')
            category = 'all';
        else if (category === 'Hotels')
            category = 'hotel';
        else if (category === 'Restaurants')
            category = 'restaurant';
        else
            category = 'all';


        history.push(`/search?category=${category}&location=${location}`);

    }


    return ( 
        <div className={`autocomplete-modal h-1/3 w-4/6 bg-primary-white rounded-b-md absolute top-3/4 transform translate-y-1/3 overflow-auto ${!modalOn ? 'hidden' : ''}`}>
            {
                destinations.length > 0 && (
                    destinations.map((item, index) => (
                        <div key={index} className="p-4 text-normal font-semibold cursor-pointer hover:bg-primary-black-blue hover:text-primary-white" onClick={() => redirectToSearchPage(item)}>{item}</div>
                    ))
                )
            }
        </div>
     );
}
 
export default AutocompleteModal;