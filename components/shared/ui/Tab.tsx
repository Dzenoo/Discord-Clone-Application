import type { TabProps } from "@/types/tab";

const Tab: React.FC<TabProps> = ({ title, image, icon, onClick }) => {
  return (
    <button
      className="flex gap-3 items-center p-[7px] rounded-md transition-all hover:bg-[#313339]"
      onClick={onClick}
    >
      {(image || icon) && (
        <div>
          {image ? (
            <img src={image} alt={title} className="w-9 h-9 rounded-full" />
          ) : (
            icon
          )}
        </div>
      )}
      {title && (
        <div>
          <p className="text-gray-400 whitespace-nowrap">{title}</p>
        </div>
      )}
    </button>
  );
};

export default Tab;
