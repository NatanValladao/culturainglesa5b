export type ActiveTab = 'noughts' | 'website' | 'grammar' | 'dialogue' | 'challenge' | 'sel';

export interface NoughtsCell {
  id: string;
  code: string; // 'a' through 'i'
  problem: string;
  location: string;
  suggestedSolution: string;
  claimedBy: 'X' | 'O' | null;
  claimedByTeam: 'leagueA' | 'leagueB' | null;
}

export interface FestivalScheduleItem {
  time: string;
  title: string;
  venue: string;
  type: 'performance' | 'workshop' | 'exhibition' | 'competition';
  description: string;
  highlight: string;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  evidenceQuote: string;
  justification: string;
}

export interface GrammarItem {
  id: string;
  prompt: string;
  category: 'instant_decision' | 'plan' | 'opinion' | 'polite_request';
  options: string[];
  correctAnswer: string;
  explanation: string;
  ruleTag: string;
}

export interface DialogueLine {
  id: number;
  speaker: 'Leo' | 'Camila';
  text: string;
  isTargetSentence?: boolean;
  targetTag?: 'Instant Decision' | 'Opinion' | 'Polite Request' | 'Plan';
}

export interface ChallengeScenario {
  id: string;
  title: string;
  situation: string;
  requiredFunction: 'Instant Decision (will)' | 'Give an Opinion (looks / sounds / seems)' | 'Polite Request (Could you / Would you mind)';
  modelPrompt: string;
  exampleAnswers: string[];
  grammarChunk: string;
  badgeColor: string;
}

export interface StreetArtistProfile {
  id: string;
  name: string;
  city: string;
  style: string;
  signatureTheme: string;
  famousArtwork: string;
  quote: string;
  reflectionQuestion: string;
}
