import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import cn from "classnames";
function JournalForm({ onSubmit }) {
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);
  };

  return (
    <>
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
        <input type="text" name="title" className={cn(styles["input"])} />
        <input type="date" name="date" />
        <input type="text" name="tag" />
        <textarea name="text" id="" cols="30" rows="20"></textarea>
        <Button text="Сохранить"></Button>
      </form>
    </>
  );
}

export default JournalForm;
