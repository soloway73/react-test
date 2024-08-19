import "./Button.css";
import { useState } from "react";

function Button() {
  // let text = 'Сохранить';
  const [text, setText] = useState("Сохранить");
  const clicked = () => {
    if (text == "Сохранить") {
      setText("Закрыть");
      console.log("Привет");
    }
    if (text == "Закрыть") {
      setText("Сохранить");
      console.log("Пока");
    }
  };
  return (
    <>
      <button onClick={clicked} className="button accent">
        {text}
      </button>
    </>
  );
}

export default Button;
