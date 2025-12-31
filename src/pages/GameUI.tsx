import bankIcon from "../assets/ui/bank.825b2690b4b1b694d646.svg";
import cardLumber from "../assets/ui/card_lumber.cf22f8083cf89c2a29e7.svg";
import cardWool from "../assets/ui/card_wool.17a6dea8d559949f0ccc.svg";
import cardBrick from "../assets/ui/card_brick.5950ea07a7ea01bc54a5.svg";
import cardOre from "../assets/ui/card_ore.117f64dab28e1c987958.svg";
import cardGrain from "../assets/ui/card_grain.09c9d82146a64bce69b5.svg";
import cardDevelopment from "../assets/ui/card_devcardback.92569a1abd04a8c1c17e.svg";
import cardResourceBack from "../assets/ui/card_rescardback.03c18312a76028b0d9c9.svg";
import cardResourceBackOverLimit from "../assets/ui/card_rescardoverlimit.94289aa29992189fe66c.svg";
import cardKnight from "../assets/ui/card_knight.a58573f2154fa93a6319.svg";
import cardMonopoly from "../assets/ui/card_monopoly.dfac189aaff62e271093.svg";
import cardPoint from "../assets/ui/card_vp.672597308e3a8f1100ae.svg";
import cardYearOfPlenty from "../assets/ui/card_yearofplenty.3df210b5455b7438db09.svg";
import cardRoadBuilder from "../assets/ui/card_roadbuilding.994e8f21698ce6c350bd.svg";
import iconBot from "../assets/ui/icon_bot.fe8fdd5cc98ae77d7774.svg";
import iconPlayer from "../assets/ui/icon_player_loggedin.88be0a3c581efb9f2d3a.svg";
import iconPlayers from "../assets/ui/icon_players.85d13bf5dfe81259979a.svg";
import iconTradeArrowGreen from "../assets/ui/icon_trade_arrow_green.dc94789e15ba3783e25e.svg";
import iconTradeArrowRed from "../assets/ui/icon_trade_arrow_red.d9bd6f9e6fe61a2cda68.svg";
import iconTrophy from "../assets/ui/icon_trophy.bc5c68a7464f0462721d.svg";
import iconSend from "../assets/ui/icon_send.0395fe5de05351959b13.svg";
import dice1 from "../assets/ui/dice_1.f5a1a69c3529b5b5ffc5.svg";
import dice2 from "../assets/ui/dice_2.859c1a230cf0ab52f238.svg";
import dice3 from "../assets/ui/dice_3.353e115f936308bb6256.svg";
import dice4 from "../assets/ui/dice_4.351f1ed668f38d45da30.svg";
import dice5 from "../assets/ui/dice_5.5eea2c3e3b85be8190bd.svg";
import dice6 from "../assets/ui/dice_6.aea83e2b0e712f5f1fab.svg";
import ribbonSmall from "../assets/ui/ribbon_small.f1f6f5885b2535205fe3.svg";
import ribbonLarge from "../assets/ui/ribbon_short.b4f83327f0b50cae62bb.svg";
import largestArmyIcon from "../assets/ui/icon_largest_army.180cce1760beb87a1a3e.svg";
import longestRoadIcon from "../assets/ui/icon_longest_road.5cfdeb3352b20463e64b.svg";
import largestArmyIconHighlight from "../assets/ui/icon_largest_army_highlight.515bcbf0a2c0b5b5a3f1.svg";
import longestRoadIconHighlight from "../assets/ui/icon_longest_road_highlight.50dc66b851ecee9a8662.svg";
import iconSettings from "../assets/ui/icon_settings.163a70b3a0e246d006c2.svg";
import bgButton from "../assets/ui/bg_button.6fb386c356a3e9b580e2.svg";
import bgButtonHighlight from "../assets/ui/bg_button_trade_highlight.3925cb750db0bd0daa9c.svg";
import bgButtonRed from "../assets/ui/bg_button_red.e443074fceecb964fe06.svg";
import bgButtonBlue from "../assets/ui/bg_button_blue.b7198c2652442d82f2eb.svg";
import bgButtonOrange from "../assets/ui/bg_button_orange.2e4497beb68391151250.svg";
import bgButtonGreen from "../assets/ui/bg_button_green.71912ebbd4119e3cfafc.svg";
import iconBankTrade from "../assets/ui/icon_trade_bank_check.cca85e07979a94c78dac.svg";
import iconOpponentTrade from "../assets/ui/icon_trade_opponents_check.90ff25f49e3eede7c0bb.svg";
import iconTrade from "../assets/ui/icon_trade.db2aa231787fcdbc1a67.svg";
import iconCheck from "../assets/ui/icon_check.25cd255d370bed6f507b.svg";
import iconCross from "../assets/ui/icon_x.5efbc794816c7abe462b.svg";
import iconPencil from "../assets/ui/icon_pencil.9d4a73f29f331378c4b5.svg";
import iconArrowUpBlack from "../assets/ui/icon_arrow_up_black.82635b6e9f69a1a10e3e.svg";
import iconPassTurn from "../assets/ui/icon_pass_turn.8d5b7a48c40a85b859cd.svg";
import iconRoadRed from "../assets/game/road_red.41c6cbd9278108542715.svg";
import iconSettlementRed from "../assets/game/settlement_red.22949197b57f9cfd968b.svg";
import iconCityRed from "../assets/game/city_red.991ae0c7a0b95da9811d.svg";
import iconStatusAccept from "../assets/ui/player_status_accept.0d2db004499736cfb369.svg";
import iconStatusReject from "../assets/ui/player_status_reject.9efea4f82b41faca8846.svg";
import iconStatusPending from "../assets/ui/player_status_pending.9a4dc5cd13a898e73a1e.svg";

