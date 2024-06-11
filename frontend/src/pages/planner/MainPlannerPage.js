import { Plane } from "lucide-react";
import NavBarSearch from "../search/header/NavBarSearch";
import CreatePlan from "./createPlan";
import PlansComponent from "./plansContainer";

const Planner = () => {
    return ( 
        <div className="h-screen w-screen flex flex-col items-center">
            <NavBarSearch />
            <div className="h-5/6 w-5/6 flex justify-between mt-4 p-4">
                <PlansComponent />
                <CreatePlan />
            </div>
        </div>
        
    );
}
export default Planner;