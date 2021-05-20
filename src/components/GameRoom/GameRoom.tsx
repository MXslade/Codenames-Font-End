import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { IGameRoom, IMessageDto, IUser } from "../../utils/interfaces";
import { GameBoard } from "./GameBoard";
import { GameRoomApi } from "../../utils/api";

interface IGameRoomContext {
  reds: IUser[];
  blues: IUser[];
  redCap: IUser | null;
  blueCap: IUser | null;
  config: IMessageDto | null;
  sendUpdatedConfig: (config: IMessageDto) => void;
}

export const GameRoomContext = React.createContext<IGameRoomContext>({
  reds: [],
  blues: [],
  redCap: null,
  blueCap: null,
  config: null,
  sendUpdatedConfig: () => {},
});

export const GameRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [gameRoom, setGameRoom] = useState<IGameRoom>();
  const [messageDto, setMessageDto] = useState<IMessageDto | null>(null);
  const [reds, setReds] = useState<IUser[]>([]);
  const [blues, setBlues] = useState<IUser[]>([]);
  const [redCap, setRedCap] = useState<IUser | null>(null);
  const [blueCap, setBlueCap] = useState<IUser | null>(null);

  const stompClient = useRef<Stomp.Client | null>(null);

  const connect = () => {
    const socket = new SockJS(`http://localhost:8080/game-room/`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame: any) => {
      setIsConnected(true);
      stompClient.current?.subscribe(`/game-broadcaster/${id}`, (response) => {
        // TODO
        // Check the config before updating, because it could cause infinite rerenders!
        if (response.body !== JSON.stringify(messageDto)) {
          setMessageDto(JSON.parse(response.body));
        }
      });
    });
  };

  const getGameRoomData = () => {
    GameRoomApi.getGameRoom(parseInt(id))
      .then((response) => {
        // here I get as response as GameRoom
        // config is still in string format, so first of all I need to convert it to Object and use it later
        setGameRoom(response.data);
        setMessageDto(JSON.parse(response.data.config));
      })
      .catch((error) => {
        alert("Something went wrong while fetching data from server!");
      });
  };

  const sendUpdatedConfig = (config: IMessageDto) => {
    if (stompClient.current) {
      stompClient.current.send(
        `/app/update-config/${id}`,
        {},
        JSON.stringify(config)
      );
    }
  };

  useEffect(() => {
    connect();
    getGameRoomData();
  }, []);

  return (
    <GameRoomContext.Provider
      value={{
        reds,
        blues,
        redCap,
        blueCap,
        config: messageDto,
        sendUpdatedConfig,
      }}
    >
      <div className="flex bg-blue-100" style={{ minHeight: "800px" }}>
        {isConnected && messageDto && <GameBoard config={messageDto} />}
      </div>
    </GameRoomContext.Provider>
  );
};
