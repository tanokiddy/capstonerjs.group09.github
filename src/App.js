import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BookingPage from "./pages/BookingPage/BookingPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Spinner from "./components/Spinner/Spinner";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import SecureView from "./HOC/SecureView";
import Layout from "./HOC/Layout";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout Component={HomePage} />}></Route>
        <Route
          path="/detail/:id"
          element={
            <SecureView>
              <Layout Component={DetailPage} />
            </SecureView>
          }
        ></Route>
        <Route
          path="/purchase/:id"
          element={
            <SecureView>
              <Layout Component={BookingPage} />
            </SecureView>
          }
        ></Route>
        <Route path="/login" element={<Layout Component={LoginPage} />}></Route>
        <Route
          path="/register"
          element={<Layout Component={RegisterPage} />}
        ></Route>
        <Route
          path="/admin"
          element={
            <SecureView>
              <AdminPage />
            </SecureView>
          }
        ></Route>
      </Routes>
      <Spinner />
    </BrowserRouter>
  );
}

export default App;
