import React from "react";
import { ContainerWithBackground } from "../shared/ContainerWithBackground";
import { Input } from "../shared/Input";

export const SignUp: React.FC = () => {
  return (
    <ContainerWithBackground>
      <h1 className="text-4xl">Sign Up</h1>
      <div
        className="flex flex-col bg-yellow-500 rounded-lg border shadow-xl px-6 py-8 mt-4"
        style={{ width: "400px" }}
      >
        <Input className="mb-8" placeholder="Full Name" />
        <Input className="mb-8" placeholder="Email" />
        <Input className="mb-8" placeholder="Username" />
        <Input className="mb-8" placeholder="Password" type="password" />
        <Input className="mb-8" placeholder="Repeat Password" type="password" />
        <button className="bg-pink-700 text-white px-6 py-2 rounded-2xl text-lg font-semibold border-white border-2 hover:bg-pink-800">
          Submit
        </button>
      </div>
    </ContainerWithBackground>
  );
};
