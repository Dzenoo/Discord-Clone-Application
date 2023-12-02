"use client";

import Link from "next/link";
import { AddCircleOutline, Category, Settings } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useToggleOverlay from "@/library/hooks/useToggleOverlay";
import Tab from "@/components/shared/ui/Tab";
import useDialog from "@/library/hooks/useDialog";
import Dialog from "@/components/shared/ui/Dialog";
import InviteToServerForm from "./InviteToServerForm";
import CreateCategoryForm from "../channels/CreateCategoryForm";

const ManageServerBar = () => {
  const { isOpened, handleToggle } = useToggleOverlay();
  const { dialogs, openDialog, closeDialog } = useDialog({
    invite_people: {
      isOpen: false,
    },
    create_category: {
      isOpen: false,
    },
  });

  return (
    <div className="p-3 shadow-md transition-all hover:bg-[#313339] relative">
      <Dialog
        isOpen={dialogs.invite_people.isOpen}
        closeDialog={() => closeDialog("invite_people")}
      >
        <InviteToServerForm />
      </Dialog>
      <Dialog
        isOpen={dialogs.create_category.isOpen}
        closeDialog={() => closeDialog("create_category")}
      >
        <CreateCategoryForm />
      </Dialog>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white font-bold">Server Name</h2>
        </div>
        <div onClick={handleToggle}>
          <KeyboardArrowDownIcon
            style={{
              padding: "6px",
              borderRadius: "60px",
              background: "gray",
            }}
          />
        </div>
      </div>
      <div
        className={`${
          isOpened
            ? "block bg-[#191919] absolute top-16 right-3 left-3 p-3 rounded-md shadow-md animate_opacity"
            : "hidden"
        }`}
      >
        <div onClick={() => openDialog("invite_people")}>
          <Tab
            title="Invite People"
            icon={<AddCircleOutline style={{ color: "gray" }} />}
            classNames="w-full"
          />
        </div>
        <div>
          <Link href={"/servers/123/settings"}>
            <Tab
              title="Server Settings"
              icon={<Settings style={{ color: "gray" }} />}
              classNames="w-full"
            />
          </Link>
        </div>
        <div onClick={() => openDialog("create_category")}>
          <Tab
            title="Create Category"
            icon={<Category style={{ color: "gray" }} />}
            classNames="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageServerBar;
