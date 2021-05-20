import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AuthContext } from "../../App";
import { IGameBoardConfig, IUser } from "../../utils/interfaces";
import { GameBoard } from "./GameBoard";
import { SelectingNicknamePanel } from "./SelectingNicknamePanel";
import { defaultGameBoardConfig } from "../../utils/constants";
import { GameRoomApi } from "../../utils/api";

export const GameRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { isAuthenticated, currentUser } = useContext(AuthContext);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [config, setConfig] = useState<IGameBoardConfig>(
    defaultGameBoardConfig
  );
  const [gameUsers, setGameUsers] = useState<IUser[]>([]);

  const stompClient = useRef<Stomp.Client | null>(null);

  const connect = () => {
    const socket = new SockJS(`http://localhost:8080/game-room/`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame: any) => {
      setIsConnected(true);
      stompClient.current?.subscribe(`/game-broadcaster/${id}`, (response) => {
        const message = JSON.parse(response.body);
        const newConfig = JSON.parse(message.config);
        const userIds = message.userIds;
        setConfig(newConfig);
      });
    });
  };

  const sendUpdatedConfig = (config: IGameBoardConfig) => {
    if (stompClient.current) {
      stompClient.current.send(
        `/app/update-config/${id}`,
        {},
        JSON.stringify({
          gameRoomId: id,
          users: gameUsers.map((gameUserItem) => gameUserItem.id),
          config: JSON.stringify(config),
        })
      );
    }
  };

  const sendUpdatedUserList = (userIds: number[]) => {
    if (stompClient.current) {
      stompClient.current.send(
        `/app/update-config/${id}`,
        {},
        JSON.stringify({
          GameRoomId: id,
          users: userIds,
          config,
        })
      );
    }
  };

  const getGameRoomData = () => {
    GameRoomApi.getGameRoom(parseInt(id))
      .then((response) => {
        if (response.data.config) {
          const newConfig = JSON.parse(response.data.config);
          const newUsers = response.data.users;
          setConfig(newConfig);
          setGameUsers(newUsers);
        }
      })
      .catch((error) => {
        alert("Something went wrong while fetching data from server!");
      });
  };

  useEffect(() => {
    if (currentUser) {
      const ind = gameUsers.findIndex(
        (gameUserItem) => gameUserItem.id === currentUser.id
      );
      if (ind === -1) {
        sendUpdatedUserList(
          [...gameUsers, currentUser].map((gameUserItem) =>
            gameUserItem.id ? gameUserItem.id : -1
          )
        );
      }
    }
  }, [gameUsers]);

  useEffect(() => {
    connect();
    getGameRoomData();
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
    </div>
  );
};
