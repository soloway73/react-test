import { useReducer } from "react";
import "./CardButton.css";
function CardButton({ children, className, el }) {
  const cl = "card-button" + (className ? " " + className : "");
  const { dispatchForm } = useReducer();

  const getCardData = () => {
    dispatchForm({
      type: "EDIT",
      payload: { el },
    });
  };

  return (
    <>
      <button className={cl} onClick={getCardData}>
        {children}
      </button>
    </>
  );
}

export default CardButton;
