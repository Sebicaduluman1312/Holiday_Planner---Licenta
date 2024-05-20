import NavBarSearch from "./header/NavBarSearch";
import Categories from "./header/categories";
import MainComponent from "./main/main";

const MainSearchPage = () => {


    return (
        <div className="h-screen w-screen bg-primary-white flex flex-col items-center">
            <NavBarSearch />
            <Categories />
            <MainComponent />
        </div>
    );
}
 
export default MainSearchPage;