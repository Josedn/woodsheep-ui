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
import badgeBackgroundBlue from "../assets/ui/button_badge_background_blue.2e754ec21f9c79da6267.svg";
import iconBot from "../assets/ui/icon_bot.fe8fdd5cc98ae77d7774.svg";
import iconPlayer from "../assets/ui/icon_player_loggedin.88be0a3c581efb9f2d3a.svg";
import iconPlayers from "../assets/ui/icon_players.85d13bf5dfe81259979a.svg";
import iconTradeArrowGreen from "../assets/ui/icon_trade_arrow_green.dc94789e15ba3783e25e.svg";
import iconTradeArrowRed from "../assets/ui/icon_trade_arrow_red.d9bd6f9e6fe61a2cda68.svg";
import iconTrophy from "../assets/ui/icon_trophy.bc5c68a7464f0462721d.svg";
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
import iconCross from "../assets/ui/icon_x.5efbc794816c7abe462b.svg";
import iconPassTurn from "../assets/ui/icon_pass_turn.8d5b7a48c40a85b859cd.svg";
import iconRoadRed from "../assets/ui/road_red.41c6cbd9278108542715.svg";
import iconSettlementRed from "../assets/ui/settlement_red.22949197b57f9cfd968b.svg";
import iconCityRed from "../assets/ui/city_red.991ae0c7a0b95da9811d.svg";

import type { VNode } from "preact";

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
        <div className={"player-info generic-box" + (!isActive ? " generic-box--faded" : "") + (currentUser ? " player-info--current-user" : "")}>
            {currentUser && <div className="player-info__username-large">{username}</div>}
            <div className="player-info__container">
                <div className="player-info__badge">
                    {!currentUser && <div className="player-info__username">{username}</div>}
                    <div className="player-info__avatar-and-points">
                        <button className={"player-info__avatar" + (currentUser ? " player-info__avatar--current-user" : "")}>
                            <div className={`player-info__avatar-halo player-info__avatar-halo--${color}`}>
                                <img src={isBot ? iconBot : iconPlayer} className="player-info__avatar-image"></img>
                            </div>
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

const generatePlayers = () => {
    return (
        <div className="game-controls__players">
            {generatePlayer("Joost", false, 4, 4, 1, 4, 2, 4, false, false, "green", false, false)}
            {generatePlayer("Ester", true, 8, 8, 9, 1, 2, 5, false, true, "red", true, false)}
            {generatePlayer("Bold", false, 2, 2, 3, 0, 5, 4, true, false, "orange", false, false)}
            {generatePlayer("Lissi", false, 2, 3, 2, 4, 2, 4, false, false, "blue", false, true)}
        </div>
    );
};

const generateCardStack = (count: number, imgSrc: string) => {
    const lastItemClassName = "game-controls__card-container" + (count == 0 ? " game-controls__card-container--empty" : "");
    return (
        <div className="game-controls__card-stack">
            {count >= 13 && (
                <div className="game-controls__card-container">
                    <img className="game-controls__card" src={imgSrc} />
                </div>
            )}
            {count >= 8 && (
                <div className="game-controls__card-container">
                    <img className="game-controls__card" src={imgSrc} />
                </div>
            )}
            <div className={lastItemClassName}>
                <img className="game-controls__card" src={imgSrc}></img>
                <div className="game-controls__card-count-badge">
                    <img className="game-controls__card-count-badge-background" src={badgeBackgroundBlue}></img>
                    <div className="game-controls__card-count">{count}</div>
                </div>
            </div>
        </div>
    );
};

const generateBank = () => {
    return (
        <div className="game-controls__bank generic-box">
            <img src={bankIcon} className="game-controls__bank-icon"></img>
            <div className="game-controls__bank-row">
                {generateCardStack(18, cardLumber)}
                {generateCardStack(8, cardBrick)}
                {generateCardStack(18, cardWool)}
                {generateCardStack(0, cardGrain)}
                {generateCardStack(18, cardOre)}
                {generateCardStack(20, cardDevelopment)}
            </div>
        </div>
    );
};

const generateLogItem = (username: string, color: string, isBot: boolean, action: string, images: string[]) => {
    const imagesNodes = images.map((image, index) => {
        return (
            <>
                <img key={index} className="game-feed-message__content-image" src={image}></img>{" "}
            </>
        );
    });
    return (
        <div className="game-controls__log-item">
            <div className="game-feed-message__container">
                <div className="game-feed-message__icon">
                    <img className="game-feed-message__image" src={isBot ? iconBot : iconPlayer}></img>
                </div>
                <span className="game-feed-message__content">
                    <span className={`game-feed-message__content--bold game-feed-message__content--${color}`}>{username}</span> {action} {imagesNodes}
                </span>
            </div>
        </div>
    );
};

