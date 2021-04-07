import React, { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
}

export const Button: React.FC<Props> = (props) => {
  const { className, style } = props;

  return (
    <button
      className={`bg-pink-700 text-white px-6 py-2 rounded-2xl text-lg font-semibold border-white border-2 hover:bg-pink-800 ${
        className ? className : ""
      }`}
      style={style}
    >
      {props.children}
    </button>
  );
};
