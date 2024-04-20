export const autocompleteFunction = async (string) => {
    const url = `http://localhost:8000/api/search/autocomplete/?string=${string}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok){
            const data = await response.json();
            const destinations = data.destinations;
            return destinations;
        }
        else{
            throw new Error('Server response not ok.');
        }

    }catch (error){
        console.error('Problem to fetch autocomplete ', error);

    }

    return ;
}