import "./game-ui.scss";

import type { ComponentChildren, VNode } from "preact";
import { GameBoard } from "../game/GameBoard";

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
                            <GenericAvatar className="player-info__avatar-halo" backgroundColor={color} iconSrc={isBot ? iconBot : iconPlayer} />
                        </button>
                        <div className={"player-info__points" + (currentUser ? " player-info__points--current-user" : "")}>
                            <img src={currentUser ? ribbonLarge : ribbonSmall} className={"player-info__points-ribbon" + (currentUser ? " player-info__points-ribbon--current-user" : "")}></img>
                            <span className="player-info__points-count">{points}</span>
                        </div>
                    </div>
                </div>
                <div className={"player-info__cards" + (currentUser ? " player-info__cards--current-user" : "")}>
                    <div className="player-info__resources">
                        <img className="player-info__card" src={resourceCards > 7 ? cardResourceBackOverLimit : cardResourceBack}></img>
                        <div className="player-info__card-count-badge">
                            <div className="player-info__card-count">{resourceCards}</div>
                        </div>
                    </div>
                    <div className="player-info__resources">
                        <img className="player-info__card" src={cardDevelopment}></img>
                        <div className="player-info__card-count-badge">
                            <div className="player-info__card-count">{developmentCards}</div>
                        </div>
                    </div>
                </div>
                <div className={"player-info__achievement-container" + (currentUser ? " player-info__achievement-container--current-user" : "")}>
                    <div className="player-info__achievement">
                        <img className="player-info__achievement-image" src={largestArmy ? largestArmyIconHighlight : largestArmyIcon}></img>
                        <div className="player-info__achievement-count">{armyCount}</div>
                    </div>
                    <div className="player-info__achievement">
                        <img className="player-info__achievement-image" src={longestRoad ? longestRoadIconHighlight : longestRoadIcon}></img>
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
                    <img className="opponent-container__dice-image" src={dice1} />
                </div>
                <div className="opponent-container__dice-wrapper">
                    <img className="opponent-container__dice-image opponent-container__dice-image--inactive" src={dice1} />
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
            <img src={bankIcon} className="bank-container__icon"></img>
            <div className="bank-container__card-row">
                {generateCardStackBank(18, cardLumber)}
                {generateCardStackBank(8, cardBrick)}
                {generateCardStackBank(18, cardWool)}
                {generateCardStackBank(0, cardGrain)}
                {generateCardStackBank(18, cardOre)}
                {generateCardStackBank(20, cardDevelopment)}
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
                <img className="chat-container__icon-image" src={isBot ? iconBot : iconPlayer}></img>
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
                <img className="chat-container__icon-image" src={isBot ? iconBot : iconPlayer}></img>
            </div>
            <span className="chat-container__message-content">
                <img className="chat-container__message-image" src={iconTrophy}></img> <span className={`chat-container__message-content--bold chat-container__message-content--${color}`}>{username}</span> won the game!{" "}
                <img className="chat-container__message-image" src={iconTrophy}></img>
            </span>
        </div>
    );
};

