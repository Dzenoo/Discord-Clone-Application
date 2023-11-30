import ChatList from "@/components/chat/ChatList";

const ServersDetailsChat: React.FC = () => {
  return (
    <div className="p-3 h-[80vh] overflow-y-scroll">
      <div className="pb-3 border-b border-gray-700">
        <p className="text-gray-300">This is the beggining of the channel</p>
      </div>
      <ChatList />
    </div>
  );
};

export default ServersDetailsChat;
