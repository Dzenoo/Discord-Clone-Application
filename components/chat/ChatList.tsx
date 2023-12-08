import ChatItem from "./ChatItem";
import { MessageItem } from "@/types/servers";

interface ChatListProps {
  messages: MessageItem[];
  friendId?: string;
  channelId?: string;
  serverId?: string;
}

const ChatList: React.FC<ChatListProps> = ({
  messages,
  friendId,
  serverId,
  channelId,
}) => {
  return (
    <div className="py-8 pb-16">
      {messages?.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-300">No messages yet</p>
        </div>
      )}
      {messages?.map((message: MessageItem, ind: number) => (
        <ChatItem
          key={ind}
          userId={message?.from?._id}
          userImage={message.from?.image}
          username={message.from?.username}
          messageId={message._id}
          content={message.content}
          date={message.createdAt}
          friendId={friendId}
          serverId={serverId}
          channelId={channelId}
        />
      ))}
    </div>
  );
};

export default ChatList;
