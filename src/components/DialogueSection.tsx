import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FESTIVAL_DIALOGUE, DIALOGUE_FILL_OPTIONS } from '../data/lessonData';
import { DialogueLine } from '../types';
import { sound, speakText, stopSpeaking } from '../utils/audio';

interface DialogueSectionProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const DialogueSection: React.FC<DialogueSectionProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [activeLineId, setActiveLineId] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.92);
  const [rolePlayMask, setRolePlayMask] = useState<'none' | 'Leo' | 'Camila'>('none');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const handlePlayLine = (line: DialogueLine, onDone?: () => void) => {
    sound.playTap();
    setActiveLineId(line.id);

    const pitch = line.speaker === 'Camila' ? 1.15 : 0.95;
    speakText(`${line.speaker}: ${line.text}`, {
      rate: playbackSpeed,
      pitch,
      onEnd: () => {
        if (onDone) {
          onDone();
        } else {
          setActiveLineId(null);
        }
      }
    });
  };

  const handlePlayAll = () => {
    sound.playTap();
    if (isPlayingAll) {
      stopSpeaking();
      setIsPlayingAll(false);
      setActiveLineId(null);
      return;
    }

    setIsPlayingAll(true);
    let index = 0;

    const playNext = () => {
      if (index >= FESTIVAL_DIALOGUE.length) {
        setIsPlayingAll(false);
        setActiveLineId(null);
        return;
      }
      const line = FESTIVAL_DIALOGUE[index];
      index++;
      handlePlayLine(line, playNext);
    };

    playNext();
  };

  const handleValidateRolePlay = (team: 'leagueA' | 'leagueB') => {
    sound.playSuccess();
    setIsCompleted(true);
    addLeagueScore(team, 15);
    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
        colors: team === 'leagueA' ? ['#F43F5E', '#FB7185'] : ['#10B981', '#34D399']
      });
    } catch {
      // safe
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            04 · Practice & Role-Play (Activity 5)
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            “I’ll register for the festival now!”
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Follow Leo and Camila discussing their weekend plans, spontaneous decisions on the spot, and polite requests.
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePlayAll}
            className={`px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-2 ${
              isPlayingAll
                ? 'bg-rose-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <span>{isPlayingAll ? '⏹ Stop Audio' : '▶ Play Full Dialogue'}</span>
          </button>

          <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-xl text-xs">
            <span className="text-slate-400">Speed:</span>
            {[0.85, 0.95, 1.05].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded font-mono font-semibold cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Target Expression Bank Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Activity 5 Target Expressions Box
          </span>
          <span className="text-xs text-slate-400">
            Used to express instant decisions, opinions, and polite requests
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DIALOGUE_FILL_OPTIONS.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => speakText(phrase)}
              className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-semibold text-slate-800 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <span>“{phrase}”</span>
              <span className="text-slate-400 text-[10px]">🔊</span>
            </button>
          ))}
        </div>
      </div>

      {/* Role-Play Mask Selector */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Role-Play Rehearsal Mode:</span>
          <span className="text-slate-500">Hide one speaker's lines to test memory!</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setRolePlayMask('none')}
            className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
              rolePlayMask === 'none' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Show All
          </button>
          <button
            onClick={() => setRolePlayMask('Leo')}
            className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
              rolePlayMask === 'Leo' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Practice as Leo
          </button>
          <button
            onClick={() => setRolePlayMask('Camila')}
            className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
              rolePlayMask === 'Camila' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Practice as Camila
          </button>
        </div>
      </div>

      {/* Dialogue Script Cards */}
      <div className="space-y-3">
        {FESTIVAL_DIALOGUE.map((line) => {
          const isLeo = line.speaker === 'Leo';
          const isActive = activeLineId === line.id;
          const isMasked = rolePlayMask === line.speaker;

          return (
            <div
              key={line.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                isActive
                  ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20'
                  : isLeo
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                {/* Speaker Avatar Badge */}
                <div
                  className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                    isLeo ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                  }`}
                >
                  {line.speaker[0]}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">
                      {line.speaker}
                    </span>
                    {line.targetTag && (
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        line.targetTag === 'Instant Decision'
                          ? 'bg-amber-100 text-amber-800'
                          : line.targetTag === 'Opinion'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        ★ {line.targetTag}
                      </span>
                    )}
                  </div>

                  {isMasked ? (
                    <div className="p-3 bg-slate-200/60 rounded-xl text-xs italic text-slate-500 border border-dashed border-slate-300">
                      [Your turn to speak as {line.speaker} — click "Listen" if you need a reminder]
                    </div>
                  ) : (
                    <p className={`text-slate-800 leading-relaxed font-medium ${
                      isBoardMode ? 'text-base sm:text-lg' : 'text-sm'
                    }`}>
                      {line.text}
                    </p>
                  )}
                </div>
              </div>

              {/* Single Line Audio Trigger */}
              <button
                onClick={() => handlePlayLine(line)}
                className="self-end sm:self-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>🔊 Listen</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Classroom Role-Play Validation */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-slate-900">
            Student Pair Role-Play Performance
          </h4>
          <p className="text-xs text-slate-500">
            Pairs act out the dialogue to the class with personal adjustments. Award points upon completion!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleValidateRolePlay('leagueA')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Award Team A (+15 pts)
          </button>
          <button
            onClick={() => handleValidateRolePlay('leagueB')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Award Team B (+15 pts)
          </button>
        </div>
      </div>
    </div>
  );
};
