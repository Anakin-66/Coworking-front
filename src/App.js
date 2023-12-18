import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/guest/HomePage";
import CoworkingPage from "./pages/guest/CoworkingPage";
import DashBoardPage from "./pages/admin/DashBoardPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coworkings" element={<CoworkingPage />} />

        <Route path="/admin" element={<DashBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
