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

            const { publicURL, error: urlError } = supabase
                .storage
                .from('Avatars')
                .getPublicUrl(filePath);

            if (urlError) {
                throw urlError;
            }

            console.log(publicURL);
            setFileURL(publicURL);

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
                    style={{ cursor: 'pointer' }} // Adăugare stil pentru a seta cursorul
                />
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn btn-primary"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default ChangePhotoComponent;
