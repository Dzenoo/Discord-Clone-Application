"use client";

import type { ChatItemProps } from "@/types/chat";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { InputElement } from "@/types/inputs";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";
import Button from "../shared/form/Button";
import useForm from "@/library/hooks/useForm";
import Input from "../shared/form/Input";

const ChatItem: React.FC<ChatItemProps> = ({
  userImage,
  username,
  content,
  date,
}) => {
  const { formState, inputChangeHandler } = useForm(
    {
      content: {
        value: content,
        isValid: true,
      },
    },
    true
  );
  const [isEditing, setIsEditing] = useState<boolean | undefined>(false);
  const createdDate = new Date(date).toLocaleDateString("en-US");

  function toggleEdit(): void {
    setIsEditing((prevEdit) => !prevEdit);
  }

  function cancelEdit(): void {
    setIsEditing(false);
  }

  return (
    <div className="p-3 rounded-md flex justify-between items-start gap-3 transition-colors bg-transparent hover:bg-[#2b2b2b]">
      <div className="flex items-start gap-3">
        <div>
          <img
            src={"/images/machine-mining.jpg"}
            alt="Cilindar"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-[6px]">
            <div>
              <h2 className="text-white font-bold">Cilindar</h2>
            </div>
            <div>
              <p className="text-xs text-gray-400">{createdDate}</p>
            </div>
          </div>
          <div className="max-w-xl">
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
      <div>
        <div className="flex gap-3 items-center">
          {isEditing ? (
            <div className="flex gap-3 items-center">
              <Button
                variant="primary"
                type="button"
                disabled={!formState.isValid}
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
          <button className="p-[3px] cursor-pointer bg-[#2b2b2b] rounded-md transition hover:bg-[#121212]">
            <Delete style={{ color: "gray" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
