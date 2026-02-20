import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "../auth/auth-server";

export const authenticatedMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
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
