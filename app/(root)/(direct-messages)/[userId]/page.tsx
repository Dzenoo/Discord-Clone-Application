import FriendsList from "@/components/direct-messages/friends/FriendsList";
import FriendsTopBar from "@/components/direct-messages/friends/FriendsTopBar";
import { fetchUser } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/session";
import { UserTypes } from "@/types/users";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Friends = async ({ params }: { params: { userId: string } }) => {
  const user: UserTypes = await fetchUser(params.userId);
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  if (!user || userId !== params.userId) {
    notFound();
  }

  return (
    <div className="p-3">
      <FriendsTopBar />
      <FriendsList userId={userId} friends={user?.friends} />
    </div>
  );
};

export default Friends;
