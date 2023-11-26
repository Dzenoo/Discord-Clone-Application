"use client";

import Input from "@/components/shared/form/Input";
import Select from "@/components/shared/form/Select";
import useForm from "@/library/hooks/useForm";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";
import type { InputElement } from "@/types/inputs";

const SignupForm: React.FC = () => {
  const [formState, inputChangeHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      username: {
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
    <form>
      <div>
        <h2>Create The Account</h2>
      </div>
      <div></div>
      <div></div>
    </form>
  );
};

export default SignupForm;
