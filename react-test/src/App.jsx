import "./App.css";

//import Button from "./components/Button/Button";
// import JournalItem from "./components/JournalItem/JournalItem";
// import CardButton from "./components/CardButton/CardButton";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useState } from "react";
const INITIAL_DATA = [
  {
    id: 1,
    title: "Подготовка к обновлению курсов",
    text: "Горные походы открывают удивительные природные ландшафты",
    date: new Date(),
  },
  {
    id: 2,
    title: "Поход в горы",
    text: "Думал, что очень много времени",
    date: new Date(),
  },
];
function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        title: item.title,
        text: item.text,
        date: new Date(item.date),
        id:
          oldItems.length === 0
            ? 1
            : Math.max(...oldItems.map((i) => i.id)) + 1,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}></JournalForm>
      </Body>
    </div>
  );
}

export default App;
