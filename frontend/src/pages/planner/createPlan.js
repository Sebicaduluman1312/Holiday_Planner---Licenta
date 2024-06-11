import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

import { supabase } from '../../setup/supabase/supabaseClient';

const CreatePlan = () => {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState('');

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileURL, setFileURL] = useState("");

    /// create plan 
    const handleSavePlan = async () => {
        const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';

        const newPlan = {
            destination: destination,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            description: description,
            image_url: fileURL,
        };

        console.log(newPlan);

        ///fetch to create plan
        const url = 'http://localhost:8000/api/planner/create_plan/'
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlan),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            ///href to pagina de creare efectiva
            window.location.href=`http://localhost:3000/planner/edit?plan=${data.id}`;

        } catch (error) {
            console.error('Error saving plan:', error);
        }
    };

    /// upload photo
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            try {
                setUploading(true);

                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { data, error } = await supabase.storage
                    .from('Planner')
                    .upload(filePath, selectedFile);

                if (error) {
                    throw error;
                }

                const { data: publicURLData, error: urlError } = await supabase.storage
                    .from('Planner')
                    .getPublicUrl(filePath);

                if (urlError) {
                    throw urlError;
                } 

                setFileURL(publicURLData.publicUrl);

            } catch (error) {
                alert("Error uploading file: " + error.message);
            } finally {
                setUploading(false);
            }
        }
    };

    return ( 
        <div className="h-full w-1/2 border border-primary-black rounded-xl ml-2 p-2">
            <h1 className="text-2xl font-semibold ml-2 mt-2 text-primary-black-blue">Create a New Plan</h1>
            <div className="form-create-plan flex flex-col p-4">
                <p className="text-sm font-semibold">Destination</p>
                <input 
                    type="text" 
                    placeholder="Enter destination" 
                    className="w-full mt-2 p-2 border border-primary-black rounded-md text-sm"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />

                <div className="date flex justify-between mt-6">
                    <div className="w-1/2">
                        <p className="text-sm font-semibold mb-2">Start Date</p>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd.mm.yyyy"
                            className='border border-primary-black p-2 rounded-xl text-sm'
                        />
                    </div>
                    <div className="w-1/2">
                        <p className="text-sm font-semibold mb-2">End Date</p>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd.mm.yyyy"
                            className='border border-primary-black p-2 rounded-xl text-sm'
                        />
                    </div>
                </div>

                <div className="description mt-6">
                    <p className="text-sm font-semibold">Description</p>
                    <textarea 
                        className='w-full mt-2 rounded-xl border border-primary-black h-20 p-4 text-sm' 
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className='flex justify-between'>
                    <div className='w-1/2 h-36 bg-primary-white-blue rounded-xl mt-4 flex items-center justify-center'>
                        {
                            !fileURL ? 
                                <>
                                    <label 
                                        htmlFor="file-upload" 
                                        className='cursor-pointer rounded-md bg-primary-white p-2 hover:bg-primary-black-blue hover:text-primary-white'
                                    >
                                        <FontAwesomeIcon icon={faImage} className='mr-2'/>
                                        <span className='rounded-md'>Upload photo</span>
                                    </label>
                                    <input 
                                        id="file-upload" 
                                        type="file" 
                                        style={{ display: 'none' }} 
                                        onChange={handleFileChange}
                                    />
                                </> : <img src={fileURL} className='rounded-md h-full w-full object-fill'/>
                        }
                    </div> 
                    <div className='w-1/2'>
                        <button 
                            className='mt-4 ml-6 bg-primary-black p-2 text-primary-white rounded-xl w-5/6 hover:bg-primary-black-blue' 
                            onClick={handleSavePlan}
                        >
                            Save Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CreatePlan;
