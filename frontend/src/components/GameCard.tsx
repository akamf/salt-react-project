import { Link } from "@tanstack/react-router";
import React from "react";

type GameCardProps = {
  to?: string;
  title: string;
  description: string;
  icon?: string;
  disabled?: boolean;
};

const GameCard: React.FC<GameCardProps> = ({
  to,
  title,
  description,
  icon,
  disabled = false,
}) => {
  const content = (
    <div
      className={`rounded-lg p-6 shadow-lg transition transform ${
        disabled
          ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60 relative"
          : "bg-gray-950 text-white hover:bg-gray-900 hover:scale-105"
      }`}
    >
      <h3 className="text-xl font-bold mb-2">
        {icon && <span className="mr-1">{icon}</span>}
        {title}
      </h3>
      <p className="text-sm">{description}</p>
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-300 font-semibold opacity-0 hover:opacity-100 transition bg-black/60 rounded-lg">
          Coming soon...
        </div>
      )}
    </div>
  );

  return disabled || !to ? <div>{content}</div> : <Link to={to}>{content}</Link>;
};

export default GameCard;
