import { env } from "./env";

type LogMeta = Record<string, unknown>;

export const Logger = {
    debug(message: string, meta?: LogMeta) {
        if (env.environment == "development") {
            console.debug(message, meta);
        }
    },

    info(message: string, meta?: LogMeta) {
        console.info(message, meta);
    },

    warn(message: string, meta?: LogMeta) {
        console.warn(message, meta);
    },

    error(message: string, meta?: LogMeta) {
        console.error(message, meta);
    },
};
