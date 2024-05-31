import { useEffect, useState } from "react";

const DescriptionComponent = ({locality, name}) => {
    const description_object = {
        city: locality,
        location: name
    };
    const [description, setDescription] = useState(null);

    useEffect(() => {

        const fetchDescription = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/search/description/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(description_object)
                });

                if(!response.ok) {
                    throw new Error(`Error: ${response.error}`);
                }

                const data = await response.json();
                setDescription(data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchDescription();
    }, [locality, name]);


    return ( 
        <div className="h-full w-2/6 ml-10 mt-10 border border-primary-black-blue rounded-xl p-6 pb-12">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <div className="w-full h-96 text-left text-sm overflow-auto">
                {description ? (
                    <p>{description.data}</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
 
export default DescriptionComponent;