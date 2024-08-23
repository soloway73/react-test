import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import cn from "classnames";
function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidStateate] = useState({
    date: true,
    text: true,
    title: true,
  });
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;
    if (!formProps.title?.trim().length) {
      setFormValidStateate((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidStateate((state) => ({ ...state, title: true }));
    }
    if (!formProps.date) {
      setFormValidStateate((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidStateate((state) => ({ ...state, date: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidStateate((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidStateate((state) => ({ ...state, text: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <>
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
        <input
          type="text"
          name="title"
          className={cn(styles["input"], {
            [styles["invalid"]]: !formValidState.title,
          })}
        />
        <input
          type="date"
          name="date"
          className={cn(styles["date"], {
            [styles["invalid"]]: !formValidState.date,
          })}
        />

        <input type="text" name="tag" />
        <textarea
          name="text"
          id=""
          cols="30"
          rows="20"
          className={cn(styles["text"], {
            [styles["invalid"]]: !formValidState.text,
          })}
        ></textarea>
        <Button text="Сохранить"></Button>
      </form>
    </>
  );
}

export default JournalForm;
