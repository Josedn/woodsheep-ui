import { Logger } from "../misc/Logger";

interface GameCommand {
    execute(): void;
}

class SendChatMessage implements GameCommand {
    private message: string;
    constructor(message: string) {
        this.message = message;
    }

    execute() {
        Logger.debug("Executing command");
    }
}

export class UICommander {
    public dispatch(command: GameCommand) {
        command.execute();
    }
}
