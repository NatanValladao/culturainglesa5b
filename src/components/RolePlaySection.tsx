import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ROLE_PLAY_SCENARIOS,
  POLITE_REQUEST_FORMULAS,
  POLITE_ACCEPTANCE_PHRASES
} from '../data/lessonData';
import { RolePlayScenario } from '../types';
import { sound, speakText } from '../utils/audio';

interface RolePlaySectionProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const RolePlaySection: React.FC<RolePlaySectionProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [drawKey, setDrawKey] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState(POLITE_ACCEPTANCE_PHRASES[0].phrase);
  const [isStamped, setIsStamped] = useState(false);

  const scenario: RolePlayScenario = ROLE_PLAY_SCENARIOS[scenarioIndex];

  const handleDrawScenario = () => {
    sound.playPaperFlip();
    setScenarioIndex((prev) => (prev + 1) % ROLE_PLAY_SCENARIOS.length);
    setDrawKey((k) => k + 1);
    setIsStamped(false);
  };

  const handleStamp = (league: 'leagueA' | 'leagueB') => {
    sound.playSuccess();
    setIsStamped(true);
    addLeagueScore(league, 15);
    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.6 },
        colors: league === 'leagueA' ? ['#F43F5E', '#3B82F6'] : ['#10B981', '#3B82F6']
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
            04 · Role-Play Workshop
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Polite Requests & Practical Dilemmas
          </h2>
        </div>

        <button
          onClick={handleDrawScenario}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm hover:shadow transition-all cursor-pointer self-start sm:self-auto"
        >
          ⟳ Draw Dilemma Card
        </button>
      </div>

      {/* Target Chunks Strip (Clean Simple Light Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {POLITE_REQUEST_FORMULAS.map((f, i) => (
          <div
            key={i}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1"
          >
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block">
              Pattern 0{i + 1}
            </span>
            <div className="font-bold text-sm text-slate-900">
              {f.pattern}
            </div>
            <div className="text-xs text-slate-500 italic">
              “{f.example}”
            </div>
          </div>
        ))}
      </div>

      {/* Dilemma Stage with Smooth Card Draw Animation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 Cols): Animated Dilemma Card Deck */}
        <div className="lg:col-span-5 space-y-4">
          <div className="perspective-1000">
            <div
              onClick={handleDrawScenario}
              className="relative cursor-pointer hover:scale-[1.01] transition-transform"
              title="Click to draw next dilemma"
            >
              <div className="absolute inset-0 bg-slate-200/70 translate-x-2 translate-y-2 rounded-2xl border border-slate-300/60" />
              <div className="absolute inset-0 bg-slate-100 translate-x-1 translate-y-1 rounded-2xl border border-slate-200" />

              <div
                key={drawKey}
                className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 animate-card-draw shadow-sm min-h-[320px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-slate-400">
                      Dilemma 0{scenarioIndex + 1} of 06
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium text-[11px]">
                      {scenario.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                    {scenario.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {scenario.context}
                  </p>

                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                    <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider block">
                      Mission Goal:
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      {scenario.targetTask}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center text-xs text-slate-400 font-medium">
                  <span>Click card to draw next</span>
                  <span className="text-blue-600 font-semibold">▶ Ready for Role-play</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Role-Play Board Action */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Student 1 Request */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
              Student 1 (The Requester)
            </span>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-lg font-bold text-slate-900">
              “{scenario.suggestedPrompt}”
            </div>
            <button
              onClick={() => {
                sound.playTap();
                speakText(scenario.suggestedPrompt);
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              ▶ Listen to pronunciation
            </button>
          </div>

          {/* Student 2 Reply Options */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Student 2 (The Helper) · Choose Response
            </span>
            <div className="space-y-2">
              {POLITE_ACCEPTANCE_PHRASES.map((p, idx) => {
                const isSelected = selectedResponse === p.phrase;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playTap();
                      setSelectedResponse(p.phrase);
                      speakText(p.phrase);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    “{p.phrase}”
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stamp Approval for Leagues */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleStamp('leagueA')}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                ✓ Award Team A (+15)
              </button>
              <button
                onClick={() => handleStamp('leagueB')}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                ✓ Award Team B (+15)
              </button>
            </div>

            {isStamped && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-fadeIn">
                ★ Dialogue Approved
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
