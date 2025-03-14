import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { FC, ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface IDropDown {
  children: ReactNode;
  title: string;
}

const Dropdown: FC<IDropDown> = ({ children, title }) => {
  return (
    <div className="dropdown--wrapper">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex cursor-pointer w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50">
            {title}
            <MdKeyboardArrowDown
              aria-hidden="true"
              className="-mr-1 size-5 text-gray-400"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">{children}</div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Dropdown;
