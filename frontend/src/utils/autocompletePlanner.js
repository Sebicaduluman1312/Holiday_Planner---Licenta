export const autocompletePlanner = async (string) => {
    const url = `http://localhost:8000/api/planner/autocomplete/?string=${string}`;

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Server response not ok.');
        return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not in JSON format');
        return [];
    }

    const data = await response.json();
    const destinations = data.destinations || [];
    return destinations;
}
