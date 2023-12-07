"use client";
import Tab from "@/components/shared/ui/Tab";
import Link from "next/link";
import Button from "@/components/shared/form/Button";
import { Chat, MoreVert } from "@mui/icons-material";
import useToggleOverlay from "@/library/hooks/useToggleOverlay";
import { createMessagesDirect } from "@/library/actions/user.actions";
import { useRouter } from "next/navigation";

export interface FriendsItemActionsProps {
  userId: string;
  friendId: string;
}

const FriendsItemActions: React.FC<FriendsItemActionsProps> = ({
  userId,
  friendId,
}) => {
  const { isOpened, handleToggle, overlayRef } = useToggleOverlay();
  const router = useRouter();

  async function handleCreateDirect() {
    const response = await createMessagesDirect(userId, friendId);

    router.push(`${userId}/${friendId}`);
  }

  return (
    <div className="flex gap-[8px] items-center">
      <div>
        <Tab
          icon={<Chat style={{ color: "#f3f3f3" }} />}
          onClick={handleCreateDirect}
        />
      </div>
      <div className="relative">
        <div className="friend_options" onClick={handleToggle}>
          <Tab icon={<MoreVert style={{ color: "#f3f3f3" }} />} />
        </div>
        {isOpened && (
          <div
            className="flex flex-col gap-3 bg-[#191919] p-[3px] rounded-md absolute left-16 top-0 w-fit"
            ref={overlayRef}
          >
            <div className="w-fit">
              <Tab title="Start Voice Call" />
            </div>
            <div>
              <Tab title="Start Video Call" />
            </div>
            <div>
              <Button variant="danger" type="button">
                Remove Friend
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsItemActions;
