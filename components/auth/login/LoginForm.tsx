"use client";

import Button from "@/components/shared/form/Button";
import Input from "@/components/shared/form/Input";
import useForm from "@/library/hooks/useForm";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "@/library/validators/Validators";
import { InputElement } from "@/types/inputs";

const LoginForm: React.FC = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <form className="p-3 flex flex-col gap-8 w-[400px] max-md:w-fit">
      <div className="flex flex-col gap-6">
        <Input
          elementType={InputElement.INPUT}
          id={"email"}
          type={"email"}
          label="Email"
          placeholder={"Enter Email"}
          validators={[VALIDATOR_EMAIL()]}
          onInputChange={inputChangeHandler}
          initialValidity={false}
          helperText="Please enter a valid email address."
        />
        <Input
          elementType={InputElement.INPUT}
          id={"password"}
          type={"password"}
          label="Password"
          placeholder={"Enter Password"}
          validators={[VALIDATOR_MINLENGTH(8)]}
          onInputChange={inputChangeHandler}
          initialValidity={false}
          helperText="Please enter a valid password."
        />
      </div>
      <div>
        <Button type="submit" disabled={!formState.isValid}>
          Log In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
