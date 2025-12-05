import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { t } = useTranslation();
	return (
		<div className="p-2">
			<h3>{t("home.title")}</h3>
		</div>
	);
}
