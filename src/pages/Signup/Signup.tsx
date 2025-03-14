import { NavLink } from "react-router-dom";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import useSignupUser from "../../hooks/useSignupUser";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const { signUpUser, loading } = useSignupUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUserName] = useState<string>("");

  const signUpUserHandler = async () => {
    if (!email || !password) {
      toast.error("Please fill all required fields");
    }
    try {
      await signUpUser({
        email,
        password,
        username,
      });
      setEmail("");
      setPassword("");
      setUserName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login--page min-h-[100vh] bg:var(--black) flex flex-col justify-center items-center">
      <div className="login--page__inner sm:w-[35%] lg:w-[35%] w-[90%] md:w-[90%]">
        <h1 className="bold-purple-text lg:mb-5 flex flex-col text-3xl lg:text-9xl lg:text-center">
          Sign Up
          <span className="lg:hidden text-sm mb-1 text-[#787676]">
            Sign Up here
          </span>
        </h1>
        <form
          className="login--page__form flex flex-col gap-3 p-5 lg:p-8 border border-gray-100 rounded-lg shadow-2xl"
          action="#"
        >
          <Input
            label="Username"
            placeholder="JDoe123"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required={true}
            withLabel={true}
          />
          <Input
            label="Email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required={true}
            withLabel={true}
          />
          <Input
            label="Password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            type="password"
            withLabel={true}
          />
          <Button onClick={signUpUserHandler} className="my-2">
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
        <div className="flex items-center justify-center mt-5">
          Already have an account?
          <NavLink to="/login" className="underline ml-1 text-blue-500">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
