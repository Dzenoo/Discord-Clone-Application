"use client";

import useForm from "@/library/hooks/useForm";
import Input, { InputElement } from "../../shared/form/Input";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";
import { createMessageServer } from "@/library/actions/servers.actions";
import { getUserAuthId } from "@/library/functions";
import { ToastContainer, toast } from "react-toastify";

interface ChatFormTypes {
  serverId: string;
  channelId: string;
}

const ChatForm: React.FC<ChatFormTypes> = ({ serverId, channelId }) => {
  const userId = getUserAuthId();
  const { formState, inputChangeHandler, restartForm } = useForm(
    {
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function submitHandler(
    event: React.KeyboardEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (formState.isValid === false) {
      toast.error("Please enter a valid message");
      return;
    }

    createMessageServer(
      serverId,
      channelId,
      formState.inputs.content.value,
      userId,
      `/servers/${serverId}/${channelId}`
    ).then(() => {
      restartForm(
        {
          content: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    });
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={submitHandler} className="flex items-end gap-3">
        <div className="basis-full">
          <Input
            elementType={InputElement.INPUT}
            id={"content"}
            type={"text"}
            placeholder={`Message`}
            validators={[VALIDATOR_REQUIRE()]}
            onInputChange={inputChangeHandler}
            value={formState.inputs.content.value}
            helperText="Enter a message"
          />
        </div>
      </form>
    </>
  );
};

export default ChatForm;
