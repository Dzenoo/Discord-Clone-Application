import { UserTypes } from "@/types/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";
import { isUserAdminForServer } from "@/lib/functions";
import { ServerItem } from "@/types/servers";
import LinkHref from "@/components/shared/elements/Link";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ServersDetailsInformationsTypes {
  server: ServerItem;
}

const ServersDetailsInformations: React.FC<
  ServersDetailsInformationsTypes
> = async ({ server }) => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  function rednerAdminJsx() {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AdminPanelSettingsIcon style={{ color: "lightblue" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Admin</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="p-3 min-h-screen bg-[#222222] overflow-hidden">
      <div>
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold truncate">
            Online
          </h2>
        </div>
        <div className="py-3 w-full">
          {server?.members?.map((member: UserTypes) => {
            const isMemberAdmin = isUserAdminForServer(server, member);

            return (
              <div className="flex items-center gap-3 w-full">
                <LinkHref
                  key={`member_${member?._id}`}
                  href={`${
                    member._id === userId ? null : `/${userId}/${member?._id} `
                  }`}
                  image={member?.image}
                  title={member?.name}
                />
                {isMemberAdmin && rednerAdminJsx()}
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
              href={`${
                member._id === userId ? null : `/${userId}/${member?._id} `
              }`}
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
