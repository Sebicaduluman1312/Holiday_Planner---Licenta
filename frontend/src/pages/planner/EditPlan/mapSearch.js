import { useEffect, useState } from "react";
import { MapContainer, TiteLayer, useMap, Polygon, TileLayer, Popup, Marker } from "react-leaflet";
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { autocompletePlanner } from "../../../utils/autocompletePlanner";

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';


const MapSearchComponent = () => {

    const [position,setPosition] = useState([47.1585, 27.6014]);
    const [keyCounter, setKeyCounter] = useState(0);
    const [polygonCoordinates, setPolygonCoordinates] = useState("");
    const [mapLocations, setMapLocations] = useState([]);
    const [viewLocation, setViewLocation] = useState(null);

    const BoundingBox = () => {
        const map = useMap();
    
        useEffect(() => {
          const updateBoundingBox = () => {
            const bounds = map.getBounds();
            const bbox = [
              [bounds.getNorthWest().lat, bounds.getNorthWest().lng], // North-West
              [bounds.getNorthEast().lat, bounds.getNorthEast().lng], // North-East
              [bounds.getSouthEast().lat, bounds.getSouthEast().lng], // South-East
              [bounds.getSouthWest().lat, bounds.getSouthWest().lng], // South-West
              [bounds.getNorthWest().lat, bounds.getNorthWest().lng]  // Închide poligonul
            ];
            
            const polygonString = bbox.map(coord => coord.join(',')).join('~');
            setPolygonCoordinates(polygonString);
          };
    
          map.on('moveend', updateBoundingBox);
    
          return () => {
            map.off('moveend', updateBoundingBox);
          };
        }, [map]);
    
        return null;
      };

    /// autocomplete 

    const [inputValue, setInputValue] = useState('');
    const [autocompleteDestinations, setAutocompleteDestinations] = useState([]);


    const handleInputValue = (event) => {
        setInputValue(event.target.value);
    }

    ///actualizare harta
    const handleModifyCoordinates = (event, value) => {
        if (value) {
            setPosition([value.lat, value.lon]);
            setKeyCounter(keyCounter + 1);
        }
    };

    useEffect(() => {
        const fetchAutocompleteData = async () => {
            if (inputValue.length > 2) {
                try {
                    const generatedDestinations = await autocompletePlanner(inputValue);
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
        if (value[1] && value[2]) {
            options.push({ label: value[0], lat: value[1], lon: value[2] });
        }
    });

    ///fetch pentru date

    const icon = L.icon({
        iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
        iconSize: [35, 45], 
        iconAnchor: [15, 15] 
    });

    const handleSearchAttractions = async () => {
        const data_polygon = {polygon: polygonCoordinates };

        const url = `http://localhost:8000/api/planner/map_location/`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_polygon)
            });
    
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setMapLocations(data);
            }
            else{
                throw new Error('Server response not ok.');
            }
    
        }catch (error){
            console.error('Problem to fetch map locations ', error);
    
        }
    }

    /// detalii la click locatie
    const handleClickLocation = (attraction) => {
        setViewLocation(attraction);
    }
    

    /// like 
    const [isLiked, setIsLiked] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const checkIfLocationIsLiked = async () => {
            try{
                const response = await fetch(`http://localhost:8000/api/user/is_liked/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({data: viewLocation}),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                
                if(result.message === 'true')
                    setIsLiked(true);
                else
                    setIsLiked(false);

            } catch (error) {
                console.log(error.message);
            } 
        }
        checkIfLocationIsLiked();
    }, [viewLocation]);


    const handleLikeAction = async (event) => {
        if (event.target.checked) {

            /// Like card
            try {
                const response = await fetch('http://localhost:8000/api/user/like/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({data: viewLocation}),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
            } catch (error) {
                console.log(error.message);
            }
            setIsLiked(true);

        } else {

            /// Dislike card
            try {
                const response = await fetch('http://localhost:8000/api/user/like/', {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({data:viewLocation}),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.log(error.message);
            }
            setIsLiked(false);

        }
    };

    const handleClickDetails = (event) => {
        const id_location  = event.target.id;
        window.location.href = `http://localhost:3000/details?location=${id_location}`;
    };

    return ( 
        <div className="w-5/6 bg-primary-white mt-6 rounded-xl flex">
            <div className="map w-4/6 h-full bg-primary-black-blue">
                <MapContainer key={keyCounter} center={position} zoom={16} style={{ height: "600px", width: "100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                    <BoundingBox />
                    {mapLocations.map((attraction, index) => (
                        <Marker key={index} position={[attraction.lat, attraction.lon]} icon={icon}>
                            <Popup>
                                <div className="h-80 w-60">
                                    <img src={attraction.photo_url} alt="" className="h-2/3 w-full object-cover rounded-xl" />
                                    <div className="flex h-16 justify-between overflow-auto">
                                        <h1 className="font-bold text-lg mt-3">{attraction.name}</h1>
                                        <h1 className="mt-4 text-sm">({attraction.country} {attraction.locality})</h1>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img src={attraction.category_icon} alt="" className="h-6 w-6 bg-primary-black-blue mr-2 rounded-md"/>
                                            <p>{attraction.destination_category}</p>
                                        </div>
                                        <button onClick={() => handleClickLocation(attraction)} className="h-8 w-8 bg-primary-black-blue rounded-full hover:bg-primary-black">
                                            <FontAwesomeIcon icon={faEye} className='text-primary-white rounded-xl p-1 h-full w-full text-2xl'/>
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <div className="menu w-2/6 border-r border-b border-t rounded-tr-xl rounded-br-xl border-primary-black flex flex-col items-center">
                <h1 className="mt-4 mb-4 font-semibold text-xl">Search On Map</h1>
                <div className="flex w-full ml-16 mb-4 text-sm font-bold">
                    <p>Select a new place</p>
                </div>
                <Autocomplete
                disablePortal
                options={options}
                onChange={handleModifyCoordinates}
                isOptionEqualToValue={(option, value) => 
                    option.label === value.label && 
                    option.lat === value.lat && 
                    option.lon === value.lon
                }
                sx={{ width: '90%', height: '10%' }}
                renderInput={(params) => <TextField {...params} onChange={handleInputValue} sx={{ width: '90%', height: '10%', marginLeft: '5%'}}
                label="New location" />}
                />
                <button className="mt-4 rounded-md p-2 bg-primary-black-blue text-primary-white hover:bg-primary-black" onClick={handleSearchAttractions}>
                    Search Attractions
                </button>
                <div className="h-full w-2/3 mt-4 mb-4 rounded-xl border border-primary-black">
                    {
                        viewLocation ? 
                            <div className="h-full w-full">
                                <img src={viewLocation.photo_url} alt="" className="w-full h-60 rounded-xl p-4 object-cover"/>
                                <div className="w-full">
                                    <p className="ml-4 h-6 font-semibold text-md overflow-y-auto">{viewLocation.name}({viewLocation.country}, {viewLocation.locality})</p>
                                    <div className="flex mt-1">
                                        <img src={viewLocation.category_icon} alt="" className="h-6 w-6 rounded-md ml-4 mr-2 bg-primary-black-blue" />
                                        <p className="text-sm">{viewLocation.destination_category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4 mb-4 ml-4">
                                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={handleLikeAction} checked={isLiked} className="h-6 w-6"/>
                                    <Button size="small" id={viewLocation.fsq_id} onClick={handleClickDetails} sx={{marginLeft: "10px"}}>Details</Button>
                                </div>
                            </div> : 
                            <div></div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default MapSearchComponent;