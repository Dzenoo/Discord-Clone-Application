"use client";
import useForm from "@/library/hooks/useForm";
import Input, { InputElement } from "../../shared/form/Input";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";
import { createMessagesForDirect } from "@/library/actions/user.actions";

interface ConversationChatFormTypes {
  friendId: string;
  friendUsername: string;
  userId: string;
}

const ConversationChatForm: React.FC<ConversationChatFormTypes> = ({
  userId,
  friendId,
  friendUsername,
}) => {
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

    if (formState.isValid === false) return;

    await createMessagesForDirect(
      userId,
      friendId,
      formState.inputs.content.value,
      `/${userId}/${friendId}`
    );
  }

  return (
    <form onSubmit={submitHandler} className="flex items-end gap-3">
      <div className="basis-full">
        <Input
          elementType={InputElement.INPUT}
          id={"content"}
          type={"text"}
          placeholder={`Message ${friendUsername}`}
          validators={[VALIDATOR_REQUIRE()]}
          onInputChange={inputChangeHandler}
        />
      </div>
    </form>
  );
};

export default ConversationChatForm;
