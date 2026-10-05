import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GRAMMAR_EXERCISES } from '../data/lessonData';
import { sound, speakText } from '../utils/audio';

interface LanguageLabProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const LanguageLabSection: React.FC<LanguageLabProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredExercises = activeFilter === 'all'
    ? GRAMMAR_EXERCISES
    : GRAMMAR_EXERCISES.filter((item) => item.category === activeFilter);

  const handleSelectOption = (exerciseId: string, option: string) => {
    sound.playTap();
    setSelectedAnswers((prev) => ({ ...prev, [exerciseId]: option }));
  };

  const handleValidate = (team: 'leagueA' | 'leagueB') => {
    sound.playSuccess();
    setShowResults(true);

    let correctCount = 0;
    GRAMMAR_EXERCISES.forEach((ex) => {
      if (selectedAnswers[ex.id] === ex.correctAnswer) {
        correctCount++;
      }
    });

    if (correctCount >= 4) {
      addLeagueScore(team, 15);
      try {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { y: 0.6 },
          colors: team === 'leagueA' ? ['#F43F5E', '#FB7185'] : ['#10B981', '#34D399']
        });
      } catch {
        // safe
      }
    }
  };

  const handleReset = () => {
    sound.playTap();
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            03 · Language Discovery & Level Up!
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Instant Decisions vs. Future Plans
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Master the difference between spontaneous choices made on the spot (<span className="font-semibold text-blue-600">will</span>), pre-arranged plans (<span className="font-semibold text-blue-600">be going to</span>), and sensory impressions (<span className="font-semibold text-blue-600">looks, sounds, seems</span>).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          ⟳ Reset Drills
        </button>
      </div>

      {/* Systematic Rule Cards (3 Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rule 1: Instant Decisions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100/70 px-2 py-0.5 rounded">
              ⚡ Decision on the spot
            </span>
            <span className="text-xs text-slate-400 font-mono">Future</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">
            "Will" / "'ll" (Instant Decision)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Used when you decide <strong className="text-slate-900">at the very moment of speaking</strong> without a prior plan.
          </p>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
            <div>“I haven’t registered yet... <span className="font-bold text-blue-600">I’ll register now!</span>”</div>
            <div className="text-[10px] text-slate-500 font-sans italic">Spontaneous decision made this second.</div>
          </div>
        </div>

        {/* Rule 2: Pre-arranged Plans */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-100/70 px-2 py-0.5 rounded">
              📅 Pre-arranged Plan
            </span>
            <span className="text-xs text-slate-400 font-mono">Arrangement</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">
            "Be going to" / Present Continuous
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Used for intentions, schedules, or events <strong className="text-slate-900">already decided beforehand</strong>.
          </p>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
            <div>“We <span className="font-bold text-indigo-600">are going to attend</span> the mural on Saturday.”</div>
            <div className="text-[10px] text-slate-500 font-sans italic">We already made the plan days ago.</div>
          </div>
        </div>

        {/* Rule 3: Sensory Impressions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/70 px-2 py-0.5 rounded">
              👁️ Perception & Opinions
            </span>
            <span className="text-xs text-slate-400 font-mono">Sensory</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Looks · Sounds · Seems to be
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Expresses opinions based on visual evidence (<strong className="text-slate-900">looks</strong>) or audio evidence (<strong className="text-slate-900">sounds</strong>).
          </p>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
            <div>“That mural <span className="font-bold text-emerald-600">looks incredible</span>! The band <span className="font-bold text-emerald-600">sounds great</span>.”</div>
            <div className="text-[10px] text-slate-500 font-sans italic">Impressions based on eyes & ears.</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-semibold text-slate-500 mr-1">Filter Practice:</span>
        {[
          { id: 'all', label: 'All Exercises (6)' },
          { id: 'instant_decision', label: 'Instant Decisions (will)' },
          { id: 'plan', label: 'Pre-arranged Plans' },
          { id: 'opinion', label: 'Perceptions & Opinions' },
          { id: 'polite_request', label: 'Polite Requests' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => {
              sound.playTap();
              setActiveFilter(f.id);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === f.id
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExercises.map((ex, idx) => {
          const userChoice = selectedAnswers[ex.id];
          const isCorrect = userChoice === ex.correctAnswer;

          return (
            <div
              key={ex.id}
              className={`p-5 rounded-2xl border transition-all space-y-3.5 ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-rose-50/40 border-rose-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {ex.ruleTag}
                </span>
                <button
                  onClick={() => speakText(ex.prompt.replace('________', ex.correctAnswer))}
                  className="text-xs text-slate-400 hover:text-blue-600 font-medium cursor-pointer"
                  title="Listen to complete sentence"
                >
                  🔊 Listen
                </button>
              </div>

              <p className="font-semibold text-slate-800 text-sm leading-relaxed">
                {ex.prompt}
              </p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2">
                {ex.options.map((opt) => {
                  const isSelected = userChoice === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(ex.id, opt)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Rule Note */}
              {showResults && (
                <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1.5">
                    <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                      {isCorrect ? '✓ Correct Choice!' : `✗ Incorrect (Correct: "${ex.correctAnswer}")`}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {ex.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation Buttons */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-500 font-medium">
          Choose answers for all displayed items, then submit to earn league points.
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleValidate('leagueA')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Validate for Team A (+15 pts)
          </button>
          <button
            onClick={() => handleValidate('leagueB')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Validate for Team B (+15 pts)
          </button>
        </div>
      </div>
    </div>
  );
};
