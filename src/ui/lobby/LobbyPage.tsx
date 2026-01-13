import "./lobby.scss";
import { GAME_TINTED_ICONS, UI_ICONS } from "../../assets/images";
import { useGameCommand } from "../hooks/useGameCommand";
import { CommandRequestLobbyInfo } from "../../engine/ui-facade/commands/lobbies/CommandRequestLobbyInfo";
import { useGameEvent } from "../hooks/useGameEvent";
import { UI_EVENTS } from "../../engine/ui-facade/UIFacade";
import { useMountEffect } from "../hooks/useMountEffect";
import { useState } from "preact/hooks";
import type { BoardGamePlayer, ChatMessageReceived, CurrentRoomInfo, RoomUserData } from "../../engine/LobbyService";
import { CommandSendChatMessage } from "../../engine/ui-facade/commands/CommandSendChatMessage";
import type { TargetedInputEvent } from "preact";
import { Layout } from "../components/Layout";
import { useLocation, useRoute } from "preact-iso";

const LobbyPlayerInfoPlaceholder = () => {
    return <div className="lobby__player"></div>;
};

const LobbyPlayerInfo = (props: { username: string; color: string; ready?: boolean; canEdit?: boolean }) => {
    return (
        <div className="lobby__player">
            <div className="lobby__player-info">
                <div className="lobby__player-avatar">
                    <img className="lobby__player-avatar-image" src={UI_ICONS.iconPlayer} />
                    <div className="lobby__player-username-container">
                        <div className="lobby__player-username">{props.username}</div>
                        <div className="lobby__player-karma">Karma: 20/20</div>
                    </div>
                </div>
                <div className={"lobby__player-color" + (props.canEdit ? " lobby__player-color--can-edit" : "")}>
                    <img className="lobby__player-color-image" alt="Road" src={GAME_TINTED_ICONS.roadRed} />
                    <img className="lobby__player-color-image" alt="Settlement" src={GAME_TINTED_ICONS.settlementRed} />
                    <img className="lobby__player-color-image" alt="City" src={GAME_TINTED_ICONS.cityRed} />
                </div>
            </div>
            <div className="lobby__player-status">
                <div className="lobby__player-actions-container">
                    {props.canEdit && (
                        <div className="lobby__player-action">
                            <img className="lobby__player-action-image" alt="Edit" src={UI_ICONS.iconPencil} />
                        </div>
                    )}
                </div>
                <div className={"lobby__player-ready" + (props.ready ? " lobby__player-ready--ready" : "")}>
                    <div className="lobby__player-ready-label">{props.ready ? "READY" : "Not Ready"}</div>
                </div>
            </div>
        </div>
    );
};

const PlayerList = (props: { players: RoomUserData[]; maxPlayers: number }) => {
    const loggedPlayers = props.players.map(player => {
        return <LobbyPlayerInfo key={player.virtualId} username={player.username} color="red" ready />;
    });
    const placeHolders = [];
    for (let i = props.players.length; i < props.maxPlayers; i++) {
        placeHolders.push(<LobbyPlayerInfoPlaceholder />);
    }
    return (
        <div className="lobby__left">
            <h2 className="lobby__heading">
                Players ({props.players.length}/{props.maxPlayers})
            </h2>
            <div className="lobby__player-list">
                {loggedPlayers}
                {placeHolders}
            </div>
        </div>
    );
};

