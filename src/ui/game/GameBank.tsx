import { UI_ICONS } from "../../assets/images";

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

type BankData = {
    resources: Record<string, number>;
    developmentCards: number;
};

export const GameBank = (props: { bankData: BankData }) => {
    const { resources, developmentCards } = props.bankData;
    return (
        <div className="game-board__bank bank-container">
            <img src={UI_ICONS.bankIcon} className="bank-container__icon"></img>
            <div className="bank-container__card-row">
                {generateCardStackBank(resources.WOOD ?? 0, UI_ICONS.cardLumber)}
                {generateCardStackBank(resources.BRICK ?? 0, UI_ICONS.cardBrick)}
                {generateCardStackBank(resources.SHEEP ?? 0, UI_ICONS.cardWool)}
                {generateCardStackBank(resources.WHEAT ?? 0, UI_ICONS.cardGrain)}
                {generateCardStackBank(resources.ORE ?? 0, UI_ICONS.cardOre)}
                {generateCardStackBank(developmentCards, UI_ICONS.cardDevelopment)}
            </div>
        </div>
    );
};
