import { setCookie } from "../../misc/CookieUtils";
import { Logger } from "../../misc/Logger";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleSetCookie implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const data = request.body;
        for (let i = 0; i < data.cookies.length; i++) {
            if (data.cookies[i].name == "USER_ID") {
                const cook = data.cookies[i];
                setCookie(cook.name, cook.value);
                Logger.debug("Cookies set to :" + document.cookie);
                //sendGetGameStateAction();
            }
        }
    }
    public static getRequestType(): string {
        return "setCookie";
    }
}
