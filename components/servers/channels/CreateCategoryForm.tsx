"use client";

import Button from "@/components/shared/form/Button";
import Input, { InputElement } from "@/components/shared/form/Input";
import useForm from "@/library/hooks/useForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "@/library/validators/Validators";

const CreateCategoryForm: React.FC = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      category_name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <div className="py-3 flex flex-col gap-6 w-96">
      <div>
        <h2 className="text-xl text-white font-bold">Create Category</h2>
      </div>
      <form className="flex flex-col gap-6">
        <div>
          <Input
            elementType={InputElement.INPUT}
            id={"category_name"}
            type={"text"}
            placeholder={"Enter category name"}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            onInputChange={inputChangeHandler}
            label="Category Name"
            helperText="Please enter a valid category name."
          />
        </div>
        <div>
          <Button type="submit" disabled={!formState.isValid} variant="primary">
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