const generateLogSeparator = () => {
    return (
        <div className="game-controls__log-item">
            <div className="game-feed-message__container">
                <span className="game-feed-message__content">
                    <hr />
                </span>
            </div>
        </div>
    );
};

const generateWinItem = (username: string, color: string, isBot: boolean) => {
    return (
        <div className="game-controls__log-item">
            <div className="game-feed-message__container game-feed-message__container--centered">
                <div className="game-feed-message__icon">
                    <img className="game-feed-message__image" src={isBot ? iconBot : iconPlayer}></img>
                </div>
                <span className="game-feed-message__content">
                    <img className="game-feed-message__content-image" src={iconTrophy}></img> <span className={`game-feed-message__content--bold game-feed-message__content--${color}`}>{username}</span> won the game!{" "}
                    <img className="game-feed-message__content-image" src={iconTrophy}></img>
                </span>
            </div>
        </div>
    );
};

const generateLog = () => {
    return (
        <div className="game-controls__log generic-box">
            <div className="game-controls__log-container">
                <div className="game-controls__log-scroller">
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
        </div>
    );
};

const generateChatItem = (username: string, color: string, isBot: boolean, message: string) => {
    return (
        <div className="game-controls__log-item">
            <div className="game-feed-message__container">
                <div className="game-feed-message__icon">
                    <img className="game-feed-message__image" src={isBot ? iconBot : iconPlayer}></img>
                </div>
                <span className="game-feed-message__content">
                    <span className={`game-feed-message__content--bold game-feed-message__content--${color}`}>{username}</span> {message}
                </span>
            </div>
        </div>
    );
};

const generateChat = () => {
    return (
        <div className="game-controls__chat generic-box">
            <div className="game-controls__log-container">
                <div className="game-controls__log-scroller">
                    {generateChatItem("Bold", "orange", false, "Hey everyone!")}
                    {generateChatItem("Lissi", "blue", false, "Good luck!")}
                    {generateChatItem("Joost", "green", false, "Anyone up for a trade?")}
                </div>
            </div>
        </div>
    );
};

/*
<div className="game-board__trade-popup">
                            <div className="game-board__trade-popup-top generic-box">Trade top</div>
                            <div className="game-board__trade-popup-content generic-box">Trade info</div>
                        </div>
                        */

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
                        <div class="game-inventory__count-container">
                            <div class="game-inventory__count">{count}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const generateWantedCards = () => {
    return (
        <div class="trade-creator-wanted wantedCardSelectorContainer-BNhGzRVO">
            <div class="trade-creator-wanted__cards-container cardsContainer-OkZMWL2H">
                <div class="trade-creator-wanted__cards-stack container-GHn2zJsx cardStack-a42L5muF">
                    {generateCardStackInventory(1, cardLumber, false)}
                    {generateCardStackInventory(1, cardBrick, false)}
                    {generateCardStackInventory(1, cardWool, false)}
                    {generateCardStackInventory(1, cardGrain, false)}
                    {generateCardStackInventory(1, cardOre, false)}
                    {generateCardStackInventory(1, cardResourceBack, false)}
                </div>
            </div>
            <div class="trade-creator-wanted__bank-icon tooltipTrigger-LSJLRWEF ratioContainer-uZ2gOVwR">
                <img class="trade-creator-wanted__bank-icon-image ratioIcon-NcxgaLUV" src={bankIcon} />
            </div>
        </div>
    );
};
export const generateTradeProposal = () => {
    return (
        <>
            {generateWantedCards()}
            <div class="trade-creator-proposal">
                <div class="trade-creator-proposal__wanted-container">
                    <div class="trade-creator-proposal__avatar-container">
                        <img class="trade-creator-proposal__avatar-image" src={iconPlayers} />
                    </div>
                    <img class="trade-creator-proposal__giving-arrow" src={iconTradeArrowGreen} />
                    {generateCardStackInventory(1, cardBrick, true)}
                    {generateCardStackInventory(1, cardLumber, true)}
                </div>
                <div class="trade-creator-proposal__offered-container">
                    <div class="trade-creator-proposal__avatar-container player-info__avatar-halo--red">
                        <img class="trade-creator-proposal__avatar-image--current-player" src={iconPlayer} />
                    </div>
                    <img class="trade-creator-proposal__giving-arrow" src={iconTradeArrowRed} />
                    {generateCardStackInventory(2, cardOre, true)}
                    {generateCardStackInventory(1, cardWool, true)}
                </div>
            </div>
        </>
    );
};

export const generateInventory = () => {
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
        </div>
    );
};

export const generateDiceContainer = () => {
    return (
        <div class="dice-container">
            <div class="dice-container__wrapper">
                <img class="dice-container__image" src={dice1} />
            </div>
            <div class="dice-container__wrapper">
                <img class="dice-container__image dice-container__image--inactive" src={dice3} />
            </div>
        </div>
    );
};

