import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ARTS_FESTIVAL_CHALLENGES } from '../data/lessonData';
import { ChallengeScenario } from '../types';
import { sound, speakText } from '../utils/audio';

interface FestivalChallengeProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const FestivalChallengeSection: React.FC<FestivalChallengeProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showModels, setShowModels] = useState<boolean>(false);
  const [challengeTimer, setChallengeTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const scenario: ChallengeScenario = ARTS_FESTIVAL_CHALLENGES[currentIndex];

  // 15-second round countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && challengeTimer !== null && challengeTimer > 0) {
      timer = setInterval(() => {
        setChallengeTimer((prev) => {
          if (prev === null || prev <= 1) {
            setIsTimerRunning(false);
            sound.playTimerBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, challengeTimer]);

  const handleDrawOrSpin = () => {
    sound.playPaperFlip();
    setIsSpinning(true);
    setShowModels(false);
    setIsTimerRunning(false);
    setChallengeTimer(null);

    // Randomize to a different card
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * ARTS_FESTIVAL_CHALLENGES.length);
      if (nextIndex === currentIndex) {
        nextIndex = (currentIndex + 1) % ARTS_FESTIVAL_CHALLENGES.length;
      }
      setCurrentIndex(nextIndex);
      setIsSpinning(false);
      speakText(ARTS_FESTIVAL_CHALLENGES[nextIndex].situation);
    }, 350);
  };

  const handleStartTimer = () => {
    sound.playTap();
    setChallengeTimer(15);
    setIsTimerRunning(true);
  };

  const handleScore = (team: 'leagueA' | 'leagueB', points: number) => {
    sound.playSuccess();
    addLeagueScore(team, points);
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
            05 · Multiplayer Challenge (Activity 6)
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            The Arts Festival Challenge!
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Draw a real-world scenario card. Students respond immediately with an <span className="font-semibold text-amber-600">instant decision (will)</span>, an <span className="font-semibold text-blue-600">opinion (looks/sounds/seems)</span>, or a <span className="font-semibold text-purple-600">polite request</span>!
          </p>
        </div>

        {/* Draw & Spinner Action */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={handleDrawOrSpin}
            disabled={isSpinning}
            className={`px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2 ${
              isSpinning ? 'animate-pulse opacity-75' : ''
            }`}
          >
            <span>🎲 {isSpinning ? 'Selecting Card...' : 'Spin / Draw Next Card'}</span>
          </button>
        </div>
      </div>

      {/* Main Challenge Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Active Challenge Card */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-6 sm:p-8 rounded-3xl border-2 bg-white shadow-sm transition-all space-y-6 ${
              scenario.badgeColor
            }`}
          >
            {/* Top Badge Strip */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg bg-white/80 border border-current shadow-2xs">
                Card #{currentIndex + 1} of {ARTS_FESTIVAL_CHALLENGES.length}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white shadow-2xs">
                {scenario.requiredFunction}
              </span>
            </div>

            {/* Scenario Title & Narrative */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {scenario.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-semibold bg-white/80 p-5 rounded-2xl border border-current shadow-2xs">
                “{scenario.situation}”
              </p>
            </div>

            {/* Audio & Quick Action Prompt */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => speakText(scenario.situation)}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>🔊 Read Scenario Aloud</span>
              </button>

              <div className="text-xs font-mono font-semibold text-slate-600">
                Grammar pattern: <span className="font-bold underline">{scenario.grammarChunk}</span>
              </div>
            </div>

            {/* Teacher Model Answers Accordion */}
            <div className="pt-4 border-t border-slate-200/80 space-y-2">
              <button
                onClick={() => {
                  sound.playTap();
                  setShowModels(!showModels);
                }}
                className="text-xs font-bold text-slate-700 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{showModels ? '▼ Hide Model Responses' : '▶ Reveal Model Student Responses'}</span>
              </button>

              {showModels && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700 animate-fadeIn">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                    Acceptable target structures:
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4">
                    {scenario.exampleAnswers.map((ans, idx) => (
                      <li key={idx} className="leading-snug">
                        <span className="font-medium">“{ans}”</span>
                        <button
                          onClick={() => speakText(ans)}
                          className="ml-2 text-[10px] text-blue-600 hover:underline cursor-pointer"
                        >
                          🔊
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 15-Second Pressure Timer & Quick Point Buttons */}
        <div className="lg:col-span-5 space-y-5">
          {/* Rapid Response Timer Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                15-Second Response Timer
              </span>
              <span className="text-xs text-slate-400">Classroom Clock</span>
            </div>

            <div className="py-2">
              <div
                className={`text-5xl sm:text-6xl font-extrabold font-mono transition-colors ${
                  challengeTimer !== null && challengeTimer <= 5
                    ? 'text-rose-600 animate-pulse'
                    : 'text-slate-900'
                }`}
              >
                {challengeTimer === null ? '15s' : `${challengeTimer}s`}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {isTimerRunning
                  ? 'Time is ticking! Student must formulate their answer!'
                  : 'Start countdown when student begins speaking'}
              </p>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={handleStartTimer}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                ⏱ Start 15s Timer
              </button>
              {challengeTimer !== null && (
                <button
                  onClick={() => {
                    sound.playTap();
                    setIsTimerRunning(false);
                    setChallengeTimer(null);
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* League Scoring Hub */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
              Award Round Score to Teams
            </h4>

            <div className="space-y-3">
              {/* Team A Actions */}
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-rose-900 block">Team A</span>
                  <span className="text-[11px] text-rose-700">Good structure & pronunciation</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleScore('leagueA', 10)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs cursor-pointer"
                  >
                    +10 pts
                  </button>
                  <button
                    onClick={() => handleScore('leagueA', 20)}
                    className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                  >
                    +20 pts!
                  </button>
                </div>
              </div>

              {/* Team B Actions */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-emerald-900 block">Team B</span>
                  <span className="text-[11px] text-emerald-700">Good structure & pronunciation</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleScore('leagueB', 10)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs cursor-pointer"
                  >
                    +10 pts
                  </button>
                  <button
                    onClick={() => handleScore('leagueB', 20)}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                  >
                    +20 pts!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
