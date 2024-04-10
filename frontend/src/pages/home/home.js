import NavBar from "./navbar";
import SearchComponent from "./searchComponents";
import RecomandationComponent from "./recomandations";
import PopularSearch from "./popularSearch";

const HomeComponent = () => {

    return ( 
        <div className="home-container bg-primary-white flex flex-col w-screen items-center ">
            <NavBar />
            <SearchComponent />
            <PopularSearch />
            <RecomandationComponent />
        </div>
     );
}
 
export default HomeComponent;