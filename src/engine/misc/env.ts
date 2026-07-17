const required = (value: string | undefined, name: string): string => {
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
};

const mockServer = import.meta.env.VITE_MOCK_SERVER === "true";

export const env = {
    mockServer,
    wsBaseUrl: mockServer ? "" : required(import.meta.env.VITE_WS_BASE_URL, "VITE_WS_BASE_URL"),
    environment: import.meta.env.VITE_ENV ?? "development",
} as const;
