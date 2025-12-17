import bankIcon from "../assets/ui/bank.825b2690b4b1b694d646.svg";
import cardLumber from "../assets/ui/card_lumber.cf22f8083cf89c2a29e7.svg";
import cardWool from "../assets/ui/card_wool.17a6dea8d559949f0ccc.svg";
import cardBrick from "../assets/ui/card_brick.5950ea07a7ea01bc54a5.svg";
import cardOre from "../assets/ui/card_ore.117f64dab28e1c987958.svg";
import cardGrain from "../assets/ui/card_grain.09c9d82146a64bce69b5.svg";
import cardDevelopment from "../assets/ui/card_devcardback.92569a1abd04a8c1c17e.svg";
import badgeBackgroundBlue from "../assets/ui/button_badge_background_blue.2e754ec21f9c79da6267.svg";
import iconBot from "../assets/ui/icon_bot.fe8fdd5cc98ae77d7774.svg";
import iconPlayer from "../assets/ui/icon_player_loggedin.88be0a3c581efb9f2d3a.svg";
import iconTrophy from "../assets/ui/icon_trophy.bc5c68a7464f0462721d.svg";
import dice1 from "../assets/ui/dice_1.f5a1a69c3529b5b5ffc5.svg";
import dice2 from "../assets/ui/dice_2.859c1a230cf0ab52f238.svg";
import dice3 from "../assets/ui/dice_3.353e115f936308bb6256.svg";
import dice4 from "../assets/ui/dice_4.351f1ed668f38d45da30.svg";
import dice5 from "../assets/ui/dice_5.5eea2c3e3b85be8190bd.svg";
import dice6 from "../assets/ui/dice_6.aea83e2b0e712f5f1fab.svg";

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

const generateLog = () => {
    return (
        <div className="game-controls__log generic-box">
            <div className="game-controls__log-container">
                <div className="game-controls__log-scroller">
                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--blue">Lissi</span> bought <img className="game-feed-message__content-image" src={cardDevelopment}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--red">Ester</span> got <img className="game-feed-message__content-image" src={cardGrain}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <span className="game-feed-message__content">
                                <hr />
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--green">Joost</span> rolled <img className="game-feed-message__content-image" src={dice3}></img>{" "}
                                <img className="game-feed-message__content-image" src={dice5}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconPlayer}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--orange">Bold</span> got <img className="game-feed-message__content-image" src={cardLumber}></img>{" "}
                                <img className="game-feed-message__content-image" src={cardOre}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--green">Joost</span> rolled <img className="game-feed-message__content-image" src={dice3}></img>{" "}
                                <img className="game-feed-message__content-image" src={dice5}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconPlayer}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--orange">Bold</span> got <img className="game-feed-message__content-image" src={cardLumber}></img>{" "}
                                <img className="game-feed-message__content-image" src={cardOre}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--blue">Lissi</span> bought <img className="game-feed-message__content-image" src={cardDevelopment}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--red">Ester</span> got <img className="game-feed-message__content-image" src={cardGrain}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <span className="game-feed-message__content">
                                <hr />
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--green">Joost</span> rolled <img className="game-feed-message__content-image" src={dice3}></img>{" "}
                                <img className="game-feed-message__content-image" src={dice5}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconPlayer}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--orange">Bold</span> got <img className="game-feed-message__content-image" src={cardLumber}></img>{" "}
                                <img className="game-feed-message__content-image" src={cardOre}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--blue">Lissi</span> bought <img className="game-feed-message__content-image" src={cardDevelopment}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--red">Ester</span> got <img className="game-feed-message__content-image" src={cardGrain}></img>
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <span className="game-feed-message__content">
                                <hr />
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container game-feed-message__container--centered">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <img className="game-feed-message__content-image" src={iconTrophy}></img> <span className="game-feed-message__content--bold game-feed-message__content--red">Ester</span> won the game!{" "}
                                <img className="game-feed-message__content-image" src={iconTrophy}></img>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const generateChat = () => {
    return (
        <div className="game-controls__chat generic-box">
            <div className="game-controls__log-container">
                <div className="game-controls__log-scroller">
                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconPlayer}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--orange">Bold</span> Hey everyone!
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconBot}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--blue">Lissi</span> Good luck!
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <span className="game-feed-message__content">
                                <hr />
                            </span>
                        </div>
                    </div>

                    <div className="game-controls__log-item">
                        <div className="game-feed-message__container">
                            <div className="game-feed-message__icon">
                                <img className="game-feed-message__image" src={iconPlayer}></img>
                            </div>
                            <span className="game-feed-message__content">
                                <span className="game-feed-message__content--bold game-feed-message__content--green">Joost</span> Anyone up for a trade?
                            </span>
                        </div>
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
                    <div className="game-board__top">
                        <div className="game-board__options-menu">
                            <button className="game-board__options-button">Options</button>
                            <button className="game-board__options-button">Info</button>
                        </div>
                        <div className="game-board__trade-popup">
                            <div className="game-board__trade-popup-top generic-box">Trade top</div>
                            <div className="game-board__trade-popup-content generic-box">Trade info</div>
                        </div>
                    </div>
                    <div className="game-board__bottom">
                        <div className="game-board__card-holder generic-box">Card holder</div>
                    </div>
                </div>
                <div className="game-controls">
                    {generateLog()}
                    {generateChat()}
                    {generateBank()}
                    <div className="game-controls__players generic-box">Players</div>
                </div>
            </div>
            <div className="game"></div>
        </>
    );
};
