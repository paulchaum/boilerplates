/// <reference types="vite/client" />
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FileText, HomeIcon } from "lucide-react";
import type * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { Sidebar } from "~/components/layouts/Sidebar";
import { NotFound } from "~/components/NotFound";
import { useTheme } from "~/components/theme-context";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { authQueries } from "~/features/auth/queries";
import { seo } from "~/lib/seo";
import { getThemeServerFn } from "~/lib/theme";
import "~/lib/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async ({ context }) => {
		const userSession = await context.queryClient.fetchQuery(
			authQueries.user(),
		);

		return { userSession };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title:
					"TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
				description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
			}),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	loader: () => getThemeServerFn(),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
	shellComponent: RootComponent,
});

function RootComponent() {
	const data = Route.useLoaderData();
	const { queryClient } = Route.useRouteContext();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={data}>
				<RootDocument>
					<Outlet />
				</RootDocument>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();
	const { t, i18n, ready } = useTranslation();

	// Wait for i18n to be ready to prevent hydration mismatches
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	// Show loading state until both i18n is ready and component is hydrated
	if (!ready || !isHydrated) {
		// return;
		return (
			<html className={theme} suppressHydrationWarning lang={i18n.language}>
				<head>
					<HeadContent />
				</head>
				<body>
					<div />
					<Scripts />
				</body>
			</html>
		);
	}

	const links = [
		{ to: "/", label: t("navigation.home"), icon: <HomeIcon /> },
		{ to: "/posts", label: t("navigation.posts"), icon: <FileText /> },
	];

	const LayoutComponent = Sidebar;

	return (
		<html className={theme} lang={i18n.language} suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<LayoutComponent links={links}>{children}</LayoutComponent>
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
				<Toaster />
			</body>
		</html>
	);
}
