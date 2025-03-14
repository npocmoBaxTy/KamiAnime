import { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { login, loading } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authUserHandler = async () => {
    try {
      await login({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login--page min-h-[100vh] flex flex-col justify-center items-center">
      <div className="login--page__inner sm:w-1/3 lg:w-1/3 w-[90%] md:w-[90%]">
        <h1 className="bold-purple-text lg:mb-5 flex flex-col text-3xl lg:text-9xl lg:text-center">
          Login
          <span className="lg:hidden text-sm mb-1 text-[#787676]">
            Login in your account
          </span>
        </h1>
        <form
          className="login--page__form flex flex-col gap-3 p-5 border border-gray-200 rounded-lg shadow-2xl"
          action="#"
        >
          <Input
            label="Email"
            placeholder="example@mail.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            withLabel={true}
          />
          <Input
            label="Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            type="password"
            withLabel={true}
          />
          <Button onClick={authUserHandler} className="my-3">
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
        <div className="flex items-center justify-center mt-5">
          Not have account yet?
          <NavLink to="/sign-up" className="underline ml-1 text-blue-500">
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
