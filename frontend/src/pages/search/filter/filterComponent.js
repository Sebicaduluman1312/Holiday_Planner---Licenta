import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faBusinessTime, faChurch, faUtensilSpoon, faWineGlass, faCalendar, faShieldVirus, faMosque, faInfo, faVolleyballBall, faBus } from '@fortawesome/free-solid-svg-icons';

import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Radio from '@mui/joy/Radio';


const bussiness_children = [{
    id: '11000',
    label: 'Busisness and Professional Services',
    children: [
        {id: '11021', label: 'Business Center'},
        {id: '10069', label: 'Laundry Service'},
        {id: '11040', label: 'Factory'},
        {id: '11009', label: 'Automotive Service'},
    ]
}]

const comunity_children = [{
    id: '12000',
    label: 'Community and Government',
    children: [
        {id: '12101', label: 'Church'},
        {id: '12013', label: 'College and University'},
        {id: '12064', label: 'Government Building'},
        {id: '12092', label: 'Public bathroom'},
    ]
}]

const dining_children = [{
    id: '13000',
    label: 'Dining',
    children: [
        {id: '13052', label: 'Food Court'},
        {id: '13062', label: 'Night Market'},
        {id: '13064', label: 'Pizzeria'},
        {id: '13099', label: 'Chineese Food'},
    ]
}]

const drinking_children = [{
    id: '13003',
    label: 'Drinking',
    children: [
        {id: '13389', label: 'Irish Pub'},
        {id: '13009', label: 'Cocktail Bar'},
        {id: '13015', label: 'Karaoke Bar'},
        {id: '13006', label: 'Beer Bar'},
    ]
}]

const events_children = [{
    id: '14000',
    label: 'Events',
    children: [
        {id: '14005', label: 'Music Festival'},
        {id: '14003', label: 'Entertainment'},
        {id: '14013', label: 'Street Food Gathering'},
        {id: '14015', label: 'Other'},
    ]
}]

const health_children = [{
    id: '15000',
    label: 'Health',
    children: [
        {id: '15014', label: 'Hospital'},
        {id: '15027', label: 'Physician'},
        {id: '15026', label: ' Physical Therapy Clinic'},
        {id: '15016', label: 'Medical Center'},
    ]
}]

const landmark_children = [{
    id: '16000',
    label: 'Landmark',
    children: [
        {id: '16004', label: 'Bike Trail'},
        {id: '16011', label: 'Castle'},
        {id: '16017', label: 'Garden'},
        {id: '16019', label: 'Hiking Trail'},
    ]
}]

const retail_children = [{
    id: '17000',
    label: 'Retail',
    children: [
        {id: '17018', label: 'Bookstore'},
        {id: '17029', label: 'Convenience Store'},
        {id: '17039', label: 'Fashion Retail'},
        {id: '17089', label: 'Gift Store'},
    ]
}]

const sport_children = [{
    id: '18000',
    label: 'Sports and recreation',
    children: [
        {id: '18067', label: 'Water Sports'},
        {id: '18081', label: 'Sauna'},
        {id: '18077', label: 'Gym'},
        {id: '18086', label: 'Fishing Area'},
    ]
}]

const travel_children = [{
    id: '19000',
    label: 'Travel and transport',
    children: [
        {id: '19002', label: 'Bike Rental'},
        {id: '19007', label: 'Fuel Station'},
        {id: '19055', label: 'Travel Agency'},
        {id: '19066', label: 'Train'},
    ]
}]



