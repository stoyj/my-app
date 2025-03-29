//✅Импортиране на useState (Това е React Hook, който позволява на компонентите да съхраняват и актуализират състояние (state))
import { useState } from "react";

//✅Компонент Square – бутон за всяко поле
function Square({ value, onSquareClick }) {
  //✅value е съдържанието на квадратчето (ще бъде "X", "O", или null).
  //✅onSquareClick е функцията  се изпълнява при кликване върху квадратчето.
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//✅Компонент Board е  самата дъска.
function Board({ xIsNext, squares, onPlay }) {
  //✅Компонент представлява цялата дъска от 9 квадратчета.

  //✅Обработка на клик върху квадратче
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      //✅Проверява дали има победител или квадратчето е заето. Ако да – спира изпълнението.
      return;
    }

    //✅Създава копие на масива squares и добавя "X" или "O", зависи кой играе.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    //✅Извиква onPlay, за да актуализира състоянието на играта.
  }

  //✅Изчисляване на статус (кой е на ход или кой е победител)
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    //✅Ако има победител, показва кой е.
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
    //✅Ако няма, показва чий ред е.
  }

  //✅Рендиране на дъската
  return (
    <>
      {/* ✅Показва статуса. */}
      <div className="status">{status}</div>
      <div className="board-row">
        {/* ✅Създава квадратчетата, като всеки Square получава value и onClick функция. */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//✅Главен компонент Game, който управлява играта.
export default function Game() {
  //✅Съхраняване на състояние и съдържа историята на всички ходове, и currentMove определя текущия ход и xIsNext проверява дали X е на ход (ако currentMove е четно число), и currentSquares взема текущото състояние на дъската.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  //✅Функция за обработка на ход.
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //✅Играч направи ход, създава нова версия на history, добавя новото състояние и актуализира currentMove.
  }

  //✅Функция за връщане назад в историята
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //✅Променя currentMove, което връща играта към предишен ход.
  }

  //✅Списък с всички ходове
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
      //✅Генерира бутони за връщане към предишни ходове.
    );
  });

  //✅Рендиране на играта
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    //✅Показва дъската.
    //✅Показва списък с направените ходове.
  );
}

//✅Функция calculateWinner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //✅Проверява всички възможни печеливши комбинации.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //✅Ако има три еднакви символа по линия,
      return squares[a];
      //✅връща победителя ("X" или "O").
    }
  }
  return null;
  //✅Ако няма победител, връща null.
}

// 🏆 Заключение
// 🔹 Използвай един state обект, ако данните са логически свързани.
// 🔹 Разделяй state-а, ако свойствата не зависят едно от друго.
// 🔹 Не дублирай state – ако можеш да изчислиш нещо, направи го извън state-а.
// 🔹 При обновяване на обектен state, винаги използвай spread оператор.

// Искаш ли конкретни примери с твоя код? 😊
