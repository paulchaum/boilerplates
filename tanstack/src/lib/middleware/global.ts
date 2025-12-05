import { registerGlobalMiddleware } from "@tanstack/react-start";
import { logMiddleware } from "./logging";

registerGlobalMiddleware({
	middleware: [logMiddleware],
});
