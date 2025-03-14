import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={`${styles.logo} site__logo text-primary`}>
      <NavLink to={"/"} className={"logo--pc--liink lg:block hidden text-2xl"}>
        KamiAnime
      </NavLink>
      <NavLink
        to={"/"}
        className={"logo--mobile--liink lg:hidden block text-2xl"}
      >
        KA
      </NavLink>
    </div>
  );
};

export default Logo;
