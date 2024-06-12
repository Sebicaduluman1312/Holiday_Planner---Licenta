import { useEffect, useState } from "react";
import { MapContainer, TiteLayer, useMap, Polygon, TileLayer } from "react-leaflet";


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { autocompletePlanner } from "../../../utils/autocompletePlanner";

const MapSearchComponent = () => {

    const [position,setPosition] = useState([47.1585, 27.6014]);
    const [keyCounter, setKeyCounter] = useState(0);


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
            console.log('Bounding Box Polygon String:', polygonString);
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



    return ( 
        <div className="w-5/6 bg-primary-white mt-6 rounded-xl flex">
            <div className="map w-4/6 h-full bg-primary-black-blue">
                <MapContainer key={keyCounter} center={position} zoom={16} style={{ height: "600px", width: "100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                    <BoundingBox />
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
                <button className="mt-4 rounded-md p-2 bg-primary-black-blue text-primary-white hover:bg-primary-black">
                    Search Attractions
                </button>
                <div className="h-1/2 w-5/6 mt-12 rounded-xl border border-primary-black">

                </div>
            </div>
        </div>
    );
}
 
export default MapSearchComponent;