import "./game-ui.scss";

import { useState } from "preact/hooks";
import { GameBoard } from "./game-board/GameBoard";
import { UI_ICONS, GAME_TINTED_ICONS } from "../../assets/images";
import { GameBank } from "./GameBank";
import { GameChat } from "./GameChat";
import { GameLog } from "./GameLog";
import { GenericAvatar } from "./Avatar";
import { TradeOffersSection } from "./Trade";
import { InventorySection } from "./Inventory";
import { PlayerList } from "./PlayerList";
import { UI_EVENTS } from "../../engine/ui-facade/UIFacade";
import { GameEngine } from "../../engine/GameEngine";
import { useGameEvent } from "../hooks/useGameEvent";
import { dispatchGameCommand } from "../hooks/dispatchGameCommand";
import { CommandRollDice } from "../../engine/ui-facade/commands/game/CommandRollDice";
import { CommandEndTurn } from "../../engine/ui-facade/commands/game/CommandEndTurn";

const DICE_ICONS = [UI_ICONS.dice1, UI_ICONS.dice2, UI_ICONS.dice3, UI_ICONS.dice4, UI_ICONS.dice5, UI_ICONS.dice6];

const DiceContainer = (props: { diceRoll: [number, number] | null; canRoll: boolean }) => {
    const [die1, die2] = props.diceRoll ?? [1, 3];
    return (
        <div className="dice-container" onClick={() => props.canRoll && dispatchGameCommand(new CommandRollDice())}>
            <div className="dice-container__wrapper">
                <img className={"dice-container__image" + (props.diceRoll ? "" : " dice-container__image--inactive")} src={DICE_ICONS[die1 - 1]} />
            </div>
            <div className="dice-container__wrapper">
                <img className={"dice-container__image" + (props.diceRoll ? "" : " dice-container__image--inactive")} src={DICE_ICONS[die2 - 1]} />
            </div>
        </div>
    );
};

const ActionButton = (props: { className: string; iconSrc: string; enabled: boolean; count: number; onClick?: () => void }) => {
    return (
        <div className={props.className} onClick={props.enabled ? props.onClick : undefined}>
            <div className="game-actions__action-button">
                <img className="game-actions__button-background" src={UI_ICONS.bgButton} />
                <div className={props.enabled ? "" : "game-actions__foreground-disabled"}>
                    <img className="game-actions__icon-wrapper" src={props.iconSrc} />
                    {props.count >= 0 && (
                        <div className="game-actions__count-container">
                            <div className="game-actions__count">{props.count}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ActionButtonsSection = (props: { isYourTurn: boolean; canEndTurn: boolean }) => {
    return (
        <div className="game-actions">
            <div className="game-actions__current-status">
                <div className="game-actions__current-status-container">
                    <GenericAvatar className="game-actions__avatar" backgroundColor="red" iconSrc={UI_ICONS.iconPlayer} />
                    <div className="game-actions__current-status-message">{props.isYourTurn ? "Your Turn" : "Waiting for other players"}</div>
                </div>
            </div>
            <div className="game-actions__timer">
                <div className="game-actions__timer-text">03:02</div>
            </div>

            <ActionButton className="game-actions__trade-button" iconSrc={UI_ICONS.iconCross} enabled={true} count={-1} /* iconTrade */ />
            <ActionButton className="game-actions__development-card-button" iconSrc={UI_ICONS.cardDevelopment} enabled={false} count={-1} />
            <ActionButton className="game-actions__road-button" iconSrc={GAME_TINTED_ICONS.roadRed} enabled={true} count={14} />
            <ActionButton className="game-actions__settlement-button" iconSrc={GAME_TINTED_ICONS.settlementRed} enabled={false} count={5} />
            <ActionButton className="game-actions__city-button" iconSrc={GAME_TINTED_ICONS.cityRed} enabled={false} count={4} />
            <ActionButton className="game-actions__turn-button" iconSrc={UI_ICONS.iconPassTurn} enabled={props.canEndTurn} count={-1} onClick={() => dispatchGameCommand(new CommandEndTurn())} />
        </div>
    );
};

export const GameUI = () => {
    const [gameState, setGameState] = useState(() => GameEngine.getGame().gameService.gameStateData);

    useGameEvent(UI_EVENTS.GAME_STATE_UPDATED, data => setGameState(data));

    const isYourTurn = gameState.currentColor != null && gameState.currentColor === gameState.yourColor;
    const canRoll = isYourTurn && gameState.playableActionTypes.includes("AT.ROLL");
    const canEndTurn = isYourTurn && gameState.playableActionTypes.includes("AT.END_TURN");

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
                                <DiceContainer diceRoll={gameState.diceRoll} canRoll={canRoll} />
                                <ActionButtonsSection isYourTurn={isYourTurn} canEndTurn={canEndTurn} />
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
