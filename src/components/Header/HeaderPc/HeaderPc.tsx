import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../../shared/Input/Input";
import Logo from "../../Logo/Logo";
import { RiSearch2Line } from "react-icons/ri";
import { useAuth } from "../../../Providers/AuthContext/AuthContext";
import useSignOut from "../../../hooks/useSignOut";
import { FormEvent, useState } from "react";

const HeaderPc = () => {
  const { logged, setLogged } = useAuth();
  const { userSignUoutHandler } = useSignOut();
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const userSignOut = async () => {
    await userSignUoutHandler();
    navigate("/login");
    setLogged(false);
  };
  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${value}`);
  };

  return (
    <div className="header--for--big-screen hidden md:block lg:block p-5 mb-5">
      <div className="header--for--big-screen__inner w-full flex items-center justify-between">
        <div className="header--for--big-screen__item">
          <Logo />
        </div>
        <form
          onSubmit={(e) => searchHandler(e)}
          className="header--for--big-screen__item search--wrapper w-[50%] relative"
        >
          <Input
            label=""
            onChange={(e) => setValue(e.target.value)}
            withLabel={false}
            type="text"
            className="py-1.5 flex-1 text-primary text-sm"
            placeholder="Search..."
          />
          <button className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 py-2 text-primary">
            <RiSearch2Line />
          </button>
        </form>
        <div className="header--for--big-screen__item header--options">
          <ul className="header--options-list flex items-center gap-3 text-primary">
            {logged ? (
              <>
                <li className="header--options-list__item">
                  <NavLink to="/profile" className="text-sm">
                    Account
                  </NavLink>
                </li>
                <li className="header--options-list__item">
                  <NavLink to="/cart" className="text-sm">
                    Cart
                  </NavLink>
                </li>
                <li
                  onClick={userSignOut}
                  className="header--options-list__item text-sm cursor-pointer"
                >
                  Sign out
                </li>
              </>
            ) : (
              <>
                <li className="header--options-list__item">
                  <NavLink to="/login" className="text-sm">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderPc;
