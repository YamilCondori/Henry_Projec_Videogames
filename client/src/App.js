import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandinPage/LandinPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FormPage from "./components/FormPage/FormPage";
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/detailPage" element={<DetailPage/>}/>
        <Route path="/formPage" element={<FormPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
