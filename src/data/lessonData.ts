import {
  EventCard,
  GrammarItem,
  DialogueLine,
  TrueFalseQuestion,
  PoliteRequestOrderingItem,
  RolePlayScenario,
  SelStrategy
} from '../types';

export const LESSON_META = {
  journey: 'Journey 2 • Express Yourself',
  track: 'Track 5B',
  title: 'Would you mind helping me?',
  subheading: 'Coordinating a Cultural Event with Tact & Teamwork',
  schoolProgram: 'Teen Legacy 1 • Cultura Inglesa & Macmillan Education',
  cefrLevel: 'A2+ / B1 Pre-Intermediate EFL',
  targetGrammar: 'Present Continuous for Fixed Future Arrangements',
  targetFunction: 'Polite Requests, Offers of Assistance & Agreeing to Help'
};

export const CULTURAL_EVENT_CARDS: EventCard[] = [
  {
    id: 'photo_exhibit',
    title: 'Photography Exhibition',
    category: 'Visual Arts',
    description: 'Documentary photo display capturing daily teenage life and authentic community stories.',
    time: 'Friday • 4:00 PM',
    location: 'Main Hall Gallery',
    sampleInvite: 'Would you like to join me for the Photography Exhibition?',
    sampleHelpRequest: 'Could you help me hang the photo frames straight?',
    possibleReplies: [
      'Sure! Count me in. I love photography.',
      'No problem. I will grab the measuring tape.',
      'Of course! What do you need me to do first?'
    ]
  },
  {
    id: 'craft_fair',
    title: "Artisan's Craft Fair",
    category: 'Handmade Crafts',
    description: 'Local student artisans showcasing ceramic bowls, woven textiles, and handmade jewelry.',
    time: 'Saturday • 10:30 AM',
    location: 'Courtyard Pavilions',
    sampleInvite: 'Are you free to visit the Craft Fair on Saturday morning?',
    sampleHelpRequest: 'Would you mind helping me arrange the ceramic display tables?',
    possibleReplies: [
      'Sure, I would be happy to help with that!',
      'Absolutely! I am here to help. Where should we put the table?',
      'No problem. Let us make sure fragile items are secure.'
    ]
  },
  {
    id: 'hiphop_show',
    title: 'Hip-Hop & Pilolo Dance Showcase',
    category: 'Performing Arts',
    description: 'High-energy street dance routines featuring African Pilolo steps and student choreography.',
    time: 'Saturday • 3:30 PM',
    location: 'School Amphitheatre',
    sampleInvite: 'Would you like to come watch the Pilolo dance performance?',
    sampleHelpRequest: 'Can you give me a hand carrying the sound monitors to the stage?',
    possibleReplies: [
      'Count me in! That sounds energetic.',
      'Sure, let us pick them up together so they are not too heavy.',
      'Definitely! What time does the dance crew start rehearsing?'
    ]
  },
  {
    id: 'popup_installation',
    title: 'Pop-Up Interactive Art Maze',
    category: 'Contemporary Art',
    description: 'An immersive tunnel of recycled cardboard, hanging mirrors, and reactive ambient lights.',
    time: 'Friday • 5:30 PM',
    location: 'Studio Room 4',
    sampleInvite: 'Do you want to check out the new interactive art installation?',
    sampleHelpRequest: 'Would you mind testing the color sensors with me before opening?',
    possibleReplies: [
      'I would love to! That appears to be really creative.',
      'Sure! How can I help test them?',
      'No problem. I will check the power switches.'
    ]
  },
  {
    id: 'talent_show',
    title: 'Acoustic Talent Show',
    category: 'Live Music',
    description: 'Teen singer-songwriters, acoustic guitar duos, and spoken-word poetry performances.',
    time: 'Saturday • 6:00 PM',
    location: 'Auditorium Stage',
    sampleInvite: 'Would you like to come to our talent show this Saturday?',
    sampleHelpRequest: 'Could you help me check the stage microphones and cue sheets?',
    possibleReplies: [
      'Absolutely! I am excited to hear everyone play.',
      'Of course! What do you need on the soundboard?',
      'Sure. I will check the microphone batteries right now.'
    ]
  },
  {
    id: 'food_stalls',
    title: 'Cultural Food & Flavor Stalls',
    category: 'Community & Cuisine',
    description: 'Tasting booths featuring regional snacks, tropical fruit smoothies, and family recipe treats.',
    time: 'Saturday • 11:00 AM',
    location: 'School Garden Lawn',
    sampleInvite: 'Are you going to the food stalls on Saturday noon?',
    sampleHelpRequest: 'Would you mind helping me check the allergen signs for the booths?',
    possibleReplies: [
      'Sure! I would be glad to help with the signs.',
      'Count me in! Everything looks and smells delicious.',
      'No problem at all. Let us double-check each recipe card.'
    ]
  }
];

