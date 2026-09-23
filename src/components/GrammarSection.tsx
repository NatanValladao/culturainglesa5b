import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GRAMMAR_EXERCISES, MINGLE_SAMPLE_PLANS } from '../data/lessonData';
import { sound, speakText } from '../utils/audio';

interface GrammarSectionProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [selectedAux, setSelectedAux] = useState('');
  const [selectedGerund, setSelectedGerund] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [minglePlans, setMinglePlans] = useState(MINGLE_SAMPLE_PLANS);
  const [studentName, setStudentName] = useState('');
  const [studentPlan, setStudentPlan] = useState('');

  const current = GRAMMAR_EXERCISES[index];

  const getGerundOptions = (verb: string) => {
    const v = verb.toLowerCase();
    if (v === 'set up') return ['setting up', 'seting up'];
    if (v === 'arrive') return ['arriving', 'arriveing'];
    if (v === 'hang') return ['hanging', 'hanged'];
    if (v === 'meet') return ['meeting', 'meetted'];
    if (v === 'come') return ['coming', 'comeing'];
    if (v === 'finalise') return ['finalising', 'finalised'];
    return [`${v}ing`];
  };

  const handleVerify = () => {
    sound.playTap();
    const answer = `${selectedAux} ${selectedGerund}`.trim().toLowerCase();
    if (answer === current.correctAnswer.toLowerCase()) {
      sound.playSuccess();
      setIsCorrect(true);
      try {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#10B981']
        });
      } catch {
        // safe
      }
    } else {
      sound.playTap();
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    sound.playPaperFlip();
    setSelectedAux('');
    setSelectedGerund('');
    setIsCorrect(null);
    setIndex((prev) => (prev + 1) % GRAMMAR_EXERCISES.length);
    setAnimKey((k) => k + 1);
  };

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPlan.trim()) return;
    sound.playPaperFlip();
    setMinglePlans([
      ...minglePlans,
      { student: studentName.trim(), plan: studentPlan.trim(), time: 'Confirmed' }
    ]);
    setStudentName('');
    setStudentPlan('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            02 · Grammar Practice
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Present Continuous for Fixed Arrangements
          </h2>
        </div>

        {/* Minimalist Formula Callout */}
        <div className="bg-blue-50 text-blue-800 border border-blue-200/80 px-4 py-2 rounded-xl text-xs font-semibold">
          Subject + <strong>am / is / are</strong> + <strong>[verb]-ing</strong>
        </div>
      </div>

      {/* Interactive Sentence Card with Smooth Draw Animation */}
      <div className="perspective-1000">
        <div
          key={animKey}
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 animate-card-draw shadow-sm space-y-6 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3 font-medium">
            <span>QUESTION {index + 1} OF {GRAMMAR_EXERCISES.length}</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-semibold">
              Fixed Timetable
            </span>
          </div>

          {/* Large Board Sentence */}
          <div className="text-center py-6">
            <div
              className={`font-bold text-slate-900 leading-relaxed ${
                isBoardMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}
            >
              {current.subject}{' '}
              <span className="inline-block border-b-2 border-blue-600 px-4 py-0.5 bg-blue-50/50 rounded-t-md min-w-[180px] text-blue-600">
                {selectedAux || selectedGerund ? `${selectedAux} ${selectedGerund}` : '...'}
              </span>{' '}
              {current.sentencePrompt.replace(`${current.subject} [_____] (${current.baseVerb})`, '').trim()}
            </div>
            <div className="text-xs text-slate-500 mt-4">
              Base Verb: <strong className="text-slate-800">{current.baseVerb}</strong> · Clue: <strong className="text-slate-800">{current.timeClue}</strong>
            </div>
          </div>

          {/* Choice Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-2">
                1. Select Auxiliary (be)
              </span>
              <div className="flex gap-2">
                {['am', 'is', 'are'].map((aux) => (
                  <button
                    key={aux}
                    onClick={() => {
                      sound.playTap();
                      setSelectedAux(aux);
                      setIsCorrect(null);
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                      selectedAux === aux
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {aux}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-2">
                2. Select Gerund (-ing)
              </span>
              <div className="flex gap-2">
                {getGerundOptions(current.baseVerb).map((ger) => (
                  <button
                    key={ger}
                    onClick={() => {
                      sound.playTap();
                      setSelectedGerund(ger);
                      setIsCorrect(null);
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                      selectedGerund === ger
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ger}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handleVerify}
                disabled={!selectedAux || !selectedGerund}
                className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-40"
              >
                Verify Answer
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  speakText(`${current.subject} ${current.correctAnswer} ${current.timeClue}`);
                }}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200/70 text-slate-700 rounded-xl text-xs font-medium cursor-pointer"
              >
                ▶ Model Audio
              </button>
            </div>

            <button
              onClick={handleNext}
              className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Next Question →
            </button>
          </div>

          {isCorrect === true && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-800">
              ✓ Correct! Fixed future arrangement with a locked calendar time.
            </div>
          )}
          {isCorrect === false && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-medium text-rose-800">
              ✕ Check verb agreement with "{current.subject}" or the correct spelling.
            </div>
          )}
        </div>
      </div>

      {/* Classroom Mingle Wall */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            03 · Weekend Mingle Board
          </span>
          <span className="text-xs text-slate-500 italic">
            “What are you doing this weekend?”
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {minglePlans.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1"
            >
              <div className="font-semibold text-sm text-slate-900">
                {item.student}
              </div>
              <p className="text-sm text-slate-600">
                “{item.plan}”
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddPlan} className="flex gap-2 pt-2 border-t border-slate-100">
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-36 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="I am visiting my cousins on Saturday afternoon..."
            value={studentPlan}
            onChange={(e) => setStudentPlan(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            + Post Card
          </button>
        </form>
      </div>
    </div>
  );
};
