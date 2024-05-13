import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import { useState } from 'react';

const ChangeDetailsComponent = (props) => {


    const [formData, setFormData] = useState({
        email: props.props.email,
        city: props.props.city,
        country: props.props.country,
        phone_number: props.props.phone,
        short_status: props.props.status
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updateProfile = async () => {
            const url = 'http://localhost:8000/api/user/profile/';
            let data = { 'data' : formData};
            
            try {
                const response = await fetch(url, {
                  method: 'PUT',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
                });
            
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
            
                const responseData = await response.json();
                console.log('PUT request successful', responseData);

            } catch (error) {
                console.error('Problem with PUT request ', error);
            }
        }

        updateProfile();
    };

    return ( 
        <div className='mt-6'>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    padding: '20px',
                    border: '2px solid #0077C0',
                    borderRadius: '8px'
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <TextField
                        label="City"
                        variant="outlined"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Country"
                        variant="outlined"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    label="Phone"
                    variant="outlined"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
                <TextField
                    label="Description (max 50 characters)"
                    variant="outlined"
                    name="short_status"
                    value={formData.short_status}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    inputProps={{ maxLength: 50 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </Box>
        </div>
    );
}
 
export default ChangeDetailsComponent;