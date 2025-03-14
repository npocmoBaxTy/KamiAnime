import { FC, ReactNode } from "react";

interface IButton {
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
}

const Button: FC<IButton> = ({ className, onClick, type, children }) => {
  return (
    <button
      className={`custom--button p-2 ${className} bg-[#ff3d00] border cursor-pointer inline-block rounded-md text-[#fff] duration-300 hover:text-[#ff3d00] hover:bg-[#fff]`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
