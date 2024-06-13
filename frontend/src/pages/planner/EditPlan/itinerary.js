import { DndProvider } from "react-dnd";
import DaysComponent from "./daysSchedule";
import LikedLocations from "./myAttractions";
import { HTML5Backend } from "react-dnd-html5-backend";

const Itinerary = () => {
    return (
        <div className="flex flex-col mt-10 mb-10 w-5/6">
            <h1 className="text-2xl font-bold">Create your itinerary</h1>
            <DndProvider backend={HTML5Backend}>
                <div className="itinerary w-full flex">
                    <DaysComponent />
                    <LikedLocations />
                </div>
            </DndProvider>
        </div>
    );
}
 
export default Itinerary;