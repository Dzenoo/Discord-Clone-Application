"use client";

import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";
import {
  deleteDirectMessage,
  editMessage,
} from "@/library/actions/user.actions";
import Button from "../shared/form/Button";
import useForm from "@/library/hooks/useForm";
import Input, { InputElement } from "../shared/form/Input";
import useDialog from "@/library/hooks/useDialog";
import Dialog from "../shared/elements/Dialog";
import { deleteMessageServer } from "@/library/actions/servers.actions";
import { getUserAuthId } from "@/library/functions";

export interface ChatItemProps {
  userId: string;
  userImage: string;
  username: string;
  messageId: string;
  content: string;
  date: string;
  friendId?: string;
  serverId?: string;
  channelId?: string;
}

const ChatItem: React.FC<ChatItemProps> = ({
  userId,
  userImage,
  username,
  messageId,
  content,
  date,
  friendId,
  serverId,
  channelId,
}) => {
  const [isEditing, setIsEditing] = useState<boolean | undefined>(false);
  const { formState, inputChangeHandler } = useForm(
    {
      content: {
        value: content,
        isValid: true,
      },
    },
    true
  );
  const { dialogs, openDialog, closeDialog } = useDialog({
    delete_message: {
      isOpen: false,
    },
  });
  const userIdAuth = getUserAuthId();

  const createdDate: string = new Date(date).toLocaleDateString("en-US", {
    minute: "numeric",
    hour: "numeric",
  });

  const isMentioned: boolean = content.includes(username);
  const isOwner: boolean = userId === userIdAuth;
  const isValidToEdit = formState.inputs.content.value !== content;

  function toggleEdit(): void {
    setIsEditing((prevEdit: boolean | undefined) => !prevEdit);
  }

  function cancelEdit(): void {
    setIsEditing(false);
  }

  async function deleteMessageHandler() {
    try {
      if (friendId !== undefined) {
        const response = await deleteDirectMessage(
          userIdAuth,
          friendId,
          messageId,
          `/${userIdAuth}/${friendId}`
        );

        if (response!.message === "Message deleted.") {
          closeDialog("delete_message");
        }
      } else {
        const response = await deleteMessageServer(
          serverId!,
          channelId!,
          messageId,
          `/servers/${serverId}/${channelId}}`
        );
        console.log(friendId);
        if (response!.message === "Message deleted.") {
          closeDialog("delete_message");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editMessageHandler() {
    try {
      const response = await editMessage(
        messageId,
        formState.inputs.content.value,
        friendId ? `/${userIdAuth}/${friendId}` : `/servers/${userIdAuth}`
      );

      if (response!.message === "Message edited.") {
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`p-3 rounded-md flex justify-between items-start gap-3 transition-colors bg-transparent hover:bg-[#1e1e1e] ${
        isMentioned && " border-yellow-600 border"
      }`}
      id={messageId}
    >
      <div className="flex items-start gap-3">
        <div>
          <img
            src={userImage}
            alt={username}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-[6px]">
            <div>
              <h2 className="text-white font-bold">{username}</h2>
            </div>
            <div>
              <p className="text-xs text-gray-400">{createdDate}</p>
            </div>
          </div>
          <div className="max-w-xl">
            <Dialog
              isOpen={dialogs.delete_message.isOpen}
              closeDialog={() => closeDialog("delete_message")}
            >
              <div>
                <div>
                  <h2 className="text-xl text-white font-bold">
                    Delete Message
                  </h2>
                  <p className="text-gray-400 font-thin">
                    Are you sure you want to delete this message?
                  </p>
                </div>
                <div className="py-3 flex justify-end items-end">
                  <Button
                    variant="danger"
                    type="button"
                    onClick={deleteMessageHandler}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Dialog>
            {isEditing ? (
              <Input
                elementType={InputElement.INPUT}
                id={"content"}
                type={"text"}
                placeholder={""}
                validators={[VALIDATOR_REQUIRE()]}
                onInputChange={inputChangeHandler}
                initialValidity={true}
                value={formState.inputs.content.value}
              />
            ) : (
              <p className="text-white break-words">{content}</p>
            )}
          </div>
        </div>
      </div>
      {isOwner && (
        <div>
          <div className="flex gap-3 items-center">
            {isEditing ? (
              <div className="flex gap-3 items-center">
                <Button
                  variant="primary"
                  type="button"
                  disabled={!formState.isValid || !isValidToEdit}
                  onClick={editMessageHandler}
                >
                  Save
                </Button>
                <button
                  className="p-3 rounded-md text-[13px] text-white outline outline-2 outline-gray-600"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="p-[3px] cursor-pointer bg-[#2b2b2b] rounded-md transition hover:bg-[#121212]"
                onClick={toggleEdit}
              >
                <Edit style={{ color: "gray" }} />
              </button>
            )}
            <button
              className="p-[3px] cursor-pointer bg-[#2b2b2b] rounded-md transition hover:bg-[#121212]"
              onClick={() => openDialog("delete_message")}
            >
              <Delete style={{ color: "gray" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
