export function setCookie(cookie: string, value: string) {
    var eqVal = cookie + "=" + value;
    document.cookie = eqVal;
}

export function getCookie(name: string): string | null {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(nameEQ) != -1) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

export function deleteCookie(name: string) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
