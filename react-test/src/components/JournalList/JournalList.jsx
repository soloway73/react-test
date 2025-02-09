import "./JournalList.css";
import JournalItem from "../JournalItem/JournalItem";
import CardButton from "../CardButton/CardButton";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";

function JournalList({ items }) {
  const { userId } = useContext(UserContext);
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => items.filter((el) => el.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  return (
    <>
      {filteredItems.map((el) => (
        <CardButton key={el.id} el={el}>
          <JournalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
