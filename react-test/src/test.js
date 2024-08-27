import React, { FC, useReducer } from "react";

export type BaseExampleProps = {
  className?: string,
};

type State = {
  text: string,
};

type Action = {
  type: "test",
};
const state = {text: ""}
// Чистая функция, принимает предыдущее значение состояния и экшн, с помощью
// которого изменим состояние
const reducer = (state, action) => {
    const { type, payload } = action;
    const t1 = action.type
    const t2 = action["type"]
    const t3 = type
  switch (type) {
    case "test":
      return { ...state, text: "test" };

    default:
      return state;
  }
};
const example = {
    type: "PLUS",
    payload: "kjnjn"
}
reducer(object, example);
export const BaseExample: FC<BaseExampleProps> = () => {
  const [store, dispatch] = useReducer(reducer, { text: "" });
  return (
    <div>
      <div>{state.text}</div>
      <div>
        <button type="button" onClick={() => dispatch({ type: "test" })}>
          test
        </button>
      </div>
    </div>
  );
};


const test = (state, action) => { return {state, action} } => (state, action) => {

}
test2 = (action) => { return { action } }
reducer(store, test2({type: "test"}));
test(object, example)