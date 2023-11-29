"use client";

import useForm from "@/library/hooks/useForm";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { InputElement } from "@/types/inputs";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";

const ChatForm: React.FC = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function submitHandler(event: React.KeyboardEvent<HTMLFormElement>): void {
    event.preventDefault();

    console.log(formState.inputs);
  }

  return (
    <form onSubmit={submitHandler} className="max-w-3xl flex items-end gap-3">
      <div className="basis-full">
        <Input
          elementType={InputElement.INPUT}
          id={"content"}
          type={"text"}
          placeholder={`Message ${"@Cilindar"}`}
          validators={[VALIDATOR_REQUIRE()]}
          onInputChange={inputChangeHandler}
          value={formState.inputs.content.value}
        />
      </div>
      <div className="basis-36">
        <Button variant="primary" type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ChatForm;
