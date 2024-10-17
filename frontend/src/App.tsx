import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Theme } from "./@types/context";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      console.log(document.documentElement.classList);
    } else {
      document.documentElement.classList.remove("dark");
      console.log(document.documentElement.classList);
    }
  }, [theme]);

  return (
    <section className=" min-h-screen bg-white dark:bg-slate-900">
      <Router>
        <EntryProvider>
          <NavBar theme={theme} setTheme={setTheme}></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries />}></Route>
            <Route path="create" element={<NewEntry />}></Route>
            <Route path="edit/:id" element={<EditEntry />}></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
