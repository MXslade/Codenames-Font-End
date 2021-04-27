import React, { useContext, useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AuthContext } from "../../App";
import { IGameBoardConfig } from "../../utils/interfaces";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { GameBoard } from "./GameBoard";
import { SelectingNicknamePanel } from "./SelectingNicknamePanel";
import { defaultGameBoardConfig } from "../../utils/constants";

export const GameRoom: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [config, setConfig] = useState<IGameBoardConfig>(
    defaultGameBoardConfig
  );

  const stompClient = useRef<Stomp.Client | null>(null);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/game-room");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame: any) => {
      setIsConnected(true);
      console.log("Connected: ", frame);
      stompClient.current?.subscribe("/game-broadcaster", (response) => {
        const message = JSON.parse(response.body);
        const newConfig = JSON.parse(message.content);
        setConfig(newConfig);
      });
    });
  };

  const showMessage = (content: string) => {
    console.log("Content WWS: ", content);
  };

  const handleSubmitClick = () => {
    if (stompClient.current) {
      stompClient.current.send(
        "/app/hello",
        {},
        JSON.stringify({ name: message })
      );
    }
  };

  const sendUpdatedConfig = (config: IGameBoardConfig) => {
    if (stompClient.current) {
      stompClient.current.send(
        "/app/update-config",
        {},
        JSON.stringify({ name: "test", content: JSON.stringify(config) })
      );
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div
      className="flex items-center justify-center bg-yellow-100 flex-col"
      style={{ minHeight: "800px" }}
    >
      {!isAuthenticated ? (
        <SelectingNicknamePanel />
      ) : (
        <>
          {isConnected && (
            <GameBoard config={config} sendUpdatedConfig={sendUpdatedConfig} />
          )}
        </>
      )}
      {/* {isConnected && <div className="text-2xl">Connected</div>}
      <Input
        placeholder="Input some value"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button onClick={handleSubmitClick}>Submit</Button> */}
    </div>
  );
};
