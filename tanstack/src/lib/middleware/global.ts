import { createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => {
	return {
		functionMiddleware: [
			// Uncomment this to enable logging middleware
			// logMiddleware,
		],
	};
});
