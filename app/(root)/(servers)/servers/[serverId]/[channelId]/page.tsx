import ChatForm from "@/components/chat/ChatForm";
import ServersDetailsChat from "@/components/servers/details/navigation/ServersDetailsChat";
import ServersDetailsTopBar from "@/components/servers/details/navigation/ServersDetailsTopBar";
import ServersDetailsSidebar from "@/components/servers/details/navigation/ServersDetailsSidebar";
import ServersDetailsInformations from "@/components/servers/details/navigation/ServersDetailsInformations";
import { fetchServerById } from "@/library/actions/servers.actions";
import { notFound } from "next/navigation";
import { ServerItem } from "@/types/servers";
import { fetchUser } from "@/library/actions/user.actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Server from "@/library/models/server";
import { getChannel } from "@/library/functions";

const ServerChannel = async ({
  params: { serverId, channelId },
}: {
  params: {
    serverId: string;
    channelId: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  const fetchedServer: ServerItem = await fetchServerById(serverId);
  // @ts-ignore
  const fetchedUser = await fetchUser(session?.user?.id);
  const server: ServerItem = JSON.parse(JSON.stringify(fetchedServer));
  const channel = getChannel(server?.categories, channelId);

  if (!fetchedServer || !fetchedUser) {
    notFound();
  }

  return (
    <div className="flex">
      <div className="basis-[30em] max-w-[240px] w-full">
        <ServersDetailsSidebar
          serverName={server?.name}
          serverId={serverId}
          categories={server?.categories}
          user={{
            _id: fetchedUser?._id,
            username: fetchedUser?.username,
            name: fetchedUser?.name,
          }}
        />
      </div>
      <div className="basis-full grow flex flex-col justify-between">
        <div>
          <ServersDetailsTopBar name={channel?.name} />
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
