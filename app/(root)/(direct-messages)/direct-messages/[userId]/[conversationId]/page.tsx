import ChatForm from "@/components/chat/ChatForm";
import ConversationChat from "@/components/direct-messages/conversation/ConversationChat";
import ConversationInformation from "@/components/direct-messages/conversation/ConversationInformation";
import ConversationTopBar from "@/components/direct-messages/conversation/ConversationTopBar";

const Conversation = () => {
  return (
    <div>
      <div>
        <ConversationTopBar />
      </div>
      <div className="flex">
        <div className="basis-full grow">
          <ConversationChat />
        </div>
        <div className="basis-96 min-h-[90vh]">
          <ConversationInformation />
        </div>
      </div>
      <div className="p-3 sticky bottom-0">
        <ChatForm />
      </div>
    </div>
  );
};

export default Conversation;