const Chat = () => {
    const [chatMessages, setChatMessages] = useState<ChatMessageReceived[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    useGameEvent(UI_EVENTS.UPDATE_CHAT_MESSAGES, ({ chatMessages }) => {
        setChatMessages([...chatMessages]);
    });

    const chatNodes = chatMessages.map((message, index) => {
        return (
            <div key={index} className="lobby__message">
                <img className="lobby__message-avatar" alt="User" src={UI_ICONS.iconPlayer} />
                <span className="lobby__message-username">{message.sender}: </span>
                {message.content}
            </div>
        );
    });

    const handleChatSubmit = (evt: Event) => {
        evt.preventDefault();
        useGameCommand(new CommandSendChatMessage(inputMessage));
        setInputMessage("");
    };

    const handleInputChange = (evt: TargetedInputEvent<HTMLInputElement>) => {
        const value = evt.currentTarget.value;
        setInputMessage(value);
    };

    return (
        <div className="lobby__right">
            <div className="lobby__right-header">
                <div className="lobby__right-heading">Chat</div>
            </div>
            <div className="lobby__message-container">{chatNodes}</div>
            <form className="lobby__message-form" onSubmit={handleChatSubmit}>
                <input className="lobby__message-input" type="text" placeholder="Send a message" maxLength={200} value={inputMessage} onChange={handleInputChange} />
                <button className="lobby__message-submit">
                    <img className="lobby__message-submit-image" src={UI_ICONS.iconSend} />
                </button>
            </form>
        </div>
    );
};

const Lobby = () => {
    const route = useRoute();
    const { url } = useLocation();
    const fullUrl = window.location.protocol + '//' + window.location.host + url;

    const [lobbyStatus, setLobbyStatus] = useState<CurrentRoomInfo>({
        roomId: "",
        map: "base",
        hideBankCards: false,
        privateGame: false,
        maxPlayers: 4,
        turnTimer: 0,
        cardDiscardLimit: 0,
        pointsToWin: 0,
    });

    const [players, setPlayers] = useState<RoomUserData[]>([]);

    useGameEvent(UI_EVENTS.UPDATE_LOBBY_INFO, ({ roomInfo }) => {
        setLobbyStatus(roomInfo);
    });

    useGameEvent(UI_EVENTS.UPDATE_LOBBY_PLAYERS, ({ players }) => {
        setPlayers(players);
    });

    useMountEffect(() => {
        const roomId = route.params.id;
        if (roomId != null) {
            useGameCommand(new CommandRequestLobbyInfo(roomId));
        }
    });
    
    return (
        <div className="lobby">
            <PlayerList players={players} maxPlayers={lobbyStatus.maxPlayers} />
            <div className="lobby__middle">
                <div className="lobby__info-header">
                    <img className="lobby__info-exit-image" alt="Exit" src={UI_ICONS.iconCross} />
                    <h2 className="lobby__heading">Room ID: {lobbyStatus.roomId}</h2>
                </div>
                <div className="lobby__info-scroller">
                    <div className="lobby__invite">
                        <div className="lobby__invite-title">
                            <h4 className="lobby__invite-title-heading">Invite Friends</h4>
                            <img className="lobby__invite-title-image" src={UI_ICONS.iconInfo} />
                        </div>
                        <div className="lobby__invite-body">
                            <div className="lobby__invite-body-link">{fullUrl}</div>
                            <a className="lobby__invite-body-button">Copy</a>
                        </div>
                    </div>
                    <div className="lobby__options">
                        <div className="lobby__options-item-selection">
                            <div className="lobby__options-title-container">
                                <h4 className="lobby__options-title">Map</h4>
                            </div>
                            <div className="lobby__options-body">
                                <div className="lobby__options-scroller">
                                    <div className="lobby__options-scroller-wrapper">
                                        <div className="lobby__options-cell lobby__options-cell--selected">
                                            <img className="lobby__options-cell-image" src={UI_ICONS.mapBase} />
                                            <p className="lobby__options-cell-label">Base</p>
                                        </div>

                                        <div className="lobby__options-cell lobby__options-cell--unavailable">
                                            <img className="lobby__options-cell-image" src={UI_ICONS.mapVolcano} />
                                            <p className="lobby__options-cell-label">Volcano</p>
                                        </div>

                                        <div className="lobby__options-cell lobby__options-cell--unavailable">
                                            <img className="lobby__options-cell-image" src={UI_ICONS.mapGoldRush} />
                                            <p className="lobby__options-cell-label">Gold Rush</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lobby__options">
                        <div className="lobby__options-item-selection">
                            <div className="lobby__options-title-container">
                                <h4 className="lobby__options-title">Rules</h4>
                            </div>
                            <div className="lobby__options-body">
                                <div className="lobby__options-scroller">
                                    <div className="lobby__options-scroller-wrapper lobby__options-scroller-wrapper--no-scroll">
                                        <div className={"lobby__options-cell" + (lobbyStatus.privateGame ? " lobby__options-cell--selected" : "") }>
                                            <img className="lobby__options-cell-image" src={UI_ICONS.iconSunglasses} />
                                            <p className="lobby__options-cell-label">Private Game</p>
                                        </div>

                                        <div className={"lobby__options-cell" + (lobbyStatus.hideBankCards ? " lobby__options-cell--selected" : "") }>
                                            <img className="lobby__options-cell-image" src={UI_ICONS.iconHideCard} />
                                            <p className="lobby__options-cell-label">Hide Bank Cards</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lobby__options-settings-container">
                        <div className="lobby__options-title-container">
                            <h4 className="lobby__options-title lobby__options-title--settings">Advanced Settings</h4>
                        </div>
                        <div className="lobby__options">
                            <div className="lobby__options-settings">
                                <div className="lobby__options-title-container">
                                    <h3 className="lobby__options-subtitle">Turn Timer</h3>
                                </div>
                                <div className="lobby__options-body">
                                    <img class="lobby__options-arrow-selector" src={UI_ICONS.iconArrow} />
                                    <h3 className="lobby__options-range-input">{lobbyStatus.turnTimer}s</h3>
                                    <img class="lobby__options-arrow-selector lobby__options-arrow-selector--rotated180" src={UI_ICONS.iconArrow} />
                                </div>
                            </div>
                            <div className="lobby__options-settings">
                                <div className="lobby__options-title-container">
                                    <h3 className="lobby__options-subtitle">Max Players</h3>
                                </div>
                                <div className="lobby__options-body">
                                    <img class="lobby__options-arrow-selector" src={UI_ICONS.iconArrow} />
                                    <h3 className="lobby__options-range-input">{lobbyStatus.maxPlayers}</h3>
                                    <img class="lobby__options-arrow-selector lobby__options-arrow-selector--rotated180" src={UI_ICONS.iconArrow} />
                                </div>
                            </div>
                        </div>
                        <div className="lobby__options">
                            <div className="lobby__options-settings">
                                <div className="lobby__options-title-container">
                                    <h3 className="lobby__options-subtitle">Points to Win</h3>
                                </div>
                                <div className="lobby__options-body">
                                    <img class="lobby__options-arrow-selector" src={UI_ICONS.iconArrow} />
                                    <h3 className="lobby__options-range-input">{lobbyStatus.pointsToWin}</h3>
                                    <img class="lobby__options-arrow-selector lobby__options-arrow-selector--rotated180" src={UI_ICONS.iconArrow} />
                                </div>
                            </div>
                            <div className="lobby__options-settings">
                                <div className="lobby__options-title-container">
                                    <h3 className="lobby__options-subtitle">Card Discard Limit</h3>
                                </div>
                                <div className="lobby__options-body">
                                    <img class="lobby__options-arrow-selector" src={UI_ICONS.iconArrow} />
                                    <h3 className="lobby__options-range-input">{lobbyStatus.cardDiscardLimit}</h3>
                                    <img class="lobby__options-arrow-selector lobby__options-arrow-selector--rotated180" src={UI_ICONS.iconArrow} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lobby__info-footer">
                    <div class="lobby__start-container">
                        <div class="lobby__start">
                            <a class="lobby__start-button">Start Game</a>
                        </div>
                    </div>
                </div>
            </div>
            <Chat />
        </div>
    );
};

export const LobbyPage = () => {
    return (
        <Layout>
            <Lobby />
        </Layout>
    );
};
