import backVideo from '../../assets/video/background-home.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faHotel, faUtensils, faToriiGate } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { autocompleteFunction } from '../../utils/autocomplete';
import AutocompleteModal from "./modalAutocomplete";


const SearchComponent = () => {

    ///Criterial Search
    const criterialObjects = {
        'Search all' : faGlobe,
        'Hotels' : faHotel,
        'Restaurants' : faUtensils,
        'Things to do' : faToriiGate
    };

    const criterialNames = Object.keys(criterialObjects);

    ///Autocomplete
    const [inputValue, setInputValue] = useState('');
    const [autocompleteDestinations, setAutocompleteDestinations] = useState([]);


    const handleInputValue = (event) => {
        setInputValue(event.target.value);
    }

    const fetchAutocompleteData = async () => {
        if (inputValue.length > 2) {
            try {
                const generatedDestinations = await autocompleteFunction(inputValue);
                const newAutocompleteDestinations = Object.values(generatedDestinations);
                setAutocompleteDestinations(newAutocompleteDestinations);
            } catch (error) {
                console.error('Error fetching autocomplete data', error)
            }
        }
        else {
            setAutocompleteDestinations([]);
        }
    }
    
    useEffect(() => {
        fetchAutocompleteData();
    }, [inputValue]);

    ///Modal Autocomplete
    const [modalOn, setModalOn] = useState(false);
    const [blackFilter, setBlackFilter] = useState(false);


    const handleInputFocus = () => {
        setModalOn(true);
        setBlackFilter(true);
    }

    const handleInputDefocus = () => {
        setModalOn(false);
    }


    ///Search fetch
    const [isClicked, setIsClicked] = useState(null);
    const handleFilterCategory = (item) => {
        if (isClicked === item) {
            setIsClicked(null);
        }
        else {
            setIsClicked(item);
        }
    }

    console.log(isClicked);

    return ( 
        <div className={`h-screen w-5/6 flex flex-col items-center mt-10 rounded-xl relative `}>
            <div className="video-background h-3/4 w-full bg-black shadow-md rounded-xl z-1 flex flex-col justify-center items-center relative" >
                <video className='videoTag w-full h-full object-cover rounded-xl absolute'  
                    autoPlay 
                    loop 
                    muted 
                    style={{ filter: 'linear-gradient(rgba(0, 119, 192, 0.3), rgba(0, 119, 192, 0.3))' }}
                >
                    <source src={backVideo} type='video/mp4' />
                </video>
                <div className="video-filter h-full w-full absolute rounded-xl" style={{ backgroundImage: `linear-gradient(rgba(0, 119, 192, 0.4), rgba(0, 119, 192, 0.4))` }}>
                </div>

                <p className="text-primary-white font-semibold relative">All you need is HP</p>   
                <p className="text-5xl  font-semibold text-primary-white relative">Explore Beautiful Places</p>
            </div>
            <div className="search-bar h-1/4 w-4/6 bg-primary-white-blue bg-opacity-80 rounded-xl z-2 transform -translate-y-1/2 relative shadow-xl flex flex-col justify-center items-center">
                
                <div className="criterial-search w-2/3 flex justify-between mb-4 relative">
                    {
                        criterialNames.map((item, index) => (
                            <div key={index} className={`text-primary-black font-semibold cursor-pointer hover:bg-primary-white p-2 rounded-md ${isClicked == item ? 'bg-primary-white': ''}`} onClick={() => handleFilterCategory(item)}>
                                <FontAwesomeIcon icon={criterialObjects[item]} style={{color: "#0077C0"}} className='mr-2' />
                                {item}
                            </div>
                            
                        ))
                    }
                </div>
                
                <div id='cover' className='w-5/6 h-1/3 bg-primary-black-blue flex items-center justify-center p-1 mt-4 rounded-md shadow-xl'>
                    <div className="search-area w-full h-5/6 flex items-center justify-center">
                        <svg className='h-8 w-16 bg-primary-black-blue rounded-md' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#fafafa" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                        <input type="text" placeholder='Places to go, hotels, restaurants...' className='w-full h-full text-md font-semibold px-2 outline-none shadow-xl rounded-l-md bg-primary-white relative' onChange={handleInputValue} onFocus={handleInputFocus} onBlur={handleInputDefocus}/>
                        <div className="h-full w-20 mr-2 bg-primary-white rounded-r-md flex items-center justify-center">
                            <div className='h-2/3 w-2/3  fill-current hover:bg-primary-black-blue hover:text-primary-white transition-colors duration-300 cursor-pointer rounded-md flex items-center justify-center'>
                                <svg className='p-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AutocompleteModal destinations={autocompleteDestinations} modalOn={modalOn}/>

        </div>
     );
}
 
export default SearchComponent;
