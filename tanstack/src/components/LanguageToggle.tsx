import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function LanguageToggle() {
	const { i18n, t } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const currentLanguage = i18n.language;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<Languages className="h-4 w-4" />
					<span className="sr-only">{t("navigation.language")}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => changeLanguage("en")}
					className={currentLanguage === "en" ? "bg-accent" : ""}
				>
					🇺🇸 {t("navigation.languages.english")}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => changeLanguage("fr")}
					className={currentLanguage === "fr" ? "bg-accent" : ""}
				>
					🇫🇷 {t("navigation.languages.french")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
