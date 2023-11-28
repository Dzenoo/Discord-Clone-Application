"use client";
import Tab from "@/components/shared/ui/Tab";
import Link from "next/link";
import Button from "@/components/shared/form/Button";
import type { FriendsItemActionsProps } from "@/types/friends";
import { Chat, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";

const FriendsItemActions: React.FC<FriendsItemActionsProps> = ({ href }) => {
  const [isOpenedActions, setIsOpenedActions] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    if (isOpenedActions) {
      document.addEventListener("click", handleCloseActions);
    } else {
      document.removeEventListener("click", handleCloseActions);
    }

    return () => {
      document.removeEventListener("click", handleCloseActions);
    };
  }, [isOpenedActions]);

  function handleCloseActions(): void {
    setIsOpenedActions(false);
  }

  function handleToggleActions(): void {
    setIsOpenedActions((prev) => !prev);
  }

  return (
    <div className="flex gap-[8px] items-center" onClick={handleToggleActions}>
      <div>
        <Link href={href}>
          <Tab icon={<Chat style={{ color: "#f3f3f3" }} />} />
        </Link>
      </div>
      <div className="relative">
        <div className="friend_options">
          <Tab icon={<MoreVert style={{ color: "#f3f3f3" }} />} />
        </div>
        {isOpenedActions && (
          <div className="flex flex-col gap-3 bg-[#191919] p-[3px] rounded-md absolute left-16 top-0 w-fit">
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
