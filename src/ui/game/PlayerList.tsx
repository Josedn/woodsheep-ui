import { UI_ICONS } from "../../assets/images";
import { GenericAvatar } from "./Avatar";
import type { GameStatePlayer } from "../../engine/GameService";

const colorToCssName = (color: string) => color.replace(/^C\./, "").toLowerCase();

const generatePlayer = (player: GameStatePlayer, isActive: boolean, currentUser: boolean) => {
    let points = player.visibleVictoryPoints.toString();
    if (player.realVictoryPoints != player.visibleVictoryPoints) {
        points += ` (${player.realVictoryPoints})`;
    }
    return (
        <div className={"player-info" + (isActive ? " player-info--active" : "") + (currentUser ? " player-info--current-user" : "")}>
            {currentUser && <div className="player-info__username-large">{player.username}</div>}
            <div className="player-info__container">
                <div className="player-info__badge">
                    {!currentUser && <div className="player-info__username">{player.username}</div>}
                    <div className="player-info__avatar-and-points">
                        <button className={"player-info__avatar" + (currentUser ? " player-info__avatar--current-user" : "")}>
                            <GenericAvatar className="player-info__avatar-halo" backgroundColor={colorToCssName(player.color)} iconSrc={player.isBot ? UI_ICONS.iconBot : UI_ICONS.iconPlayer} />
                        </button>
                        <div className={"player-info__points" + (currentUser ? " player-info__points--current-user" : "")}>
                            <img src={currentUser ? UI_ICONS.ribbonLarge : UI_ICONS.ribbonSmall} className={"player-info__points-ribbon" + (currentUser ? " player-info__points-ribbon--current-user" : "")}></img>
                            <span className="player-info__points-count">{points}</span>
                        </div>
                    </div>
                </div>
                <div className={"player-info__cards" + (currentUser ? " player-info__cards--current-user" : "")}>
                    <div className="player-info__resources">
                        <img className="player-info__card" src={player.resourceCount > 7 ? UI_ICONS.cardResourceBackOverLimit : UI_ICONS.cardResourceBack}></img>
                        <div className="player-info__card-count-badge">
                            <div className="player-info__card-count">{player.resourceCount}</div>
                        </div>
                    </div>
                    <div className="player-info__resources">
                        <img className="player-info__card" src={UI_ICONS.cardDevelopment}></img>
                        <div className="player-info__card-count-badge">
                            <div className="player-info__card-count">{player.devCardCount}</div>
                        </div>
                    </div>
                </div>
                <div className={"player-info__achievement-container" + (currentUser ? " player-info__achievement-container--current-user" : "")}>
                    <div className="player-info__achievement">
                        <img className="player-info__achievement-image" src={player.hasLargestArmy ? UI_ICONS.largestArmyIconHighlight : UI_ICONS.largestArmyIcon}></img>
                        <div className="player-info__achievement-count">{player.armyCount}</div>
                    </div>
                    <div className="player-info__achievement">
                        <img className="player-info__achievement-image" src={player.hasLongestRoad ? UI_ICONS.longestRoadIconHighlight : UI_ICONS.longestRoadIcon}></img>
                        <div className="player-info__achievement-count">{player.roadLength}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const generateOpponentCard = (player: GameStatePlayer, isActive: boolean) => {
    return (
        <div className="opponent-container__row" key={player.color}>
            <div className={"opponent-container__dice-group" + (!isActive ? " opponent-container__dice-group--hidden" : "")}>
                <div className="opponent-container__dice-wrapper">
                    <img className="opponent-container__dice-image" src={UI_ICONS.dice1} />
                </div>
                <div className="opponent-container__dice-wrapper">
                    <img className="opponent-container__dice-image opponent-container__dice-image--inactive" src={UI_ICONS.dice1} />
                </div>
            </div>

            {generatePlayer(player, isActive, false)}
        </div>
    );
};

export const PlayerList = (props: { players: GameStatePlayer[]; yourColor: string | null; currentTurnColor: string | null }) => {
    const { players, yourColor, currentTurnColor } = props;
    const you = players.find(player => player.color === yourColor);
    const opponents = players.filter(player => player.color !== yourColor);

    return (
        <div className="game-board__players">
            <div className="opponent-container">{opponents.map(player => generateOpponentCard(player, player.color === currentTurnColor))}</div>
            {you && generatePlayer(you, you.color === currentTurnColor, true)}
        </div>
    );
};
