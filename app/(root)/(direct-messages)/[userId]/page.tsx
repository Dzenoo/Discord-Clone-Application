import FriendsList from "@/components/direct-messages/friends/FriendsList";
import FriendsTopBar from "@/components/direct-messages/friends/FriendsTopBar";
import { DirectMessagesData } from "@/data";
import { fetchUser } from "@/library/actions/user.actions";
import { notFound } from "next/navigation";

const Friends = async ({ params }: { params: { userId: string } }) => {
  const user = await fetchUser(params.userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="p-3">
      <FriendsTopBar />
      <FriendsList friends={DirectMessagesData} />
    </div>
  );
};

export default Friends;
