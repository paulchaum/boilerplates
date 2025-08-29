import { createFileRoute, redirect, Link, useRouter } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

type SearchParams = {
  redirectTo?: string;
};

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
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

function SignUpPage() {
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
        setError("Passwords do not match.");
        return;
      }

      const response = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: redirectTo || "/", // redirect to origin page or home
      });
      console.log("response", response);

      if (response.error) {
        setError(response.error.message || "Failed to create account. Please try again.");
      } else {
        // Manually redirect after successful signup
        router.navigate({ to: redirectTo || "/" });
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <CardDescription>Join us today</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
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
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Link to sign in */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  to="/signin"
                  search={{ redirectTo }}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 