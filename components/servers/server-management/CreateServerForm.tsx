"use client";

import Button from "@/components/shared/form/Button";
import ImagesUpload from "@/components/shared/form/ImagesUpload";
import Input from "@/components/shared/form/Input";
import { createServer } from "@/library/actions/servers.actions";
import useForm from "@/library/hooks/useForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "@/library/validators/Validators";
import { InputElement } from "@/types/inputs";
import { CreateServerFormTypes } from "@/types/servers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateServerForm: React.FC<CreateServerFormTypes> = ({
  dialogId,
  closeDialog,
}) => {
  const router = useRouter();
  const { data } = useSession();
  const { formState, inputChangeHandler, restartForm } = useForm(
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

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // @ts-ignore
    if (!formState.isValid || !data?.user.id) return;

    try {
      const response: {
        message: string;
        serverId: string;
      } = await createServer(
        formState.inputs.server_name.value,
        formState.inputs.server_image.value,
        // @ts-ignore
        data?.user.id,
        // @ts-ignore
        `/${data?.user.id}`
      );

      if (response.message === "Server created successfully.") {
        restartForm(
          {
            ...formState.inputs,
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
        closeDialog(dialogId);
        router.push(`/servers/${response.serverId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="p-3 text-center">
        <h2 className="text-xl text-white font-bold">Create the Server</h2>
        <p className="mt-3 text-gray-400 font-thin">
          This server is where you and your friends hang out.
        </p>
      </div>
      <div>
        <form
          className="py-3 flex flex-col gap-3 overflow-hidden"
          onSubmit={submitHandler}
        >
          <div>
            <ImagesUpload
              id={"server_image"}
              imagePreview={formState.inputs.server_image.value}
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
              value={formState.inputs.server_name.value}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerForm;
