import { UI_ICONS } from "../../../assets/images";

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
    lumber: number,
    brick: number,
    wool: number,
    grain: number,
    ore: number,
    developent: number,
    showAmounts: boolean,
};

export const GameBank = (props: {bankData: BankData}) => {

    const {bankData} = props;
    return (
        <div className="game-board__bank bank-container">
            <img src={UI_ICONS.bankIcon} className="bank-container__icon"></img>
            <div className="bank-container__card-row">
                {generateCardStackBank(bankData.lumber, UI_ICONS.cardLumber)}
                {generateCardStackBank(bankData.brick, UI_ICONS.cardBrick)}
                {generateCardStackBank(bankData.wool, UI_ICONS.cardWool)}
                {generateCardStackBank(bankData.grain, UI_ICONS.cardGrain)}
                {generateCardStackBank(bankData.wool, UI_ICONS.cardOre)}
                {generateCardStackBank(bankData.developent, UI_ICONS.cardDevelopment)}
            </div>
        </div>
    );
};