import { useState, useEffect } from 'react';
import BackgroundComponent from "./backgroundComponent";
import BioComponent from "./bio";
import ExtraInfo from "./extraInfo";

const MainProfilePage = () => {
    let url1 = '';
    let url2 = '';
    let url3 = '';

    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    let visiting = false;

    if (urlParams.has('visit')) {

        const paramValue = urlParams.get('visit');
        url1 = `http://localhost:8000/api/user/profile/?visit=${paramValue}`;
        url2 = `http://localhost:8000/api/auth/user/`;
        url3 = `http://localhost:8000/api/auth/user_details/?id=${paramValue}`;

        visiting = true;
    } else {
        url1 = `http://localhost:8000/api/user/profile/`;
        url2 = 'http://localhost:8000/api/auth/user/';
        visiting = false;
    }
    

    const [profileData, setProfileData] = useState({
        profilePhoto: '',
        backPhoto: '',
        city: '',
        country: '',
        phone: '',
        status: '',
        role: ''
    });

    const [userData, setUserData] = useState({
        email: '',
        name: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch pentru detalii de profil
                const response1 = await fetch(url1, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response1.ok) {
                    const data1 = await response1.json();
                    setProfileData({
                        profilePhoto: data1.user_profile.profile_image,
                        backPhoto: data1.user_profile.background_image,
                        city: data1.user_profile.city,
                        country: data1.user_profile.country,
                        phone: data1.user_profile.phone_number,
                        status: data1.user_profile.short_status,
                        role: data1.user_profile.role
                    });
                } else {
                    throw new Error('Server response not ok.');
                }

                // Fetch pentru detalii utilizator acelasi
                if (visiting === false) {
                    const response2 = await fetch(url2, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response2.ok) {
                        const data2 = await response2.json();
                        setUserData({
                            email: data2.user.email,
                            name: data2.user.name,
                        });
                    } else {
                        throw new Error('Server response not ok.');
                    }
                } else {
                    const response2 = await fetch(url3, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response2.ok) {
                        const data2 = await response2.json();
                        setUserData({
                            email: data2.data.email,
                            name: data2.data.name,
                        });
                    } else {
                        throw new Error('Server response not ok.');
                    }
                }




            } catch (error) {
                console.error('Problem fetching data: ', error);
            }
        };

        fetchData();
    }, [url1, url2]);

    return (
        <div className="main-profile-container flex flex-col items-center bg-primary-white">
            <BackgroundComponent photo={profileData.backPhoto} />
            <BioComponent
                photo={profileData.profilePhoto}
                name={userData.name}
                status={profileData.status}
                city={profileData.city}
                country={profileData.country}
                role={profileData.role}
                email={userData.email}
                phone={profileData.phone}
                visiting={visiting}
                id={urlParams.get('visit')}
            />
            <ExtraInfo email={userData.email} phone={profileData.phone} />
        </div>
    );
};

export default MainProfilePage;
