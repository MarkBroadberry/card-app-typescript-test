import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavBarProps, Theme } from "../@types/context";
import SettingsDialog from "./SettingsDialog";

export default function NavBar({ theme, setTheme }: NavBarProps) {
  return (
    <nav className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-5 ml-">
        <NavLink
          className="m-4 p-4 text-xl bg-blue-400 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-700 rounded-md font-medium text-white dark:text-gray-100"
          to={"/"}
        >
          All Entries
        </NavLink>
        <NavLink
          className="m-4 p-4 text-xl bg-blue-400 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-700 rounded-md font-medium text-white dark:text-gray-100"
          to={"/create"}
        >
          New Entry
        </NavLink>
      </div>
      <div className="absolute top-1 right-1">
        <SettingsDialog theme={theme} setTheme={setTheme}></SettingsDialog>
      </div>
    </nav>
  );
}