export const GRAMMAR_EXERCISES: GrammarItem[] = [
  {
    id: 'g1',
    context: 'Alex explaining the venue schedule to the organizing committee.',
    sentencePrompt: 'We [_____] (set up) everything on Friday afternoon.',
    subject: 'We',
    baseVerb: 'set up',
    correctAnswer: 'are setting up',
    timeClue: 'on Friday afternoon',
    explanation: 'Present continuous is used here because the team made a firm arrangement with a specific time and date already agreed upon.'
  },
  {
    id: 'g2',
    context: 'Jake coordinating the food delivery timetable with the coordinator.',
    sentencePrompt: 'The food vendors [_____] (arrive) at 10 am on Saturday.',
    subject: 'The food vendors',
    baseVerb: 'arrive',
    correctAnswer: 'are arriving',
    timeClue: 'at 10 am on Saturday',
    explanation: 'Plural subject (vendors) takes "are". The exact arrival time (10 am) confirms it is a fixed schedule, not an instant decision.'
  },
  {
    id: 'g3',
    context: 'Alex describing the visual arts gallery tasks.',
    sentencePrompt: 'We [_____] (hang) banners and posters around the venue.',
    subject: 'We',
    baseVerb: 'hang',
    correctAnswer: 'are hanging',
    timeClue: 'this afternoon',
    explanation: 'Formed with "are" + "-ing" for a coordinated ongoing plan for the upcoming festival.'
  },
  {
    id: 'g4',
    context: 'Alex confirming his afternoon meeting with the dance performers.',
    sentencePrompt: 'I [_____] (meet) the dance group at 3 pm to confirm their rehearsal.',
    subject: 'I',
    baseVerb: 'meet',
    correctAnswer: 'am meeting',
    timeClue: 'at 3 pm',
    explanation: 'Personal appointment locked into the diary. "I am meeting" shows a personal arrangement.'
  },
  {
    id: 'g5',
    context: 'Alex discussing technical setup with Jake.',
    sentencePrompt: 'The stage crew [_____] (come) at 2 pm to set up the lights and sound.',
    subject: 'The stage crew',
    baseVerb: 'come',
    correctAnswer: 'is coming',
    timeClue: 'at 2 pm',
    explanation: 'Collective singular noun "the stage crew" takes "is coming". The time "at 2 pm" shows an arranged appointment.'
  },
  {
    id: 'g6',
    context: 'Jake summarizing the final checklist with Emily and Alex.',
    sentencePrompt: 'We [_____] (finalise) the decorations on Friday before opening.',
    subject: 'We',
    baseVerb: 'finalise',
    correctAnswer: 'are finalising',
    timeClue: 'on Friday',
    explanation: 'Coordinated group action scheduled on the calendar before Saturday.'
  }
];

