interface ControlsProps {
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
  disabled?: boolean;
}

const Controls = ({ onHit, onStand, onNewGame, disabled = false }: ControlsProps) => {
return (
    <div className="flex flex-col items-center gap-6 mt-8">

      <div className="flex gap-6">
        <button
          onClick={onHit}
          className="px-6 py-3 text-lg bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          disabled={disabled}
        >
          HIT
        </button>
        <button
          onClick={onStand}
          className="px-6 py-3 text-lg bg-red-800 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          disabled={disabled}
        >
          STAND
        </button>
      </div>

      <button
        onClick={onNewGame}
        className="px-6 py-3 text-lg bg-emerald-700 text-white rounded-lg hover:bg-emerald-500"
      >
        NEW GAME
      </button>
    </div>
  );
};

export default Controls;
