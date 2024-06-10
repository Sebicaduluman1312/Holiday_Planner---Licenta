import { useState } from 'react';
import { supabase } from "./../../setup/supabase/supabaseClient";



const ChangeBackgroundComponent = () => {
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
                    .from('Backgrounds')
                    .upload(filePath, file);
    
                if (error) {
                    throw error;
                }
    
                const { data: publicURLData, error: urlError } = await supabase.storage
                    .from('Backgrounds')
                    .getPublicUrl(filePath);
    
                if (urlError) {
                    throw urlError;
                } else {
                    console.log(publicURLData.publicUrl);
                    setFileURL(publicURLData.publicUrl);

                    /// aici facem fetch sa punem in baza de date a noastra
                    const updateProfile = async () => {
                        const url = 'http://localhost:8000/api/user/profile/';
                        const photo = {background_image : publicURLData.publicUrl};
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
        <div className='w-full flex flex-col items-center '>
            <div className="h-60 w-5/6 bg-primary-black mt-14 mb-10 rounded-xl">
                {fileURL && <img src={fileURL} alt="Avatar" className="h-full w-full object-cover rounded-xl" />}
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
}
 
export default ChangeBackgroundComponent;