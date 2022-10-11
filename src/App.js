import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BookingPage from "./pages/BookingPage/BookingPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/purchase/:id" element={<BookingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
