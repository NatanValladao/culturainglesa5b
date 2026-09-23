import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FESTIVAL_DIALOGUE, TRUE_FALSE_QUESTIONS, POLITE_REQUESTS_ORDERING } from '../data/lessonData';
import { DialogueLine, PoliteRequestOrderingItem } from '../types';
import { sound, speakText, stopSpeaking } from '../utils/audio';

interface ListeningSectionProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [activeLineId, setActiveLineId] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.92);

  const [userAnswers, setUserAnswers] = useState<Record<string, boolean | null>>({});
  const [showTfResults, setShowTfResults] = useState<boolean>(false);

  const [items, setItems] = useState<PoliteRequestOrderingItem[]>(() =>
    [...POLITE_REQUESTS_ORDERING].sort(() => Math.random() - 0.5)
  );
  const [isSequenceCorrect, setIsSequenceCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const handlePlayLine = (line: DialogueLine) => {
    sound.playTap();
    stopSpeaking();
    setIsPlayingAll(false);
    setActiveLineId(line.id);

    const pitch = line.speaker === 'Emily' ? 1.15 : line.speaker === 'Jake' ? 0.95 : 1.05;
    speakText(`${line.speaker}: ${line.text}`, {
      rate: playbackSpeed,
      pitch,
      onEnd: () => setActiveLineId(null)
    });
  };

  const handleTogglePlayAll = () => {
    if (isPlayingAll) {
      stopSpeaking();
      setIsPlayingAll(false);
      setActiveLineId(null);
      return;
    }
    sound.playTap();
    setIsPlayingAll(true);
    playNext(0);
  };

  const playNext = (i: number) => {
    if (i >= FESTIVAL_DIALOGUE.length) {
      setIsPlayingAll(false);
      setActiveLineId(null);
      return;
    }
    const line = FESTIVAL_DIALOGUE[i];
    setActiveLineId(line.id);
    const pitch = line.speaker === 'Emily' ? 1.15 : line.speaker === 'Jake' ? 0.95 : 1.05;
    speakText(`${line.speaker}: ${line.text}`, {
      rate: playbackSpeed,
      pitch,
      onEnd: () => setTimeout(() => playNext(i + 1), 350)
    });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    sound.playTap();
    const updated = [...items];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setItems(updated);
    setIsSequenceCorrect(null);
  };

  const handleVerifySequence = () => {
    sound.playTap();
    const correct = items.every((item, idx) => item.originalOrder === idx + 1);
    if (correct) {
      sound.playSuccess();
      setIsSequenceCorrect(true);
      try {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#10B981']
        });
      } catch {
        // safe
      }
    } else {
      sound.playTap();
      setIsSequenceCorrect(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            03 · Listening Lab
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            The Festival Dispatch
          </h2>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlayAll}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer ${
              isPlayingAll
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPlayingAll ? '■ Stop Audio' : '▶ Play Dialogue'}
          </button>
          <button
            onClick={() => setPlaybackSpeed((s) => (s === 1.0 ? 0.85 : 1.0))}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            {playbackSpeed}× speed
          </button>
        </div>
      </div>

      {/* Asymmetric Split: Transcript + True/False */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 Cols): Line Cards */}
        <div className="lg:col-span-7 space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
          {FESTIVAL_DIALOGUE.map((line) => {
            const isActive = activeLineId === line.id;
            return (
              <div
                key={line.id}
                onClick={() => handlePlayLine(line)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/60 border-blue-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span
                    className={
                      line.speaker === 'Emily'
                        ? 'text-emerald-600'
                        : line.speaker === 'Jake'
                        ? 'text-amber-600'
                        : 'text-blue-600'
                    }
                  >
                    {line.speaker}
                  </span>
                  {line.isPoliteRequest && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      Polite Request
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-800">
                  “{line.text}”
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column (5 Cols): True / False Board Audit */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
            True or False Comprehension
          </div>

          <div className="space-y-3">
            {TRUE_FALSE_QUESTIONS.map((q, idx) => {
              const ans = userAnswers[q.id];
              const isChecked = showTfResults;
              return (
                <div key={q.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="text-sm font-medium text-slate-800">
                    {idx + 1}. {q.statement}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => {
                        sound.playTap();
                        setUserAnswers((p) => ({ ...p, [q.id]: true }));
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-semibold border transition-all cursor-pointer ${
                        ans === true
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      True
                    </button>
                    <button
                      onClick={() => {
                        sound.playTap();
                        setUserAnswers((p) => ({ ...p, [q.id]: false }));
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-semibold border transition-all cursor-pointer ${
                        ans === false
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      False
                    </button>
                  </div>
                  {isChecked && (
                    <div className="text-xs font-medium text-blue-700 pt-1">
                      {ans === q.isTrue ? '✓ Correct Fact' : '✕ Re-listen to dialogue'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setShowTfResults(true);
            }}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Check Answers
          </button>
        </div>
      </div>

      {/* Activity 5: Sequential Request Cards */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Order the Four Polite Requests (Chronology)
          </span>
          <button
            onClick={handleVerifySequence}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Verify Order
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <span className="font-bold text-sm w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-700 shrink-0">
                {idx + 1}
              </span>
              <div className="flex-1 text-sm font-semibold text-slate-800">
                “{item.quote}”
              </div>
              <button
                onClick={() => {
                  sound.playTap();
                  speakText(item.quote);
                }}
                className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-600 hover:text-blue-600 cursor-pointer shrink-0"
              >
                ▶
              </button>
              <div className="flex gap-1 text-xs shrink-0">
                <button
                  onClick={() => moveItem(idx, 'up')}
                  disabled={idx === 0}
                  className="w-7 h-7 border border-slate-200 bg-white rounded-lg flex items-center justify-center disabled:opacity-20 cursor-pointer hover:bg-slate-100"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveItem(idx, 'down')}
                  disabled={idx === items.length - 1}
                  className="w-7 h-7 border border-slate-200 bg-white rounded-lg flex items-center justify-center disabled:opacity-20 cursor-pointer hover:bg-slate-100"
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>

        {isSequenceCorrect === true && (
          <div className="text-xs font-medium text-emerald-700">
            ✓ Perfect order! Alex decorates → Jake food stalls → Jake list → Alex dance group.
          </div>
        )}
        {isSequenceCorrect === false && (
          <div className="text-xs font-medium text-rose-600">
            ✕ Not quite yet. Who made the first request?
          </div>
        )}
      </div>
    </div>
  );
};
