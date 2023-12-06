import { Chat } from "@mui/icons-material";
import { Speed } from "@mui/icons-material";
import { Shop } from "@mui/icons-material";
import Tab from "@/components/shared/ui/Tab";
import ManageProfileBar from "@/components/profile-management/ManageProfileBar";
import LinkHref from "@/components/shared/ui/Link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUser } from "@/library/actions/user.actions";
import { DirectMessageType, UserTypes } from "@/types/users";

const DirectMessagesSidebar: React.FC = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userIdAuth = session?.user?.id;
  const user: UserTypes = await fetchUser(userIdAuth);

  return (
    <nav className="p-3 min-h-screen bg-[#222222] overflow-hidden">
      <div>
        <div className="border-b pb-4 border-gray-700">
          <input className="inputs" placeholder="Find a conversation" />
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <LinkHref
            href={`/${userIdAuth}`}
            icon={<Chat style={{ color: "#fff" }} />}
            title="Friends"
          />
          <Tab icon={<Speed style={{ color: "#fff" }} />} title="Nitro" />
          <Tab icon={<Shop style={{ color: "#fff" }} />} title="Shop" />
        </div>
      </div>
      <div className="pt-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="section_subtitle text-gray-300">Direct Messages</h2>
        </div>
        <ul className="overflow-y-scroll h-[370px]">
          {user.directMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-gray-300 text-xs">No messages yet.</h2>
            </div>
          )}
          {user?.directMessages.map(
            (directMessages: DirectMessageType, ind: number) => (
              <LinkHref
                key={ind}
                href={`/${userIdAuth}/direct-messages}`}
                title={directMessages?.user.username}
                image={directMessages?.user.image}
              />
            )
          )}
        </ul>
      </div>
      <ManageProfileBar
        username={user.username}
        name={user.name}
        userId={user._id}
        image={user.image}
        createdDate={user.createdAt}
      />
    </nav>
  );
};

export default DirectMessagesSidebar;
