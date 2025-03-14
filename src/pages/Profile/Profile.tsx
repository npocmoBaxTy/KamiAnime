import { useEffect, useState } from "react";
import { useAuth } from "../../Providers/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import styles from "./Profile.module.css";
import LikedAnimes from "./LikedAnimes/LikedAnimes";
import { IAnime } from "../../models/Product";
import { fetchAnimesById } from "../../utils/getAnimesById";
import { ICharacter } from "../../models/Character";
import { fetchCharactersById } from "../../utils/getCharactersById";
import LikedCharacters from "./LikedCharacters/LikedCharacters";
import WatchList from "./WatchList/WatchList";

const Profile = () => {
  const { user, logged } = useAuth();
  const navigate = useNavigate();

  const [animes, setAnimes] = useState<IAnime[]>([]);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [watchlist, setWatchlist] = useState<IAnime[]>([]);

  useEffect(() => {
    const getLikedAnimes = async () => {
      const data = await fetchAnimesById(user?.liked || []);
      setAnimes(data.data.Page.media);
      console.log(data);
    };
    getLikedAnimes();

    const getWatchList = async () => {
      const data = await fetchAnimesById(user?.watchlist || []);
      setWatchlist(data.data.Page.media);
    };
    getWatchList();
    const getLikedCharacters = async () => {
      const data = await fetchCharactersById(user?.characters || []);
      setCharacters(data.data.Page.characters);
    };
    getLikedCharacters();
  }, [user]);

  useEffect(() => {
    if (!logged) {
      toast.error("Please, sign in!");
      window.setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);
  return (
    <div className="profile__page-wrapper">
      <div className="profile__page--inner min-h-screen">
        <div className="profile__page--header p-2">
          <h1 className="text-2xl text-primary semibold">
            Hello {user?.username}
          </h1>
        </div>
        <div className="profile__page--content">
          <TabGroup
            defaultIndex={0}
            className={
              "flex lg:flex-row md:flex-row flex-col items-start mt-10 pb-20 lg:pb-0"
            }
          >
            <TabList
              className={
                "profile__page--tabs-list w-full justify-between lg:text-[15px] mb-5 text-xs md:text-sm lg:text-sm flex md:flex-col lg:flex-col text-primary p-2 bg-gray rounded lg:max-w-1/5"
              }
            >
              <Tab className={styles["profile__page--tab"]}>
                Favoutie Animes
              </Tab>
              <Tab className={styles["profile__page--tab"]}>
                Favoutie Characters
              </Tab>
              <Tab className={styles["profile__page--tab"]}>Watch List</Tab>
              <Tab className={styles["profile__page--tab"]}>Settings</Tab>
            </TabList>
            <TabPanels
              className={"bg-gray w-full p-2 md:ml-2 lg:ml-2 rounded grow"}
            >
              <TabPanel>
                <LikedAnimes animes={animes} />
              </TabPanel>
              <TabPanel>
                <LikedCharacters characters={characters} />
              </TabPanel>
              <TabPanel>
                <WatchList animes={watchlist} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};

export default Profile;