const generateChatItem = (username: string, color: string, isBot: boolean, message: string) => {
    return (
        <div className="chat-container__message-wrapper">
            <div className="chat-container__icon">
                <img className="chat-container__icon-image" src={isBot ? iconBot : iconPlayer}></img>
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
                {generateLogItem("Lissi", "blue", false, "bought", [cardDevelopment])}
                {generateLogItem("Ester", "red", true, "got", [cardGrain])}
                {generateLogSeparator()}
                {generateLogItem("Joost", "green", false, "rolled", [dice1, dice2])}
                {generateLogItem("Bold", "orange", false, "got", [cardLumber, cardOre])}
                {generateLogSeparator()}
                {generateLogItem("Joost", "green", false, "rolled", [dice3, dice4])}
                {generateLogItem("Bold", "orange", false, "got", [cardLumber, cardOre])}
                {generateLogSeparator()}
                {generateLogItem("Joost", "green", false, "rolled", [dice5, dice6])}
                {generateLogItem("Bold", "orange", false, "got", [cardLumber, cardOre])}
                {generateLogSeparator()}
                {generateLogItem("Lissi", "blue", false, "bought", [cardDevelopment])}
                {generateLogItem("Ester", "red", true, "got", [cardGrain])}
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
                            <img src={iconSend} className="chat-container__submit-image" />
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
                    {generateCardStackInventory(1, cardLumber, false)}
                    {generateCardStackInventory(1, cardBrick, false)}
                    {generateCardStackInventory(1, cardWool, false)}
                    {generateCardStackInventory(1, cardGrain, false)}
                    {generateCardStackInventory(1, cardOre, false)}
                    {generateCardStackInventory(1, cardResourceBack, false)}
                </div>
            </div>
            <div className="trade-creator-wanted__bank-icon">
                <img className="trade-creator-wanted__bank-icon-image" src={bankIcon} />
            </div>
        </div>
    );
};

const GenericAvatar = (props: { className?: string; backgroundColor?: string; iconSrc?: string; children?: ComponentChildren }) => {
    const additionalClassName = props.className || "";
    const iconSrc = props.iconSrc || iconPlayer;
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
                    <GenericAvatar iconSrc={iconPlayers} />
                    <img className="trade-creator-proposal__giving-arrow" src={iconTradeArrowGreen} />
                    {generateCardStackInventory(1, cardBrick, true)}
                    {generateCardStackInventory(1, cardLumber, true)}
                </div>
                <div className="trade-creator-proposal__offered-container">
                    <GenericAvatar backgroundColor="red" />
                    <img className="trade-creator-proposal__giving-arrow" src={iconTradeArrowRed} />
                    {generateCardStackInventory(2, cardOre, true)}
                    {generateCardStackInventory(1, cardWool, true)}
                </div>
            </div>
        </>
    );
};

