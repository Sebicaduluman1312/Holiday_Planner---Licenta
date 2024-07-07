import PlansComponent from "../planner/plansContainer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const UserPlansComponent = () => {

    const [listPlans, setListPlans] = useState([]);

    let url = '';
    
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);

    if (urlParams.has('visit')) {

        const paramValue = urlParams.get('visit');
        url = `http://localhost:8000/api/planner/create_plan/?visit=${paramValue}`;

    } else {
        url = 'http://localhost:8000/api/planner/create_plan/';
    }


    useEffect(() => {
        const fetchGetPlans = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setListPlans(data);
                
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchGetPlans();
    },[]);


    const handleDeletePlan = async (id_plan) => {
        const url = 'http://localhost:8000/api/planner/create_plan/';
        const data_delete = {plan_id: id_plan};
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_delete)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    };

    const handleRedirectToPlan = (id_plan) => {
        if (urlParams.has('visit')) {
            const paramValue = urlParams.get('visit');
            window.location.href=`http://localhost:3000/planner/edit?plan=${id_plan}&visit=${paramValue}`;
        }
        else {
            window.location.href=`http://localhost:3000/planner/edit?plan=${id_plan}`;
        }
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    return ( 
        <div className="plans-section p-10 flex flex-col gap-6 bg-primary-white-blue rounded-xl items-center mb-10">
            {
                listPlans ? 
                    listPlans.map((plan, index) => (
                        <div key={index} className="plan flex w-full h-44 bg-primary-white border border-primary-black rounded-xl shadow-md mb-6">
                            <div className="h-full w-1/4 bg-primary-black rounded-tl-xl rounded-bl-xl">
                                <img src={plan.image_url} alt="" className="h-full w-full rounded-tl-xl rounded-bl-xl"/>
                            </div>
                            <div className="h-full w-3/4 rounded-tr-xl rounded-br-xl ml-6">
                                <div className="flex justify-between w-full">
                                    <p className="mt-2 ml-2 font-semibold text-lg">{plan.destination}</p>
                                    <div className="flex mr-2 mt-4 text-xs font-semibold text-primary-gray">
                                        <p>{formatDate(plan.start_date)} -&nbsp;</p>
                                        <p>{formatDate(plan.end_date)}</p>
                                    </div>
                                </div>
                                <p className="mt-4 ml-2 text-sm w-5/6 h-20 overflow-auto mr-2">{plan.description}</p>
                                <div className="flex items-center justify-end">
                                    <button className="mr-2 border p-1 rounded-xl text-sm pl-4 pr-4 bg-primary-black text-primary-white hover:bg-primary-black-blue" onClick={() => handleRedirectToPlan(plan.id)}>Details</button>
                                    {
                                        urlParams.has('visit') ? 
                                        <></> : 
                                        <FontAwesomeIcon icon={faTrash} className='ml-4 mr-4 text-red-500 cursor-pointer' onClick={() => handleDeletePlan(plan.id)}/>

                                    }
                                </div>

                            </div>
                        </div>
                    ))
                    : <div></div>
                } 
        </div>
    );
}
 
export default UserPlansComponent;