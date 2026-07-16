import { UI_ICONS } from "../../assets/images";
import { GenericAvatar } from "./Avatar";

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

export const PlayerList = () => {
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
