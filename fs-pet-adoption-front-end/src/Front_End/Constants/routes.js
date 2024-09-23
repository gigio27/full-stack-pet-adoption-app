import Home from "../Components/Pages/Home Page/Home";
import Pets from "../Components/Pets/Pets";
import Profile from "../Components/Pages/Profile/Profile";
import Search from "../Components/Pages/Search/Search";
import HomeLoggedIn from "../Components/Pages/Home Page/HomeLoggedIn";
import { FaUserCircle} from "react-icons/fa"
import { HiHome} from "react-icons/hi"
import { MdAdminPanelSettings, MdPets} from "react-icons/md"
import { BiSearch} from "react-icons/bi"
import Dashboard from "../Components/Pages/Admin Dashboard/dashboard"



const routes = [
    {
        path: "/",
        component: <Home/>,
        label: "Home",
        protected: false,
        icon: <HiHome/>,
        name: "home",
    },
    {
        path: "/",
        component: <HomeLoggedIn />,
        label: "Home",
        protected: true,
        icon: <HiHome/>,
        name: "home logged in",
    },
    {
        path: "/admin",
        component: <Dashboard />,
        label: "Admin Dashboard",
        protected: true,
        admin: true,    
        icon: <MdAdminPanelSettings/>,
        name: "admin dashboard",

    }, 
    {
        path: "/search",
        component: <Search/>,
        label: "Search",
        protected: true,
        icon: <BiSearch/>,
        name: "search logged in",
    },
    {
        path: "/search",
        component: <Search/>,
        label: "Search",
        protected: false,
        icon: <BiSearch/>,
        name: "search",
    },
    {
        path: "/profile",
        component: <Profile/>,
        label: "Profile",
        protected: true,
        icon: <FaUserCircle/>,
        name: "profile",

    },
    {
        path: "/pets",
        component: <Pets/>,
        label: "My Pets",
        protected: true,
        icon: <MdPets/>,
        name: "pets logged in",

    },    


]

export default routes;