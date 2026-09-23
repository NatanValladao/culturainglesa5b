import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CULTURAL_EVENT_CARDS } from '../data/lessonData';
import { EventCard } from '../types';
import { sound, speakText } from '../utils/audio';

interface CulturalCardsSectionProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const CulturalCardsSection: React.FC<CulturalCardsSectionProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [drawKey, setDrawKey] = useState<number>(0);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [selectedResponse, setSelectedResponse] = useState<string>('');

  const currentCard: EventCard = CULTURAL_EVENT_CARDS[cardIndex];

  const handleDrawCard = () => {
    sound.playPaperFlip();
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
      setCardIndex((prev) => (prev + 1) % CULTURAL_EVENT_CARDS.length);
      setDrawKey((k) => k + 1);
      setSelectedResponse('');
    }, 150);
  };

  const handlePickResponse = (text: string) => {
    sound.playTap();
    setSelectedResponse(text);
    speakText(text);
  };

  const handleScore = (team: 'leagueA' | 'leagueB') => {
    sound.playSuccess();
    addLeagueScore(team, 10);
    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.6 },
        colors: team === 'leagueA' ? ['#F43F5E', '#3B82F6'] : ['#10B981', '#3B82F6']
      });
    } catch {
      // safe
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            01 · Warmer & Invitations
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Draw a Card & Invite a Classmate
          </h2>
        </div>

        <button
          onClick={handleDrawCard}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm hover:shadow transition-all cursor-pointer self-start sm:self-auto"
        >
          ⟳ Draw Next Card
        </button>
      </div>

      {/* Main Board Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 Cols): Clean Card Deck with Draw Animation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="perspective-1000">
            <div
              onClick={handleDrawCard}
              className={`relative cursor-pointer transition-transform ${
                isShuffling ? 'animate-deck-nudge' : 'hover:scale-[1.01]'
              }`}
              title="Click card to draw next"
            >
              {/* Stacked offset backing cards */}
              <div className="absolute inset-0 bg-slate-200/70 translate-x-2 translate-y-2 rounded-2xl border border-slate-300/60" />
              <div className="absolute inset-0 bg-slate-100 translate-x-1 translate-y-1 rounded-2xl border border-slate-200" />

              {/* The Active Drawn Card with Smooth Entry Animation */}
              <div
                key={drawKey}
                className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 animate-card-draw shadow-sm min-h-[340px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                      {currentCard.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Card 0{cardIndex + 1} of 06
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-2">
                    {currentCard.title}
                  </h3>

                  <div className="text-xs text-slate-500 font-medium mb-6">
                    {currentCard.time} · {currentCard.location}
                  </div>

                  {/* Student A Line */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                    <span className="text-[11px] uppercase font-bold text-blue-600 block">
                      Student A asks:
                    </span>
                    <p className="text-base sm:text-lg font-semibold text-slate-900">
                      “{currentCard.sampleInvite}”
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playTap();
                      speakText(currentCard.sampleInvite);
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1"
                  >
                    ▶ Listen to prompt
                  </button>
                  <span className="text-xs text-slate-400">Click card to draw next</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Natural Replies & Team Points */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Student B Responds
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                Choose a Natural Response
              </h4>
            </div>

            {/* Replies */}
            <div className="space-y-2.5">
              {currentCard.possibleReplies.map((reply, idx) => {
                const isSelected = selectedResponse === reply;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePickResponse(reply)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                    }`}
                  >
                    “{reply}”
                  </button>
                );
              })}
            </div>

            {/* Alternative Request */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
              <span className="text-[11px] uppercase font-bold text-emerald-600 block">
                Track 5B Target Help Request:
              </span>
              <p className="text-sm font-medium text-slate-800">
                “{currentCard.sampleHelpRequest}”
              </p>
              <button
                onClick={() => {
                  sound.playTap();
                  speakText(currentCard.sampleHelpRequest);
                }}
                className="text-xs text-emerald-600 hover:underline cursor-pointer pt-1 block"
              >
                ▶ Listen to request
              </button>
            </div>

            {/* League Point Awards */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-slate-500">
                Award points to:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleScore('leagueA')}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  +10 Team A
                </button>
                <button
                  onClick={() => handleScore('leagueB')}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  +10 Team B
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
