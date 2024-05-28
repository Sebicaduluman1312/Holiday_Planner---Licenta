import { Link } from "react-router-dom";
import logo from "../../../assets/brand/logo4.png";
import { logOut } from "../../../utils/auth";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { autocompleteFunction } from '../../../utils/autocomplete';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const NavBarSearch = () => {

    const history = useHistory();

    const handleLogoImage = () => history.push('/home');
    const handleLogOut = () => logOut();

    ///autocomplete
    const [inputValue, setInputValue] = useState('');
    const [autocompleteDestinations, setAutocompleteDestinations] = useState([]);


    const handleInputValue = (event) => {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        const fetchAutocompleteData = async () => {
            if (inputValue.length > 2) {
                try {
                    const generatedDestinations = await autocompleteFunction(inputValue);
                    const newAutocompleteDestinations = Object.values(generatedDestinations);
                    const removeDuplicates = [... new Set(newAutocompleteDestinations)];
                    setAutocompleteDestinations(removeDuplicates);
                } catch (error) {
                    console.error('Error fetching autocomplete data', error)
                }
            }
            else {
                setAutocompleteDestinations([]);
            }
        }
    
        fetchAutocompleteData();
    }, [inputValue]);

    let options = [];
    autocompleteDestinations.map((value) => {
        options.push({ label: value});
    });

    ///redirect 
    const handleSelectedValue = (event, value) => {
        let city = value.label;
        const location = city.split(',')[0].trim();
        history.push(`/search?category=all&location=${location}`);
        window.location.href = `http://localhost:3000/search?category=all&location=${location}`;
    };

    return ( 
        <div className="nav-elements w-5/6 mx-auto flex items-center justify-evenly mt-6">
            <div className="logo w-1/3 flex justify-start items-center">
                <img src={logo} alt="logo_photo" className='h-12 w-12 p-1  bg-primary-black-blue rounded-lg cursor-pointer' onClick={handleLogoImage}/>
                <h1 className="ml-4 text-primary-black-blue text-xl font-bold">HP</h1>
                <Autocomplete
                disablePortal
                options={options}
                onChange={handleSelectedValue}
                sx={{ width: 500, height: 1/2, top: 0, left: 0 }}
                renderInput={(params) => <TextField {...params} onChange={handleInputValue} sx={{ width: 500, marginLeft: 4, height: 1/2 }}
                label="New location" />}
                />
            </div>
            <div className="settings w-1/3 flex items-center justify-end ">
                <button className="text-sm text-primary-black-blue font-semibold mr-6">
                    <Link to='/profile'>Profile</Link>
                </button>
                <button className="text-sm text-primary-white font-semibold  bg-primary-black-blue rounded-lg px-8 py-2" onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    );
}
 
export default NavBarSearch;