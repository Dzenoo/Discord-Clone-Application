import { authOptions } from "@/library/session";
import { UserTypes } from "@/types/users";
import { getServerSession } from "next-auth";
import LinkHref from "@/components/shared/ui/Link";

interface ServersDetailsInformationsTypes {
  members: UserTypes[];
}

const ServersDetailsInformations: React.FC<
  ServersDetailsInformationsTypes
> = async ({ members }) => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  const currentProfile = members?.find(
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
          {members?.map((member: UserTypes) => (
            <LinkHref
              key={`member_${member?._id}`}
              href={`${isProfile ? null : `/${userId}/${member?._id} `}`}
              image={member?.image}
              title={member?.name}
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold truncate">
            Offline
          </h2>
        </div>
        <div className="py-3">
          {members?.map((member: UserTypes) => (
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
