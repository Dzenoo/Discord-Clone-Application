import ConversationChat from "@/components/direct-messages/conversation/ConversationChat";
import ConversationInformation from "@/components/direct-messages/conversation/ConversationInformation";
import ConversationTopBar from "@/components/direct-messages/conversation/ConversationTopBar";
import React from "react";

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
        <div className="basis-96 min-h-[96vh]">
          <ConversationInformation />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
