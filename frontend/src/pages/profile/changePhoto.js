import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const ChangePhotoComponent = () => {



    return (  
        <div className='flex flex-col items-center'>
            <div className="avatar h-60 w-60 bg-primary-black-blue rounded-full border-4 border-primary-black shadow-lg mt-14 mb-10">
            </div>

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload photo
                <VisuallyHiddenInput type="file" />
            </Button>

        </div>
    );
}
 
export default ChangePhotoComponent;