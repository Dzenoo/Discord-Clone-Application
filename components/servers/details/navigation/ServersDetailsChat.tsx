import ChatList from "@/components/chat/ChatList";
import { UserTypes } from "@/types/users";

interface ServersDetailsChatTypes {
  messages: {
    from: UserTypes;
    content: string;
  }[];
}

const ServersDetailsChat: React.FC<ServersDetailsChatTypes> = ({
  messages,
}) => {
  return (
    <div className="p-3 h-[80vh] overflow-y-scroll">
      <div className="pb-3 border-b border-gray-700">
        <p className="text-gray-300">This is the beggining of the channel</p>
      </div>
      <ChatList messages={messages} />
    </div>
  );
};

export default ServersDetailsChat;
