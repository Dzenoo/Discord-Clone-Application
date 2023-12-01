"use client";
import { useEffect, useReducer } from "react";

const reducer = (
  state: { isOpened: boolean },
  action: { type: "toggle" | "close" }
) => {
  switch (action.type) {
    case "toggle":
      return { isOpened: !state.isOpened };
    case "close":
      return { isOpened: false };
    default:
      throw new Error();
  }
};

const useToggleOverlay = () => {
  const [state, dispatch] = useReducer(reducer, { isOpened: false });

  useEffect(() => {
    const body = document.querySelector("body")! as HTMLBodyElement;

    body.addEventListener("click", handleExit);

    return () => {
      body.removeEventListener("click", handleExit);
    };
  }, []);

  function handleExit(): void {
    dispatch({ type: "close" });
  }

  function handleToggle(): void {
    dispatch({ type: "toggle" });
  }

  return { isOpened: state.isOpened, handleToggle };
};

export default useToggleOverlay;
