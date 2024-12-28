import { useCallback, useEffect, useState } from "react";
import useWordle from "../../hooks/useWordle";
import Row from "./Row";
import GameOver from "./GameOver/GameOver";
import Keyboard from "./Keyboard/Keyboard";
import Hero from "./Hero";

interface GameProps {
  word: string;
  onNewGame: () => void;
}

const Game = ({ word, onNewGame }: GameProps) => {
  const {
    handleKeyup,
    board,
    activeCell,
    gameStatus,
    keysData,
    isInvalidGuess,
  } = useWordle(word);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (gameStatus.isOver) {
      const timer = setTimeout(() => setShowGameOver(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus.isOver]);

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      handleKeyup(event.key);
    },
    [handleKeyup]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyEvent);
    return () => {
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, [handleKeyEvent]);

  return (
    <>
      {showGameOver && (
        <GameOver
          word={word}
          isOpen={showGameOver}
          onClose={onNewGame}
          gameStatus={gameStatus}
        />
      )}
      <main className="w-full h-full py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4">
          <div className="w-full max-w-[19rem] lg:max-w-md mx-auto grid grid-cols-1 gap-1.5 lg:gap-2">
            {board.map((row, rowIndex) => (
              <Row
                key={rowIndex}
                rowIndex={rowIndex}
                row={row}
                activeCell={activeCell}
              />
            ))}
          </div>
          <div className="w-full flex flex-col">
            <Hero />
            <Keyboard
              onKeyPress={handleKeyup}
              keysData={keysData}
              isInvalidGuess={isInvalidGuess}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Game;
