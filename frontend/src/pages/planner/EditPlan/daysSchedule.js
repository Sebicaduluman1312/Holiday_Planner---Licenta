import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useDrop } from 'react-dnd';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'



const ItemTypes = {
    IMAGE: 'image',
};

const ItemAlready = ({image, onDrop, onDelete, id, content}) => {

    const urlParams = new URLSearchParams(window.location.search);


    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.IMAGE,
        drop: (item) => {
            onDrop(item.dest);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [saveItem, setSaveItem] = useState(true);
    const [startHour, setStartHour] = useState(content.start_hour);
    const [endHour, setEndHour] = useState(content.end_hour);
    const [description, setDescription] = useState(content.description);
    const [idItem, setIdItem] = useState(content.id);
    const [photoLocation, setPhotoLocation] = useState(content.photo);
    const [eraseItem, setEraseItem] = useState(false);

    const handleChangeStartHour = (event) => {
        setStartHour(event.target.value);
    };

    const handleChangeEndHour = (event) => {
        setEndHour(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleSaveItem = async (idItem) => {
        setSaveItem(true);
        const url = 'http://localhost:8000/api/planner/itinerary_item/';
        const dataToSend = {
            'itinerary': id,
            'photo': photoLocation,
            'location': content.location,
            'description': description,
            'start_hour': startHour,
            'end_hour': endHour,
            'id_item': idItem
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Data saved successfully:', result);
            setIdItem(result.id);

        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    const handleEdit = () => {
        setSaveItem(false);
        setDescription(null);
        setEndHour(null);
        setStartHour(null);
    }

    const handleDelete = async () => {
        
        const url = 'http://localhost:8000/api/planner/itinerary_item/';
        const dataToSend = {
            'itinerary': id,
            'photo': content.photo,
            'location': content.name,
            'description': description,
            'start_hour': startHour,
            'end_hour': endHour,
            'id_item': idItem
        };

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error('Error saving data:', error);
        }
        setEraseItem(true);
    
    }


    return (
       !eraseItem ?     
       <div className='flex mb-6' ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
            <div className='w-1/4 bg-primary-black-blue h-40 rounded-xl'>
                {content.photo && <img src={content.photo} alt="" className="h-full w-full object-cover rounded-lg" />}
            </div>
            <div className='flex-col ml-10 w-3/4'>
                {
                    content.photo ? 
                        <div className='flex items-center justify-between'> 
                            <h1 className='font-semibold mb-2'>{content.location}</h1> 
                            {
                                !urlParams.has('visit') ?
                                <div>
                                    <FontAwesomeIcon icon={faPen} className='text-primary-black mb-2 cursor-pointer mr-2' onClick={handleEdit}/>
                                    <FontAwesomeIcon icon={faTrash} className='mb-2 cursor-pointer ml-2 text-red-500' onClick={() => {onDelete();  handleDelete(idItem); }}/>
                                </div> : <></>
                            }

                        </div>
                    : <></>
                }
                <div className="hour">
                {
                    saveItem ?
                        <div className='flex items-center mb-1'>
                            <FontAwesomeIcon icon={faClock} className='text-primary-black'/>
                            <p className='text-sm font-bold ml-2 text-primary-gray'>{startHour} - {endHour}</p>
                        </div> :
                        <div className='flex mb-4'>
                            <span>Start: </span>
                            <input type="text" name="" id="" className='w-20 ml-2 rounded-md border border-primary-black mr-10 pl-2' onChange={handleChangeStartHour}/>
                            <span>End: </span>
                            <input type="text" name="" id="" className='w-20 ml-2 rounded-md border border-primary-black pl-2' onChange={handleChangeEndHour} />
                        </div>
                }
                </div>
                {
                    saveItem ? <p className='ml-4 text-sm'>{description}</p> : 
                        <input type="text" className='border border-primary-black text-sm p-2 rounded-md w-full mb-2' placeholder='What do you want to do here..' onChange={handleChangeDescription} />
                }
                {
                    !saveItem ? <button color="primary" onClick={() => handleSaveItem(idItem)} className='text-primary-white bg-primary-black-blue hover:bg-primary-black p-2 rounded-xl text-sm'>Save item</button> : <></>
                }
            </div>
        </div> : <></>
    );


}

const Item = ({ image, onDrop, onDelete, id }) => {

    const urlParams = new URLSearchParams(window.location.search);


    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.IMAGE,
        drop: (item) => {
            onDrop(item.dest);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [saveItem, setSaveItem] = useState(null);
    const [startHour, setStartHour] = useState(null);
    const [endHour, setEndHour] = useState(null);
    const [description, setDescription] = useState(null);
    const [idItem, setIdItem] = useState(null);

    const handleChangeStartHour = (event) => {
        setStartHour(event.target.value);
    };

    const handleChangeEndHour = (event) => {
        setEndHour(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleSaveItem = async (idItem) => {
        setSaveItem(true);
        const url = 'http://localhost:8000/api/planner/itinerary_item/';
        const dataToSend = {
            'itinerary': id,
            'photo': image.photo_url,
            'location': image.name,
            'description': description,
            'start_hour': startHour,
            'end_hour': endHour,
        };

        if(idItem){
            dataToSend['id_item'] = idItem;
        }


        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Data saved successfully:', result);
            setIdItem(result.id);

        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    const handleEdit = () => {
        setSaveItem(false);
        setDescription(null);
        setEndHour(null);
        setStartHour(null);
    }

    const handleDelete = async () => {
        if (saveItem) {
            const url = 'http://localhost:8000/api/planner/itinerary_item/';
            const dataToSend = {
                'itinerary': id,
                'photo': image.photo_url,
                'location': image.name,
                'description': description,
                'start_hour': startHour,
                'end_hour': endHour,
            };

            if(idItem){
                dataToSend['id_item'] = idItem;
            }

            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log(result);

            } catch (error) {
                console.error('Error saving data:', error);
            }
        }

    }
    return (
        <div className='flex mb-6' ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
            <div className='w-1/4 bg-primary-black-blue h-40 rounded-xl'>
                {image && <img src={image.photo_url} alt="" className="h-full w-full object-cover rounded-lg" />}
            </div>
            <div className='flex-col ml-10 w-3/4'>
                {
                    image ? 
                        <div className='flex items-center justify-between'> 
                            <h1 className='font-semibold mb-2'>{image.name}</h1> 
                            <div>
                                <FontAwesomeIcon icon={faPen} className='text-primary-black mb-2 cursor-pointer mr-2' onClick={handleEdit}/>
                                <FontAwesomeIcon icon={faTrash} className='mb-2 cursor-pointer ml-2 text-red-500' onClick={() => {onDelete();  handleDelete(idItem); }}/>
                            </div>

                        </div>
                    : <></>
                }
                <div className="hour">
                {
                    saveItem ?
                        <div className='flex items-center mb-1'>
                            <FontAwesomeIcon icon={faClock} className='text-primary-black'/>
                            <p className='text-sm font-bold ml-2 text-primary-gray'>{startHour} - {endHour}</p>
                        </div> :
                        <div className='flex mb-4'>
                            <span>Start: </span>
                            <input type="text" name="" id="" className='w-20 ml-2 rounded-md border border-primary-black mr-10 pl-2' onChange={handleChangeStartHour}/>
                            <span>End: </span>
                            <input type="text" name="" id="" className='w-20 ml-2 rounded-md border border-primary-black pl-2' onChange={handleChangeEndHour} />
                        </div>
                }
                </div>
                {
                    saveItem ? <p className='ml-4 text-sm'>{description}</p> : 
                        <input type="text" className='border border-primary-black text-sm p-2 rounded-md w-full mb-2' placeholder='What do you want to do here..' onChange={handleChangeDescription} />
                }
                {
                    !saveItem ? <button color="primary" onClick={() => handleSaveItem(idItem)} className='text-primary-white bg-primary-black-blue hover:bg-primary-black p-2 rounded-xl text-sm'>Save item</button> : <></>
                }
            </div>
        </div>
    );
};

const DayAccordion = ({ day, items, onDrop, addItem, deleteItem }) => {    
    const [title, setTitle] = useState(null);
    const [summary, setSummary] = useState(null);
    const [save, setSave] = useState(false);
    const [alreadyExistContent, setAlreadyExistContent] = useState([]);
    const [itineraryId, setItineraryId] = useState(null);


    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    }

    const handleEditData = () => {
        setSave(false);
    }

    useEffect(() => {
        async function fetchDetailsItinerary() {
            
            let url2 = '';

            if (urlParams.has('visit')) {

                const paramValue = urlParams.get('visit');
                url2 = `http://localhost:8000/api/planner/itinerary/?plan=${plan}&day=${day}&visit=${paramValue}`;
        
            } else {
                url2 = `http://localhost:8000/api/planner/itinerary/?plan=${plan}&day=${day}`;
            }
        

            const response = await fetch(url2, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if ('message' in result) {
            } else {
                setTitle(result.title);
                setSummary(result.summary);
                setItineraryId(result.id);
                setSave(true);

                async function fetchDetailsItinerary(id) {
            
                    const response = await fetch(`http://localhost:8000/api/planner/itinerary_item/?itinerary=${id}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
        
                    const result = await response.json();
                    setAlreadyExistContent(result);
                }
        
                fetchDetailsItinerary(result.id);
            }
        }

        fetchDetailsItinerary();
    }, [day]);

    const handleSaveData = async () => {
        setSave(true);
        const url = 'http://localhost:8000/api/planner/itinerary/';
        const dataToSend = {
            'plan': plan,
            'title': title,
            'summary': summary,
            'day': day
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Data saved successfully:', result);

        } catch (error) {
            console.error('Error saving data:', error);
        }

    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${day}-content`}
                id={`panel${day}-header`}
            >
                <span className='text-primary-black-blue'>Day {day}</span>
            </AccordionSummary>
            <AccordionDetails>
                <div className='flex flex-col'>
                    {
                        save ? <h1 className='font-semibold text-lg flex justify-between items-center'>Summary - {title}
                            {
                                !urlParams.has('visit') ? <FontAwesomeIcon icon={faPen} className='text-primary-black mb-2 cursor-pointer mr-2' onClick={handleEditData}/> : <></>
                            } 
                        </h1> : !urlParams.has('visit') ? 
                            <input type="text" placeholder='Set title..' onChange={handleChangeTitle} className='border border-primary-black mb-2 p-2 rounded-md'/>
                            : <div className='font-bold'>No title yet...</div>
                    }
                    {
                        save ? <p className='mt-2 mb-6 text-sm'>{summary}</p> : 
                            !urlParams.has('visit') ? <textarea name="" id="" placeholder='Write a description for this day..' onChange={handleChangeSummary} className='border border-primary-black p-2 mb-2 rounded-md'></textarea>
                            : <div className='text-sm mt-2'>No summary yet...</div>

                    }
                    {
                        !save && !urlParams.has('visit') ? <Button variant="contained" color="primary" onClick={handleSaveData} sx={{marginBottom:"20px", width: '20%'}}>Save data</Button> : <></>
                    }
                    {
                        alreadyExistContent.length > 0 ? 
                            alreadyExistContent.map((item, index) => (
                                <ItemAlready  key={index} image={item.photo} onDrop={(image) => onDrop(day, index, image)}  onDelete={() => deleteItem(day, index)} id={itineraryId} content={item}/>
                            ))
                        : <></> 
                    }
                    {
                        items.map((item, index) => (
                            <Item  key={index} image={item.image} onDrop={(image) => onDrop(day, index, image)}  onDelete={() => deleteItem(day, index)} id={itineraryId}/>
                        )) 
                    }

                    {
                        !urlParams.has('visit') ?
                        <Button variant="contained" color="primary" onClick={() => addItem(day)}>
                            Add Item
                        </Button> : <></>
                    }
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

const DaysComponent = () => {
    const [data, setData] = useState(null);
    const [initialDayItems, setInitialDayItems] = useState({});
    const [dayItems, setDayItems] = useState({});
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');

    let url = '';
    
    if (urlParams.has('visit')) {

        const paramValue = urlParams.get('visit');
        url = `http://localhost:8000/api/planner/get_days/?day=${plan}&visit=${paramValue}`;

    } else {
        url = `http://localhost:8000/api/planner/get_days/?day=${plan}`;
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                setData(result);

                let days_items = {};
                const days = result.number_of_days; 
                for (let i = 1; i <= days; i++) {
                    days_items[`${i}`] = [];
                }

                setInitialDayItems(days_items); 
                setDayItems(days_items);
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        }

        fetchData();
    }, []);
        

    const handleDrop = (day, index, image) => {
        setDayItems(prev => {
            const updatedItems = [...prev[day]];
            updatedItems[index] = { ...updatedItems[index], image: image };
            return {
                ...prev,
                [day]: updatedItems
            };
        });
    };

    const addItem = (day) => {
        setDayItems(prev => ({
            ...prev,
            [day]: [...prev[day], { image: null }]
        }));
    };

    const deleteItem = (day, index) => {
        setDayItems(prev => {
            const updatedItems = prev[day].filter((_, i) => i !== index);
            return {
                ...prev,
                [day]: updatedItems
            };
        });
    };


    return (
        <div className='w-2/3 mt-4 mb-4'>
            {data ? (
                Array.from({ length: data.number_of_days }, (_, i) => (
                    <DayAccordion
                        key={i + 1}
                        day={i + 1}
                        items={dayItems[i + 1]}
                        onDrop={handleDrop}
                        addItem={addItem}
                        deleteItem={deleteItem}
                    />
                ))
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default DaysComponent;