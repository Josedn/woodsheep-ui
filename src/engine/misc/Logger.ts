import { env } from "./env";

type LogMeta = Record<string, unknown>;

type LoggerInstance = {
    debug(message: string, meta?: LogMeta): void;
    info(message: string, meta?: LogMeta): void;
    warn(message: string, meta?: LogMeta): void;
    error(message: string, meta?: LogMeta): void;
};

export function createLogger(scope: string): LoggerInstance {
    return {
        debug(message, meta) {
            if (env.environment === "development") {
                console.debug(`[${scope}] ${message}`, meta);
            }
        },

        info(message, meta) {
            console.info(`[${scope}] ${message}`, meta);
        },

        warn(message, meta) {
            console.warn(`[${scope}] ${message}`, meta);
        },

        error(message, meta) {
            console.error(`[${scope}] ${message}`, meta);
        },
    };
}
