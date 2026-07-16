import type { VNode } from "preact";
import { UI_ICONS } from "../../assets/images";
import { GenericAvatar } from "./Avatar";

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

export const TradeOffersSection = () => {
    return (
        <>
            <TradeHeader colors={["blue", "red", "green"]} />
            <TradeOffer sentByMe={true} counterOffer={false} />
        </>
    );
};
