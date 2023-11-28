import type { FriendItemProps, FriendsListProps } from "@/types/friends";
import FriendsItem from "./FriendsItem";

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <div className="">
      <div className="py-4">
        <h2 className="text-xs uppercase text-gray-300 font-bold">
          Online: {friends.length}
        </h2>
      </div>
      <div className="py-3 border-t border-gray-700">
        {friends.length === 0 && (
          <p className="text-white text-center">No friends found</p>
        )}
        {friends.map(({ title, image, href }: FriendItemProps, ind) => (
          <FriendsItem key={ind} image={image} title={title} href={href} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
