import React from "react";
import { ICardDto, IGameBoardCell } from "../../utils/interfaces";

interface Props {
  cell: ICardDto;
  // onClick: (cell: IGameBoardCell) => void;
}

export const GameBoardCell: React.FC<Props> = ({ cell }) => {
  return (
    <>
      {!cell.isOpened ? (
        <div
          className="w-full h-32 border border-gray-700 flex items-center justify-center uppercase font-bold p-3 rounded-lg bg-yellow-100"
          // onClick={() => onClick(cell)}
        >
          <div className="w-full h-full border border-black flex items-center justify-center p-2 rounded-lg flex-col">
            <div className="w-full h-full flex items-end mb-1">
              <hr className="w-full bg-gray-500 h-1" />
            </div>
            <div className="w-full h-full bg-white flex items-center justify-center">
              <span>{cell.text}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-32 border-gray-700 flex items-center justify-center uppercase font-bold p-3 rounded-lg">
          {cell.underneath}
        </div>
      )}
    </>
  );
};
