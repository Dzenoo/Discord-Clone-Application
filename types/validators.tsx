export type ValidatorPropertiesTypes = {
  type: string;
  val?: number;
};

export type InitialInputsTypes = {
  value: string;
  isValid: boolean;
};

export type ValidatorState = {
  inputs: { [key: string]: InitialInputsTypes };
  isValid: boolean;
};
