import { UI_ICONS } from "../../../assets/images";

export type GameLogData = {
    id: number, username: string, color: string, isBot: boolean, action: string, images: string[],
};

export const GameLog = (props: {logs: GameLogData[]}) => {

    const logNodes = props.logs.map(log => {
        return (<LogItem logItem={log} />);
    });

    return (
        <div className="game-board__log">
            <div className="chat-container__scroller">
                {logNodes}
            </div>
        </div>
    );
};


const LogItem = (props: {logItem: GameLogData}) => {
    const {id, images, isBot, color, username, action} = props.logItem;

    const imagesNodes = images.map((image, index) => {
        return (
            <>
                <img key={index} className="chat-container__message-image" src={image}></img>{" "}
            </>
        );
    });
    return (
        <div key={id} className="chat-container__message-wrapper">
            <div className="chat-container__icon">
                <img className="chat-container__icon-image" src={isBot ? UI_ICONS.iconBot : UI_ICONS.iconPlayer}></img>
            </div>
            <span className="chat-container__message-content">
                <span className={`chat-container__message-content--bold chat-container__message-content--${color}`}>{username}</span> {action} {imagesNodes}
            </span>
        </div>
    );
};

const LogSeparator = () => {
    return (
        <div className="chat-container__message-wrapper">
            <span className="chat-container__message-content">
                <hr />
            </span>
        </div>
    );
};

const LogWin = (username: string, color: string, isBot: boolean) => {
    return (
        <div className="chat-container__message-wrapper chat-container__message-wrapper--centered">
            <div className="chat-container__icon">
                <img className="chat-container__icon-image" src={isBot ? UI_ICONS.iconBot : UI_ICONS.iconPlayer}></img>
            </div>
            <span className="chat-container__message-content">
                <img className="chat-container__message-image" src={UI_ICONS.iconTrophy}></img> <span className={`chat-container__message-content--bold chat-container__message-content--${color}`}>{username}</span> won the game!{" "}
                <img className="chat-container__message-image" src={UI_ICONS.iconTrophy}></img>
            </span>
        </div>
    );
};