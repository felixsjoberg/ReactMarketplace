import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HouseList from "../house/HouseList";
import HouseEdit from "../house/HouseEdit";
import HouseAdd from "../house/HouseAdd";
import HouseDetail from "../house/HouseDetail";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header subtitle="House listing from around the globe" />
        <Routes>
          <Route path="/" element={<HouseList />}></Route>
          <Route path="/house/add" element={<HouseAdd />}></Route>
          <Route path="/house/edit/:id" element={<HouseEdit />}></Route>
          <Route path="/house/:id" element={<HouseDetail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
