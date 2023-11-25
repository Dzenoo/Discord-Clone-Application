"use client";
import { validate } from "@/library/validators/Validators";
import type {
  InputProps,
  InputReducerActionTypes,
  InputReducerStateTypes,
} from "@/types/inputs";
import { useCallback, useEffect, useReducer } from "react";

const reducer = (
  state: InputReducerStateTypes,
  action: InputReducerActionTypes
) => {
  switch (action.type) {
    case "CHANGE": {
      const { value, validators } = action.payload;

      return {
        ...state,
        value: value,
        isValid: validate(value, validators),
      };
    }
    case "BLUR": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default: {
      return state;
    }
  }
};

const Input: React.FC<InputProps> = ({
  id,
  value,
  type,
  placeholder,
  label,
  helperText,
  elementType,
  validators,
  onInputChange,
  initialValidity,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    value: value || "",
    isTouched: false,
    isValid: initialValidity || false,
  });

  useEffect(() => {
    onInputChange(id, state.value, state.isValid);
  }, [state.value, state.isValid, onInputChange, id]);

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({
        type: "CHANGE",
        payload: { value: e.target.value, validators: validators },
      });
    },
    []
  );

  const blurHandler = useCallback(() => {
    dispatch({ type: "BLUR", payload: { value: "", validators: [] } });
  }, []);

  let element:
    | React.ReactElement<HTMLInputElement>
    | React.ReactElement<HTMLTextAreaElement>;

  if (elementType === "textarea") {
    element = (
      <textarea
        id={id}
        value={state.value}
        placeholder={placeholder}
        className={`p-4 rounded-md bg-[#2b2b2b] text-white border border-gray-400 resize-y h-36 ${
          !state.isValid && state.isTouched && "border-red-600"
        }`}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    );
  } else {
    element = (
      <input
        id={id}
        value={state.value}
        placeholder={placeholder}
        type={type}
        className={`p-4 rounded-md bg-[#2b2b2b] text-white border border-gray-400 ${
          !state.isValid && state.isTouched && "border-red-600"
        }`}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className={`section_subtitle text-white ${
          !state.isValid && state.isTouched && "text-red-600"
        }`}
      >
        {label}
      </label>
      {element}
      {!state.isValid && state.isTouched && (
        <p className="section_subtitle text-red-600">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
