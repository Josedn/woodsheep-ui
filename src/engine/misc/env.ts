const required = (value: string | undefined, name: string): string => {
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
};

export const env = {
    wsBaseUrl: required(import.meta.env.VITE_WS_BASE_URL, "VITE_WS_BASE_URL"),
    environment: import.meta.env.VITE_ENV ?? "development",
} as const;
