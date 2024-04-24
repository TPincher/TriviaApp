import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage";
import GameOverPage from "./pages/GameOverPage";
import MenuPage from "./pages/MenuPage";
import LandingPage from "./pages/LandingPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/gameover" element={<GameOverPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
