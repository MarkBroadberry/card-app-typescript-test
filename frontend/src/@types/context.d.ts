export interface Entry {
  id?: string;
  title: string;
  description: string;
  created_at: Date | string;
}
export type EntryContextType = {
  entries: Entry[];
  saveEntry: (entry: Entry) => void;
  updateEntry: (id: string, entryData: Entry) => void;
  deleteEntry: (id: string) => void;
};

export type Theme = "light" | "dark";

export interface NavBarProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
