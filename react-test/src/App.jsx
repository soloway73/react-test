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
import { UserContextProvider } from "./context/user.context";
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
  const [selectedItem, setSelectedItem] = useState({});

  const removeItem = () => {
    if (selectedItem.id) {
      setItems([...items.filter((i) => i.id !== selectedItem.id)]);
    }
  };
  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          date: new Date(item.date),
          id: items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          }
          return i;
        }),
      ]);
    }
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList
            items={mapItems(items)}
            setItem={setSelectedItem}
          ></JournalList>
        </LeftPanel>
        <Body>
          <JournalForm
            onSubmit={addItem}
            data={selectedItem}
            removeItem={removeItem}
          ></JournalForm>
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
