import { deleteCookie, getCookie, setCookie } from "./misc/CookieUtils";

export class StoreService {
    public set(key: string, value: string): void {
        setCookie(key, value);
    }

    public get(key: string): string | null {
        return getCookie(key);
    }

    public delete(key: string): void {
        deleteCookie(key);
    }
}
