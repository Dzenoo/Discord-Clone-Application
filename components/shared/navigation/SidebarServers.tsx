"use client";
import { Chat } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { Explore } from "@mui/icons-material";
import Link from "next/link";
import useDialog from "@/library/hooks/useDialog";
import Dialog from "../ui/Dialog";
import CreateServerForm from "@/components/servers/server-management/CreateServerForm";

export interface SidebarItemProps {
  href?: string;
  name: string;
  image?: string;
  icon?: JSX.Element;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  name,
  image,
  icon,
}) => {
  if (image && !icon) {
    if (href) {
      return (
        <Link href={href} className="sidebar_link_img_container">
          <img
            src={image}
            alt={name}
            className="w-14 h-14 object-cover rounded-full cursor-pointer hover:rounded-3xl"
          />
          <p className="sidebar_title">{name}</p>
        </Link>
      );
    } else {
      return (
        <button className="sidebar_link_img_container">
          <img
            src={image}
            alt={name}
            className="w-14 h-14 object-cover rounded-full cursor-pointer hover:rounded-3xl"
          />
          <p className="sidebar_title">{name}</p>
        </button>
      );
    }
  } else if (icon && !image) {
    if (href) {
      return (
        <Link href={href} className="sidebar_link">
          {icon}
          <p className="sidebar_title">{name}</p>
        </Link>
      );
    } else {
      return (
        <button className="sidebar_link">
          {icon}
          <p className="sidebar_title">{name}</p>
        </button>
      );
    }
  }
};

export interface ServerItem {
  _id: string;
  name: string;
  image: string;
  creatorId: string;
  roles: {
    name: "Admin" | "Moderator" | "Member";
    members: string[];
  };
  channels: {
    _id: string;
    name: string;
    type: "text" | "voice";
    messages: string[];
  }[];
  members: string[];
}

interface SidebarServers {
  servers: ServerItem[];
  userId: string;
}

const SidebarServers: React.FC<SidebarServers> = ({ servers, userId }) => {
  const { dialogs, closeDialog, openDialog } = useDialog({
    add_servers: { isOpen: false },
  });

  const renderServers = (servers: ServerItem[]) => (
    <ul className="flex flex-col gap-3">
      {servers?.map((serverItem: ServerItem) => (
        <SidebarItem
          key={serverItem.name}
          href={`/servers/${serverItem._id}/${serverItem.channels[0]._id}`}
          name={serverItem.name}
          image={serverItem.image}
        />
      ))}
    </ul>
  );

  return (
    <nav className="p-3 bg-[#191919] w-fit min-h-screen overflow-y-scroll flex flex-col justify-between gap-3">
      <Dialog
        isOpen={dialogs.add_servers.isOpen}
        closeDialog={() => closeDialog("add_servers")}
      >
        <CreateServerForm closeDialog={closeDialog} dialogId={"add_servers"} />
      </Dialog>
      <div className="flex flex-col gap-3">
        <div className="border-b pb-3 border-gray-400">
          <SidebarItem
            href={`/${userId}`}
            icon={<Chat style={{ color: "#fff" }} />}
            name="Direct Messages"
          />
        </div>
        {renderServers(servers)}
      </div>
      <div className="flex flex-col gap-3">
        <div onClick={() => openDialog("add_servers")}>
          <SidebarItem
            icon={<Add style={{ color: "#23a559" }} />}
            name="Add a Server"
          />
        </div>
        <SidebarItem
          href={`/explore-servers`}
          icon={<Explore style={{ color: "#23a559" }} />}
          name="Explore Public Servers"
        />
      </div>
    </nav>
  );
};

export default SidebarServers;
