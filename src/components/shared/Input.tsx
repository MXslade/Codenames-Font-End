import React from "react";

interface Props {
  className?: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const Input: React.FC<Props> = ({
  className,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <input
      className={`bg-transparent text-white border-b-2 border-white focus:outline-none focus:border-pink-400 focus:text-pink-800 placeholder-red-200 ${
        className !== undefined ? className : ""
      }`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
