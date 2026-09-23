export type ActiveTab = 'cards' | 'grammar' | 'listening' | 'roleplay' | 'sel';

export interface EventCard {
  id: string;
  title: string;
  category: string;
  description: string;
  time: string;
  location: string;
  sampleInvite: string;
  sampleHelpRequest: string;
  possibleReplies: string[];
}

export interface GrammarItem {
  id: string;
  context: string;
  sentencePrompt: string;
  subject: string;
  baseVerb: string;
  correctAnswer: string;
  timeClue: string;
  explanation: string;
}

export interface DialogueLine {
  id: number;
  speaker: 'Alex' | 'Emily' | 'Jake';
  text: string;
  isPoliteRequest?: boolean;
  requestOrder?: number;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  justification: string;
  evidenceQuote: string;
}

export interface PoliteRequestOrderingItem {
  id: string;
  originalOrder: number;
  speaker: string;
  quote: string;
  structure: 'Could you help me with...' | 'Can you give me a hand with...' | 'Would you mind helping me with...' | 'Can you help me out with...';
}

export interface RolePlayScenario {
  id: string;
  title: string;
  context: string;
  targetTask: string;
  suggestedPrompt: string;
  suggestedResponse: string;
  difficulty: 'Bronze' | 'Silver' | 'Gold';
}

export interface SelStrategy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionableStep: string;
  quote: string;
}
