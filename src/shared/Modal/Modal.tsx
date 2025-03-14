import { Dialog } from "@headlessui/react";
import { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={setIsOpen}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            necessitatibus dolorem accusamus aperiam possimus tenetur, non
            soluta vero, corporis, veniam voluptates adipisci veritatis ratione
            voluptate molestias reiciendis debitis praesentium at?
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
