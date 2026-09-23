import React from 'react';
import { ActiveTab } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isBoardMode: boolean;
  setIsBoardMode: (val: boolean) => void;
  openTimer: () => void;
  timerSecondsLeft: number | null;
  leagueScores: { leagueA: number; leagueB: number };
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isBoardMode,
  setIsBoardMode,
  openTimer,
  timerSecondsLeft,
  leagueScores
}) => {
  const formatTime = (secs: number | null) => {
    if (secs === null) return 'Timer';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const navItems: { id: ActiveTab; label: string; number: string }[] = [
    { id: 'cards', label: 'Event Cards', number: '1' },
    { id: 'grammar', label: 'Arrangements', number: '2' },
    { id: 'listening', label: 'Audio Lab', number: '3' },
    { id: 'roleplay', label: 'Polite Requests', number: '4' },
    { id: 'sel', label: 'Mind & Stage', number: '5' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Kicker */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white px-2.5 py-1 rounded-lg font-bold text-xs tracking-wider">
            5B
          </div>
          <span className="font-semibold text-slate-800 text-sm hidden sm:inline">
            Would you mind helping me?
          </span>
        </div>

        {/* Minimal Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTap();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className="mr-1.5 text-slate-400 font-mono text-[11px]">{tab.number}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone: Team Scores, Timer & Board Mode */}
        <div className="flex items-center gap-2">
          {/* League Score Badges */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className="bg-rose-50 text-rose-700 border border-rose-200/80 px-2.5 py-1 rounded-lg font-semibold">
              Team A: {leagueScores.leagueA}
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-1 rounded-lg font-semibold">
              Team B: {leagueScores.leagueB}
            </span>
          </div>

          {/* Timer Button */}
          <button
            onClick={() => {
              sound.playTap();
              openTimer();
            }}
            className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer"
          >
            ⏱ {formatTime(timerSecondsLeft)}
          </button>

          {/* Board View Toggle */}
          <button
            onClick={() => {
              sound.playTap();
              setIsBoardMode(!isBoardMode);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isBoardMode
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isBoardMode ? 'Board View: ON' : 'Board View'}
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden overflow-x-auto gap-1.5 pt-2 pb-1 scrollbar-none">
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playTap();
                setActiveTab(tab.id);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
