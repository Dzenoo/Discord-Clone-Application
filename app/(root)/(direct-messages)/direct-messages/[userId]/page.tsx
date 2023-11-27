import FriendsList from "@/components/direct-messages/friends/FriendsList";
import FriendsTopBar from "@/components/direct-messages/friends/FriendsTopBar";

const Friends = () => {
  return (
    <div className="p-3">
      <FriendsTopBar />
      <FriendsList />
    </div>
  );
};

export default Friends;
