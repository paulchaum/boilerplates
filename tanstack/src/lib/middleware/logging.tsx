import { createMiddleware } from "@tanstack/react-start";
import logger from "../logger";

export const loggingMiddleware = createMiddleware().server((ctx) => {
	logger.debug({ url: ctx.request.url, method: ctx.request.method });
	return ctx.next();
});
