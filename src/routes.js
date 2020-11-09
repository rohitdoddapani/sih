
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
//import Mapbox from "components/Mapbox.js"
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import NewUser from "views/examples/NewUser.jsx";
// import Icons from "views/examples/Icons.jsx";
import Userdata from "components/Userdata.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/userdata",
    name: "UsersData",
    icon: "ni ni-sound-wave text-primary",
    component: Userdata,
    layout: "/admin"
  },
  
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/Users",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/new-user",
    name: "New User/Node",
    icon: "ni ni-circle-08 text-pink",
    component: NewUser,
    layout: "/admin"
  },
  {
    path: "/my-profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  
  // }
];

export default routes;
