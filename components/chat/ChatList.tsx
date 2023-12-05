import { UserTypes } from "@/types/users";
import ChatItem from "./ChatItem";

interface ChatListProps {
  messages: {
    from: UserTypes;
    content: string;
  }[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  return (
    <div className="py-8">
      {messages?.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-300">No messages yet</p>
        </div>
      )}
      {messages?.map(
        (
          message: {
            from: UserTypes;
            content: string;
          },
          ind: number
        ) => (
          <ChatItem
            key={ind}
            userImage={message.from?.image}
            username={message.from?.username}
            content={message.content}
            date={"2023-12-05T21:43:14.334+00:00"}
          />
        )
      )}
    </div>
  );
};

export default ChatList;
