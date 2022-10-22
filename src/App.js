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

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          path="/admin"
          element={
            <SecureView>
              <LayoutNon Component={AdminPage} />
            </SecureView>
          }
        ></Route>
        <Route
          path="/admin/userManagement"
          element={
            <SecureView>
              <LayoutNon Component={Users} />
            </SecureView>
          }
        ></Route>
        <Route
          path="/admin/films/filmManagement"
          element={
            <SecureView>
              <LayoutNon Component={Films} />
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
      </Routes>
      <Spinner />
    </BrowserRouter>
  );
}

export default App;
