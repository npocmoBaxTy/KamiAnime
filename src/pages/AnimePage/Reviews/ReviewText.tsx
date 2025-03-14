import { useState } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
const ReviewText = ({ text }: { text: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="review__body">
      <Disclosure as={"div"}>
        {({ open }) => (
          <>
            <div
              className={`overflow-hidden text-secondary transition-all duration-300 ${
                isOpen ? "line-clamp-none" : "line-clamp-5"
              }`}
            >
              {text}
            </div>
            <DisclosureButton
              className="text-purple-500 text-xs lg:text-sm hover:underline"
              onClick={() => setIsOpen(!isOpen)}
            >
              {open ? "Collapse" : "More"}
            </DisclosureButton>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ReviewText;
