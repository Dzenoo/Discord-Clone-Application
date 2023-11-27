import Button from "@/components/shared/form/Button";
import Tab from "@/components/shared/ui/Tab";
import { FriendsTopBarData } from "@/data";
import { Chat } from "@mui/icons-material";

const FriendsTopBar: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-center">
        <div className="flex gap-3 items-center border-r pr-3">
          <div>
            <Chat style={{ color: "#fff" }} />
          </div>
          <div>
            <h2 className="text-lg text-white">Friends</h2>
          </div>
        </div>
        <ul className="flex gap-3 items-center">
          {FriendsTopBarData.map(({ id, filter, title }) => {
            if (filter === "add-friend") {
              return <Button type="button">Add Friend</Button>;
            } else {
              return <Tab key={id} title={title} />;
            }
          })}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="p-[6px] rounded-md bg-[#2b2b2b] text-white w-full"
        />
      </div>
    </div>
  );
};

export default FriendsTopBar;
