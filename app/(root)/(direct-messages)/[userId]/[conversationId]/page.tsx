import ChatForm from "@/components/chat/ChatForm";
import ConversationChat from "@/components/direct-messages/conversation/ConversationChat";
import ConversationInformation from "@/components/direct-messages/conversation/ConversationInformation";
import ConversationTopBar from "@/components/direct-messages/conversation/ConversationTopBar";

const Conversation = () => {
  return (
    <div className="flex">
      <div className="basis-full grow flex flex-col">
        <div>
          <ConversationTopBar />
        </div>
        <div>
          <ConversationChat />
        </div>
        <div className="p-3 sticky bottom-0 right-0">
          <ChatForm />
        </div>
      </div>
      <div className="basis-96 min-h-[90vh]">
        <ConversationInformation />
      </div>
    </div>
  );
};

export default Conversation;
