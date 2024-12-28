import { Delete } from "lucide-react";
import { cn } from "../../../lib/utils";
import { KeyInfo, KeyVariantsColors } from "../../../data";

const keyVariants: Record<KeyVariantsColors, string> = {
  none: "bg-zinc-800 text-zinc-400",
  static: "bg-zinc-600 text-zinc-200",
  blue: "bg-blue-500 text-white",
  yellow: "bg-amber-600 text-zinc-200",
  gray: "bg-zinc-700 text-zinc-200",
  green: "bg-emerald-600 text-zinc-200",
  red: "bg-rose-500 text-zinc-200",
};

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keysData: KeyInfo[];
  isInvalidGuess: boolean;
}

const Keyboard = ({ onKeyPress, keysData, isInvalidGuess }: KeyboardProps) => {
  return (
    <div className="w-full md:max-w-3xl lg:max-w-full md:mx-auto px-2 md:px-6 xl:px-0">
      <div className="grid grid-cols-10 gap-1 lg:px-1.5">
        {keysData.map((key, index) => {
          const isEnterKey = key.text === "enter";
          return (
            <button
              onClick={() => onKeyPress(key.text)}
              key={index}
              disabled={isInvalidGuess && isEnterKey}
              className={cn(
                "h-12 lg:h-14 rounded-md outline-none overflow-hidden font-medium uppercase transition duration-200 select-none active:translate-y-px active:brightness-150",
                isEnterKey
                  ? "col-span-3 text-base lowercase"
                  : "text-base lg:text-lg"
              )}>
              <span
                className={cn(
                  "w-full h-full flex justify-center items-center",
                  (isInvalidGuess && isEnterKey && "bg-rose-500") ||
                    keyVariants[key.color] ||
                    keyVariants.none
                )}>
                {key.text === "backspace" ? (
                  <Delete
                    strokeWidth={1.75}
                    className="text-zinc-200 size-5 lg:size-6"
                  />
                ) : (
                  key.text
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
