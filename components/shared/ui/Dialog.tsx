"use client";
import { DialogProps } from "@/types/dialog";
import Button from "../form/Button";

const Dialog: React.FC<DialogProps> = ({ isOpen, closeDialog, children }) => {
  return (
    <div
      className={`bg-[#000000be] content-[''] fixed top-0 left-0 right-0 bottom-0 animate_opacity z-30 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="dialog bg-[#2b2b2b] p-3 rounded-md shadow-md animate_fadeIn">
        <div>{children}</div>
        <div>
          <Button type="button" variant="secondary" onClick={closeDialog}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
