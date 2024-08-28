import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <>
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
        <div>
          <input
            type="text"
            name="title"
            ref={titleRef}
            value={values.title}
            onChange={onChange}
            className={cn(styles["input-title"], {
              [styles["invalid"]]: !isValid.title,
            })}
          />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="date" className={styles["form-label"]}>
            <img src="/calendar.svg" alt="иконка календаря" />
            <span>Дата</span>
          </label>
          <input
            type="date"
            name="date"
            id="date"
            ref={dateRef}
            value={values.date}
            onChange={onChange}
            className={cn(styles["input"], {
              [styles["invalid"]]: !isValid.date,
            })}
          />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="tag" className={styles["form-label"]}>
            <img src="/folder.svg" alt="иконка папки" />
            <span>Метки</span>
          </label>
          <input
            type="text"
            name="tag"
            value={values.tag}
            onChange={onChange}
            id="tag"
            className={styles["input"]}
          />
        </div>
        <textarea
          name="text"
          id=""
          cols="30"
          rows="20"
          ref={textRef}
          value={values.text}
          onChange={onChange}
          className={cn(styles["input"], {
            [styles["invalid"]]: !isValid.text,
          })}
        ></textarea>
        <Button text="Сохранить"></Button>
      </form>
    </>
  );
}

export default JournalForm;
