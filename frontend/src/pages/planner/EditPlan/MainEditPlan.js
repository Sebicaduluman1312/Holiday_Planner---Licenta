import NavBarSearch from "../../search/header/NavBarSearch";
import Itinerary from "./itinerary";
import MapSearchComponent from "./mapSearch";

const MainEditPlan = () => {
    return ( 
        <div className="flex flex-col items-center">
            <NavBarSearch />
            <MapSearchComponent />
            <Itinerary />
        </div>
    );
}
 
export default MainEditPlan;