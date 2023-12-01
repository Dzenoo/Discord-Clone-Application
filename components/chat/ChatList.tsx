import ChatItem from "./ChatItem";

const ChatList: React.FC = () => {
  return (
    <div className="py-8">
      <ChatItem
        userImage={""}
        username={""}
        content={"This is @cilindar"}
        date={"2021-08-01T00:00:00.000Z"}
      />
      <ChatItem
        userImage={""}
        username={""}
        content={"This is content"}
        date={"2021-08-01T00:00:00.000Z"}
      />
      <ChatItem
        userImage={""}
        username={""}
        content={"This is content"}
        date={"2021-08-01T00:00:00.000Z"}
      />
    </div>
  );
};

export default ChatList;
