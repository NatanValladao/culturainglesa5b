import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { NOUGHTS_AND_CROSSES_PROBLEMS } from '../data/lessonData';
import { NoughtsCell } from '../types';
import { sound, speakText } from '../utils/audio';

interface NoughtsCrossesProps {
  isBoardMode: boolean;
  addLeagueScore: (league: 'leagueA' | 'leagueB', pts: number) => void;
}

export const NoughtsCrossesSection: React.FC<NoughtsCrossesProps> = ({
  isBoardMode,
  addLeagueScore
}) => {
  const [board, setBoard] = useState<NoughtsCell[]>(NOUGHTS_AND_CROSSES_PROBLEMS);
  const [selectedCell, setSelectedCell] = useState<NoughtsCell | null>(NOUGHTS_AND_CROSSES_PROBLEMS[0]);
  const [currentTurn, setCurrentTurn] = useState<'leagueA' | 'leagueB'>('leagueA');
  const [showSolutionHint, setShowSolutionHint] = useState<boolean>(false);
  const [winner, setWinner] = useState<'X' | 'O' | 'draw' | null>(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = (newBoard: NoughtsCell[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a].claimedBy &&
        newBoard[a].claimedBy === newBoard[b].claimedBy &&
        newBoard[a].claimedBy === newBoard[c].claimedBy
      ) {
        return newBoard[a].claimedBy;
      }
    }
    const allClaimed = newBoard.every((cell) => cell.claimedBy !== null);
    if (allClaimed) return 'draw';
    return null;
  };

  const handleSelectCell = (cell: NoughtsCell) => {
    sound.playTap();
    setSelectedCell(cell);
    setShowSolutionHint(false);
  };

  const handleClaim = (team: 'leagueA' | 'leagueB') => {
    if (!selectedCell || selectedCell.claimedBy !== null) return;

    sound.playSuccess();
    const symbol: 'X' | 'O' = team === 'leagueA' ? 'X' : 'O';
    const newBoard: NoughtsCell[] = board.map((c) =>
      c.id === selectedCell.id
        ? { ...c, claimedBy: symbol, claimedByTeam: team }
        : c
    );
    setBoard(newBoard);
    addLeagueScore(team, 10);

    const winStatus = checkWinner(newBoard);
    if (winStatus === 'X' || winStatus === 'O') {
      sound.playFanfare();
      setWinner(winStatus);
      addLeagueScore(winStatus === 'X' ? 'leagueA' : 'leagueB', 25);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: winStatus === 'X' ? ['#F43F5E', '#FB7185'] : ['#10B981', '#34D399']
        });
      } catch {
        // safe
      }
    } else if (winStatus === 'draw') {
      setWinner('draw');
    }

    // Toggle turn to next team
    setCurrentTurn((prev) => (prev === 'leagueA' ? 'leagueB' : 'leagueA'));

    // Select the next unclaimed cell if available
    const nextUnclaimed = newBoard.find((c) => c.claimedBy === null);
    if (nextUnclaimed) {
      setSelectedCell(nextUnclaimed);
      setShowSolutionHint(false);
    }
  };

  const handleReset = () => {
    sound.playTap();
    setBoard(NOUGHTS_AND_CROSSES_PROBLEMS.map((c) => ({ ...c, claimedBy: null, claimedByTeam: null })));
    setSelectedCell(NOUGHTS_AND_CROSSES_PROBLEMS[0]);
    setCurrentTurn('leagueA');
    setShowSolutionHint(false);
    setWinner(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            01 · Warmer & Contextualisation (5 min)
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Multiplayer: Noughts & Crosses (Festival Troubleshooter)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Teams take turns picking a festival problem. Formulate a quick decision using future forms (<span className="font-semibold text-blue-600">"We'll..." / "I'll..."</span>) to claim the square!
          </p>
        </div>

        {/* Turn & Reset Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            currentTurn === 'leagueA'
              ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
              : 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs'
          }`}>
            Current Turn: {currentTurn === 'leagueA' ? 'Team A (X - Rose)' : 'Team B (O - Emerald)'}
          </div>
          <button
            onClick={handleReset}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            ⟳ Reset Board
          </button>
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div className={`p-4 rounded-2xl border text-center font-bold text-base sm:text-lg animate-bounce ${
          winner === 'X'
            ? 'bg-rose-50 border-rose-300 text-rose-800'
            : winner === 'O'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
            : 'bg-amber-50 border-amber-300 text-amber-800'
        }`}>
          {winner === 'X' && '🏆 Three in a row! Team A (X) wins the round! (+25 bonus points)'}
          {winner === 'O' && '🏆 Three in a row! Team B (O) wins the round! (+25 bonus points)'}
          {winner === 'draw' && '🤝 It’s a Draw! Both teams solved all festival emergencies! (+10 pts each)'}
        </div>
      )}

      {/* Main Game Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3x3 Grid Board (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Festival Emergency Grid (3 × 3)
            </span>
            <span className="text-xs text-slate-400">
              Click a cell to read the crisis and solve it
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 aspect-square max-w-lg mx-auto">
            {board.map((cell, idx) => {
              const isSelected = selectedCell?.id === cell.id;
              const isClaimed = cell.claimedBy !== null;

              return (
                <button
                  key={cell.id}
                  onClick={() => handleSelectCell(cell)}
                  className={`relative p-3 rounded-2xl border-2 transition-all flex flex-col justify-between text-left cursor-pointer group ${
                    isClaimed
                      ? cell.claimedBy === 'X'
                        ? 'bg-rose-50/80 border-rose-300 text-rose-900'
                        : 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                      : isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-blue-600">
                      [{cell.code}]
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {cell.location}
                    </span>
                  </div>

                  <div className="my-auto py-1">
                    {isClaimed ? (
                      <div className="text-center font-extrabold text-4xl sm:text-5xl tracking-tighter">
                        <span className={cell.claimedBy === 'X' ? 'text-rose-600' : 'text-emerald-600'}>
                          {cell.claimedBy}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-700 line-clamp-3 leading-snug font-medium">
                        {cell.problem}
                      </p>
                    )}
                  </div>

                  <div className="text-[10px] text-right text-slate-400 font-medium">
                    {isClaimed ? `Claimed by ${cell.claimedByTeam === 'leagueA' ? 'Team A' : 'Team B'}` : 'Unclaimed'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Cell Action Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          {selectedCell ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-mono font-bold px-2 py-0.5 rounded-md">
                    Square [{selectedCell.code.toUpperCase()}]
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Location: {selectedCell.location}
                  </span>
                </div>
                <button
                  onClick={() => speakText(selectedCell.problem)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                  title="Read problem aloud"
                >
                  🔊 Listen
                </button>
              </div>

              {/* The Emergency Problem */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Festival Emergency
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug bg-slate-50 p-4 rounded-xl border border-slate-200">
                  “{selectedCell.problem}”
                </p>
              </div>

              {/* Target Language Formula Callout */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5 text-xs">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <span>💡 Target Sentence Formula:</span>
                </div>
                <div className="font-mono text-blue-800">
                  Subject + will / 'll + base verb (+ right away / immediately)
                </div>
                <p className="text-slate-600 text-[11px]">
                  Example: <span className="italic font-semibold text-slate-800">"Don't worry! We'll fix it now."</span> or <span className="italic font-semibold text-slate-800">"I'll help you!"</span>
                </p>
              </div>

              {/* Solution Model Toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      sound.playTap();
                      setShowSolutionHint(!showSolutionHint);
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-blue-600 underline cursor-pointer"
                  >
                    {showSolutionHint ? 'Hide suggested solution' : 'Show teacher solution model'}
                  </button>
                  {showSolutionHint && (
                    <button
                      onClick={() => speakText(selectedCell.suggestedSolution)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                      🔊 Play Audio
                    </button>
                  )}
                </div>

                {showSolutionHint && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 animate-fadeIn">
                    <span className="font-bold block mb-1">Model Solution:</span>
                    “{selectedCell.suggestedSolution}”
                  </div>
                )}
              </div>

              {/* Claim Buttons for Teams */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Validate Spoken Solution:
                </span>
                {selectedCell.claimedBy ? (
                  <div className="p-3 text-center bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
                    This square was already claimed by {selectedCell.claimedBy === 'X' ? 'Team A (X)' : 'Team B (O)'}.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleClaim('leagueA')}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Claim for Team A (X)</span>
                      <span className="text-[10px] bg-rose-700 px-1.5 py-0.5 rounded">+10 pts</span>
                    </button>
                    <button
                      onClick={() => handleClaim('leagueB')}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Claim for Team B (O)</span>
                      <span className="text-[10px] bg-emerald-700 px-1.5 py-0.5 rounded">+10 pts</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              Select any square on the board to view the festival challenge.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
