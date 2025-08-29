import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { authClient } from "~/lib/auth/auth-client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

type SearchParams = {
  redirectTo?: string;
};

export const Route = createFileRoute("/signin")({
  component: SignInPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      redirectTo: typeof search.redirectTo === 'string' ? search.redirectTo : undefined,
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
        setError(response.error.message || "Failed to sign in. Please check your credentials.");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>Welcome back</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Link to sign up */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  to="/signup"
                  search={{ redirectTo }}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}