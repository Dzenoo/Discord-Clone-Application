export interface SelectPropsTypes {
  options: {
    id: string;
    value: string;
    label: string;
  }[];
  id: string;
  onInputChange: (id: string, value: string, isValid: boolean) => void;
}

export interface SelectReducerActionTypes {
  type: "SELECT_CHANGE";
  value: string;
}

export interface SelectReducerStateTypes {
  value: string;
  isValid: boolean;
}
