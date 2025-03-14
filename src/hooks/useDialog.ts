import { ReactNode, useState } from "react";

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>();
  console.log(isOpen, "useDialog");
  const openDialog = () => {
    setIsOpen(true);
  };
  const setDialogContent = (element: ReactNode) => {
    setContent(element);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  return { isOpen, openDialog, closeDialog, setDialogContent, content };
};

export default useDialog;
