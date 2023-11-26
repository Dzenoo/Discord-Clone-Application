import { VALIDATOR_REQUIRE, validate } from "@/library/validators/Validators";
import type {
  SelectPropsTypes,
  SelectReducerActionTypes,
  SelectReducerStateTypes,
} from "@/types/select";
import { useCallback, useEffect, useReducer } from "react";

const reducer = (
  state: SelectReducerStateTypes,
  action: SelectReducerActionTypes
): SelectReducerStateTypes => {
  switch (action.type) {
    case "SELECT_CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, [VALIDATOR_REQUIRE()]),
      };
    default:
      return state;
  }
};

const Select: React.FC<SelectPropsTypes> = ({ options, id, onInputChange }) => {
  const [state, dispatch] = useReducer(reducer, {
    value: "",
    isValid: false,
  });

  useEffect(() => {
    onInputChange(id, state.value, state.isValid);
  }, [state.value, state.isValid, onInputChange, id]);

  const selectChangeHandler = useCallback((event: any) => {
    dispatch({ type: "SELECT_CHANGE", value: event.target.value });
  }, []);

  return (
    <select id={id} onChange={selectChangeHandler}>
      {options.map((option: { id: string; value: string; label: string }) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
