const ActiveNowSidebar: React.FC = () => {
  return (
    <nav className="p-6 min-h-screen bg-[#222222] overflow-hidden">
      <div>
        <h2 className="text-xl font-bold text-white">Active Now</h2>
      </div>
      <div className="p-6">
        <h2 className="section_subtitle text-center text-white">
          Its quiet for now
        </h2>
        <p className="text-[13px] text-center text-gray-400">
          When a friend starts an activity, like playing game, it will show here
        </p>
      </div>
    </nav>
  );
};

export default ActiveNowSidebar;
