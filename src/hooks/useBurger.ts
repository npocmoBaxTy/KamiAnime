import { useState } from "react";

const useBurger = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleBurgerMenu = () => {
    setOpen(!open);
  };

  return { open, toggleBurgerMenu };
};

export default useBurger;
