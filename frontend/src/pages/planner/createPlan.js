import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';

const CreatePlan = () => {
    const [selectedDate, setSelectedDate] = useState(null);


    return ( 
        <div className="h-full w-1/2 border border-primary-black rounded-xl ml-2 p-2">
            <h1 className="text-2xl font-semibold ml-2 mt-2 text-primary-black-blue">Create a New Plan</h1>
            <div className="form-create-plan flex flex-col p-4">
                <p className="text-sm font-semibold">Destination</p>
                <input type="text" placeholder="Enter destination" className="w-full mt-2 p-2 border border-primary-black rounded-md text-sm"/>

                <div className="date flex justify-between mt-6">
                    <div className="w-1/2">
                        <p className="text-sm font-semibold mb-2">Start Date</p>
                        <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd.mm.yyyy"
                        className='border border-primary-black p-2 rounded-xl text-sm'
                        />
                    </div>
                    <div className="w-1/2">
                        <p className="text-sm font-semibold mb-2">End Date</p>
                        <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd.mm.yyyy"
                        className='border border-primary-black p-2 rounded-xl text-sm'
                         />
                    </div>
                </div>

                <div className="description mt-6">
                    <p className="text-sm font-semibold">Description</p>
                    <textarea name="" id="" className='w-full mt-2 rounded-xl border border-primary-black h-20 p-4 text-sm' placeholder='Enter description'></textarea>
                </div>

                <div className='flex justify-between'>
                    <div className='w-1/2 h-36 bg-black rounded-xl mt-4'>
                    
                    </div> 
                    <div className='w-1/2'>
                        <button className='mt-4 ml-6 bg-primary-black p-2 text-primary-white rounded-xl w-5/6 hover:bg-primary-black-blue'>Save Plan</button>
                    </div>
                </div>
            
            </div>
        </div>
    );
}
 
export default CreatePlan;