export interface SelectPropsTypes {
  options: {
    id: string;
    value: string;
    label: string;
  }[];
  id: string;
  onInputChange: any;
  label?: string;
}

export interface SelectReducerActionTypes {
  type: "SELECT_CHANGE";
  value: string;
}

export interface SelectReducerStateTypes {
  value: string;
  isValid: boolean;
}
