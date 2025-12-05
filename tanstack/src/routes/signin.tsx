import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth/auth-client";

type SearchParams = {
	redirectTo?: string;
};

export const Route = createFileRoute("/signin")({
	component: SignInPage,
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			redirectTo:
				typeof search.redirectTo === "string" ? search.redirectTo : undefined,
		};
	},
	beforeLoad: async ({ context }) => {
		if (context.userSession) {
			throw redirect({
				to: "/",
			});
		}
	},
});

function SignInPage() {
	const { t } = useTranslation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Get the search parameters from the route
	const { redirectTo } = Route.useSearch();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await authClient.signIn.email({
				email,
				password,
				callbackURL: redirectTo || "/", // redirect to origin page or home
			});
			console.log("response", response);

			if (response.error) {
				setError(
					response.error.message ||
					t("auth.signin.errors.credentials"),
				);
			}
		} catch (err) {
			console.error("Sign in error:", err);
			setError(t("auth.signin.errors.generic"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-3xl font-bold">{t("auth.signin.title")}</CardTitle>
						<CardDescription>{t("auth.signin.description")}</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">{t("auth.signin.email")}</Label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										placeholder={t("auth.signin.emailPlaceholder")}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">{t("auth.signin.password")}</Label>
									<Input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										placeholder={t("auth.signin.passwordPlaceholder")}
									/>
								</div>
							</div>

							{error && <p className="text-sm text-destructive">{error}</p>}

							<Button type="submit" disabled={loading} className="w-full">
								{loading
									? t("auth.signin.signingIn")
									: t("auth.signin.signInButton")}
							</Button>
						</form>

						{/* Link to sign up */}
						<div className="text-center mt-6">
							<p className="text-sm text-muted-foreground">
								{t("auth.signin.noAccount")}{" "}
								<Link
									to="/signup"
									search={{ redirectTo }}
									className="font-medium text-primary hover:underline"
								>
									{t("auth.signin.signUp")}
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
