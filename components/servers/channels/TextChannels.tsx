"use client";

import Dialog from "@/components/shared/ui/Dialog";
import useDialog from "@/library/hooks/useDialog";
import type { TextChannelsProps } from "@/types/channels";
import { Add, Settings, Tag } from "@mui/icons-material";
import Link from "next/link";

const TextChannels: React.FC<TextChannelsProps> = ({ channels }) => {
  const { dialogs, closeDialog, openDialog } = useDialog({
    add_channels: { isOpen: false },
    invite_channels: { isOpen: false },
  });

  return (
    <div>
      <Dialog
        isOpen={dialogs.add_channels.isOpen}
        closeDialog={() => closeDialog("add_channels")}
      >
        Add Channels Text
      </Dialog>
      <Dialog
        isOpen={dialogs.invite_channels.isOpen}
        closeDialog={() => closeDialog("invite_channels")}
      >
        Invite Channels Text
      </Dialog>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold">
            Text Channels
          </h2>
        </div>
        <div>
          <Add
            style={{ cursor: "pointer", color: "#fff" }}
            onClick={() => openDialog("add_channels")}
          />
        </div>
      </div>
      <div className="pt-[3px]">
        {channels.map((channel) => (
          <Link
            href={`/channels/${channel.id}`}
            key={channel.id}
            className="p-[0.3em] rounded-md flex justify-between items-center cursor-pointer transition-all hover:bg-[#313339]"
          >
            <div className="flex items-center gap-[6px]">
              <div>
                <Tag style={{ color: "gray", fontSize: "24px" }} />
              </div>
              <div>
                <h2 className="text-xs text-white font-bold">
                  {channel.title}
                </h2>
              </div>
            </div>
            <div onClick={() => openDialog("invite_channels")}>
              <Settings style={{ color: "#fff", fontSize: "16px" }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TextChannels;