export const FESTIVAL_DIALOGUE: DialogueLine[] = [
  {
    id: 1,
    speaker: 'Alex',
    text: 'Hey guys, the Cultural Festival is coming up fast! We are setting up everything on Friday afternoon. Emily, could you help me with the decorations?',
    isPoliteRequest: true,
    requestOrder: 1
  },
  {
    id: 2,
    speaker: 'Emily',
    text: 'Sure! How can I help?'
  },
  {
    id: 3,
    speaker: 'Alex',
    text: "We're hanging banners and posters around the venue, and we're arranging the tables for the art exhibition."
  },
  {
    id: 4,
    speaker: 'Emily',
    text: "No problem. I'll help with that. Anything else?"
  },
  {
    id: 5,
    speaker: 'Jake',
    text: "I am organising the food stalls, but I'm a bit overwhelmed. Can you give me a hand with that too, Emily?",
    isPoliteRequest: true,
    requestOrder: 2
  },
  {
    id: 6,
    speaker: 'Emily',
    text: 'Of course! What do you need?'
  },
  {
    id: 7,
    speaker: 'Jake',
    text: "The food vendors are arriving at 10 am on Saturday, and I'm checking their setup. Would you mind helping me with the list of food stalls?",
    isPoliteRequest: true,
    requestOrder: 3
  },
  {
    id: 8,
    speaker: 'Emily',
    text: "Sure. I'd be happy to help with that too. We can go through it after we finish decorating."
  },
  {
    id: 9,
    speaker: 'Alex',
    text: 'Perfect! Oh, and I am meeting the dance group at 3 pm to confirm their rehearsal time. Can you help me out with that, Jake?',
    isPoliteRequest: true,
    requestOrder: 4
  },
  {
    id: 10,
    speaker: 'Jake',
    text: 'Absolutely! I’m here to help. Are they performing indoors or outdoors?'
  },
  {
    id: 11,
    speaker: 'Alex',
    text: 'Indoors. The stage crew is coming at 2 pm to set up the lights and sound.'
  },
  {
    id: 12,
    speaker: 'Jake',
    text: 'Got it. So, we are finalising the decorations on Friday, setting up food stalls on Saturday morning, and making sure performances go smoothly.'
  },
  {
    id: 13,
    speaker: 'Emily',
    text: "That's right! We are working hard to get everything under control."
  }
];

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 'tf1',
    statement: 'The organizing team is setting up everything on Friday afternoon.',
    isTrue: true,
    justification: 'Alex states explicitly: "We are setting up everything on Friday afternoon."',
    evidenceQuote: 'Alex: "We are setting up everything on Friday afternoon."'
  },
  {
    id: 'tf2',
    statement: 'The food vendors are arriving on Sunday morning at 10 am.',
    isTrue: false,
    justification: 'The vendors are arriving on Saturday morning at 10 am, not Sunday.',
    evidenceQuote: 'Jake: "The food vendors are arriving at 10 am on Saturday..."'
  },
  {
    id: 'tf3',
    statement: 'Jake feels completely relaxed about managing all the food stalls alone.',
    isTrue: false,
    justification: 'Jake admits he is feeling overwhelmed and asks Emily for assistance.',
    evidenceQuote: 'Jake: "I am organising the food stalls, but I’m a bit overwhelmed."'
  },
  {
    id: 'tf4',
    statement: 'The dance group is performing indoors on the main stage.',
    isTrue: true,
    justification: 'When Jake asks if they perform indoors or outdoors, Alex confirms: "Indoors."',
    evidenceQuote: 'Alex: "Indoors. The stage crew is coming at 2 pm to set up the lights and sound."'
  },
  {
    id: 'tf5',
    statement: 'Emily agrees to help both Alex with decorations and Jake with the stall list.',
    isTrue: true,
    justification: 'Emily responds warmly to both teammates, offering to help with decorations and then with the food list.',
    evidenceQuote: 'Emily: "Sure! How can I help?" and "Sure. I’d be happy to help with that too."'
  }
];

