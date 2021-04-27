import React from "react";
import { IGameBoardCell, IGameBoardConfig } from "../../utils/interfaces";
import { GameBoardCell } from "./GameBoardCell";

interface Props {
  config: IGameBoardConfig;
  sendUpdatedConfig: (config: IGameBoardConfig) => void;
}

export const GameBoard: React.FC<Props> = ({ config, sendUpdatedConfig }) => {
  const handleCellClick = (cell: IGameBoardCell) => {
    const copy = { ...config };
    copy.config[cell.row * 5 + cell.column] = {
      row: cell.row,
      column: cell.column,
      color: "red",
    };
    sendUpdatedConfig(copy);
  };

  return (
    <div className="grid grid-cols-5 w-full h-full">
      {config.config.map((configItem) => (
        <GameBoardCell cell={configItem} onClick={handleCellClick} />
      ))}
    </div>
  );
};
