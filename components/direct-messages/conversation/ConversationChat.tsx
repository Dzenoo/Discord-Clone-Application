import ChatList from "@/components/chat/ChatList";
import Button from "@/components/shared/form/Button";
import Image from "next/image";

const ConversationChat: React.FC = () => {
  return (
    <div className="p-3 py-6 h-[90vh] overflow-y-scroll">
      <div>
        <div>
          <Image
            src="/images/machine-mining.jpg"
            alt="profile_image"
            className="rounded-full w-24 h-24"
            width={100}
            height={100}
          />
        </div>
        <div className="py-3 flex items-center gap-8">
          <div>
            <h2 className="text-white text-xl font-bold">Cilindar</h2>
            <p className="text-lg text-gray-300">cilindar</p>
          </div>
          <div className="flex gap-3">
            <div>
              <Button type="button" variant="primary">
                Add friend
              </Button>
            </div>
            <div>
              <Button type="button" variant="danger">
                Block
              </Button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-400">
            This is your chat and conversation with cilindar.
          </p>
        </div>
      </div>
      <ChatList />
    </div>
  );
};

export default ConversationChat;
