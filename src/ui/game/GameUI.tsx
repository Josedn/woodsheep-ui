import "./game-ui.scss";

import { GameBoard } from "./game-board/GameBoard";
import { UI_ICONS, GAME_TINTED_ICONS } from "../../assets/images";
import { GameBank } from "./GameBank";
import { GameChat } from "./GameChat";
import { GameLog } from "./GameLog";
import { GenericAvatar } from "./Avatar";
import { TradeOffersSection } from "./Trade";
import { InventorySection } from "./Inventory";
import { PlayerList } from "./PlayerList";

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
                        <div className="trade-offers">{/*<TradeOffersSection />*/}</div>
                    </div>
                    <div className="game-board__bottom">
                        <div className="game-inventory">
                            <div className="game-inventory__container">
                                <div className="game-inventory__trade-creator">
                                    <InventorySection isTrading={false} />
                                </div>
                            </div>
                            <div className="game-inventory__actions">
                                <DiceContainer />
                                <ActionButtonsSection />
                            </div>
                        </div>
                    </div>
                    <div className="game-board__responsive-log">
                        <GameLog logs={[]} />
                        <GameChat />
                    </div>
                    <GameBank bankData={{ lumber: 10, brick: 19, wool: 1, grain: 1, ore: 1, developent: 0, showAmounts: true }} />
                    <PlayerList />
                </div>
            </div>
        </>
    );
};
