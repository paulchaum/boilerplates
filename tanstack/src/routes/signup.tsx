import {
	createFileRoute,
	Link,
	redirect,
	useRouter,
} from "@tanstack/react-router";
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
import logger from "~/lib/logger";

type SearchParams = {
	redirectTo?: string;
};

export const Route = createFileRoute("/signup")({
	component: SignUpPage,
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

function SignUpPage() {
	const { t } = useTranslation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Get the search parameters from the route
	const { redirectTo } = Route.useSearch();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// Validate password confirmation
			if (password !== confirmPassword) {
				setError(t("auth.signup.errors.passwordMismatch"));
				return;
			}

			const response = await authClient.signUp.email({
				email,
				password,
				name,
				callbackURL: redirectTo || "/", // redirect to origin page or home
			});

			logger.info(response, "Sign up response");

			if (response.error) {
				setError(
					response.error.message ||
					t("auth.signup.errors.generic"),
				);
			} else {
				// Manually redirect after successful signup
				router.navigate({ to: redirectTo || "/" });
			}
		} catch (err) {
			logger.error(err, "Sign up error");
			setError(t("auth.signup.errors.generic"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-3xl font-bold">{t("auth.signup.title")}</CardTitle>
						<CardDescription>{t("auth.signup.description")}</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">{t("auth.signup.fullName")}</Label>
									<Input
										id="name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
										placeholder={t("auth.signup.fullNamePlaceholder")}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">{t("auth.signup.email")}</Label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										placeholder={t("auth.signup.emailPlaceholder")}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">{t("auth.signup.password")}</Label>
									<Input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										placeholder={t("auth.signup.passwordPlaceholder")}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">{t("auth.signup.confirmPassword")}</Label>
									<Input
										id="confirmPassword"
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
										placeholder={t("auth.signup.confirmPasswordPlaceholder")}
									/>
								</div>
							</div>

							{error && <p className="text-sm text-destructive">{error}</p>}

							<Button type="submit" disabled={loading} className="w-full">
								{loading
									? t("auth.signup.creatingAccount")
									: t("auth.signup.createAccountButton")}
							</Button>
						</form>

						{/* Link to sign in */}
						<div className="text-center mt-6">
							<p className="text-sm text-muted-foreground">
								{t("auth.signup.hasAccount")}{" "}
								<Link
									to="/signin"
									search={{ redirectTo }}
									className="font-medium text-primary hover:underline"
								>
									{t("auth.signup.signIn")}
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
