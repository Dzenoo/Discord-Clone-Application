import { ValidatorPropertiesTypes } from "./validators";

export enum InputElement {
  INPUT = "input",
  TEXTAREA = "textarea",
}

export interface InputProps {
  elementType: InputElement;
  id: string;
  type: "text" | "password" | "email" | "date" | "time" | "number" | "checkbox";
  placeholder: string;
  value: string;
  label?: string;
  helperText?: string;
  validators: ValidatorPropertiesTypes[];
  onInputChange: any;
  initialValidity: boolean;
}

export interface InputReducerActionTypes {
  type: "CHANGE" | "BLUR";
  payload: {
    value: string;
    validators: ValidatorPropertiesTypes[];
  };
}

export interface InputReducerStateTypes {
  value: string;
  isTouched: boolean;
  isValid: boolean;
}
