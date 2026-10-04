import { useState } from "react";
import "./App.css";

function App() {
  // Player names
  const [players, setPlayers] = useState([
    "Arbai",
    "Zedan",
    "Aryan",
    "Player 4",
  ]);

  // Score rows
  const [boards, setBoards] = useState([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);

  // Previous winners
  const [winners, setWinners] = useState([]);

  // Change player name
  const changePlayerName = (index, value) => {
    const updatedPlayers = [...players];

    updatedPlayers[index] = value;

    setPlayers(updatedPlayers);
  };

  // Calculate total
  const getTotal = (playerIndex) => {
    return boards.reduce((total, board) => {
      return total + (Number(board[playerIndex]) || 0);
    }, 0);
  };
  const getRowTotal = (board) => {
  return board.reduce((total, points) => {
    return total + (Number(points) || 0);
  }, 0);
};
  // Change score
const changePoints = (boardIndex, playerIndex, value) => {
  const updatedBoards = boards.map((board) => [...board]);

  updatedBoards[boardIndex][playerIndex] = value;

  // Calculate this row's total
  const rowTotal = getRowTotal(updatedBoards[boardIndex]);

  // Maximum allowed for one row is 360
  if (rowTotal > 360) {
    return;
  }

  // Calculate player totals
  const totals = players.map((_, playerIndex) => {
    return updatedBoards.reduce((total, board) => {
      return total + (Number(board[playerIndex]) || 0);
    }, 0);
  });

  // Check whether anyone reached 1000
  const newWinners = [];

  totals.forEach((total, index) => {
    if (total >= 1000) {
      newWinners.push({
        name: players[index],
        points: total,
      });
    }
  });

  // Someone reached 1000
  if (newWinners.length > 0) {

    setWinners((previousWinners) => [
      ...previousWinners,
      ...newWinners,
    ]);

    // Reset scores
    const resetBoards = updatedBoards.map(() => [
      "",
      "",
      "",
      "",
    ]);

    setBoards(resetBoards);

    return;
  }

  setBoards(updatedBoards);
};

  // Add another board/row
  const addBoard = () => {
    setBoards([
      ...boards,
      ["", "", "", ""],
    ]);
  };

  return (
    <div className="app">

      <h1>Score Board</h1>

      {/* Winner List */}
      <div className="winner-section">

        <h2>🏆 Winner List</h2>

        {winners.length === 0 ? (
          <p>No winner yet — first player to reach 1000 points wins.</p>
        ) : (
          <div className="winner-list">

            {winners.map((winner, index) => (
              <div className="winner" key={index}>
                🏆 {winner.name}
                <span>{winner.points} points</span>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* Score Table */}
      <div className="table-container">

        <table>

<thead>
  <tr>

    <th>
      Board
      <br />
      Count
    </th>

    {players.map((player, index) => (
      <th key={index}>
        <input
          value={player}
          onChange={(e) =>
            changePlayerName(index, e.target.value)
          }
        />
      </th>
    ))}

    <th>ROW TOTAL</th>
<th>REMAINING</th>

  </tr>
</thead>

          <tbody>

            {boards.map((board, boardIndex) => (

              <tr key={boardIndex}>

                <td className="board-number">
                  {boardIndex + 1}
                </td>

                {board.map((points, playerIndex) => (

                  <td key={playerIndex}>

                    <input
                      type="number"
                      value={points}
                      onChange={(e) =>
                        changePoints(
                          boardIndex,
                          playerIndex,
                          e.target.value
                        )
                      }
                    />

                  </td>

                ))}
        <td className="row-total">
  {getRowTotal(board)}
</td>

<td className="remaining">
  {360 - getRowTotal(board)}
</td>

              </tr>

            ))}

          </tbody>

          {/* Total */}
          <tfoot>

            <tr>

              <td>TOTAL</td>

              {players.map((_, playerIndex) => (

                <td key={playerIndex}>
                  {getTotal(playerIndex)}
                </td>

              ))}

            </tr>

          </tfoot>

        </table>

      </div>

      {/* Add Board */}
      <button
        className="add-board"
        onClick={addBoard}
      >
        + Add Board
      </button>

    </div>
  );
}

export default App;