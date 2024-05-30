import DescriptionComponent from "../description";
import LocationComponent from "./location";
import PhotoComponent from "./photosComponent";

const MainDetail = ({photos, locality, name}) => {
    return ( 

        <div className="w-5/6 flex">
            <PhotoComponent photos={photos} name={name} />
            <DescriptionComponent locality={locality} name={name}/>
        </div>

    );
}
 
export default MainDetail;