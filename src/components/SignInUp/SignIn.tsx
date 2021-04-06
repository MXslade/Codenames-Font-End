import React, { useState } from "react";
import { ContainerWithBackground } from "../shared/ContainerWithBackground";
import { Input } from "../shared/Input";

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <ContainerWithBackground>
      <h1 className="text-4xl">Sign In</h1>
      <div
        className="flex flex-col bg-yellow-500 rounded-lg border shadow-xl px-6 py-8 mt-4"
        style={{ width: "400px" }}
      >
        <Input
          className="mb-8"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          className="mb-8"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="bg-pink-700 text-white px-6 py-2 rounded-2xl text-lg font-semibold border-white border-2 hover:bg-pink-800">
          Submit
        </button>
      </div>
    </ContainerWithBackground>
  );
};
