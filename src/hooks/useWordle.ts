import { useEffect, useState } from "react";
import { handleFormatGuess, LetterBGColor, LetterRingColor } from "../helpers";
import { HistoryState } from "../components/Game/GameOver/History";
import { KeyInfo, keys, wordsSet } from "../data";
import { toast } from "react-toastify";

export interface LetterGuess {
  input: string;
  bg_color: LetterBGColor;
  ring_color: LetterRingColor;
}

export type RowGuess = LetterGuess[];

export interface GameStatusType {
  isOver: boolean;
  isWinner: boolean;
  guessesUsed: number;
}

const TOTAL_GUESSES = 6;

const useWordle = (word: string) => {
  const [board, setBoard] = useState<Array<RowGuess>>(
    Array.from({ length: TOTAL_GUESSES }, () =>
      Array.from({ length: 5 }, () => ({
        input: "",
        bg_color: "none",
        ring_color: "none",
      }))
    )
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [activeCell, setActiveCell] = useState<[number, number]>([0, 0]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [keysData, setKeysData] = useState<KeyInfo[]>(keys);
  const [gameStatus, setGameStatus] = useState<GameStatusType>({
    isOver: false,
    isWinner: false,
    guessesUsed: 0,
  });

  const isInvalidGuess =
    currentGuess.length === 5 && !wordsSet.has(currentGuess);

  useEffect(() => {
    if (isInvalidGuess) {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[currentTurn].forEach((cell) => (cell.ring_color = "red"));
        return newBoard;
      });
      toast(
        `${currentGuess.toUpperCase()} is an invalid world. Please try again`
      );
    } else {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[currentTurn].forEach((cell) => (cell.ring_color = "none"));
        return newBoard;
      });
    }
  }, [currentGuess, currentTurn, isInvalidGuess]);

  // Save to local storage
  useEffect(() => {
    const history = localStorage.getItem("history");
    if (!isGameOver) return;

    if (history) {
      const parsedHistory: HistoryState = JSON.parse(history);
      const updatedHistory = {
        ...parsedHistory,
        totalGamesPlayed: parsedHistory.totalGamesPlayed + 1,
        totalGamesWon: gameStatus.isWinner
          ? parsedHistory.totalGamesWon + 1
          : parsedHistory.totalGamesWon,
        totalGamesLost: !gameStatus.isWinner
          ? parsedHistory.totalGamesLost + 1
          : parsedHistory.totalGamesLost,
      };

      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } else {
      const initialHistory: HistoryState = {
        totalGamesPlayed: 1,
        totalGamesWon: gameStatus.isWinner ? 1 : 0,
        totalGamesLost: !gameStatus.isWinner ? 1 : 0,
      };

      localStorage.setItem("history", JSON.stringify(initialHistory));
    }
  }, [isGameOver, gameStatus.isWinner, word]);

  const handleGuess = (guessRow: RowGuess) => {
    setIsGameOver(false);
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[currentTurn] = guessRow;
      return newBoard;
    });

    if (currentGuess === word) {
      setGameStatus({ isOver: true, isWinner: true, guessesUsed: currentTurn });
      setIsGameOver(true);
      return;
    }

    if (currentGuess !== word && currentTurn === TOTAL_GUESSES - 1) {
      setGameStatus({
        isOver: true,
        isWinner: false,
        guessesUsed: currentTurn,
      });
      setIsGameOver(true);
    }

    setActiveCell([currentTurn + 1, 0]);
    setGuessHistory((history) => [...history, currentGuess]);
    setCurrentTurn((p) => p + 1);
    setCurrentGuess("");
  };

  const handleKeyup = (e: string): void => {
    const userInput = e.toLowerCase();

    if (userInput === "enter") {
      if (currentGuess.length !== 5) {
        toast("Please complete a word before submitting");
        return;
      }
      if (guessHistory.includes(currentGuess)) {
        toast("You already guessed that word");
        return;
      }
      if (isInvalidGuess) {
        toast(`${currentGuess.toUpperCase()} is an invalid world`);
        return;
      }

      const formattedGuess = handleFormatGuess(word, currentGuess);

      const newKeysData = [...keysData];
      currentGuess.split("").forEach((letter, index) => {
        if (![...word].includes(letter)) {
          const index = newKeysData.findIndex((key) => key.text === letter);
          newKeysData[index].color = "gray";
          return;
        }
        if ([...word].includes(letter)) {
          const index = newKeysData.findIndex((key) => key.text === letter);
          newKeysData[index].color = "yellow";
        }

        if ([...word][index] === letter) {
          const index = newKeysData.findIndex((key) => key.text === letter);
          newKeysData[index].color = "green";
          return;
        }
      });

      setKeysData(newKeysData);

      setActiveCell([currentTurn, currentGuess.length + 1]);
      handleGuess(formattedGuess);
    }

    if (userInput === "backspace") {
      if (currentGuess.length === 0) return;
      setCurrentGuess((prev) => prev.slice(0, -1));
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[currentTurn][currentGuess.length - 1].input = "";

        if (newBoard[currentTurn].some((cell) => cell.ring_color === "red")) {
          newBoard[currentTurn].forEach((cell) => (cell.ring_color = "none"));
        }

        return newBoard;
      });
      setActiveCell([currentTurn, currentGuess.length - 1]);
    }

    if (/^[a-z]$/.test(userInput)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + userInput);
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[currentTurn][currentGuess.length].input = userInput;
          return newBoard;
        });
        setActiveCell([currentTurn, currentGuess.length + 1]);
      }
    }
  };

  return {
    board,
    handleKeyup,
    keysData,
    gameStatus,
    activeCell,
    isInvalidGuess,
    currentGuess,
  };
};

export default useWordle;
