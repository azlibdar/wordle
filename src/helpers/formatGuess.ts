import { RowGuess } from "../hooks/useWordle";

export type LetterBGColor = "gray" | "green" | "yellow" | "none";
export type LetterRingColor = "green" | "red" | "none";

export const handleFormatGuess = (
  word: string,
  currentGuess: string
): RowGuess => {
  const targetWordArray = [...word];
  const userWordArray: RowGuess = [...currentGuess].map((letter) => ({
    input: letter,
    bg_color: "gray" as LetterBGColor,
    ring_color: "none",
  }));

  userWordArray.forEach((obj, i) => {
    if (targetWordArray[i] === obj.input) {
      obj.bg_color = "green";
      targetWordArray[i] = "";
    }
  });

  userWordArray.forEach((obj) => {
    if (targetWordArray.includes(obj.input) && obj.bg_color !== "green") {
      obj.bg_color = "yellow";
    }
  });

  return userWordArray;
};
