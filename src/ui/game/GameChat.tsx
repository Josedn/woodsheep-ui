import { UI_ICONS } from "../../assets/images";

export type GameChatData = { id: string; username: string; color: string; isBot: boolean; message: string };

const ChatItem = (props: { chatItem: GameChatData }) => {
    const { id, username, color, isBot, message } = props.chatItem;

    return (
        <div key={id} className="chat-container__message-wrapper">
            <div className="chat-container__icon">
                <img className="chat-container__icon-image" src={isBot ? UI_ICONS.iconBot : UI_ICONS.iconPlayer}></img>
            </div>
            <span className="chat-container__message-content">
                <span className={`chat-container__message-content--bold chat-container__message-content--${color}`}>{username}</span>: {message}
            </span>
        </div>
    );
};

export const GameChat = (props: { chats: GameChatData[] }) => {
    const chatNodes = props.chats.map(chat => {
        return <ChatItem chatItem={chat} />;
    });

    return (
        <div className="game-board__chat">
            <div className="chat-container">
                <div className="chat-container__scroller">{chatNodes}</div>
                <div className="chat-container__bottom">
                    <form className="chat-container__form">
                        <input type="text" placeholder="Send a message" maxlength={200} className="chat-container__input"></input>
                        <button className="chat-container__submit">
                            <img src={UI_ICONS.iconSend} className="chat-container__submit-image" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
