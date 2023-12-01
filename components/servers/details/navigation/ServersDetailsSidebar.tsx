import ManageProfileBar from "@/components/profile-management/ManageProfileBar";
import Category from "../../channels/Category";
import ManageServerBar from "../../server-management/ManageServerBar";

const ServersDetailsSidebar: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#222222] overflow-hidden flex flex-col justify-between">
      <div>
        <ManageServerBar />
        <div className="p-3 flex flex-col gap-6">
          <Category
            title="Text Channels"
            id={"category"}
            channels={[{ id: "1", title: "general", type: "text" }]}
          />{" "}
          <Category
            title="Voice Channels"
            id={"category"}
            channels={[{ id: "1", title: "general", type: "voice" }]}
          />{" "}
          <Category
            title="Text Channels"
            id={"category"}
            channels={[{ id: "1", title: "general", type: "text" }]}
          />
        </div>
      </div>
      <div className="p-3">
        <ManageProfileBar />
      </div>
    </div>
  );
};

export default ServersDetailsSidebar;