export const POLITE_REQUESTS_ORDERING: PoliteRequestOrderingItem[] = [
  {
    id: 'pr_1',
    originalOrder: 1,
    speaker: 'Alex (to Emily)',
    quote: 'Emily, could you help me with the decorations?',
    structure: 'Could you help me with...'
  },
  {
    id: 'pr_2',
    originalOrder: 2,
    speaker: 'Jake (to Emily)',
    quote: 'Can you give me a hand with that too, Emily?',
    structure: 'Can you give me a hand with...'
  },
  {
    id: 'pr_3',
    originalOrder: 3,
    speaker: 'Jake (to Emily)',
    quote: 'Would you mind helping me with the list of food stalls?',
    structure: 'Would you mind helping me with...'
  },
  {
    id: 'pr_4',
    originalOrder: 4,
    speaker: 'Alex (to Jake)',
    quote: 'Can you help me out with that, Jake?',
    structure: 'Can you help me out with...'
  }
];

export const ROLE_PLAY_SCENARIOS: RolePlayScenario[] = [
  {
    id: 'sc1',
    title: 'The Tangled Stage Cables',
    context: 'You are backstage 20 minutes before sound check. The microphone cords and speaker wires are completely tangled.',
    targetTask: 'Ask a teammate to hold the cables while you untangle the jacks.',
    suggestedPrompt: 'Would you mind holding these cords while I sort the audio plugs?',
    suggestedResponse: 'Sure! How can I help? Hand me the microphone lines.',
    difficulty: 'Bronze'
  },
  {
    id: 'sc2',
    title: 'Heavy Exhibition Display Boards',
    context: 'The wooden partition screens for the photography display just arrived by the loading dock. They are too heavy for one person.',
    targetTask: 'Ask a peer to carry the second side of the screen.',
    suggestedPrompt: 'Could you give me a hand carrying this display board into Room 3?',
    suggestedResponse: 'No problem at all! Let me grab the other side. Where are we putting it?',
    difficulty: 'Bronze'
  },
  {
    id: 'sc3',
    title: 'Double-Booking Rehearsal Space',
    context: 'Both the acoustic guitarist and the hip-hop dancers want to rehearse in the auditorium at 3:00 PM.',
    targetTask: 'Politely negotiate a shared schedule or ask a leader for clarification.',
    suggestedPrompt: 'Would you mind checking if the music room is free so we can split the rehearsal times?',
    suggestedResponse: 'Sure. I would be happy to check with the coordinator right now.',
    difficulty: 'Silver'
  },
  {
    id: 'sc4',
    title: 'Lost Welcome Desk Clipboard',
    context: 'The guest registration sheet has gone missing right as the first visitors arrive.',
    targetTask: 'Ask a classmate to check the staff room while you greet the guests.',
    suggestedPrompt: 'Could you help me find the attendee roster in the staff room?',
    suggestedResponse: 'Absolutely! I am on it. Keep greeting the people at the door.',
    difficulty: 'Silver'
  },
  {
    id: 'sc5',
    title: 'Sudden Outdoor Rain Threat',
    context: 'Dark clouds gather over the courtyard craft tables with fragile watercolor paintings outside.',
    targetTask: 'Call for immediate coordinated help to move displays indoors.',
    suggestedPrompt: 'Would you mind helping us carry the craft tables into the covered hallway before it rains?',
    suggestedResponse: 'Of course! What do you need first? I will take the paper artworks!',
    difficulty: 'Gold'
  },
  {
    id: 'sc6',
    title: 'Vendor Dietary Allergen Signage',
    context: 'A food vendor forgot to list gluten and nut allergens on their artisanal dessert menu.',
    targetTask: 'Ask a peer to help write clear handwritten warning cards.',
    suggestedPrompt: 'Could you help me write new ingredient signs for the bakery booth?',
    suggestedResponse: 'No problem. I will grab some cards and thick markers right away.',
    difficulty: 'Gold'
  }
];

