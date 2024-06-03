export const GetUserDetails = async (id_user) => {
    try {
        const response = await fetch(`http://localhost:8000/api/auth/user_details/?id=${id_user}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};