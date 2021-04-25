import React, { useContext, useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AuthContext } from "../../App";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

export const GameRoom: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const stompClient = useRef<Stomp.Client | null>(null);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame: any) => {
      setIsConnected(true);
      console.log("Connected: ", frame);
      stompClient.current?.subscribe("/topic/greetings", (greetings) => {
        console.log(greetings);
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

  // useEffect(() => {
  //   if (stompClient) {
  //     stompClient.connect({}, (frame) => {
  //       setIsConnected(true);
  //       //console.log("Connected: ", frame);
  //       stompClient.subscribe(
  //         "http://localhost:8080/topic/greetings",
  //         (message) => {
  //           console.log("Something is happening");
  //           showMessage(JSON.parse(message.body).content);
  //         }
  //       );
  //     });
  //   }
  // }, [stompClient]);

  useEffect(() => {
    connect();
  }, []);

  return (
    <div
      className="flex items-center justify-center bg-yellow-100 flex-col"
      style={{ minHeight: "800px" }}
    >
      {/* {!isAuthenticated ? (
        <SelectingNicknamePanel />
      ) : (
        <div>Actual Game Room</div>
      )} */}
      {isConnected && <div className="text-2xl">Connected</div>}
      <Input
        placeholder="Input some value"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button onClick={handleSubmitClick}>Submit</Button>
    </div>
  );
};
