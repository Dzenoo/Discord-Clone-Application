"use client";

import Dialog from "@/components/shared/ui/Dialog";
import useDialog from "@/library/hooks/useDialog";
import Link from "next/link";
import CreateChannelsForm from "./CreateChannelsForm";
import { Add, Settings, Tag, VolumeUp } from "@mui/icons-material";
import type { ServersCategory } from "@/types/servers";
import { useRouter } from "next/navigation";

interface CategoryProps {
  category: ServersCategory;
  serverId: string;
}

const Category: React.FC<CategoryProps> = ({ category, serverId }) => {
  const { dialogs, closeDialog, openDialog } = useDialog({
    add_channels: { isOpen: false },
  });
  const router = useRouter();

  function handleChannelClick(channelId: string): void {
    router.push(`/settings-channels`);
  }

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
            {category?.name}
          </h2>
        </div>
        <div onClick={() => openDialog("add_channels")}>
          <Add style={{ cursor: "pointer", color: "#fff" }} />
        </div>
      </div>
      <div className="pt-[3px]">
        {category.channels.map((channel) => (
          <Link href={`/servers/${serverId}/${channel._id}`}>
            <div
              key={channel._id}
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
                <h2 className="text-xs text-white font-bold truncate">
                  {channel.name}
                </h2>
              </div>
              <div className="flex gap-[6px] items-center">
                <div onClick={() => handleChannelClick("server")}>
                  <Settings style={{ color: "#fff", fontSize: "16px" }} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
