import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandinPage/LandingPage";
import HomePage from "./Components/HomePage/HomePage";
import DetailPage from "./Components/DetailPage/DetailPage";
import FormPage from "./Components/FormPage/FormPage";
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
