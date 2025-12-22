import { useRouter } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { setThemeServerFn } from "~/lib/theme";
import { ThemeContext } from "./theme-context";

export type Theme = "light" | "dark";

type Props = PropsWithChildren<{ theme: Theme }>;

export function ThemeProvider({ children, theme }: Props) {
	const router = useRouter();

	async function setTheme(val: Theme) {
		await setThemeServerFn({ data: val });
		router.invalidate();
	}

	return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}
