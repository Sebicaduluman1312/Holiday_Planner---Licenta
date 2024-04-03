import { useEffect, useState } from 'react';
import cath from '../../assets/images/cathedral.jpg'
import eif from '../../assets/images/eiffel.jpg'
import rom from '../../assets/images/romania.jpg'
import grec from '../../assets/images/greece.jpg'
import col from '../../assets/images/coloseum.jpg'


const SlidingImages = () => {

    const [currentImageIndex, setCurrentIndex] = useState(0);
    const images = [eif, cath, grec, rom, col]

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 10000);
        
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="hidden md:block right-side w-1/2 bg-primary-black h-full relative">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ backgroundImage: `linear-gradient(rgba(0, 119, 192, 0.3), rgba(0, 119, 192, 0.3)), url(${image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center' ,zIndex: index === currentImageIndex ? 10 : 1 }}
                />
            ))}
        </div>
    );
}
 
export default SlidingImages;