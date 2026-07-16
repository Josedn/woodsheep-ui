import type { VNode } from "preact";
import { UI_ICONS } from "../../assets/images";
import { GenericAvatar } from "./Avatar";

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

const Inventory = (props: { showTradeActions: boolean }) => {
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

export const InventorySection = (props: { isTrading: boolean }) => {
    return (
        <>
            {props.isTrading && <TradeProposalSection />}
            <Inventory showTradeActions={props.isTrading} />
        </>
    );
};
