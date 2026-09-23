import React, { useState, useEffect } from 'react';
import { SEL_STRATEGIES } from '../data/lessonData';
import { SelStrategy } from '../types';
import { sound } from '../utils/audio';

interface SelSectionProps {
  isBoardMode: boolean;
}

export const SelSection: React.FC<SelSectionProps> = ({ isBoardMode }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCount, setBreathCount] = useState(4);
  const [activeStrategy, setActiveStrategy] = useState<SelStrategy>(SEL_STRATEGIES[1]);
  const [ticketStamped, setTicketStamped] = useState(false);

  const emotions = [
    'Butterflies in stomach',
    'Mind goes blank',
    'Speaking too fast',
    'Fear of mistakes',
    'Calm & Focused'
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathing) {
      timer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev > 1) return prev - 1;
          setBreathPhase((curr) => {
            if (curr === 'Inhale') return 'Hold';
            if (curr === 'Hold') return 'Exhale';
            if (curr === 'Exhale') return 'Rest';
            return 'Inhale';
          });
          return 4;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing]);

  const toggleBreathing = () => {
    sound.playTap();
    if (!isBreathing) {
      setBreathPhase('Inhale');
      setBreathCount(4);
    }
    setIsBreathing(!isBreathing);
  };

  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
          05 · Socio-Emotional Reflection
        </span>
        <h2
          className={`font-bold tracking-tight text-slate-900 ${
            isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          Mind, Stage & Asking for Help
        </h2>
      </div>

      {/* Emotion Check-in */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          Before speaking in front of the class, I often feel:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {emotions.map((em, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playTap();
                setSelectedEmotion(idx);
              }}
              className={`p-4 text-center rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                selectedEmotion === idx
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {em}
            </button>
          ))}
        </div>
      </div>

      {/* 4-4-4 Box Breathing Visualizer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
          The 4-4-4 Box Breath · 1-Minute Reset
        </span>

        {/* Minimalist Breathing Box */}
        <div className="w-48 h-48 mx-auto flex items-center justify-center border border-slate-200 bg-slate-50 rounded-2xl relative my-6">
          <div
            className="w-36 h-36 border-2 border-blue-500 bg-blue-50/70 rounded-xl flex flex-col items-center justify-center transition-all duration-1000"
            style={{
              transform:
                breathPhase === 'Inhale'
                  ? 'scale(1.08)'
                  : breathPhase === 'Hold'
                  ? 'scale(1.0)'
                  : breathPhase === 'Exhale'
                  ? 'scale(0.72)'
                  : 'scale(0.78)'
            }}
          >
            <div className="font-bold text-5xl text-slate-900 tabular-nums">
              {breathCount}
            </div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1">
              {breathPhase}
            </div>
          </div>
        </div>

        <button
          onClick={toggleBreathing}
          className={`py-3 px-8 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
            isBreathing
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
          }`}
        >
          {isBreathing ? '■ Pause Reset' : '▶ Start Breathing Exercise'}
        </button>
      </div>

      {/* 4 Clean Resilience Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SEL_STRATEGIES.map((st) => (
          <div
            key={st.id}
            onClick={() => {
              sound.playPaperFlip();
              setActiveStrategy(st);
            }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
              activeStrategy.id === st.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-base">{st.title}</div>
            <p className={`text-xs leading-relaxed ${activeStrategy.id === st.id ? 'text-blue-100' : 'text-slate-500'}`}>
              “{st.quote}”
            </p>
          </div>
        ))}
      </div>

      {/* Minimal Exit Stamp */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Lesson Core Takeaway
          </span>
          <div className="font-semibold text-base sm:text-lg text-slate-900">
            “Asking for help is not giving up; it is refusing to give up.”
          </div>
        </div>

        <button
          onClick={() => {
            sound.playSuccess();
            setTicketStamped(true);
          }}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
        >
          {ticketStamped ? '✓ Reflection Stamped' : 'Stamp Lesson Exit'}
        </button>
      </div>
    </div>
  );
};
