import { authOptions } from "@/library/session";
import { fetchUser } from "@/library/actions/user.actions";
import { ServerItem } from "@/types/servers";
import { DirectMessageType, FriendsItem, UserTypes } from "@/types/users";
import { getServerSession } from "next-auth";
import ConversationChat from "@/components/direct-messages/conversation/ConversationChat";
import ConversationInformation from "@/components/direct-messages/conversation/ConversationInformation";
import ConversationTopBar from "@/components/direct-messages/conversation/ConversationTopBar";
import ConversationChatForm from "@/components/direct-messages/conversation/ConversationChatForm";

const Conversation = async ({ params }: { params: { friendId: string } }) => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userIdAuth: string = session?.user?.id;
  const user: UserTypes = await fetchUser(userIdAuth);
  const friend: UserTypes = await fetchUser(params.friendId);

  const mutualServers: ServerItem[] | undefined = user?.servers?.filter(
    (server: ServerItem) => friend?.servers?.includes(server._id)
  );
  const mutualFriends: FriendsItem[] = user?.friends?.filter(
    (friend: FriendsItem) => friend?.friends?.includes(friend?._id)
  );
  const directMessages: DirectMessageType | undefined =
    user?.directMessages?.find(
      (directMessage: DirectMessageType) =>
        directMessage.userId._id.toString() === friend?._id.toString()
    );

  return (
    <div className="flex">
      <div className="basis-full grow flex flex-col">
        <div>
          <ConversationTopBar username={friend?.username} image={user?.image} />
        </div>
        <div>
          <ConversationChat
            username={friend?.username}
            image={friend?.image}
            name={friend?.name}
            messages={directMessages?.messages}
            friendId={params?.friendId}
          />
        </div>
        <div className="p-3 sticky bottom-0 right-0">
          <ConversationChatForm
            friendId={friend?._id}
            friendUsername={friend?.username}
            userId={userIdAuth}
          />
        </div>
      </div>
      <div className="basis-96 min-h-[90vh]">
        <ConversationInformation
          username={friend?.username}
          image={friend?.image}
          name={friend?.name}
          createdAt={friend?.createdAt}
          mutualServers={mutualServers}
          mutualFriends={mutualFriends}
        />
      </div>
    </div>
  );
};

export default Conversation;
