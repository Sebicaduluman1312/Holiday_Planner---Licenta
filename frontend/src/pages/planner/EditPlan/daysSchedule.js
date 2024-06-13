import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useDrop } from 'react-dnd';
import { useState } from 'react';

const ItemTypes = {
    IMAGE: 'image',
};

const Item = ({ image, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.IMAGE,
        drop: (item) => {
            onDrop(item.dest);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [saveItem, setSaveItem] = useState(false);
    const [startHour, setStartHour] = useState(null);
    const [endHour, setEndHour] = useState(null);
    const [description, setDescription] = useState(null);

    const handleChangeStartHour = (event) => {
        setStartHour(event.target.value);
    };

    const handleChangeEndHour = (event) => {
        setEndHour(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleSaveItem = () => {
        setSaveItem(false);
    }

    return (
        <div className='flex mb-6' ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
            <div className='w-1/4 bg-primary-black-blue h-40 rounded-xl'>
                {image && <img src={image.photo_url} alt="" className="h-full w-full object-cover rounded-lg" />}
            </div>
            <div className='flex-col ml-10 w-3/4'>
                {
                    image ? <h1 className='font-semibold mb-2'>{image.name}</h1> : <></>
                }
                <div className="hour">
                {
                    saveItem ?
                        <p>{startHour} - {endHour}</p> :
                        <div className='flex mb-4'>
                            <span>Start: </span>
                            <input type="text" name="" id="" className='w-20 ml-2 rounded-md border border-primary-black mr-10 pl-2' onChange={handleChangeStartHour}/>
                            <span>End: </span>
                            <input type="text" name="" id="" className='w-20 ml-2 rounded-md border border-primary-black pl-2' onChange={handleChangeEndHour} />
                        </div>
                }
                </div>
                {
                    saveItem ? <p>{description}</p> : 
                        <input type="text" className='border border-primary-black text-sm p-2 rounded-md w-full mb-2' placeholder='What do you want to do here..' onChange={handleChangeDescription} />
                }
                {
                    !saveItem ? <button color="primary" onClick={handleSaveItem} className='text-primary-white bg-primary-black-blue hover:bg-primary-black p-2 rounded-xl text-sm'>Save item</button> : <></>
                }
            </div>
        </div>
    );
};

const DayAccordion = ({ day, items, onDrop, addItem }) => {
    const [title, setTitle] = useState(null);
    const [summary, setSummary] = useState(null);
    const [save, setSave] = useState(false);


    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    }

    const handleSaveData = () => {
        setSave(true);
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
                        save ? <h1 className='font-semibold text-lg'>Summary - {title}</h1> :
                            <input type="text" placeholder='Set title..' onChange={handleChangeTitle} className='border border-primary-black mb-2 p-2 rounded-md'/>
                    }
                    {
                        save ? <p className='mt-2 mb-6 text-sm'>{summary}</p> : 
                            <textarea name="" id="" placeholder='Write a description for this day..' onChange={handleChangeSummary} className='border border-primary-black p-2 mb-2 rounded-md'></textarea>

                    }
                    {
                        !save ? <Button variant="contained" color="primary" onClick={handleSaveData} sx={{marginBottom:"20px", width: '20%'}}>Save data</Button> : <></>
                    }
                    {items.map((item, index) => (
                        <Item key={index} image={item.image} onDrop={(image) => onDrop(day, index, image)} />
                    ))}
                    <Button variant="contained" color="primary" onClick={() => addItem(day)}>
                        Add Item
                    </Button>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

const DaysComponent = () => {
    const initialDayItems = {
        1: [],
        2: []
    };

    const [dayItems, setDayItems] = useState(initialDayItems);

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

    ///fetch pentru numarul de zile ca sa fac acordeoanele

    return (
        <div className='w-2/3 mt-4 mb-4'>
            <DayAccordion day={1} items={dayItems[1]} onDrop={handleDrop} addItem={addItem} />
            <DayAccordion day={2} items={dayItems[2]} onDrop={handleDrop} addItem={addItem} />
        </div>
    );
}

export default DaysComponent;
