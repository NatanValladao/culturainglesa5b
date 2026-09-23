import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { TimerModal } from './components/TimerModal';
import { CulturalCardsSection } from './components/CulturalCardsSection';
import { GrammarSection } from './components/GrammarSection';
import { ListeningSection } from './components/ListeningSection';
import { RolePlaySection } from './components/RolePlaySection';
import { SelSection } from './components/SelSection';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cards');
  const [isBoardMode, setIsBoardMode] = useState<boolean>(false);

  // Classroom timer state
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Classroom league points
  const [leagueScores, setLeagueScores] = useState({
    leagueA: 40,
    leagueB: 45
  });

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            setIsTimerRunning(false);
            sound.playTimerBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const addLeagueScore = (league: 'leagueA' | 'leagueB', pts: number) => {
    setLeagueScores((prev) => ({
      ...prev,
      [league]: prev[league] + pts
    }));
  };

  return (
    <div
      className={`min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col ${
        isBoardMode ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Clean Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBoardMode={isBoardMode}
        setIsBoardMode={setIsBoardMode}
        openTimer={() => setIsTimerOpen(true)}
        timerSecondsLeft={timerSecondsLeft}
        leagueScores={leagueScores}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Simple Masthead Banner */}
        <section className="mb-8 pb-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                Teen Legacy 1 · Track 5B
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Would you mind helping me?
              </h1>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Event coordination, future arrangements & polite requests
            </div>
          </div>
        </section>

        {/* Section View */}
        <div className="transition-all duration-150">
          {activeTab === 'cards' && (
            <CulturalCardsSection
              isBoardMode={isBoardMode}
              addLeagueScore={addLeagueScore}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarSection
              isBoardMode={isBoardMode}
              addLeagueScore={addLeagueScore}
            />
          )}

          {activeTab === 'listening' && (
            <ListeningSection
              isBoardMode={isBoardMode}
              addLeagueScore={addLeagueScore}
            />
          )}

          {activeTab === 'roleplay' && (
            <RolePlaySection
              isBoardMode={isBoardMode}
              addLeagueScore={addLeagueScore}
            />
          )}

          {activeTab === 'sel' && (
            <SelSection isBoardMode={isBoardMode} />
          )}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white text-slate-500 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="font-semibold text-slate-700">Track 5B Interactive Classroom Webapp</span>
          <span>Macmillan Education & Cultura Inglesa</span>
        </div>
      </footer>

      {/* Timer Modal */}
      <TimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        secondsLeft={timerSecondsLeft}
        setSecondsLeft={setTimerSecondsLeft}
        isRunning={isTimerRunning}
        setIsRunning={setIsTimerRunning}
      />
    </div>
  );
}
