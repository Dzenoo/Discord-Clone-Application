import { UserTypes } from "@/types/users";
import { getServerSession } from "next-auth";
import LinkHref from "@/components/shared/elements/Link";
import { authOptions } from "@/lib/session";
import { isUserAdminForServer } from "@/lib/functions";
import { ServerItem } from "@/types/servers";

interface ServersDetailsInformationsTypes {
  server: ServerItem;
}

const ServersDetailsInformations: React.FC<
  ServersDetailsInformationsTypes
> = async ({ server }) => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  const currentProfile = server?.members?.find(
    (member: UserTypes) => member?._id === userId
  );

  const isProfile = currentProfile?._id === userId;

  return (
    <div className="p-3 min-h-screen bg-[#222222] overflow-hidden">
      <div>
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold truncate">
            Online
          </h2>
        </div>
        <div className="py-3">
          {server?.members?.map((member: UserTypes) => {
            const isMemberAdmin = isUserAdminForServer(server, member);

            return (
              <div>
                <LinkHref
                  key={`member_${member?._id}`}
                  href={`${isProfile ? null : `/${userId}/${member?._id} `}`}
                  image={member?.image}
                  title={member?.name}
                />
                {isMemberAdmin ? "adminje" : "nije"}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold truncate">
            Offline
          </h2>
        </div>
        <div className="py-3">
          {server?.members?.map((member: UserTypes) => (
            <LinkHref
              key={member?._id}
              href={`${isProfile ? null : `/${userId}/${member?._id} `}`}
              image={member?.image}
              title={member?.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServersDetailsInformations;
