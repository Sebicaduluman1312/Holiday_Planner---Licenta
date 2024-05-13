import DetailComponent from "./details";
import ProfilePhoto from "./profilePhoto";

const BioComponent = (props) => {
    return ( 
        <div className="w-full h-40 flex items-center bg-primary-white">
            <ProfilePhoto props={props}/>
            <DetailComponent props={props} />
        </div>
     );
}
 
export default BioComponent;