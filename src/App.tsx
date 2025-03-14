import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./Providers/AuthContext/AuthContext";
import Animes from "./pages/Animes/Animes";
import { useState, useEffect } from "react";
import { ICharacter } from "./models/Character";
import { IAnime } from "./models/Product";
import { ISchedule } from "./models/Schedule";
import { fetchAllAnimesData } from "./utils/api";
import { fetchCharactersData } from "./utils/charactersApi";
import { fetchScheduleData } from "./utils/scheduleApi";
import Characters from "./pages/Characters/Characters";
import SearchPage from "./pages/SearchPage/SearchPage";
import "react-tooltip/dist/react-tooltip.css";
import AnimePage from "./pages/AnimePage/AnimePage";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import useBurger from "./hooks/useBurger";
import Profile from "./pages/Profile/Profile";
import Character from "./pages/Character/Character";

function App() {
  const [animes, setAnimes] = useState<IAnime[]>([]);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllAnimesData({});
      setAnimes(data.data.Page.media);
    };
    getData();

    const getCharactersData = async () => {
      const res = await fetchCharactersData({ page: 1, perPage: 50 });
      setCharacters(res.data.data.Page.characters);
    };
    getCharactersData();

    const getScheduleData = async () => {
      const res = await fetchScheduleData();
      setSchedules(res.data.Page.airingSchedules);
    };
    getScheduleData();
  }, []);
  const { toggleBurgerMenu, open } = useBurger();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Блокируем скролл
    } else {
      document.body.style.overflow = ""; // Возвращаем обратно
    }
  }, [open]);
  return (
    <div className={`wrapper min-h-[100vh] bg-cover black-bg`}>
      <AuthProvider>
        <MobileMenu open={open} toggle={toggleBurgerMenu} />
        <Header toggle={toggleBurgerMenu} />
        <div className="wrapper__inner w-full backdrop-blur-md">
          {/* <Modal /> */}
          <div className="container max-w-[1400px] mx-auto main--container">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    animes={animes}
                    schedules={schedules}
                    characters={characters}
                  />
                }
              />
              <Route path="/search/" element={<SearchPage />} />
              <Route path="/animes/anime/:id" element={<AnimePage />} />
              <Route path="/animes" element={<Animes />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/characters/character/:id" element={<Character />} />
            </Routes>
            <Toaster toastOptions={{ duration: 900 }} />
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
