import ManageProfileBar from "@/components/profile-management/ManageProfileBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextChannels from "../../channels/TextChannels";

const ServersDetailsSidebar: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#222222] overflow-hidden flex flex-col justify-between">
      <div>
        <div className="p-3 shadow-md transition-all hover:bg-[#313339] cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white font-bold">Server Name</h2>
            </div>
            <div>
              <KeyboardArrowDownIcon style={{ color: "gray" }} />
            </div>
          </div>
          {/* <div></div> */}
        </div>
        <div className="p-3">
          <TextChannels channels={[{ id: "1", title: "general" }]} />
        </div>
      </div>
      <div className="p-3">
        <ManageProfileBar />
      </div>
    </div>
  );
};

export default ServersDetailsSidebar;
