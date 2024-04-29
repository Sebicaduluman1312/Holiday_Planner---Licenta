export const popularFetch = async () => {

    const url = `http://localhost:8000/api/search/popular_searches/`;

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
            const popular_destination = data.top_10_locations;
            return popular_destination;
        }
        else {
            throw new Error('Server response not ok.');
        }
    } catch (error) {
        console.error('Problem to fetch top 10 searches ', error);
    }

    return ;

}