import React from "react";
import { IGameBoardCell } from "../../utils/interfaces";

interface Props {
  cell: IGameBoardCell;
  onClick: (cell: IGameBoardCell) => void;
}

export const GameBoardCell: React.FC<Props> = ({ cell, onClick }) => {
  return (
    <div
      className="w-full h-36 border border-black flex items-center justify-center"
      style={{ backgroundColor: cell.color }}
      onClick={() => onClick(cell)}
    >
      {cell.row} : {cell.column}
    </div>
  );
};
