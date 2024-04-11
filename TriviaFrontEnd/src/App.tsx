import "./App.scss";
import { fetchCategories } from "./data";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import GameOverPage from "./pages/GameOverPage";
import { useEffect, useState } from "react";

function App() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories().then((data: any) => setCategoryList(data));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage categoryList={categoryList} />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/gameover" element={<GameOverPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
