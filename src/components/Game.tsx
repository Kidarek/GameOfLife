import Board from "./Board"
function Game(): JSX.Element {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    )
}

export default Game
