import { Tag } from "@mui/icons-material";

const ServersDetailsTopBar: React.FC = () => {
  return (
    <div className="p-[0.6em] flex justify-between items-center gap-6 shadow-md">
      <div className="flex gap-3 items-center">
        <div>
          <Tag style={{ color: "gray" }} />
        </div>
        <div>
          <h2 className="text-white font-bold">general</h2>
        </div>
      </div>
      <div>
        <input type="text" placeholder="Search" className="inputs" />
      </div>
    </div>
  );
};

export default ServersDetailsTopBar;
