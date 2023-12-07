"use client";

import useForm from "@/library/hooks/useForm";
import Input, { InputElement } from "../../shared/form/Input";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";
import { useSession } from "next-auth/react";
import { createMessageServer } from "@/library/actions/servers.actions";

interface ChatFormTypes {
  serverId: string;
  channelId: string;
}

const ChatForm: React.FC<ChatFormTypes> = ({ serverId, channelId }) => {
  const { data } = useSession();
  // @ts-ignore
  const userId = data?.user?.id;
  const { formState, inputChangeHandler } = useForm(
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

    if (formState.isValid === false) return;

    await createMessageServer(
      serverId,
      channelId,
      formState.inputs.content.value,
      userId,
      `/servers/${serverId}/${channelId}`
    );
  }

  return (
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
        />
      </div>
    </form>
  );
};

export default ChatForm;
