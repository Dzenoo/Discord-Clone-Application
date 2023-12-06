import ChatForm from "@/components/chat/ChatForm";
import ServersDetailsChat from "@/components/servers/details/navigation/ServersDetailsChat";
import ServersDetailsTopBar from "@/components/servers/details/navigation/ServersDetailsTopBar";
import ServersDetailsSidebar from "@/components/servers/details/navigation/ServersDetailsSidebar";
import ServersDetailsInformations from "@/components/servers/details/navigation/ServersDetailsInformations";
import { fetchServerById } from "@/library/actions/servers.actions";
import { notFound } from "next/navigation";
import {
  ServerChannel as ServerChannelPropsTypes,
  ServerItem,
} from "@/types/servers";
import { fetchUser } from "@/library/actions/user.actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getChannel } from "@/library/functions";
import { UserTypes } from "@/types/users";

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
  const fetchedUser: UserTypes = await fetchUser(session?.user?.id);
  const server: ServerItem = JSON.parse(JSON.stringify(fetchedServer));
  const channel: ServerChannelPropsTypes = getChannel(
    server?.categories,
    channelId
  );

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
            image: fetchedUser?.image,
            createdAt: fetchedUser?.createdAt,
          }}
        />
      </div>
      <div className="basis-full grow flex flex-col justify-between">
        <div>
          <ServersDetailsTopBar name={channel?.name} />
        </div>
        <div>
          <ServersDetailsChat messages={channel?.messages} />
        </div>
        <div className="p-3 sticky bottom-0 right-0">
          <ChatForm serverId={serverId} channelId={channelId} />
        </div>
      </div>
      <div className="basis-[30em] max-w-[240px] w-full">
        <ServersDetailsInformations members={server?.members} />
      </div>
    </div>
  );
};

export default ServerChannel;
