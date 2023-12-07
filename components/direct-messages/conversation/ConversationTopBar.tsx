import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import VideocamIcon from "@mui/icons-material/Videocam";

interface ConversationTopBarProps {
  username: string;
  image: string;
}

const ConversationTopBar: React.FC<ConversationTopBarProps> = ({
  username,
  image,
}) => {
  return (
    <div className="p-4 shadow-md flex justify-between items-center">
      <div className="flex gap-[8px] items-center">
        <div>
          <img
            src={image}
            alt={`user_${username}`}
            className="w-7 h-7 object-cover rounded-full cursor-pointer"
          />
        </div>
        <div>
          <h2 className="text-[14px] font-bold text-white">{username}</h2>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div>
          <WifiCalling3Icon
            style={{ color: "gray", cursor: "pointer" }}
            fontSize="medium"
          />
        </div>
        <div>
          <VideocamIcon
            style={{ color: "gray", cursor: "pointer" }}
            fontSize="medium"
          />
        </div>
        <div>
          <input className="inputs" placeholder="Search" />
        </div>
      </div>
    </div>
  );
};

export default ConversationTopBar;
