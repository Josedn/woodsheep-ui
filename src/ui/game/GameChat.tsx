import { useState } from "preact/hooks";
import type { TargetedInputEvent } from "preact";
import { UI_ICONS } from "../../assets/images";
import { useGameEvent } from "../hooks/useGameEvent";
import { UI_EVENTS } from "../../engine/ui-facade/UIFacade";
import { dispatchGameCommand } from "../hooks/dispatchGameCommand";
import { CommandSendChatMessage } from "../../engine/ui-facade/commands/CommandSendChatMessage";
import type { ChatMessageReceived } from "../../engine/LobbyService";

export const GameChat = () => {
    const [chatMessages, setChatMessages] = useState<ChatMessageReceived[]>([]);
    const [inputMessage, setInputMessage] = useState("");

    useGameEvent(UI_EVENTS.UPDATE_CHAT_MESSAGES, ({ chatMessages }) => {
        setChatMessages([...chatMessages]);
    });

    const handleSubmit = (evt: Event) => {
        evt.preventDefault();
        dispatchGameCommand(new CommandSendChatMessage(inputMessage));
        setInputMessage("");
    };

    const handleInputChange = (evt: TargetedInputEvent<HTMLInputElement>) => {
        setInputMessage(evt.currentTarget.value);
    };

    const chatNodes = chatMessages.map((message, index) => (
        <div key={index} className="chat-container__message-wrapper">
            <div className="chat-container__icon">
                <img className="chat-container__icon-image" src={UI_ICONS.iconPlayer} />
            </div>
            <span className="chat-container__message-content">
                <span className="chat-container__message-content--bold">{message.sender}</span>: {message.content}
            </span>
        </div>
    ));

    return (
        <div className="game-board__chat">
            <div className="chat-container">
                <div className="chat-container__scroller">{chatNodes}</div>
                <div className="chat-container__bottom">
                    <form className="chat-container__form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Send a message" maxLength={200} className="chat-container__input" value={inputMessage} onChange={handleInputChange} />
                        <button className="chat-container__submit">
                            <img src={UI_ICONS.iconSend} className="chat-container__submit-image" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
