import pino from "pino";

const options: pino.LoggerOptions = {
	level: process.env.LOG_LEVEL
		? (process.env.LOG_LEVEL.toLowerCase() as pino.LevelWithSilentOrString)
		: "info",
	timestamp: pino.stdTimeFunctions.isoTime,
};

if (process.env.NODE_ENV === "development") {
	options.transport = {
		target: "pino-pretty",
		options: {
			colorize: true,
		},
	};
}

export default pino(options);
