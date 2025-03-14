import { FC } from "react";
import { useAuth } from "../../Providers/AuthContext/AuthContext";
import { CgSearch } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import "./MobileMenu.css";

interface IMoblieMenu {
  open: boolean;
  toggle: () => void;
}

const MobileMenu: FC<IMoblieMenu> = ({ open, toggle }) => {
  const { logged } = useAuth();
  return (
    <div
      className={`md:hidden mobile__sidebar-menu flex justify-end w-full min-h-screen text-primary fixed top-0 right-0 duration-300 z-40 
          ${
            open ? "translate-x-0" : "translate-x-full"
          } transform transition-transform duration-300 ease-in-out`}
      onClick={toggle}
    >
      <div
        className="mobile__menu--inner text-sm w-[70%] pb-[115px] px-2 bg-gray flex flex-col relative overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="mobile__menu--header mt-1 grid grid-cols-2 gap-2 items-stretch px-2 py-1"
          onClick={toggle}
        >
          <div className="mobile__menu--header-icon bg-purple-500 text-white rounded">
            <NavLink
              to={`${logged ? "/profile" : "/login"}`}
              className={"text-center block"}
            >
              {logged ? "Profile" : "Signup/Signin"}
            </NavLink>
          </div>
          <div
            className="mobile__menu--header-icon bg-purple-500 text-white rounded"
            onClick={toggle}
          >
            <NavLink
              to={"/search"}
              className={"flex items-center gap-0.5 justify-center"}
            >
              <CgSearch />
              <span>Search</span>
            </NavLink>
          </div>
        </div>

        {/* Body */}
        <div className="mobile__menu--body mt-5">
          {/* Menu items */}
          <div className="body__nav">
            <ul className="body__nav-list flex flex-col gap-2">
              <li>
                <NavLink
                  to={"/"}
                  className={
                    "px-2 py-1 rounded text-white text-sm bg-purple-500"
                  }
                  onClick={toggle}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/profile"}
                  className={
                    "px-2 py-1 rounded text-white text-sm bg-purple-500"
                  }
                  onClick={toggle}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/animes"}
                  onClick={toggle}
                  className={
                    "px-2 py-1 rounded text-white text-sm bg-purple-500"
                  }
                >
                  Animes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/characters"}
                  onClick={toggle}
                  className={
                    "px-2 py-1 rounded text-white text-sm bg-purple-500"
                  }
                >
                  Characters
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
