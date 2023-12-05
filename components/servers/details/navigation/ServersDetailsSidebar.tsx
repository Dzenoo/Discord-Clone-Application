import ManageProfileBar from "@/components/profile-management/ManageProfileBar";
import Category from "../../channels/Category";
import ManageServerBar from "../../server-management/ManageServerBar";
import { ServersCategory } from "@/types/servers";

interface ServersDetailSidebarTypes {
  serverName: string;
  serverId: string;
  categories: ServersCategory[];
  user: {
    _id: string;
    username: string;
    name: string;
    image: string;
    createdAt: string;
  };
}

const ServersDetailsSidebar: React.FC<ServersDetailSidebarTypes> = ({
  serverName,
  serverId,
  categories,
  user,
}) => {
  return (
    <div className="min-h-screen bg-[#222222] overflow-hidden flex flex-col justify-between">
      <div>
        <ManageServerBar serverName={serverName} serverId={serverId} />
        <div className="p-3 flex flex-col gap-6">
          {categories?.map((category) => (
            <Category
              key={`category_${category._id}`}
              category={category}
              serverId={serverId}
            />
          ))}
        </div>
      </div>
      <div className="p-3">
        <ManageProfileBar
          username={user?.username}
          name={user?.name}
          userId={user?._id}
          image={user?.image}
          createdDate={user?.createdAt}
        />
      </div>
    </div>
  );
};

export default ServersDetailsSidebar;
