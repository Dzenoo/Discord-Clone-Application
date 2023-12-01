import LinkHref from "@/components/shared/ui/Link";

const ServersDetailsInformations: React.FC = () => {
  return (
    <div className="p-3 min-h-screen bg-[#222222] overflow-hidden">
      <div>
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold truncate">
            Online
          </h2>
        </div>
        <div className="py-3">
          <LinkHref
            href="/servers/"
            image="/images/machine-mining.jpg"
            title="Dzenis"
          />
          <LinkHref
            href="/servers/"
            image="/images/machine-mining.jpg"
            title="Dzenis"
          />
          <LinkHref
            href="/servers/"
            image="/images/machine-mining.jpg"
            title="Dzenis"
          />
        </div>
      </div>
      <div>
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold truncate">
            Offline
          </h2>
        </div>
        <div className="py-3">
          {" "}
          <LinkHref
            href="/servers/"
            image="/images/machine-mining.jpg"
            title="Dzenis"
          />
          <LinkHref
            href="/servers/"
            image="/images/machine-mining.jpg"
            title="Dzenis"
          />
          <LinkHref
            href="/servers/"
            image="/images/machine-mining.jpg"
            title="Dzenis"
          />
        </div>
      </div>
    </div>
  );
};

export default ServersDetailsInformations;
