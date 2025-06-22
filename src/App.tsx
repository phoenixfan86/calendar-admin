
import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminCalendar from "./components/Calendar/Calendar";

function App() {
  const [activeLabel, setActiveLabel] = useState<string>("Dashboard");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Header
        activeLabel={activeLabel}
        setIsVisible={setIsVisible}
        isVisible={isVisible} />
      <Sidebar
        isVisible={isVisible}
        setActiveLabel={setActiveLabel} />
      <AdminCalendar />
    </>
  )
}

export default App
