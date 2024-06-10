import { useState } from 'react';
import { supabase } from "./../../setup/supabase/supabaseClient";

const ChangePhotoComponent = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileURL, setFileURL] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log(`Selected file: ${selectedFile.name}`);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            setUploading(true);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
                .from('Avatars')
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            const { data: publicURLData, error: urlError } = await supabase.storage
                .from('Avatars')
                .getPublicUrl(filePath);

            if (urlError) {
                throw urlError;
            } else {
                console.log(publicURLData.publicUrl);
                setFileURL(publicURLData.publicUrl);
                /// aici facem fetch sa punem in baza de date a noastra
                const updateProfile = async () => {
                    const url = 'http://localhost:8000/api/user/profile/';
                    const photo = {profile_image : publicURLData.publicUrl};
                    let data = { 'data' : photo};
                    
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
            }


        } catch (error) {
            alert("Error uploading file: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className="avatar h-60 w-60 bg-primary-black-blue rounded-full border-4 border-primary-black shadow-lg mt-14 mb-10">
                {fileURL && <img src={fileURL} alt="Avatar" className="rounded-full h-full w-full" />}
            </div>
            <div className="flex flex-col items-center">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mb-2"
                    style={{ cursor: 'pointer' }}
                />
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-primary-black-blue text-primary-white p-2 rounded-xl pl-6 pr-6 mt-6 hover:bg-primary-black"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default ChangePhotoComponent;
