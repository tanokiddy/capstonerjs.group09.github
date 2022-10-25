import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BookingPage from "./pages/BookingPage/BookingPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Spinner from "./components/Spinner/Spinner";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import SecureView from "./HOC/SecureView";
import LayoutNon from "./HOC/LayoutNon";
import Layout from "./HOC/Layout";
import AdminPage from "./pages/Admin/AdminPage";
import Users from "./pages/Admin/Users";
import Films from "./pages/Admin/Films";
import UserTickets from "./pages/HomePage/UserTickets";
import AddUser from "./pages/Admin/AddUser";
import UserProfile from "./pages/HomePage/UserProfile";
import Error403 from "./pages/Admin/Error403";
import SecureViewAdmin from "./HOC/SecureViewAdmin";
import FindingUser from "./pages/Admin/FindingUser";

function App() {
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
        {/* -------------ADMIN ACTION------------- */}
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
              <LayoutNon Component={Users} />
            </SecureViewAdmin>
          }
        ></Route>
        <Route
          path="/admin/films/filmManagement"
          element={
            <SecureViewAdmin>
              <LayoutNon Component={Films} />
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
              <LayoutNon Component={FindingUser} />
            </SecureViewAdmin>
          }
        ></Route>
        {/* -------------ERROR PAGE---------------- */}
        <Route path="/Error403" element={<Error403 />}></Route>
      </Routes>
      <Spinner />
    </BrowserRouter>
  );
}

export default App;
