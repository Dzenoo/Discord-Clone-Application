import ChatItem from "./ChatItem";
import { MessageItem } from "@/types/servers";

interface ChatListProps {
  messages: MessageItem[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  return (
    <div className="py-8">
      {messages?.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-300">No messages yet</p>
        </div>
      )}
      {messages?.map((message: MessageItem, ind: number) => (
        <ChatItem
          key={ind}
          userImage={message.from?.image}
          username={message.from?.username}
          content={message.content}
          date={message.createdAt}
        />
      ))}
    </div>
  );
};

export default ChatList;
