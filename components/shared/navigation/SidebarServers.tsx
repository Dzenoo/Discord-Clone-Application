"use client";
import type { SidebarItemProps } from "@/types/navigation-channels";
import { SidebarChannelsData } from "@/data";
import { Chat } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { Explore } from "@mui/icons-material";
import Link from "next/link";
import useDialog from "@/library/hooks/useDialog";
import Dialog from "../ui/Dialog";

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  title,
  image,
  icon,
}) => {
  if (image && !icon) {
    if (href) {
      return (
        <Link href={href} className="sidebar_link_img_container">
          <img
            src={image}
            alt={title}
            className="w-14 h-14 object-cover rounded-full cursor-pointer hover:rounded-3xl"
          />
          <p className="sidebar_title">{title}</p>
        </Link>
      );
    } else {
      return (
        <button className="sidebar_link_img_container">
          <img
            src={image}
            alt={title}
            className="w-14 h-14 object-cover rounded-full cursor-pointer hover:rounded-3xl"
          />
          <p className="sidebar_title">{title}</p>
        </button>
      );
    }
  } else if (icon && !image) {
    if (href) {
      return (
        <Link href={href} className="sidebar_link">
          {icon}
          <p className="sidebar_title">{title}</p>
        </Link>
      );
    } else {
      return (
        <button className="sidebar_link">
          {icon}
          <p className="sidebar_title">{title}</p>
        </button>
      );
    }
  }
};

const SidebarServers: React.FC = () => {
  const { dialogs, closeDialog, openDialog } = useDialog({
    add_servers: { isOpen: false },
  });

  const renderChannels = (channels: SidebarItemProps[]) => (
    <ul className="flex flex-col gap-3">
      {channels.map((sidebarItem) => (
        <SidebarItem key={sidebarItem.href} {...sidebarItem} />
      ))}
    </ul>
  );

  return (
    <nav className="p-3 bg-[#191919] w-fit min-h-screen overflow-y-scroll flex flex-col justify-between gap-3">
      <Dialog
        isOpen={dialogs.add_servers.isOpen}
        closeDialog={() => closeDialog("add_servers")}
      >
        Add Server
      </Dialog>
      <div className="flex flex-col gap-3">
        <div className="border-b pb-3 border-gray-400">
          <SidebarItem
            href={`/123`}
            icon={<Chat style={{ color: "#fff" }} />}
            title="Direct Messages"
          />
        </div>
        {renderChannels(SidebarChannelsData)}
      </div>
      <div className="flex flex-col gap-3">
        <div onClick={() => openDialog("add_servers")}>
          <SidebarItem
            icon={<Add style={{ color: "#23a559" }} />}
            title="Add a Server"
          />
        </div>
        <SidebarItem
          href={`/channels`}
          icon={<Explore style={{ color: "#23a559" }} />}
          title="Explore Public Servers"
        />
      </div>
    </nav>
  );
};

export default SidebarServers;
