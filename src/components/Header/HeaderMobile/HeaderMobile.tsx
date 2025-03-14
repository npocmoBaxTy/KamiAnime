import Logo from "../../Logo/Logo";
import { RiUserSmileFill, RiSearch2Line, RiHeart2Fill } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import styles from "./HeaderMobile.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Providers/AuthContext/AuthContext";

const HeaderMobile = ({ toggle }: { toggle: () => void }) => {
  const { logged } = useAuth();
  return (
    <div className="header--for--mobile w-full lg:hidden md:hidden flex items-center border-t border-t-gray-600 bg-[#121111]">
      <div className="header--for--mobile__inner grid grid-cols-5 w-full text-primary">
        <div className={styles["header--for--mobile__inner-item"]}>
          <NavLink
            to={"/search"}
            className={styles["header--for--mobile__link"]}
          >
            <RiSearch2Line />
            <span>Search</span>
          </NavLink>
        </div>
        <div className={styles["header--for--mobile__inner-item"]}>
          <NavLink
            to={"/profile"}
            className={styles["header--for--mobile__link"]}
          >
            <RiHeart2Fill />
            <span>Watch</span>
          </NavLink>
        </div>
        <div className={styles["header--for--mobile__inner-item"]}>
          <Logo />
        </div>
        <div className={styles["header--for--mobile__inner-item"]}>
          <NavLink
            to={`${logged ? "/profile" : "/login"}`}
            className={styles["header--for--mobile__link"]}
          >
            <RiUserSmileFill />
            <span>Profile</span>
          </NavLink>
        </div>

        <div className={styles["header--for--mobile__inner-item"]}>
          <div className={styles["header--for--mobile__link"]} onClick={toggle}>
            <button className="flex items-center flex-col">
              <MdMenu />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
