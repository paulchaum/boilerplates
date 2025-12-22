import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth-server";

export const getUserSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const headers = getRequestHeaders();

		if (!headers) {
			return null;
		}

		const userSession = await auth.api.getSession({ headers });

		return userSession;
	},
);
