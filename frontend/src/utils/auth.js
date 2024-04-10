export const isAuthenticated = async () => {
    const url = 'http://localhost:8000/api/auth/user/';

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return true;
        } else if (response.status === 401) {
            return false;
        } else {
            console.error('Problem fetching authentication status');
            return false;
        }
    } catch (error) {
        console.error('Problem fetching authentication status: ', error);
        return false;
    }
};


export const logOut = () => {
    const url = 'http://localhost:8000/api/auth/logout/'
    
    fetch(url, {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if(!response.ok)
            throw new Error('Network response was not ok!')
        return response.json()
    })
    .then(data => {
        console.log('Response from server: ', data)
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Problem fetch: ', error)
    })
    
}