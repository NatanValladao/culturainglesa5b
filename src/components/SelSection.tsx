import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BRAZILIAN_STREET_ARTISTS } from '../data/lessonData';
import { StreetArtistProfile } from '../types';
import { sound, speakText } from '../utils/audio';

interface SelSectionProps {
  isBoardMode: boolean;
}

export const SelSection: React.FC<SelSectionProps> = ({ isBoardMode }) => {
  const [selectedArtistIndex, setSelectedArtistIndex] = useState<number>(0);
  const [personalReflection, setPersonalReflection] = useState<string>('');
  const [selectedArtworkChoice, setSelectedArtworkChoice] = useState<string>('graffiti');
  const [isBadgeGenerated, setIsBadgeGenerated] = useState<boolean>(false);

  const artist: StreetArtistProfile = BRAZILIAN_STREET_ARTISTS[selectedArtistIndex];

  const handleSelectArtist = (index: number) => {
    sound.playTap();
    setSelectedArtistIndex(index);
  };

  const handleGenerateBadge = () => {
    sound.playSuccess();
    setIsBadgeGenerated(true);
    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#10B981', '#F59E0B']
      });
    } catch {
      // safe
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            06 · SEL & Cultural Inspiration (Journey 2)
          </span>
          <h2
            className={`font-bold tracking-tight text-slate-900 ${
              isBoardMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Brazilian Street Art & Self-Expression
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Explore how world-renowned Brazilian artists turn public spaces into powerful statements on peace, nature, and identity.
          </p>
        </div>
      </div>

      {/* Artist Tabs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BRAZILIAN_STREET_ARTISTS.map((item, idx) => {
          const isSelected = selectedArtistIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectArtist(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-600 bg-white shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white/70 hover:bg-white'
              }`}
            >
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                Artist 0{idx + 1}
              </span>
              <div className="font-bold text-sm text-slate-900">
                {item.name}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {item.city}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Artist Spotlight Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {artist.name}
              </h3>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                {artist.city}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-600 font-semibold">
              Masterpiece: {artist.famousArtwork}
            </p>
          </div>

          <button
            onClick={() => speakText(`${artist.name}: ${artist.quote}`)}
            className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>🔊 Listen to Artist Quote</span>
          </button>
        </div>

        {/* Style & Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
              Artistic Style
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {artist.style}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
              Signature Theme & Message
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {artist.signatureTheme}
            </p>
          </div>
        </div>

        {/* Quote Block */}
        <blockquote className="p-5 rounded-2xl bg-blue-50/60 border-l-4 border-blue-600 text-slate-800 italic text-sm sm:text-base font-medium leading-relaxed">
          {artist.quote}
        </blockquote>

        {/* Reflective Discussion Question */}
        <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <span>💬 Class Reflection Prompt:</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">
            “{artist.reflectionQuestion}”
          </p>
        </div>
      </div>

      {/* Activity 7: Personal Art & Festival Badge Creator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Personalised Production & Technique Drop
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Design Your Festival Artist Badge & Affirmation
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            If you were registered to showcase at the Youth Arts Festival, what would you create?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select your preferred artistic medium:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'graffiti', label: 'Spray Paint Mural' },
                  { id: 'dance', label: 'Pilolo Urban Dance' },
                  { id: 'ceramics', label: 'Ceramic Clay Sculpture' },
                  { id: 'music', label: 'Acoustic Songwriting' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      sound.playTap();
                      setSelectedArtworkChoice(m.id);
                    }}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      selectedArtworkChoice === m.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. What message or emotion do you want to express?
              </label>
              <textarea
                value={personalReflection}
                onChange={(e) => setPersonalReflection(e.target.value)}
                placeholder="e.g., I want to express friendship and cultural solidarity because our differences make our school vibrant..."
                className="w-full h-24 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium text-slate-800"
              />
            </div>

            <button
              onClick={handleGenerateBadge}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              ★ Generate Festival Badge
            </button>
          </div>

          {/* Badge Preview */}
          <div className="p-6 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Youth Arts Festival · Official Pass
            </span>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-md">
              🎨
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-base text-slate-900">
                Youth Creator Pass
              </h4>
              <p className="text-xs text-blue-700 font-semibold">
                Category: {selectedArtworkChoice.toUpperCase()}
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 w-full font-medium italic min-h-[60px] flex items-center justify-center">
              {personalReflection
                ? `“${personalReflection}”`
                : '“Type your message or artistic intention on the left to complete your festival badge.”'}
            </div>

            {isBadgeGenerated && (
              <div className="text-xs font-bold text-emerald-700 animate-fadeIn">
                ✓ Badge Ready for Exhibition!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
