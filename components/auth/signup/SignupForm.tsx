"use client";

import Input from "@/components/shared/form/Input";
import Select from "@/components/shared/form/Select";
import useForm from "@/library/hooks/useForm";
import { VALIDATOR_REQUIRE } from "@/library/validators/Validators";
import { InputElement } from "@/types/inputs";

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
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return <form></form>;
};

export default SignupForm;
