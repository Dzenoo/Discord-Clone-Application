import type { FriendItemProps } from "@/types/friends";
import FriendsItemActions from "./FriendsItemActions";

const FriendsItem: React.FC<FriendItemProps> = ({ title, href, image }) => {
  return (
    <div className="friend_item flex justify-between items-center p-3 rounded-md transition-all hover:bg-[#191919]">
      <div className="flex gap-3 items-center">
        <div>
          <img
            src={image}
            alt={title}
            className="w-12 h-12 object-cover rounded-full cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <h2 className="text-white font-medium">{title}</h2>
            <p className="text-xs text-gray-300 friend_code">#393</p>
          </div>
          <div>
            <p className="text-gray-400">Playing a game</p>
          </div>
        </div>
      </div>
      <FriendsItemActions href={href} />
    </div>
  );
};

export default FriendsItem;
