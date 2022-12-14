import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BookingPage from "./pages/User/BookingPage/BookingPage";
import DetailPage from "./pages/User/DetailPage/DetailPage";
import HomePage from "./pages/User/HomePage/HomePage";
import LoginPage from "./pages/User/LoginPage/LoginPage";
import Spinner from "./components/Spinner/Spinner";
import RegisterPage from "./pages/User/LoginPage/RegisterPage";
import UserTickets from "./pages/User/HomePage/UserTickets";
import UserProfile from "./pages/User/HomePage/UserProfile";
//ADMIN - USER MANAGEMENT
import ListUserAdmin from "./pages/Admin/UserManagement/ListUserAdmin";
import SearchingUser from "./pages/Admin/UserManagement/SearchingUser";
import AddUser from "./pages/Admin/UserManagement/AddUser";
//ADMIN - FILM MANAGEMENT
import ListMovieAdmin from "./pages/Admin/FilmManagement/ListMovieAdmin";
//GENERAL ADMIN PAGES
import AdminPage from "./pages/Admin/AdminPage";
import Error403 from "./pages/Admin/ErrorLandingPage";
//HOC
import SecureViewAdmin from "./HOC/SecureViewAdmin";
import SecureView from "./HOC/SecureView";
import LayoutNon from "./HOC/LayoutNon";
import Layout from "./HOC/Layout";
import AddNewMovie from "./pages/Admin/FilmManagement/AddNewMovie";
import AddShowTimes from "./pages/Admin/FilmManagement/AddShowTimes";
import SearchingMovie from "./pages/Admin/FilmManagement/SearchingMovie";
import { https } from "./services/configURL";
import axios from "axios";

function App() {
  axios.interceptors.request.use(
    function (config) {
      document.getElementById("spinner").style.display = "flex";
      return config;
    },
    function (error) {
      document.getElementById("spinner").style.display = "flex";
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      document.getElementById("spinner").style.display = "none";
      return response;
    },
    function (error) {
      document.getElementById("spinner").style.display = "none";
      return Promise.reject(error);
    }
  );
  https.interceptors.request.use(
    function (config) {
      document.getElementById("spinner").style.display = "flex";
      return config;
    },
    function (error) {
      document.getElementById("spinner").style.display = "flex";
      return Promise.reject(error);
    }
  );

  https.interceptors.response.use(
    function (response) {
      document.getElementById("spinner").style.display = "none";
      return response;
    },
    function (error) {
      document.getElementById("spinner").style.display = "none";
      return Promise.reject(error);
    }
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* ----------NORMAL USER ACTION-------- */}
        <Route path="/" element={<Layout Component={HomePage} />}></Route>
        <Route
          path="/detail/:id"
          element={
            <SecureView>
              <LayoutNon Component={DetailPage} />
            </SecureView>
          }
        ></Route>
        <Route
          path="/purchase/:id"
          element={
            <SecureView>
              <LayoutNon Component={BookingPage} />
            </SecureView>
          }
        ></Route>
        <Route
          path="/login"
          element={<LayoutNon Component={LoginPage} />}
        ></Route>
        <Route
          path="/register"
          element={<LayoutNon Component={RegisterPage} />}
        ></Route>
        <Route
          path="/profile"
          element={
            <SecureView>
              <LayoutNon Component={UserProfile} />
            </SecureView>
          }
        ></Route>
        <Route
          path="/userTickets"
          element={
            <SecureView>
              <LayoutNon Component={UserTickets} />
            </SecureView>
          }
        ></Route>
        {/* -------------ADMIN ACTION-------- */}
        <Route
          path="/admin"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={AdminPage} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/userManagement"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={ListUserAdmin} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/userManagement/addUser"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={AddUser} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/userManagement/search/:id"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={SearchingUser} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/films/filmManagement"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={ListMovieAdmin} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/films/addNewFilm"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={AddNewMovie} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/films/filmManagement/addShowTimes/:id"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={AddShowTimes} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/films/filmManagement/search/:id"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={SearchingMovie} />
            </SecureViewAdmin>
          }
        ></Route>
        {/* -------------ERROR PAGE--------- */}
        <Route path="/Error" element={<Error403 />}></Route>
      </Routes>
      <Spinner />
    </BrowserRouter>
  );
}

export default App;
