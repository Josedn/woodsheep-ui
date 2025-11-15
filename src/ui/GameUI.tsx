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
                    <div className="game-controls__log generic-box">Log</div>
                    <div className="game-controls__chat generic-box">Chat</div>
                    <div className="game-controls__bank generic-box">Bank</div>
                    <div className="game-controls__players generic-box">Players</div>
                </div>
            </div>
            <div className="game"></div>
        </>
    );
};
