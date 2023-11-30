import ChatForm from "@/components/chat/ChatForm";
import ServersDetailsChat from "@/components/servers/details/navigation/ServersDetailsChat";
import ServersDetailsInformations from "@/components/servers/details/navigation/ServersDetailsInformations";
import ServersDetailsSidebar from "@/components/servers/details/navigation/ServersDetailsSidebar";
import ServersDetailsTopBar from "@/components/servers/details/navigation/ServersDetailsTopBar";

const ServerChannel = ({
  params: { serverId, channelId },
}: {
  params: {
    serverId: string;
    channelId: string;
  };
}) => {
  return (
    <div className="flex">
      <div className="basis-[30em] max-w-[240px] w-full">
        <ServersDetailsSidebar />
      </div>
      <div className="basis-full grow flex flex-col justify-between">
        <div>
          <ServersDetailsTopBar />
        </div>
        <div>
          <ServersDetailsChat />
        </div>
        <div className="p-3 sticky bottom-0 right-0">
          <ChatForm />
        </div>
      </div>
      <div className="basis-[30em] max-w-[240px] w-full">
        <ServersDetailsInformations />
      </div>
    </div>
  );
};

export default ServerChannel;
