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
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContext } from "./context/user.context";
import { useState } from "react";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
    date: new Date(i.date),
  }));
}
function App() {
  const [items, setItems] = useLocalStorage("data");
  const [userId, setUserId] = useState(1);

  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        title: item.title,
        text: item.text,
        date: new Date(item.date),
        id: items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1,
      },
    ]);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={mapItems(items)}></JournalList>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem}></JournalForm>
        </Body>
      </div>
    </UserContext.Provider>
  );
}

export default App;
