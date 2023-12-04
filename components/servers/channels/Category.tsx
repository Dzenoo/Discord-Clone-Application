"use client";

import Dialog from "@/components/shared/ui/Dialog";
import useDialog from "@/library/hooks/useDialog";
import { Add, Settings, Tag, VolumeUp } from "@mui/icons-material";
import Link from "next/link";
import CreateChannelsForm from "./CreateChannelsForm";

export interface CategoryProps {
  channels: {
    id: string;
    title: string;
    type: "text" | "voice";
  }[];
  id: string;
  title: string;
}

const Category: React.FC<CategoryProps> = ({ channels, id, title }) => {
  const { dialogs, closeDialog, openDialog } = useDialog({
    add_channels: { isOpen: false },
  });

  console.log(navigator.onLine);

  return (
    <div>
      <Dialog
        isOpen={dialogs.add_channels.isOpen}
        closeDialog={() => closeDialog("add_channels")}
      >
        <CreateChannelsForm />
      </Dialog>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold truncate">
            {title}
          </h2>
        </div>
        <div onClick={() => openDialog("add_channels")}>
          <Add style={{ cursor: "pointer", color: "#fff" }} />
        </div>
      </div>
      <div className="pt-[3px]">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="p-[0.3em] rounded-md flex justify-between items-center cursor-pointer transition-all hover:bg-[#313339]"
          >
            <div className="flex items-center gap-[6px]">
              <div>
                {channel.type === "text" ? (
                  <Tag style={{ color: "gray", fontSize: "24px" }} />
                ) : (
                  <VolumeUp style={{ color: "gray", fontSize: "24px" }} />
                )}
              </div>
              <Link href={`/channels/${channel.id}`}>
                <h2 className="text-xs text-white font-bold truncate">
                  {channel.title}
                </h2>
              </Link>
            </div>
            <div className="flex gap-[6px] items-center">
              <div>
                <Link href={"/settings-channels"}>
                  <Settings style={{ color: "#fff", fontSize: "16px" }} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
