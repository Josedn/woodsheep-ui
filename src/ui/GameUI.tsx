export const GameUI = () => {
    return (
        <>
            <div className="main-wrapper">
                <div className="game-board">
                    <div className="game-board__options-menu">Menu</div>
                    <div className="game-board__trade-controls">Trade controls</div>
                    <div className="game-board__card-holder">Card holder</div>
                </div>
                <div className="game-controls">
                    <div className="game-board__generic-box game-controls__log">Log</div>
                    <div className="game-board__generic-box game-controls__chat">Chat</div>
                    <div className="game-board__generic-box game-controls__bank">Bank</div>
                    <div className="game-board__generic-box game-controls__players">Players</div>
                </div>
            </div>
            <div className="game"></div>
        </>
    );
};
