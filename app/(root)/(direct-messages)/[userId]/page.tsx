import FriendsList from "@/components/direct-messages/friends/FriendsList";
import FriendsTopBar from "@/components/direct-messages/friends/FriendsTopBar";
import { DirectMessagesData } from "@/data";

const Friends = () => {
  return (
    <div className="p-3">
      <FriendsTopBar />
      <FriendsList friends={DirectMessagesData} />
    </div>
  );
};

export default Friends;