const FilterComponent = () => {
    
    const [businessSelectedIds, setBusinessSelectedIds] = useState([]);
    const [communitySelectedIds, setCommunitySelectedIds] = useState([]);
    const [diningSelectedIds, setDiningSelectedIds] = useState([]);
    const [drinkingSelectedIds, setDrinkingSelectedIds] = useState([]);
    const [eventsSelectedIds, setEventsSelectedIds] = useState([]);
    const [healthSelectedIds, setHealthSelectedIds] = useState([]);
    const [landmarkSelectedIds, setLandmarkSelectedIds] = useState([]);
    const [retailSelectedIds, setRetailSelectedIds] = useState([]);
    const [sportSelectedIds, setSportSelectedIds] = useState([]);
    const [travelSelectedIds, setTravelSelectedIds] = useState([]);

    const handleFilterCategories = (event, nodeIds, category) => {
        switch (category) {
            case 'business':
                setBusinessSelectedIds(nodeIds);
                break;
            case 'community':
                setCommunitySelectedIds(nodeIds);
                break;
            case 'dining':
                setDiningSelectedIds(nodeIds);
                break;
            case 'drinking':
                setDrinkingSelectedIds(nodeIds);
                break;
            case 'events':
                setEventsSelectedIds(nodeIds);
                break;
            case 'health':
                setHealthSelectedIds(nodeIds);
                break;
            case 'landmark':
                setLandmarkSelectedIds(nodeIds);
                break;
            case 'retail':
                setRetailSelectedIds(nodeIds);
                break;
            case 'sport':
                setSportSelectedIds(nodeIds);
                break;
            case 'travel':
                setTravelSelectedIds(nodeIds);
                break;
            default:
                break;
        }
    };


    /// Sorting
    const [selectedValue, setSelectedValue] = useState('Popularity');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    /// Submit
    const handleFilterSubmit = () => {
        const selectedIds = [
            ...businessSelectedIds,
            ...communitySelectedIds,
            ...diningSelectedIds,
            ...drinkingSelectedIds,
            ...eventsSelectedIds,
            ...healthSelectedIds,
            ...landmarkSelectedIds,
            ...retailSelectedIds,
            ...sportSelectedIds,
            ...travelSelectedIds
        ];
        console.log(selectedIds);
        console.log(selectedValue);
    };


    return (
        <div className="w-1/4 h-100 bg-primary-white-blue rounded-xl flex flex-col items-center mt-8">
            <div className="text-xl mt-4">
                <FontAwesomeIcon icon={faFilter} className='mr-2' />Filter your searches
            </div>
            <div className="w-full categories flex flex-col items-left mt-4 p-4 text-sm">
                <h2 className='text-l font-semibold'>Type of destination:</h2>

                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faBusinessTime} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={bussiness_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'business')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faChurch} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={comunity_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'community')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faUtensilSpoon} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={dining_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'dining')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faWineGlass} style={{ height: '15px', width: '20px' }} /> 
                    <RichTreeView multiSelect checkboxSelection items={drinking_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'drinking')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faCalendar} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={events_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'events')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faShieldVirus} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={health_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'health')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faMosque} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={landmark_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'landmark')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>
                
                
                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faInfo} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={retail_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'retail')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faVolleyballBall} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={sport_children} onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'sport')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faBus} style={{ height: '15px', width: '20px' }} />
                    <RichTreeView multiSelect checkboxSelection items={travel_children}  onSelectedItemsChange={(event, nodeIds) => handleFilterCategories(event, nodeIds, 'travel')} sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '0.875rem',
                        },
                    }}/>
                </div>

                <h2 className='text-l font-semibold mt-4'>Sort by:</h2>
                <div className='options flex justify-between items-center'>
                    <div>
                        <Radio
                            checked={selectedValue === 'POPULARITY'}
                            onChange={handleChange}
                            value="POPULARITY"                                               
                            name="radio-buttons"
                            slotProps={{ input: { 'aria-label': 'POPULARITY' } }}
                        />
                        <span className='ml-2'>Popularity</span>
                    </div>
                    <div>
                        <Radio
                            checked={selectedValue === 'RELEVANCE'}
                            onChange={handleChange}
                            value="RELEVANCE"
                            name="radio-buttons"
                            slotProps={{ input: { 'aria-label': 'RELEVANCE' } }}
                        />
                        <span className='ml-2'>Relevance</span>
                    </div>
                </div>
            </div>
            <button className='mb-4 bg-primary-black-blue p-2 pr-4 pl-4 text-primary-white rounded-xl' onClick={handleFilterSubmit}>Submit</button>
        </div>
    );
};

export default FilterComponent;