const InventorySection = (props: { showTradeActions: boolean }) => {
    return (
        <div className="game-inventory__trade-creator-container">
            <div className="game-inventory__card-inventory">
                {generateCardStackInventory(2, cardLumber, true)}
                {generateCardStackInventory(2, cardBrick, true)}
                {generateCardStackInventory(1, cardWool, true)}
                {generateCardStackInventory(2, cardGrain, true)}
                {generateCardStackInventory(3, cardOre, true)}

                <div className="game-inventory__separator"></div>

                {generateCardStackInventory(1, cardKnight, false)}
                {generateCardStackInventory(1, cardRoadBuilder, false)}
                {generateCardStackInventory(1, cardMonopoly, false)}
                {generateCardStackInventory(1, cardPoint, false)}
                {generateCardStackInventory(1, cardYearOfPlenty, false)}
            </div>
            {props.showTradeActions && (
                <div className="game-inventory__trade-actions">
                    <div className="game-inventory__action-button">
                        <img className="game-inventory__action-bg" src={bgButton} />
                        <div className="">
                            <img className="game-inventory__action-icon" src={iconBankTrade} />
                        </div>
                    </div>

                    <div className="game-inventory__action-button">
                        <img className="game-inventory__action-bg" src={bgButton} />
                        <div className="">
                            <img className="game-inventory__action-icon" src={iconOpponentTrade} />
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
                <img className="dice-container__image" src={dice1} />
            </div>
            <div className="dice-container__wrapper">
                <img className="dice-container__image dice-container__image--inactive" src={dice3} />
            </div>
        </div>
    );
};

const generateActionButton = (className: string, iconSrc: string, enabled: boolean, count: number) => {
    return (
        <div className={className}>
            <div className="game-actions__action-button">
                <img className="game-actions__button-background" src={bgButton} />
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
                    <GenericAvatar className="game-actions__avatar" backgroundColor="red" iconSrc={iconPlayer} />
                    <div className="game-actions__current-status-message">Answer Trade</div>
                </div>
            </div>
            <div className="game-actions__timer">
                <div className="game-actions__timer-text">03:02</div>
            </div>

            {generateActionButton("game-actions__trade-button", iconCross, true, -1) /* iconTrade */}
            {generateActionButton("game-actions__development-card-button", cardDevelopment, false, -1)}
            {generateActionButton("game-actions__road-button", iconRoadRed, true, 14)}
            {generateActionButton("game-actions__settlement-button", iconSettlementRed, false, 5)}
            {generateActionButton("game-actions__city-button", iconCityRed, false, 4)}
            {generateActionButton("game-actions__turn-button", iconPassTurn, true, -1)}
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
            {cooldown && <img className="trade-offers__button-cooldown" src={bgButtonHighlight} style="clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, -1.67931% 135.611%);" />}

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
        return <GenericAvatar className="trade-offers__player-icon" backgroundColor={color} iconSrc={iconBot} />;
    });

    return (
        <div className="trade-offers__header">
            <div className="trade-offers__players-container">{iconNodes}</div>
            <img className="trade-offers__hide-icon" src={iconArrowUpBlack} />
        </div>
    );
};

const TradeOffer = (props: { sentByMe: boolean; counterOffer: boolean }) => {
    return (
        <div className="trade-offers__offer">
            {props.counterOffer && (
                <div className="trade-offers__counteroffer-side ">
                    <GenericAvatar className="trade-offers__opponent-avatar-counteroffer" backgroundColor="green" iconSrc={iconPlayer} />
                </div>
            )}

            <div className="trade-offers__offer-container">
                <div className="trade-offers__receiving-half">
                    <div className="trade-offers__left-container">
                        {props.sentByMe && <GenericAvatar iconSrc={iconPlayers}></GenericAvatar>}

                        {!props.sentByMe && <GenericAvatar backgroundColor="green" iconSrc={iconPlayer} />}

                        <img className="trade-offers__receiving-arrow" src={iconTradeArrowGreen} />
                        <div className="trade-offers__card-row">{generateCardStackTrade(3, cardOre)}</div>
                    </div>
                    <div className="trade-offers__right-container">
                        {!props.sentByMe && (
                            <>
                                {generateOpponentTradeStatus(iconStatusAccept, "blue", iconPlayer)}
                                {generateOpponentTradeStatus(iconStatusReject, "green", iconBot)}
                            </>
                        )}
                    </div>
                </div>
                <div className="trade-offers__giving-half">
                    <div className="trade-offers__left-container">
                        <GenericAvatar backgroundColor="orange" iconSrc={iconPlayer} />
                        <img className="trade-offers__receiving-arrow givingArrow-_1FaBc_j" src={iconTradeArrowRed} />
                        <div className="trade-offers__card-row">
                            {generateCardStackTrade(1, cardBrick)}
                            {generateCardStackTrade(2, cardLumber)}
                        </div>
                    </div>

                    {props.sentByMe && (
                        <div className="trade-offers__right-container">
                            {generateTradeButton(bgButtonBlue, iconCheck, true, false)}
                            {generateTradeButton(bgButtonOrange, iconCheck, false, false)}
                            {generateTradeButton(bgButtonGreen, iconCheck, true, false)}
                            {generateTradeButton(bgButton, iconCross, false, false)}
                        </div>
                    )}
                    {!props.sentByMe && (
                        <div className="trade-offers__right-container">
                            {generateTradeButton(bgButton, iconPencil, true, false)}
                            {generateTradeButton(bgButton, iconCross, true, true)}
                            {generateTradeButton(bgButton, iconCheck, true, false)}
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
                                    <img src={iconSettings} className="options-menu__button-image"></img>
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
