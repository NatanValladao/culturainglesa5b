import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FESTIVAL_WEBSITE, TRUE_FALSE_QUESTIONS } from '../data/lessonData';
import { sound, speakText } from '../utils/audio';

interface FestivalHubProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const FestivalHubSection: React.FC<FestivalHubProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [activeTabMode, setActiveTabMode] = useState<'schedule' | 'quiz'>('schedule');
  const [skimChecked, setSkimChecked] = useState<Record<string, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean | null>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [highlightedText, setHighlightedText] = useState<string | null>(null);

  const skimPrompts = [
    { id: 'dates', label: 'When and where does the festival happen?', detail: 'Oct 18–19 at São Paulo Creative Arts Hub' },
    { id: 'types', label: 'What kinds of arts and activities are featured?', detail: 'Live street art murals, Pilolo urban dance, ceramics, acoustic concerts' },
    { id: 'cost', label: 'How much does it cost for secondary students?', detail: 'Free admission with student ID badge' },
    { id: 'register', label: 'How can students sign up for workshops?', detail: 'Early registration on the online student portal' }
  ];

  const handleToggleSkim = (id: string) => {
    sound.playTap();
    setSkimChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAnswerTf = (questionId: string, answer: boolean) => {
    sound.playTap();
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleCheckQuiz = (team: 'leagueA' | 'leagueB') => {
    sound.playSuccess();
    setShowFeedback(true);
    let correctCount = 0;
    TRUE_FALSE_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.isTrue) {
        correctCount++;
      }
    });

    if (correctCount >= 4) {
      addLeagueScore(team, 15);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: team === 'leagueA' ? ['#F43F5E', '#FB7185'] : ['#10B981', '#34D399']
        });
      } catch {
        // safe
      }
    }
  };

  const handleResetQuiz = () => {
    sound.playTap();
    setUserAnswers({});
    setShowFeedback(false);
    setHighlightedText(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            02 · Language Discovery & Instant Practice (15 min)
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Youth Arts Festival Web Portal
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Skim the official festival webpage to extract core information, then verify statements in the True/False lab.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => {
              sound.playTap();
              setActiveTabMode('schedule');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'schedule'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌐 Festival Program & Skim
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setActiveTabMode('quiz');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'quiz'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✓ True / False Comprehension
          </button>
        </div>
      </div>

      {activeTabMode === 'schedule' ? (
        <div className="space-y-6">
          {/* Skim Fast-Check Strip (Activity 2) */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Activity 2: Skim Guide
                </span>
                <span className="text-xs text-blue-700">
                  (Don’t read every word! Scan headings and key details)
                </span>
              </div>
              <span className="text-xs font-semibold text-blue-600">
                {Object.values(skimChecked).filter(Boolean).length} / {skimPrompts.length} verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {skimPrompts.map((item) => {
                const isChecked = !!skimChecked[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleSkim(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-white border-blue-400 shadow-xs ring-1 ring-blue-400'
                        : 'bg-white/70 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-800">
                        {isChecked ? '✓ Discovered' : '○ Scan target'}
                      </span>
                      <span className="text-xs">{isChecked ? '🔍' : '❓'}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-700 mb-1 leading-snug">
                      {item.label}
                    </div>
                    {isChecked && (
                      <div className="text-[11px] text-blue-800 font-semibold bg-blue-50 p-1.5 rounded animate-fadeIn">
                        {item.detail}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Festival Website Browser Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Fake Browser Top Bar */}
            <div className="bg-slate-800 px-4 py-3 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
                <div className="ml-3 font-mono bg-slate-900/80 px-3 py-1 rounded text-[11px] text-slate-300 border border-slate-700">
                  https://youthartsfestival.sp.org.br
                </div>
              </div>
              <div className="font-semibold text-slate-400 hidden sm:block">
                Teen Legacy 1 · Journey 2
              </div>
            </div>

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8">
              <div className="max-w-3xl space-y-3">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-amber-300">
                  Annual Cultural Event
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {FESTIVAL_WEBSITE.name}
                </h1>
                <p className="text-base sm:text-lg text-blue-100 font-medium">
                  {FESTIVAL_WEBSITE.tagline}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-blue-200">
                  <div className="flex items-center gap-1.5">
                    <span>📅</span>
                    <span className="font-semibold text-white">{FESTIVAL_WEBSITE.dates}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>📍</span>
                    <span className="font-semibold text-white">{FESTIVAL_WEBSITE.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>🎟️</span>
                    <span className="font-semibold text-emerald-300">{FESTIVAL_WEBSITE.admission}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcement Callout */}
            <div className="bg-amber-50 border-y border-amber-200 px-6 py-3 text-xs sm:text-sm text-amber-900 font-semibold flex items-center justify-between gap-3">
              <span>{FESTIVAL_WEBSITE.announcement}</span>
              <button
                onClick={() => speakText(FESTIVAL_WEBSITE.announcement)}
                className="text-xs text-amber-800 hover:text-amber-950 font-bold shrink-0 cursor-pointer"
              >
                🔊 Read
              </button>
            </div>

            {/* Schedule & Highlights Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900">
                  Festival Highlights & Timetable
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  4 Featured Zones
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FESTIVAL_WEBSITE.schedules.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                        {item.time}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {item.venue}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-indigo-700 font-semibold">
                        ★ {item.highlight}
                      </span>
                      <button
                        onClick={() => speakText(`${item.title}. ${item.description}`)}
                        className="text-slate-400 hover:text-blue-600 font-medium cursor-pointer"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* How to Register Strip */}
              <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm sm:text-base text-amber-400 uppercase tracking-wider">
                    How to Register in 4 Steps
                  </h4>
                  <span className="text-xs text-slate-400">Online Student Pass Portal</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {FESTIVAL_WEBSITE.registrationSteps.map((step, idx) => (
                    <div key={idx} className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-1">
                      <span className="font-mono text-amber-400 font-bold block text-[11px]">
                        Step 0{idx + 1}
                      </span>
                      <p className="text-slate-200 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* True / False Quiz Lab (Activity 3) */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Activity 3: Read & Decide (True or False)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Check whether each statement is supported by the festival web page text.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Reset Answers
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {TRUE_FALSE_QUESTIONS.map((q, idx) => {
              const currentChoice = userAnswers[q.id];
              const isCorrect = currentChoice === q.isTrue;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all space-y-3 ${
                    showFeedback
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-rose-300 bg-rose-50/40'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        Statement 0{idx + 1}
                      </span>
                      <p className="font-semibold text-slate-900 text-sm leading-relaxed">
                        “{q.statement}”
                      </p>
                    </div>

                    {/* True / False Toggles */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAnswerTf(q.id, true)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          currentChoice === true
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        True (T)
                      </button>
                      <button
                        onClick={() => handleAnswerTf(q.id, false)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          currentChoice === false
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        False (F)
                      </button>
                    </div>
                  </div>

                  {/* Feedback and Evidence Reveal */}
                  {showFeedback && (
                    <div className="pt-3 border-t border-slate-200/60 text-xs space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {isCorrect ? '✓ Correct!' : `✗ Incorrect (Correct answer: ${q.isTrue ? 'True' : 'False'})`}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-600 font-medium">
                          {q.justification}
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700">
                        <span className="font-bold text-blue-700 mr-1.5">Evidence quote:</span>
                        “{q.evidenceQuote}”
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Validation & Scoring Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              Answer all 5 questions, then validate for your team score.
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCheckQuiz('leagueA')}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                Validate for Team A (+15 pts)
              </button>
              <button
                onClick={() => handleCheckQuiz('leagueB')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                Validate for Team B (+15 pts)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
