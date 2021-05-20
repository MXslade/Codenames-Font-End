import React from "react";
import { TeamList } from "./TeamList";
import { IMessageDto } from "../../utils/interfaces";
import { GameBoardCell } from "./GameBoardCell";

interface Props {
  config: IMessageDto;
}

export const GameBoard: React.FC<Props> = ({ config }) => {
  return (
    <div className="w-full h-full grid grid-cols-6 gap-4 p-4 ">
      <div className="col-span-1">
        <TeamList members={config.reds} teamColor="red" cap={config.redsCap} />
      </div>
      <div className="col-span-4 grid grid-cols-5 grid-rows-5 gap-4">
        {config.board.map((cell) => (
          <GameBoardCell key={cell.row + " " + cell.col} cell={cell} />
        ))}
      </div>
      <div className="col-span-1">
        <TeamList
          members={config.blues}
          teamColor="blue"
          cap={config.bluesCap}
        />
      </div>
    </div>
  );
};
