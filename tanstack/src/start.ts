import { createStart } from "@tanstack/react-start";
import { loggingMiddleware } from "./lib/middleware/logging";

export const startInstance = createStart(() => {
	return {
		requestMiddleware: [loggingMiddleware],
	};
});
