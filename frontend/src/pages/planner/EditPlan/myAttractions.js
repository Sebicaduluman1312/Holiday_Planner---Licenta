import React, { useState, useEffect } from "react";
import { useDrag } from 'react-dnd';

const ItemTypes = {
    IMAGE: 'image',
};

const DraggableImage = ({ dest }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.IMAGE,
        item: { dest },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="h-40 w-full rounded-lg"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <img
                src={dest.photo_url}
                alt=""
                className="h-full w-full object-cover rounded-lg"
            />
        </div>
    );
};

const LikedLocations = () => {
    const [selectedDay, setSelectedDay] = useState('');
    const [destinations, setDestinations] = useState([]);

    const url = `http://localhost:8000/api/user/like/`;
    const handleChange = (event) => {
        setSelectedDay(event.target.value);
    };

    useEffect(() => {
        const fetchLikedDestinations = async () => {
            await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error('Problem fetch API for liked destinations!');
                    return response.json()
                })
                .then(data => {
                    setDestinations(data.message);
                })
                .catch(error => {
                    console.error('Problem fetch: ', error)
                });
        }

        fetchLikedDestinations();
    }, []);

    return (
        <div className="w-1/3 mt-4 ml-2 mb-4 flex flex-col" style={{ height: '700px' }}>
            <div className="h-full flex w-full flex-col items-center ml-6">
                <h1 className="font-semibold text-lg mb-2">Drag a location to your plan</h1>
                <div className="h-full w-full border border-primary-black rounded-xl grid grid-cols-2 gap-4 p-4 overflow-auto">
                    {
                        destinations.map((dest, index) => (
                            <DraggableImage key={index} dest={dest} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default LikedLocations;
