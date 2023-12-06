import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChatForm from "@/components/chat/ChatForm";
import ConversationChat from "@/components/direct-messages/conversation/ConversationChat";
import ConversationInformation from "@/components/direct-messages/conversation/ConversationInformation";
import ConversationTopBar from "@/components/direct-messages/conversation/ConversationTopBar";
import { fetchUser } from "@/library/actions/user.actions";
import { UserTypes } from "@/types/users";
import { getServerSession } from "next-auth";

const Conversation = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userIdAuth = session?.user?.id;
  const user: UserTypes = await fetchUser(userIdAuth);

  return (
    <div className="flex">
      <div className="basis-full grow flex flex-col">
        <div>
          <ConversationTopBar />
        </div>
        <div>
          <ConversationChat />
        </div>
        <div className="p-3 sticky bottom-0 right-0">{/* <ChatForm /> */}</div>
      </div>
      <div className="basis-96 min-h-[90vh]">
        <ConversationInformation />
      </div>
    </div>
  );
};

export default Conversation;
