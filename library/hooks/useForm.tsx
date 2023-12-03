import { InitialInputsTypes, ValidatorState } from "@/types/validators";
import { useCallback, useReducer } from "react";

const reducer = (
  state: ValidatorState,
  action:
    | { type: "CHANGE"; inputId: string; value: string; isValid: boolean }
    | { type: "RESTART" }
) => {
  switch (action.type) {
    case "CHANGE": {
      let formIsValid: boolean = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }
    case "RESTART": {
      const resetInputs: { [key: string]: InitialInputsTypes } = {};
      for (const inputId in state.inputs) {
        resetInputs[inputId] = {
          value: "",
          isValid: false,
        };
      }
      return {
        ...state,
        inputs: resetInputs,
        isValid: false,
      };
    }
    default:
      return state;
  }
};

const useForm = (
  initialInputs: { [key: string]: InitialInputsTypes },
  initialValidity: boolean
) => {
  const [formState, dispatch] = useReducer(reducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  } as ValidatorState);

  const inputChangeHandler = useCallback(
    (id: string, value: string, isValid: boolean): void => {
      dispatch({ type: "CHANGE", value, isValid, inputId: id });
    },
    []
  );

  const restartForm = useCallback(() => {
    dispatch({ type: "RESTART" });
  }, []);

  return { formState, inputChangeHandler, restartForm };
};

export default useForm;
