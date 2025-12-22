import { createContext, use } from "react";

export type Theme = "light" | "dark";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };

export const ThemeContext = createContext<ThemeContextVal | null>(null);

export function useTheme() {
    const val = use(ThemeContext);
    if (!val) throw new Error("useTheme called outside of ThemeProvider!");
    return val;
}
