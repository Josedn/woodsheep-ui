import { setCookie } from "../../misc/CookieUtils";
import { createLogger } from "../../misc/Logger";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

const logger = createLogger("HandleSetCookie");

export class HandleSetCookie implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const data = request.body;
        for (let i = 0; i < data.cookies.length; i++) {
            if (data.cookies[i].name == "USER_ID") {
                const cook = data.cookies[i];
                setCookie(cook.name, cook.value);
                logger.debug("Cookies set to :" + document.cookie);
                //sendGetGameStateAction();
            }
        }
    }
    getRequestType(): string {
        return "setCookie";
    }
}
