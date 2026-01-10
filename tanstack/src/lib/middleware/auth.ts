import { createMiddleware } from "@tanstack/react-start";

export const authenticatedMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	// Use local import to avoid import client side
	const { getRequest } = await import("@tanstack/react-start/server");
	const { auth } = await import("../auth/auth-server");

	const headers = getRequest().headers;
	if (!headers) {
		throw new Error("Unauthorized: No request headers");
	}

	const userSession = await auth.api.getSession({ headers });
	if (!userSession) {
		throw new Error("Unauthorized: User not authenticated");
	}

	return next({
		context: {
			user: userSession.user,
		},
	});
});