export const POLITE_REQUEST_FORMULAS = [
  {
    pattern: 'Could you help me with + [Noun Phrase]?',
    example: 'Could you help me with the decorations?',
    notes: 'Very common, polite, and neutral. Perfect for everyday classroom and teamwork tasks.'
  },
  {
    pattern: 'Would you mind + [Verb-ING]...?',
    example: 'Would you mind helping me with the list of food stalls?',
    notes: 'Crucial grammar rule: "mind" requires a gerund (-ing). Extremely polite and considerate.'
  },
  {
    pattern: 'Can you give me a hand with + [Noun Phrase]?',
    example: 'Can you give me a hand with the sound speakers?',
    notes: 'Natural, idiomatic expression favored by teens and peers in collaborative settings.'
  },
  {
    pattern: 'Could you help me out with + [Noun Phrase]?',
    example: 'Could you help me out with the dance group?',
    notes: 'Phrasal verb "help out" expresses friendly mutual assistance when someone has high workload.'
  }
];

export const POLITE_ACCEPTANCE_PHRASES = [
  { phrase: 'Sure! How can I help?', tone: 'Enthusiastic & prompt' },
  { phrase: "No problem. I'll help with that. Anything else?", tone: 'Generous & supportive' },
  { phrase: 'Of course! What do you need?', tone: 'Warm & dependable' },
  { phrase: "Sure. I'd be happy to help with that too.", tone: 'Polite & accommodating' },
  { phrase: 'Absolutely! I’m here to help.', tone: 'Team-spirited & energetic' }
];

export const SEL_STRATEGIES: SelStrategy[] = [
  {
    id: 'sel_breathing',
    title: 'The 4-4-4 Box Breath',
    subtitle: 'Calming the Physical Adrenaline Spike',
    description: 'Before taking the microphone, stepping on stage, or speaking up in front of classmates, heartbeat accelerates. Slow down the nervous system.',
    actionableStep: 'Inhale through nose for 4 counts, hold for 4 counts, exhale through mouth for 4 counts. Repeat 3 times.',
    quote: 'Anxiety is just energy without a rhythm.'
  },
  {
    id: 'sel_ask_early',
    title: 'Admitting "I’m Overwhelmed"',
    subtitle: 'Asking for Help Before You Drown',
    description: 'Notice how Jake said: "I am organising the food stalls, but I’m a bit overwhelmed." He did not pretend everything was fine until it failed.',
    actionableStep: 'Use the phrase: "I’m feeling a bit overwhelmed with [X]. Could you give me a hand?" It builds trust, not weakness.',
    quote: 'Asking for help is not giving up; it is refusing to give up.'
  },
  {
    id: 'sel_reframing',
    title: 'The Imperfection Grace',
    subtitle: 'Reframing Mistakes as Live Energy',
    description: 'Teen performers fear forgetting a word or dropping a prop. But audiences connect with genuine humans, not rehearsed robots.',
    actionableStep: 'If you slip up, pause, breathe, smile, and say "Let me try that again." Your courage earns instant respect.',
    quote: 'Flaws make live art memorable.'
  },
  {
    id: 'sel_partner_anchoring',
    title: 'The Wingman Anchor',
    subtitle: 'Peer Solidarity in the Wings',
    description: 'Standing alone makes fear feel 10x larger. Having a trusted friend making eye contact grounds your confidence immediately.',
    actionableStep: 'Find one person in the front row or in your league. Rehearse the first sentence together before you begin.',
    quote: 'We don’t perform alone; we lift each other up.'
  }
];

export const MINGLE_SAMPLE_PLANS = [
  { student: 'Lucas', plan: 'I am playing basketball with my school team on Saturday morning.', time: 'Sat 09:00' },
  { student: 'Beatriz', plan: 'I am visiting my grandmother in Campinas this weekend.', time: 'Sat 14:00' },
  { student: 'Gabriel', plan: 'I am studying for the math olympiad with my friend Thiago.', time: 'Sun 10:00' },
  { student: 'Mariana', plan: 'I am baking brigadeiros for our charity stand on Sunday afternoon.', time: 'Sun 15:30' },
  { student: 'Enzo', plan: 'I am testing the sound speakers in the amphitheater on Friday at 4 pm.', time: 'Fri 16:00' }
];
