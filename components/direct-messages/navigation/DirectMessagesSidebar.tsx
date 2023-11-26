import { DirectMessagesData } from "@/data";
import { DirectMessagesLinkProps } from "@/types/direct-messages";
import { Add, Chat } from "@mui/icons-material";
import { Speed } from "@mui/icons-material";
import { Shop } from "@mui/icons-material";
import Link from "next/link";

const DirectMessagesLink: React.FC<DirectMessagesLinkProps> = ({
  href,
  image,
  icon,
  title,
}) => {
  return (
    <Link
      href={href}
      className="flex gap-3 items-center p-[7px] rounded-md transition-all hover:bg-[#313339]"
    >
      <div>
        {image ? (
          <img src={image} alt={title} className="w-9 h-9 rounded-full" />
        ) : (
          icon
        )}
      </div>
      <div>
        <p className="text-gray-400">{title}</p>
      </div>
    </Link>
  );
};

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
          <DirectMessagesLink
            href="/friends"
            icon={<Chat style={{ color: "#fff" }} />}
            title="Friends"
          />
          <DirectMessagesLink
            href="/friends"
            icon={<Speed style={{ color: "#fff" }} />}
            title="Nitro"
          />
          <DirectMessagesLink
            href="/friends"
            icon={<Shop style={{ color: "#fff" }} />}
            title="Shop"
          />
        </div>
      </div>
      <div className="pt-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="uppercase text-xs font-bold text-gray-300">
            Direct Messages
          </h2>
          <Add style={{ color: "#fff", cursor: "pointer" }} />
        </div>
        <ul className="overflow-y-scroll h-[370px]">
          {DirectMessagesData.map((messages: DirectMessagesLinkProps) => (
            <DirectMessagesLink
              href={messages.href}
              title={messages.title}
              key={messages.id}
              image={messages.image}
            />
          ))}
        </ul>
      </div>
      <div className="p-3 rounded-md bg-[#191919] sticky bottom-0 flex items-center gap-3 cursor-pointer transition-all hover:bg-[#313339]">
        <div>
          <img
            src="/images/machine-mining.jpg"
            alt="img"
            className="w-9 h-9 rounded-full"
          />
        </div>
        <div>
          <h2 className="text-white">dz3n00</h2>
          <p className="text-xs text-gray-300">dz3n00</p>
        </div>
      </div>
    </nav>
  );
};

export default DirectMessagesSidebar;
