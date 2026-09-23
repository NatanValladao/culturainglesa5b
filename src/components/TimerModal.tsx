import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  secondsLeft: number | null;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number | null>>;
  isRunning: boolean;
  setIsRunning: (val: boolean) => void;
}

export const TimerModal: React.FC<TimerModalProps> = ({
  isOpen,
  onClose,
  secondsLeft,
  setSecondsLeft,
  isRunning,
  setIsRunning
}) => {
  const [initialSeconds, setInitialSeconds] = useState<number>(600);

  const presets = [
    { label: '5 min · Wrap-up', seconds: 300 },
    { label: '10 min · Warmer', seconds: 600 },
    { label: '15 min · Practice', seconds: 900 },
    { label: '20 min · Role-Play', seconds: 1200 },
    { label: '25 min · Challenge', seconds: 1500 }
  ];

  const handleSelectPreset = (secs: number) => {
    sound.playTap();
    setInitialSeconds(secs);
    setSecondsLeft(secs);
    setIsRunning(false);
  };

  const toggleRun = () => {
    sound.playTap();
    if (secondsLeft === null || secondsLeft <= 0) {
      setSecondsLeft(initialSeconds);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    sound.playTap();
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  const minutes = Math.floor((secondsLeft ?? initialSeconds) / 60);
  const seconds = (secondsLeft ?? initialSeconds) % 60;
  const progressPercent =
    initialSeconds > 0
      ? Math.max(0, Math.min(100, (((secondsLeft ?? initialSeconds) / initialSeconds) * 100)))
      : 100;

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
              Classroom Pacing
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Stage Timer
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-xs cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Display */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center mb-6 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
          <div className="font-mono text-5xl font-bold text-slate-900 tabular-nums tracking-tight">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Presets */}
        <div className="mb-6 space-y-2">
          <label className="block text-xs font-semibold text-slate-600">
            Select Stage Preset:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.seconds}
                onClick={() => handleSelectPreset(preset.seconds)}
                className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all cursor-pointer ${
                  initialSeconds === preset.seconds && secondsLeft === preset.seconds
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={toggleRun}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer ${
              isRunning
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? 'Pause Timer' : 'Start Timer'}
          </button>
          <button
            onClick={resetTimer}
            className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
