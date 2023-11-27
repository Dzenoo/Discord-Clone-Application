import { DirectMessagesData } from "@/data";
import { Chat } from "@mui/icons-material";
import { Speed } from "@mui/icons-material";
import { Shop } from "@mui/icons-material";
import type { LinkProps } from "@/types/link";
import DirectMessagesProfile from "./DirectMessagesProfile";
import LinkHref from "@/components/shared/ui/Link";
import Tab from "@/components/shared/ui/Tab";

const DirectMessagesSidebar: React.FC = () => {
  return (
    <nav className="p-3 w-[240px] min-h-screen bg-[#222222] overflow-hidden">
      <div>
        <div className="border-b pb-4 border-gray-700">
          <input
            className="p-[4px] rounded-md bg-[#2b2b2b] text-white w-full"
            placeholder="Find a conversation"
          />
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <LinkHref
            href="/friends"
            icon={<Chat style={{ color: "#fff" }} />}
            title="Friends"
          />
          <Tab icon={<Speed style={{ color: "#fff" }} />} title="Nitro" />
          <Tab icon={<Shop style={{ color: "#fff" }} />} title="Shop" />
        </div>
      </div>
      <div className="pt-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="uppercase text-xs font-bold text-gray-300">
            Direct Messages
          </h2>
        </div>
        <ul className="overflow-y-scroll h-[370px]">
          {DirectMessagesData.map(({ id, href, title, image }: LinkProps) => (
            <LinkHref href={href} title={title} key={id} image={image} />
          ))}
        </ul>
      </div>
      <DirectMessagesProfile />
    </nav>
  );
};

export default DirectMessagesSidebar;
