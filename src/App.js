import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/guest/HomePage";
import CoworkingPage from "./pages/guest/CoworkingPage";
import DashBoardPage from "./pages/admin/DashBoardPage";
import CoworkingDetailsPage from "./pages/guest/CoworkingDetailsPage";
import LoginPage from "./pages/guest/LoginPage";
import AdminCoworkingsPage from "./pages/admin/AdminCoworkingsPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coworkings" element={<CoworkingPage />} />
        <Route path="/coworking/details/:id" element={<CoworkingDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<DashBoardPage />} />
        <Route path="/admin/coworkings" element={<AdminCoworkingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
