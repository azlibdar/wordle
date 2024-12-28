import { LetterBGColor, LetterRingColor } from "../../helpers";
import { LetterGuess } from "../../hooks/useWordle";
import { cn } from "../../lib/utils";

interface RowProps {
  row: LetterGuess[];
  rowIndex: number;
  activeCell: [number, number];
}

const CELL_BASE_STYLES = [
  "w-full text-zinc-300 select-none",
  "font-semibold rounded-lg flex justify-center shadow-sm",
  "items-center text-2xl lg:text-4xl uppercase aspect-square",
  "ring-1 ring-inset ring-zinc-700",
];

const BG_COLOR_VARIANTS: Record<LetterBGColor, string> = {
  gray: "bg-zinc-700 ring-0",
  green: "bg-emerald-600 ring-0",
  yellow: "bg-amber-600 ring-0",
  none: "bg-transparent",
};

const RING_COLOR_VARIANTS: Record<LetterRingColor, string> = {
  green: "ring-emerald-600 ring-2",
  red: "ring-rose-500 ring-2",
  none: "",
};

const Row: React.FC<RowProps> = ({ row, rowIndex, activeCell }) => {
  return (
    <div className="w-full grid grid-cols-5 gap-1.5 lg:gap-2">
      {row.map((cell, cellIndex) => (
        <div
          key={`${rowIndex}-${cellIndex}`}
          className={cn(
            ...CELL_BASE_STYLES,
            cell.bg_color && BG_COLOR_VARIANTS[cell.bg_color],
            cell.ring_color && RING_COLOR_VARIANTS[cell.ring_color],
            activeCell[0] === rowIndex &&
              activeCell[1] === cellIndex &&
              "ring-2 ring-emerald-600",
            cell.input && "animate-cell"
          )}>
          {cell.input}
        </div>
      ))}
    </div>
  );
};

export default Row;
