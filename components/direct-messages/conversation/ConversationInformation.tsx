import Image from "next/image";
import Toggle from "@/components/shared/ui/Toggle";
import LinkHref from "@/components/shared/ui/Link";

const ConversationInformation: React.FC = () => {
  return (
    <div className="shadow-md h-full flex flex-col gap-3">
      <div className={`h-28 bg-blue-600`}>
        <Image
          src="/images/machine-mining.jpg"
          alt="profile_image"
          className="rounded-full w-24 h-24 border-4 border-gray-800 relative left-3 top-16"
          width={100}
          height={100}
        />
      </div>
      <div className="bg-[#191919] rounded-md mt-16 mx-3 p-3">
        <div className="pb-3 border-b border-gray-600">
          <h2 className="text-white">dz3n00</h2>
          <p className="text-xs text-gray-300">dz3n00</p>
        </div>
        <div className="py-3 border-b border-gray-600">
          <h2 className="text-gray-300 section_subtitle">
            Chatcord member since
          </h2>
          <p className="mt-3 text-xs text-gray-300">Jun 11 2022</p>
        </div>
      </div>
      <div>
        <div className="bg-[#191919] rounded-t mx-3 p-3 hover:bg-[#212121]">
          <Toggle
            title="2 Mutual Servers"
            content={
              <LinkHref
                image="/images/machine-mining.jpg"
                title="Jane Smith"
                href="/"
              />
            }
          />
        </div>
        <div className="bg-[#191919] rounded-b mx-3 p-3 hover:bg-[#212121]">
          <Toggle
            title="2 Mutual Friends"
            content={
              <LinkHref
                image="/images/machine-mining.jpg"
                title="Jane Smith"
                href="/"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationInformation;
