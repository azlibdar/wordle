import { LetterBGColor } from "../helpers";

export type KeyVariantsColors = LetterBGColor | "static" | "blue" | "red";

export interface KeyInfo {
  text: string;
  color: KeyVariantsColors;
}

export const keys: KeyInfo[] = [
  { text: "q", color: "none" },
  { text: "w", color: "none" },
  { text: "e", color: "none" },
  { text: "r", color: "none" },
  { text: "t", color: "none" },
  { text: "y", color: "none" },
  { text: "u", color: "none" },
  { text: "i", color: "none" },
  { text: "o", color: "none" },
  { text: "p", color: "none" },
  { text: "a", color: "none" },
  { text: "s", color: "none" },
  { text: "d", color: "none" },
  { text: "f", color: "none" },
  { text: "g", color: "none" },
  { text: "h", color: "none" },
  { text: "j", color: "none" },
  { text: "k", color: "none" },
  { text: "l", color: "none" },
  { text: "backspace", color: "static" },
  { text: "z", color: "none" },
  { text: "x", color: "none" },
  { text: "c", color: "none" },
  { text: "v", color: "none" },
  { text: "b", color: "none" },
  { text: "n", color: "none" },
  { text: "m", color: "none" },
  { text: "enter", color: "blue" },
];
