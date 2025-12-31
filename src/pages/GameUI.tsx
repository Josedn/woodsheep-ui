import "./game-ui.scss";

import type { ComponentChildren, VNode } from "preact";
import { GameBoard } from "../game/GameBoard";
import { UI_ICONS, GAME_ICONS, GAME_TINTED_ICONS } from "../assets/images";

const generatePlayer = (
    username: string,
    isBot: boolean,
    pointsToShow: number,
    realPoints: number,
    resourceCards: number,
    developmentCards: number,
    armyCount: number,
    roadCount: number,
    largestArmy: boolean,
    longestRoad: boolean,
    color: string,
    isActive: boolean,
    currentUser: boolean,
) => {
    let points = pointsToShow.toString();
    if (realPoints != pointsToShow) {
        points += ` (${realPoints})`;
    }
    return (
        <div className={"player-info" + (isActive ? " player-info--active" : "") + (currentUser ? " player-info--current-user" : "")}>
            {currentUser && <div className="player-info__username-large">{username}</div>}
            <div className="player-info__container">
                <div className="player-info__badge">
                    {!currentUser && <div className="player-info__username">{username}</div>}
                    <div className="player-info__avatar-and-points">
                        <button className={"player-info__avatar" + (currentUser ? " player-info__avatar--current-user" : "")}>
                            <GenericAvatar className="player-info__avatar-halo" backgroundColor={color} iconSrc={isBot ? UI_ICONS.iconBot : UI_ICONS.iconPlayer} />
                        </button>
                        <div className={"player-info__points" + (currentUser ? " player-info__points--current-user" : "")}>
                            <img src={currentUser ? UI_ICONS.ribbonLarge : UI_ICONS.ribbonSmall} className={"player-info__points-ribbon" + (currentUser ? " player-info__points-ribbon--current-user" : "")}></img>
                            <span className="player-info__points-count">{points}</span>
                        </div>
                    </div>
                </div>
                <div className={"player-info__cards" + (currentUser ? " player-info__cards--current-user" : "")}>
                    <div className="player-info__resources">
                        <img className="player-info__card" src={resourceCards > 7 ? UI_ICONS.cardResourceBackOverLimit : UI_ICONS.cardResourceBack}></img>
                        <div className="player-info__card-count-badge">
                            <div className="player-info__card-count">{resourceCards}</div>
                        </div>
                    </div>
                    <div className="player-info__resources">
                        <img className="player-info__card" src={UI_ICONS.cardDevelopment}></img>
                        <div className="player-info__card-count-badge">
                            <div className="player-info__card-count">{developmentCards}</div>
                        </div>
                    </div>
                </div>
                <div className={"player-info__achievement-container" + (currentUser ? " player-info__achievement-container--current-user" : "")}>
                    <div className="player-info__achievement">
                        <img className="player-info__achievement-image" src={largestArmy ? UI_ICONS.largestArmyIconHighlight : UI_ICONS.largestArmyIcon}></img>
                        <div className="player-info__achievement-count">{armyCount}</div>
                    </div>
                    <div className="player-info__achievement">
                        <img className="player-info__achievement-image" src={longestRoad ? UI_ICONS.longestRoadIconHighlight : UI_ICONS.longestRoadIcon}></img>
                        <div className="player-info__achievement-count">{roadCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const generateOpponentCard = (
    username: string,
    isBot: boolean,
    pointsToShow: number,
    realPoints: number,
    resourceCards: number,
    developmentCards: number,
    armyCount: number,
    roadCount: number,
    largestArmy: boolean,
    longestRoad: boolean,
    color: string,
    isActive: boolean,
) => {
    return (
        <div className="opponent-container__row">
            <div className={"opponent-container__dice-group" + (!isActive ? " opponent-container__dice-group--hidden" : "")}>
                <div className="opponent-container__dice-wrapper">
                    <img className="opponent-container__dice-image" src={UI_ICONS.dice1} />
                </div>
                <div className="opponent-container__dice-wrapper">
                    <img className="opponent-container__dice-image opponent-container__dice-image--inactive" src={UI_ICONS.dice1} />
                </div>
            </div>

            {generatePlayer(username, isBot, pointsToShow, realPoints, resourceCards, developmentCards, armyCount, roadCount, largestArmy, longestRoad, color, isActive, false)}
        </div>
    );
};

const PlayerList = () => {
    return (
        <div className="game-board__players">
            <div className="opponent-container">
                {generateOpponentCard("Joost", false, 4, 4, 1, 4, 2, 4, false, false, "green", false)}
                {generateOpponentCard("Ester", true, 8, 8, 9, 1, 2, 5, false, true, "red", false)}
                {generateOpponentCard("Bold", false, 2, 2, 3, 0, 5, 4, true, false, "orange", false)}
            </div>
            {generatePlayer("Lissi", false, 2, 3, 2, 4, 2, 4, false, false, "blue", false, true)}
        </div>
    );
};

const generateCardStackBank = (count: number, imgSrc: string) => {
    const lastItemClassName = "bank-container__card-wrapper" + (count == 0 ? " bank-container__card-wrapper--empty" : "");
    return (
        <div className="bank-container__card-stack">
            {count >= 13 && (
                <div className="bank-container__card-wrapper">
                    <img className="bank-container__card-image" src={imgSrc} />
                </div>
            )}
            {count >= 8 && (
                <div className="bank-container__card-wrapper">
                    <img className="bank-container__card-image" src={imgSrc} />
                </div>
            )}
            <div className={lastItemClassName}>
                <img className="bank-container__card-image" src={imgSrc}></img>
                <div className="bank-container__count-container">
                    <div className="bank-container__count">{count}</div>
                </div>
            </div>
        </div>
    );
};

const Bank = () => {
    return (
        <div className="game-board__bank bank-container">
            <img src={UI_ICONS.bankIcon} className="bank-container__icon"></img>
            <div className="bank-container__card-row">
                {generateCardStackBank(18, UI_ICONS.cardLumber)}
                {generateCardStackBank(8, UI_ICONS.cardBrick)}
                {generateCardStackBank(18, UI_ICONS.cardWool)}
                {generateCardStackBank(0, UI_ICONS.cardGrain)}
                {generateCardStackBank(18, UI_ICONS.cardOre)}
                {generateCardStackBank(20, UI_ICONS.cardDevelopment)}
            </div>
        </div>
    );
};
const generateLogItem = (username: string, color: string, isBot: boolean, action: string, images: string[]) => {
    const imagesNodes = images.map((image, index) => {
        return (
            <>
                <img key={index} className="chat-container__message-image" src={image}></img>{" "}
            </>
        );
    });
    return (
        <div className="chat-container__message-wrapper">
            <div className="chat-container__icon">
                <img className="chat-container__icon-image" src={isBot ? UI_ICONS.iconBot : UI_ICONS.iconPlayer}></img>
            </div>
            <span className="chat-container__message-content">
                <span className={`chat-container__message-content--bold chat-container__message-content--${color}`}>{username}</span> {action} {imagesNodes}
            </span>
        </div>
    );
};

const generateLogSeparator = () => {
    return (
        <div className="chat-container__message-wrapper">
            <span className="chat-container__message-content">
                <hr />
            </span>
        </div>
    );
};

const generateWinItem = (username: string, color: string, isBot: boolean) => {
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

const generateChatItem = (username: string, color: string, isBot: boolean, message: string) => {
    return (
        <div className="chat-container__message-wrapper">
            <div className="chat-container__icon">
                <img className="chat-container__icon-image" src={isBot ? UI_ICONS.iconBot : UI_ICONS.iconPlayer}></img>
            </div>
            <span className="chat-container__message-content">
                <span className={`chat-container__message-content--bold chat-container__message-content--${color}`}>{username}</span>: {message}
            </span>
        </div>
    );
};

const GameLog = () => {
    return (
        <div className="game-board__log">
            <div className="chat-container__scroller">
                {generateLogItem("Lissi", "blue", false, "bought", [UI_ICONS.cardDevelopment])}
                {generateLogItem("Ester", "red", true, "got", [UI_ICONS.cardGrain])}
                {generateLogSeparator()}
                {generateLogItem("Joost", "green", false, "rolled", [UI_ICONS.dice1, UI_ICONS.dice2])}
                {generateLogItem("Bold", "orange", false, "got", [UI_ICONS.cardLumber, UI_ICONS.cardOre])}
                {generateLogSeparator()}
                {generateLogItem("Joost", "green", false, "rolled", [UI_ICONS.dice3, UI_ICONS.dice4])}
                {generateLogItem("Bold", "orange", false, "got", [UI_ICONS.cardLumber, UI_ICONS.cardOre])}
                {generateLogSeparator()}
                {generateLogItem("Joost", "green", false, "rolled", [UI_ICONS.dice5, UI_ICONS.dice6])}
                {generateLogItem("Bold", "orange", false, "got", [UI_ICONS.cardLumber, UI_ICONS.cardOre])}
                {generateLogSeparator()}
                {generateLogItem("Lissi", "blue", false, "bought", [UI_ICONS.cardDevelopment])}
                {generateLogItem("Ester", "red", true, "got", [UI_ICONS.cardGrain])}
                {generateLogSeparator()}
                {generateWinItem("Ester", "red", true)}
            </div>
        </div>
    );
};

const GameChat = () => {
    return (
        <div className="game-board__chat">
            <div className="chat-container">
                <div className="chat-container__scroller">
                    {generateChatItem("Bold", "orange", false, "Hey everyone! Just trying to create a really long message. Does it work??")}
                    {generateChatItem("Lissi", "blue", false, "Hmm sure dude")}
                    {generateChatItem("Ester", "red", false, "Good luck!")}
                    {generateChatItem("Joost", "green", false, "Anyone up for a trade?")}
                </div>
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

const generateCardStackInventory = (count: number, imgSrc: string, showCount: boolean) => {
    if (count < 1) {
        return <></>;
    }
    const cardNodes: VNode[] = [];

    for (let i = 1; i < count; i++) {
        cardNodes.push(
            <div key={i} className="game-inventory__card-wrapper">
                <div className="game-inventory__card-container">
                    <img src={imgSrc} className="game-inventory__card-image"></img>
                </div>
            </div>,
        );
    }
    return (
        <div className="game-inventory__card-stack">
            {cardNodes}
            <div className="game-inventory__card-wrapper">
                <div className="game-inventory__card-container">
                    <img src={imgSrc} className="game-inventory__card-image"></img>
                    {showCount && (
                        <div className="game-inventory__count-container">
                            <div className="game-inventory__count">{count}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const generateWantedCards = () => {
    return (
        <div className="trade-creator-wanted">
            <div className="trade-creator-wanted__cards-container">
                <div className="trade-creator-wanted__cards-stack">
                    {generateCardStackInventory(1, UI_ICONS.cardLumber, false)}
                    {generateCardStackInventory(1, UI_ICONS.cardBrick, false)}
                    {generateCardStackInventory(1, UI_ICONS.cardWool, false)}
                    {generateCardStackInventory(1, UI_ICONS.cardGrain, false)}
                    {generateCardStackInventory(1, UI_ICONS.cardOre, false)}
                    {generateCardStackInventory(1, UI_ICONS.cardResourceBack, false)}
                </div>
            </div>
            <div className="trade-creator-wanted__bank-icon">
                <img className="trade-creator-wanted__bank-icon-image" src={UI_ICONS.bankIcon} />
            </div>
        </div>
    );
};

const GenericAvatar = (props: { className?: string; backgroundColor?: string; iconSrc?: string; children?: ComponentChildren }) => {
    const additionalClassName = props.className || "";
    const iconSrc = props.iconSrc || UI_ICONS.iconPlayer;
    const colorClassName = (props.backgroundColor && `generic-avatar--${props.backgroundColor}`) || "";
    const imageClassName = props.backgroundColor == null ? "generic-avatar__image generic-avatar__image--no-background" : "generic-avatar__image";
    return (
        <div className={`generic-avatar ${colorClassName} ${additionalClassName}`}>
            <img className={imageClassName} src={iconSrc} />
            {props.children}
        </div>
    );
};

const TradeProposalSection = () => {
    return (
        <>
            {generateWantedCards()}
            <div className="trade-creator-proposal">
                <div className="trade-creator-proposal__wanted-container">
                    <GenericAvatar iconSrc={UI_ICONS.iconPlayers} />
                    <img className="trade-creator-proposal__giving-arrow" src={UI_ICONS.iconTradeArrowGreen} />
                    {generateCardStackInventory(1, UI_ICONS.cardBrick, true)}
                    {generateCardStackInventory(1, UI_ICONS.cardLumber, true)}
                </div>
                <div className="trade-creator-proposal__offered-container">
                    <GenericAvatar backgroundColor="red" />
                    <img className="trade-creator-proposal__giving-arrow" src={UI_ICONS.iconTradeArrowRed} />
                    {generateCardStackInventory(2, UI_ICONS.cardOre, true)}
                    {generateCardStackInventory(1, UI_ICONS.cardWool, true)}
                </div>
            </div>
        </>
    );
};

const InventorySection = (props: { showTradeActions: boolean }) => {
    return (
        <div className="game-inventory__trade-creator-container">
            <div className="game-inventory__card-inventory">
                {generateCardStackInventory(2, UI_ICONS.cardLumber, true)}
                {generateCardStackInventory(2, UI_ICONS.cardBrick, true)}
                {generateCardStackInventory(1, UI_ICONS.cardWool, true)}
                {generateCardStackInventory(2, UI_ICONS.cardGrain, true)}
                {generateCardStackInventory(3, UI_ICONS.cardOre, true)}

                <div className="game-inventory__separator"></div>

                {generateCardStackInventory(1, UI_ICONS.cardKnight, false)}
                {generateCardStackInventory(1, UI_ICONS.cardRoadBuilder, false)}
                {generateCardStackInventory(1, UI_ICONS.cardMonopoly, false)}
                {generateCardStackInventory(1, UI_ICONS.cardPoint, false)}
                {generateCardStackInventory(1, UI_ICONS.cardYearOfPlenty, false)}
            </div>
            {props.showTradeActions && (
                <div className="game-inventory__trade-actions">
                    <div className="game-inventory__action-button">
                        <img className="game-inventory__action-bg" src={UI_ICONS.bgButton} />
                        <div className="">
                            <img className="game-inventory__action-icon" src={UI_ICONS.iconBankTrade} />
                        </div>
                    </div>

                    <div className="game-inventory__action-button">
                        <img className="game-inventory__action-bg" src={UI_ICONS.bgButton} />
                        <div className="">
                            <img className="game-inventory__action-icon" src={UI_ICONS.iconOpponentTrade} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DiceContainer = () => {
    return (
        <div className="dice-container">
            <div className="dice-container__wrapper">
                <img className="dice-container__image" src={UI_ICONS.dice1} />
            </div>
            <div className="dice-container__wrapper">
                <img className="dice-container__image dice-container__image--inactive" src={UI_ICONS.dice3} />
            </div>
        </div>
    );
};

const generateActionButton = (className: string, iconSrc: string, enabled: boolean, count: number) => {
    return (
        <div className={className}>
            <div className="game-actions__action-button">
                <img className="game-actions__button-background" src={UI_ICONS.bgButton} />
                <div className={enabled ? "" : "game-actions__foreground-disabled"}>
                    <img className="game-actions__icon-wrapper" src={iconSrc} />
                    {count >= 0 && (
                        <div className="game-actions__count-container">
                            <div className="game-actions__count">{count}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ActionButtonsSection = () => {
    return (
        <div className="game-actions">
            <div className="game-actions__current-status">
                <div className="game-actions__current-status-container">
                    <GenericAvatar className="game-actions__avatar" backgroundColor="red" iconSrc={UI_ICONS.iconPlayer} />
                    <div className="game-actions__current-status-message">Answer Trade</div>
                </div>
            </div>
            <div className="game-actions__timer">
                <div className="game-actions__timer-text">03:02</div>
            </div>

            {generateActionButton("game-actions__trade-button", UI_ICONS.iconCross, true, -1) /* iconTrade */}
            {generateActionButton("game-actions__development-card-button", UI_ICONS.cardDevelopment, false, -1)}
            {generateActionButton("game-actions__road-button", GAME_TINTED_ICONS.roadRed, true, 14)}
            {generateActionButton("game-actions__settlement-button", GAME_TINTED_ICONS.settlementRed, false, 5)}
            {generateActionButton("game-actions__city-button", GAME_TINTED_ICONS.cityRed, false, 4)}
            {generateActionButton("game-actions__turn-button", UI_ICONS.iconPassTurn, true, -1)}
        </div>
    );
};

const generateCardStackTrade = (count: number, imgSrc: string) => {
    const cardNodes: VNode[] = [];

    for (let i = 1; i < count; i++) {
        cardNodes.push(
            <div className="trade-offers__card-wrapper">
                <div className="trade-offers__card-container" data-card-enum="4">
                    <img className="trade-offers__card-image" src={imgSrc} />
                </div>
            </div>,
        );
    }

    return (
        <div className="trade-offers__card-stack-container ">
            {cardNodes}
            <div className="trade-offers__card-wrapper">
                <div className="trade-offers__card-container" data-card-enum="4">
                    <img className="trade-offers__card-image" src={imgSrc} />
                    <div className="trade-offers__count-container">
                        <div className="trade-offers__count">{count}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const generateTradeButton = (backgroundSrc: string, iconSrc: string, enabled: boolean, cooldown: boolean) => {
    return (
        <div className="trade-offers__button">
            {cooldown && <img className="trade-offers__button-cooldown" src={UI_ICONS.bgButtonHighlight} style="clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, -1.67931% 135.611%);" />}

            <img className="trade-offers__button-image" src={backgroundSrc} />
            <div className={enabled ? "" : "trade-offers__button-foreground-disabled"}>
                <img className="trade-offers__icon-wrapper" src={iconSrc} />
            </div>
        </div>
    );
};

const generateOpponentTradeStatus = (tradeStatusSrc: string, avatarColor: string, avatarSrc: string) => {
    return (
        <GenericAvatar className="trade-offers__opponent-status" backgroundColor={avatarColor} iconSrc={avatarSrc}>
            <img className="trade-offers__opponent-status-image" src={tradeStatusSrc} />
        </GenericAvatar>
    );
};

const TradeHeader = (props: { colors: string[] }) => {
    const iconNodes: VNode[] = props.colors.map(color => {
        return <GenericAvatar className="trade-offers__player-icon" backgroundColor={color} iconSrc={UI_ICONS.iconBot} />;
    });

    return (
        <div className="trade-offers__header">
            <div className="trade-offers__players-container">{iconNodes}</div>
            <img className="trade-offers__hide-icon" src={UI_ICONS.iconArrowUpBlack} />
        </div>
    );
};

const TradeOffer = (props: { sentByMe: boolean; counterOffer: boolean }) => {
    return (
        <div className="trade-offers__offer">
            {props.counterOffer && (
                <div className="trade-offers__counteroffer-side ">
                    <GenericAvatar className="trade-offers__opponent-avatar-counteroffer" backgroundColor="green" iconSrc={UI_ICONS.iconPlayer} />
                </div>
            )}

            <div className="trade-offers__offer-container">
                <div className="trade-offers__receiving-half">
                    <div className="trade-offers__left-container">
                        {props.sentByMe && <GenericAvatar iconSrc={UI_ICONS.iconPlayers}></GenericAvatar>}

                        {!props.sentByMe && <GenericAvatar backgroundColor="green" iconSrc={UI_ICONS.iconPlayer} />}

                        <img className="trade-offers__receiving-arrow" src={UI_ICONS.iconTradeArrowGreen} />
                        <div className="trade-offers__card-row">{generateCardStackTrade(3, UI_ICONS.cardOre)}</div>
                    </div>
                    <div className="trade-offers__right-container">
                        {!props.sentByMe && (
                            <>
                                {generateOpponentTradeStatus(UI_ICONS.iconStatusAccept, "blue", UI_ICONS.iconPlayer)}
                                {generateOpponentTradeStatus(UI_ICONS.iconStatusReject, "green", UI_ICONS.iconBot)}
                            </>
                        )}
                    </div>
                </div>
                <div className="trade-offers__giving-half">
                    <div className="trade-offers__left-container">
                        <GenericAvatar backgroundColor="orange" iconSrc={UI_ICONS.iconPlayer} />
                        <img className="trade-offers__receiving-arrow givingArrow-_1FaBc_j" src={UI_ICONS.iconTradeArrowRed} />
                        <div className="trade-offers__card-row">
                            {generateCardStackTrade(1, UI_ICONS.cardBrick)}
                            {generateCardStackTrade(2, UI_ICONS.cardLumber)}
                        </div>
                    </div>

                    {props.sentByMe && (
                        <div className="trade-offers__right-container">
                            {generateTradeButton(UI_ICONS.bgButtonBlue, UI_ICONS.iconCheck, true, false)}
                            {generateTradeButton(UI_ICONS.bgButtonOrange, UI_ICONS.iconCheck, false, false)}
                            {generateTradeButton(UI_ICONS.bgButtonGreen, UI_ICONS.iconCheck, true, false)}
                            {generateTradeButton(UI_ICONS.bgButton, UI_ICONS.iconCross, false, false)}
                        </div>
                    )}
                    {!props.sentByMe && (
                        <div className="trade-offers__right-container">
                            {generateTradeButton(UI_ICONS.bgButton, UI_ICONS.iconPencil, true, false)}
                            {generateTradeButton(UI_ICONS.bgButton, UI_ICONS.iconCross, true, true)}
                            {generateTradeButton(UI_ICONS.bgButton, UI_ICONS.iconCheck, true, false)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const GameUI = () => {
    return (
        <>
            <div className="main-wrapper">
                <div className="game-board">
                    <div className="game">
                        <GameBoard />
                    </div>
                    <div className="game-board__top-left">
                        <div className="options-menu">
                            <div className="options-menu__container">
                                <button className="options-menu__button">
                                    <img src={UI_ICONS.iconSettings} className="options-menu__button-image"></img>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="game-board__trade-offers">
                        <div className="trade-offers">
                            <TradeHeader colors={["blue", "red", "green"]} />
                            <TradeOffer sentByMe={true} counterOffer={false} />
                            <TradeOffer sentByMe={false} counterOffer={true} />
                        </div>
                    </div>
                    <div className="game-board__bottom">
                        <div className="game-inventory">
                            <div className="game-inventory__container">
                                <div className="game-inventory__trade-creator">
                                    <TradeProposalSection />
                                    <InventorySection showTradeActions={false} />
                                </div>
                            </div>
                            <div className="game-inventory__actions">
                                <DiceContainer />
                                <ActionButtonsSection />
                            </div>
                        </div>
                    </div>
                    <div className="game-board__responsive-log">
                        <GameLog />
                        <GameChat />
                    </div>
                    <Bank />
                    <PlayerList />
                </div>
            </div>
        </>
    );
};
