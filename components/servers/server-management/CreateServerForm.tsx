"use client";

import Button from "@/components/shared/form/Button";
import ImagesUpload from "@/components/shared/form/ImagesUpload";
import Input from "@/components/shared/form/Input";
import useForm from "@/library/hooks/useForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "@/library/validators/Validators";
import { InputElement } from "@/types/inputs";

const CreateServerForm = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      server_name: {
        value: "",
        isValid: false,
      },
      server_image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <div>
      <div className="p-3 text-center">
        <h2 className="text-xl text-white font-bold">Create the Server</h2>
        <p className="mt-3 text-gray-400 font-thin">
          This server is where you and your friends hang out.
        </p>
      </div>
      <div>
        <form className="py-3 flex flex-col gap-3 overflow-hidden">
          <div>
            <ImagesUpload
              id={"server_image"}
              onInputChange={inputChangeHandler}
            />
          </div>
          <div>
            <Input
              elementType={InputElement.INPUT}
              id={"server_name"}
              type={"text"}
              placeholder={"Enter Server Name"}
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
              label="Server Name"
              onInputChange={inputChangeHandler}
              helperText="Please enter a valid server name."
              initialValidity={false}
            />
          </div>
          <div>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerForm;
