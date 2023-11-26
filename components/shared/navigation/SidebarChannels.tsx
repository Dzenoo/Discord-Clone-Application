import type { SidebarItemProps } from "@/types/navigation-channels";
import { SidebarChannelsData } from "@/data";
import { Chat } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { Explore } from "@mui/icons-material";
import Link from "next/link";

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  title,
  image,
  icon,
}) => {
  if (image && !icon) {
    return (
      <Link href={href} className="sidebar_link_img_container">
        <img
          src={image}
          alt={title}
          className="w-14 h-14 object-cover rounded-full cursor-pointer  hover:rounded-3xl"
        />
        <p className="sidebar_title">{title}</p>
      </Link>
    );
  } else if (icon && !image) {
    return (
      <Link href={href} className="sidebar_link">
        {icon}
        <p className="sidebar_title">{title}</p>
      </Link>
    );
  }
};

const SidebarChannels: React.FC = () => {
  return (
    <nav className="p-3 bg-[#191919] w-fit min-h-screen overflow-y-scroll flex flex-col justify-between gap-3">
      <div className="flex flex-col gap-3">
        <div>
          <SidebarItem
            href={`/userId`}
            icon={<Chat style={{ color: "#fff" }} />}
            title="Direct Messages"
          />
        </div>
        <ul className="flex flex-col gap-3">
          {SidebarChannelsData.map((sidebarItem: SidebarItemProps) => (
            <SidebarItem
              key={sidebarItem.href}
              href={sidebarItem.href}
              title={sidebarItem.title}
              image={sidebarItem.image}
            />
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <SidebarItem
          href={`/add-channel`}
          icon={<Add style={{ color: "#23a559" }} />}
          title="Add a Server"
        />
        <SidebarItem
          href={`/explore-channels`}
          icon={<Explore style={{ color: "#23a559" }} />}
          title="Explore Public Servers"
        />
      </div>
    </nav>
  );
};

export default SidebarChannels;