export const generateActionButtons = () => {
    return (
        <div class="game-actions">
            <div class="game-actions__current-status">
                <div class="game-actions__current-status-container">
                    <div class="game-actions__avatar player-info__avatar-halo--red">
                        <img class="game-actions__avatar-image" src={iconPlayer} />
                    </div>
                    <div class="game-actions__current-status-message">Answer Trade</div>
                </div>
            </div>
            <div class="game-actions__timer container-pBn83kjC beigeBackground-LUrLCPZy timer-ItAWXRS8">
                <div class="game-actions__timer-text timerBeige-tyEEde4z">03:02</div>
            </div>
            <div class="game-actions__trade-button tradeButton-BgRRP9Nn">
                <div class="game-actions__action-button root-fipXCgRS actionButton-mJLb8ACX" id="action-button-trade">
                    <img class="game-actions__button-background backgroundImage-m_p04hHp" src={bgButton} />
                    <div class="">
                        <img class="game-actions__icon-wrapper iconWrapper-Yz2YZsv8" src={iconCross} />
                    </div>
                </div>
            </div>
            <div class="game-actions__development-card-button buyDevelopmentCardButton-ZZiU63kF">
                <div class="game-actions__icon-container container-pW9vSis7">
                    <div class="game-actions__action-button root-fipXCgRS actionButton-mJLb8ACX" id="action-button-buy-dev-card">
                        <img class="game-actions__button-background backgroundImage-m_p04hHp" src={bgButton} />
                        <div class="game-actions__foreground-disabled foregroundDisabled-vat4kvGr">
                            <img class="game-actions__icon-wrapper iconWrapper-Yz2YZsv8" src={cardDevelopment} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-actions__road-button roadButton-Fj8MaFrs">
                <div class="container-pW9vSis7">
                    <div class="game-actions__action-button root-fipXCgRS actionButton-mJLb8ACX">
                        <img class="game-actions__button-background backgroundImage-m_p04hHp" src={bgButton} />
                        <div class="game-actions__foreground-disabled foregroundDisabled-vat4kvGr">
                            <img class="game-actions__icon-wrapper iconWrapper-Yz2YZsv8" src={iconRoadRed} />
                            <div class="game-actions__count-container container-j1vSyHMk count-vxb8uBMn">
                                <div class="game-actions__count count-Dh6MtdiN">12</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-actions__settlement-button settlementButton-bA9oNaR0">
                <div class="container-pW9vSis7">
                    <div class="game-actions__action-button root-fipXCgRS actionButton-mJLb8ACX">
                        <img class="game-actions__button-background backgroundImage-m_p04hHp" src={bgButton} />
                        <div class="game-actions__foreground-disabled foregroundDisabled-vat4kvGr">
                            <img class="game-actions__icon-wrapper iconWrapper-Yz2YZsv8" src={iconSettlementRed} />
                            <div class="game-actions__count-container container-j1vSyHMk count-vxb8uBMn">
                                <div class="game-actions__count count-Dh6MtdiN">3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-actions__city-button cityButton-ROgnxYv3">
                <div class="container-pW9vSis7">
                    <div class="game-actions__action-button root-fipXCgRS actionButton-mJLb8ACX" id="action-button-build-city">
                        <img class="game-actions__button-background backgroundImage-m_p04hHp" src={bgButton} />
                        <div class="game-actions__foreground-disabled foregroundDisabled-vat4kvGr">
                            <img class="game-actions__icon-wrapper iconWrapper-Yz2YZsv8" src={iconCityRed} />
                            <div class="game-actions__count-container container-j1vSyHMk count-vxb8uBMn">
                                <div class="game-actions__count count-Dh6MtdiN">3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-actions__turn-button turnButton-klLaRZeE">
                <div class="game-actions__action-button root-fipXCgRS actionButton-mJLb8ACX" id="action-button-pass-turn">
                    <img class="game-actions__button-background backgroundImage-m_p04hHp" src={bgButton} />
                    <div class="">
                        <img class="game-actions__icon-wrapper iconWrapper-Yz2YZsv8" src={iconPassTurn} />
                    </div>
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
                    <div className="game-board__top-left">
                        <div className="options-menu">
                            <div className="options-menu__container">
                                <button className="options-menu__button">
                                    <img src={iconSettings} className="options-menu__button-image"></img>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="game-board__bottom">
                        <div className="game-inventory">
                            <div className="game-inventory__container">
                                <div className="game-inventory__trade-creator">
                                    {generateTradeProposal()}
                                    {generateInventory()}
                                </div>
                            </div>
                            <div className="game-inventory__actions">
                                {generateDiceContainer()}
                                {generateActionButtons()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="game-controls">
                    {generateLog()}
                    {generateChat()}
                    {generateBank()}
                    {generatePlayers()}
                </div>
            </div>
            <div className="game"></div>
        </>
    );
};
