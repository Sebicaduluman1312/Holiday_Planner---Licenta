import TouristicAttractions from "../card/touristicAttractions";
import FilterComponent from "../filter/filterComponent";


const MainComponent = () => {
    return ( 
        <div className="w-5/6 flex mt mb-4">
            <FilterComponent />
            <TouristicAttractions />
        </div>
    );
}
 
export default MainComponent;