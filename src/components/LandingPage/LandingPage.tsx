import React from "react";
import { ContainerWithBackground } from "../shared/ContainerWithBackground";

export const LandingPage: React.FC = () => {
  return (
    <ContainerWithBackground>
      <span
        className="uppercase text-8xl font-bold"
        style={{ textShadow: "4px 3px #ff0000" }}
      >
        codenames
      </span>

      <span className="uppercase text-7xl font-semibold bg-gradient-to-r from-yellow-400 to-white text-transparent bg-clip-text">
        online
      </span>

      <span
        className="mt-8 text-3xl font-semibold"
        style={{ WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "black" }}
      >
        Play with your friends.
      </span>

      <button className="mt-8 uppercase text-3xl font-bold p-2 rounded-lg shadow-lg bg-gradient-to-r from-yellow-300 to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-300">
        create game
      </button>

      <div className="flex mt-auto w-full justify-between">
        <div
          className="h-full w-1/4 border-dashed flex justify-center items-center text-2xl px-4"
          style={{ height: "400px" }}
        >
          <img
            src="https://media1.tenor.com/images/f675e2010ff762d5aea381cbe07940cf/tenor.gif?itemid=13706133"
            className="w-full h-full"
            alt="left"
          />
        </div>

        <div className="flex flex-col items-start bg-yellow-300 rounded-2xl p-4 mt-auto">
          <span className="text-2xl font-medium text-pink-700">
            How to play:
          </span>
          <ol className="list-decimal list-inside text-black">
            <li>Click on the CREATE GAME button.</li>
            <li>Select the preferred game settings and start the game.</li>
            <li>
              Connect with your friends using your favorite audio or video chat.
            </li>
            <li>Share the room URL with your friends.</li>
            <li>Enjoy the game!</li>
          </ol>
        </div>

        <div className="h-full w-1/4 border-dashed flex justify-center items-center text-2xl px-4">
          <img
            src="https://media1.tenor.com/images/ef7726e72859cda6b10b8b5f78b27b1f/tenor.gif?itemid=12587122"
            className="w-full h-full"
            alt="right"
          />
        </div>
      </div>
    </ContainerWithBackground>
  );
};
