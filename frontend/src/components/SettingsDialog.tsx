import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Switch } from "@headlessui/react";
import { useState } from "react";
import { NavBarProps } from "../@types/context";

export default function SettingsDialog({ theme, setTheme }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <>
      <button
        className="m-3 p-4 text-xl bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 rounded-md font-medium text-white dark:text-gray-100"
        onClick={() => setOpen(true)}
      >
        Settings⚙️
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogBackdrop className="fixed inset-0 bg-black/60" />
          <DialogPanel className="max-w-lg space-y-4 border bg-gray-300 dark:bg-gray-600 p-16 py-8 rounded-md backdrop-blur-lg">
            <DialogTitle className="font-bold text-center dark:text-white">Settings</DialogTitle>
            <div className="flex gap-2">
              <p className="text-black dark:text-gray-300">Dark Mode</p>
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-500/10 p-1 transition-colors duration-200 ease-in-out dark:bg-gray-400"
              >
                <span
                  aria-hidden="true"
                  className={`${
                    isDarkMode ? "translate-x-7" : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out dark:bg-blue-700 `}
                />
              </Switch>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-16 p-1 text-sm bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400 rounded-md font-medium text-black dark:text-white"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
