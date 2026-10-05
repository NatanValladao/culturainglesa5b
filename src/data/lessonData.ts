import {
  NoughtsCell,
  FestivalScheduleItem,
  TrueFalseQuestion,
  GrammarItem,
  DialogueLine,
  ChallengeScenario,
  StreetArtistProfile
} from '../types';

export const LESSON_META = {
  journey: 'Journey 2 • Express Yourself',
  track: 'Track 7A',
  title: 'I’ll register for the festival now!',
  subheading: 'Youth Arts Festival, Instant Decisions (will), Opinions & Polite Requests',
  schoolProgram: 'Teen Legacy 1 • Cultura Inglesa & Macmillan Education',
  cefrLevel: 'A2+ / B1 Pre-Intermediate EFL',
  targetGrammar: 'Future with "will" (spontaneous decisions on the spot) vs "be going to" (plans)',
  targetFunctions: 'Making instant decisions, expressing opinions (looks, sounds, seems to be), and polite requests (Could you...? / Would you mind...?)'
};

// Warmer: Noughts & Crosses (Tic-Tac-Toe) - Activity 1
export const NOUGHTS_AND_CROSSES_PROBLEMS: NoughtsCell[] = [
  {
    id: 'cell_a',
    code: 'a',
    location: 'Main Stage',
    problem: 'The microphone stopped working right before the opening speech.',
    suggestedSolution: "Don't worry! We'll test the sound cable and replace the battery right now.",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_b',
    code: 'b',
    location: 'Welcome Desk',
    problem: 'We ran out of printed festival schedule flyers for incoming visitors.',
    suggestedSolution: "I'll display a large QR code on the monitor so everyone can scan the digital map!",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_c',
    code: 'c',
    location: 'Courtyard Garden',
    problem: 'Rain suddenly started falling near the outdoor acoustic music stage.',
    suggestedSolution: "We'll help the musicians move their instruments into the covered gallery immediately.",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_d',
    code: 'd',
    location: 'Mural Wall',
    problem: 'The spray paint cans ran out during the street art graffiti workshop.',
    suggestedSolution: "I'll run to the school art supply storage and bring five extra boxes of paint.",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_e',
    code: 'e',
    location: 'Hallway Corridor',
    problem: 'Visitors cannot find where the Pilolo street dance showdown is taking place.',
    suggestedSolution: "We'll put up bright directional arrows and announce the location on the loudspeaker.",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_f',
    code: 'f',
    location: 'Sculpture Corner',
    problem: 'The spotlight is too dim to highlight the student ceramic sculptures.',
    suggestedSolution: "I'll adjust the angle of the overhead lights to illuminate the display nicely.",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_g',
    code: 'g',
    location: 'Pottery Studio',
    problem: 'The modelling clay is drying out too quickly under the midday sun.',
    suggestedSolution: "We'll spray water mist over the tables and pull down the canvas canopy shades.",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_h',
    code: 'h',
    location: 'Snack Pavilion',
    problem: 'A huge queue formed at the fresh juice stall and students are thirsty.',
    suggestedSolution: "I'll jump behind the counter and hand out cold bottled water to speed up service!",
    claimedBy: null,
    claimedByTeam: null
  },
  {
    id: 'cell_i',
    code: 'i',
    location: 'Amphitheatre Booth',
    problem: 'The DJ laptop battery is at 4% right before the hip-hop performance.',
    suggestedSolution: "I'll plug in the emergency extension cord and power brick right away!",
    claimedBy: null,
    claimedByTeam: null
  }
];

// Activity 2 & 3: Youth Arts Festival Website Content & Schedule
export const FESTIVAL_WEBSITE = {
  name: 'Youth Arts Festival 2026',
  tagline: 'Express Yourself: Visual Arts, Urban Rhythms & Creative Workshops',
  dates: 'Saturday & Sunday • October 18–19',
  location: 'São Paulo Creative Arts Hub & Open-Air Amphitheatre',
  admission: 'Free admission for all secondary school students with ID',
  overview:
    'Welcome to the annual Youth Arts Festival! This weekend celebration unites young Brazilian creators, musicians, and performers to share their passion. Featuring live Brazilian street art exhibitions, urban dance battles, hands-on ceramic studios, and indie music stages. Explore, connect, and discover your artistic voice!',
  announcement:
    '★ Early online registration is recommended for interactive workshops (graffiti & ceramics) as materials and spots are limited!',
  schedules: [
    {
      time: '10:00 AM – 12:00 PM',
      title: 'Brazilian Street Art & Giant Mural Live Paint',
      venue: 'Urban Canvas Wall',
      type: 'exhibition',
      description: 'Watch student artists collaborate on a vibrant 20-meter mural inspired by Eduardo Kobra and Os Gêmeos.',
      highlight: 'Live spray-paint demonstration with eco-friendly pigments.'
    },
    {
      time: '1:00 PM – 2:30 PM',
      title: 'Pilolo & Street Dance Masterclass & Battle',
      venue: 'Amphitheatre Stage A',
      type: 'performance',
      description: 'High-energy West African Pilolo dance choreography followed by a friendly freestyle teen cipher.',
      highlight: 'Guest DJ spinning Afrobeat and Brazilian funk instrumental fusion.'
    },
    {
      time: '2:45 PM – 4:15 PM',
      title: 'Hands-On Ceramic Sculpting & Clay Workshop',
      venue: 'Craft Studio 2',
      type: 'workshop',
      description: 'Learn pinching, coiling, and surface texture techniques to design your own tactile clay talisman.',
      highlight: 'All participants take home their fired pottery pieces.'
    },
    {
      time: '4:30 PM – 6:00 PM',
      title: 'Acoustic Bands & Spoken-Word Showcase',
      venue: 'Sunset Courtyard',
      type: 'performance',
      description: 'Teen singer-songwriters and youth poets performing original acoustic compositions on identity and hope.',
      highlight: 'Audience voting for the "Audience Choice Inspiration Award".'
    }
  ] as FestivalScheduleItem[],
  registrationSteps: [
    'Choose your preferred activities and workshops on the online portal.',
    'Enter your school name and student ID badge number.',
    'Receive your instant digital QR ticket on your smartphone.',
    'Present your digital pass at the Welcome Desk to receive your festival lanyard and free sketchbook!'
  ]
};

// Activity 3: True / False Questions
export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 'tf_1',
    statement: 'The Youth Arts Festival requires paid entrance tickets for high school students.',
    isTrue: false,
    evidenceQuote: 'Free admission for all secondary school students with ID.',
    justification: 'The website explicitly states that admission is 100% free for all secondary school students who show their ID.'
  },
  {
    id: 'tf_2',
    statement: 'The festival features a live mural inspired by celebrated Brazilian street artists.',
    isTrue: true,
    evidenceQuote: 'Watch student artists collaborate on a vibrant 20-meter mural inspired by Eduardo Kobra and Os Gêmeos.',
    justification: 'The Urban Canvas Wall program highlights live mural painting honouring Kobra and Os Gêmeos.'
  },
  {
    id: 'tf_3',
    statement: 'Students do not need to register early for hands-on workshops like ceramics and graffiti.',
    isTrue: false,
    evidenceQuote: 'Early online registration is recommended for interactive workshops as materials and spots are limited!',
    justification: 'Because materials and capacity are restricted, early online registration is strongly recommended to guarantee a spot.'
  },
  {
    id: 'tf_4',
    statement: 'The dance masterclass focuses on Pilolo, an energetic urban dance style.',
    isTrue: true,
    evidenceQuote: 'High-energy West African Pilolo dance choreography followed by a friendly freestyle teen cipher.',
    justification: 'The afternoon masterclass specifically teaches Pilolo rhythm, steps, and freestyle interaction.'
  },
  {
    id: 'tf_5',
    statement: 'Registered participants receive a digital QR ticket and can claim a free sketchbook.',
    isTrue: true,
    evidenceQuote: 'Receive your instant digital QR ticket... and receive your festival lanyard and free sketchbook!',
    justification: 'Digital QR passes are sent instantly, and attendees receive physical lanyards and sketchbooks at check-in.'
  }
];

// Activity 5: Dialogue Completion & Role-Play
export const DIALOGUE_FILL_OPTIONS = [
  "I'll register for the festival now!",
  "It looks amazing",
  "Could you sign me up for the graffiti workshop too?",
  "Sure, I'll do that right away",
  "That sounds really exciting"
];

export const FESTIVAL_DIALOGUE: DialogueLine[] = [
  {
    id: 1,
    speaker: 'Leo',
    text: 'Hey Camila! Have you checked out the website for the Youth Arts Festival this weekend?'
  },
  {
    id: 2,
    speaker: 'Camila',
    text: 'No, not yet! I heard people talking about it, but I haven\'t seen the schedule. What are they organizing?'
  },
  {
    id: 3,
    speaker: 'Leo',
    text: 'There is a massive live graffiti mural, ceramic clay sculpting, and a Pilolo street dance masterclass in the amphitheatre!'
  },
  {
    id: 4,
    speaker: 'Camila',
    text: 'That sounds really exciting! You know how much I love urban dance.',
    isTargetSentence: true,
    targetTag: 'Opinion'
  },
  {
    id: 5,
    speaker: 'Leo',
    text: 'And look at the photos from last year on their homepage. The artwork looks amazing and colorful!'
  },
  {
    id: 6,
    speaker: 'Leo',
    text: 'The festival page warns that workshop spots fill up fast, even though admission is free.'
  },
  {
    id: 7,
    speaker: 'Camila',
    text: "In that case, I'll register for the festival now! Let me open the link on my phone.",
    isTargetSentence: true,
    targetTag: 'Instant Decision'
  },
  {
    id: 8,
    speaker: 'Leo',
    text: 'Awesome! Could you sign me up for the graffiti workshop too while you are on the portal?',
    isTargetSentence: true,
    targetTag: 'Polite Request'
  },
  {
    id: 9,
    speaker: 'Camila',
    text: "Sure, I'll do that right away! What is your student badge number?",
    isTargetSentence: true,
    targetTag: 'Instant Decision'
  },
  {
    id: 10,
    speaker: 'Leo',
    text: 'It is SP-4092. Thanks a million! This festival seems to be the highlight of the term.'
  }
];

// Language Lab: Systematic grammar exercises (Instant decisions vs plans vs opinions vs requests)
export const GRAMMAR_EXERCISES: GrammarItem[] = [
  {
    id: 'g_1',
    prompt: 'A: "The festival tickets are going fast!" — B: "Oh! I ________ online right now so I don’t miss out."',
    category: 'instant_decision',
    options: ["'ll register", "am going to register", "registered", "registers"],
    correctAnswer: "'ll register",
    explanation: 'We use "will" (\'ll) for spontaneous decisions made at the moment of speaking (on the spot).',
    ruleTag: 'Instant Decision (will)'
  },
  {
    id: 'g_2',
    prompt: 'We bought our brushes and reserved our passes last Monday. We ________ to attend the mural masterclass on Saturday.',
    category: 'plan',
    options: ['are going', "'ll go", 'will to go', 'goes'],
    correctAnswer: 'are going',
    explanation: 'We use "be going to" (or present continuous) for pre-arranged plans and decisions made beforehand.',
    ruleTag: 'Pre-arranged Plan (be going to)'
  },
  {
    id: 'g_3',
    prompt: 'Listen to the guitar riff coming from Stage B! The new youth band ________ really talented.',
    category: 'opinion',
    options: ['sounds', 'appears', 'looks like', 'seems'],
    correctAnswer: 'sounds',
    explanation: 'We use "sounds" when our impression or opinion is based on auditory evidence (what we hear).',
    ruleTag: 'Opinion / Perception (sounds)'
  },
  {
    id: 'g_4',
    prompt: 'Look at those vibrant geometric colours on the canvas wall! That mural ________ incredible.',
    category: 'opinion',
    options: ['looks', 'sounds', 'hears', 'listens'],
    correctAnswer: 'looks',
    explanation: 'We use "looks" when an impression is based on visual observation (what we see with our eyes).',
    ruleTag: 'Opinion / Perception (looks)'
  },
  {
    id: 'g_5',
    prompt: 'Excuse me, ________ mind holding my portfolio while I grab my camera?',
    category: 'polite_request',
    options: ['would you', 'do you will', 'are you', 'could you will'],
    correctAnswer: 'would you',
    explanation: 'The formula "Would you mind + verb-ing...?" is a polite request used in collaborative settings.',
    ruleTag: 'Polite Request (Would you mind...)'
  },
  {
    id: 'g_6',
    prompt: 'A: "I can’t reach the top of the exhibition board." — B: "No problem, I ________ a hand with that."',
    category: 'instant_decision',
    options: ["'ll give you", "give you", "am giving you", "have given you"],
    correctAnswer: "'ll give you",
    explanation: 'Offering immediate help on the spot is expressed using "will" (\'ll + base verb).',
    ruleTag: 'Spontaneous Offer (will)'
  }
];

// Activity 6: The Arts Festival Challenge (Multiplayer Game Prompts from Teacher's Guide Page 34)
export const ARTS_FESTIVAL_CHALLENGES: ChallengeScenario[] = [
  {
    id: 'ch_1',
    title: 'Lost Ticket Emergency',
    situation: 'You are at the festival entrance, and your friend cannot find his / her ticket. What will you do?',
    requiredFunction: 'Instant Decision (will)',
    modelPrompt: 'Respond with a quick decision using "will" or "I\'ll..."',
    exampleAnswers: [
      "Don't worry! I'll speak to the student coordinator at the welcome desk.",
      "Stay calm! I'll look through my bag and help you search for it.",
      "I'll pull up my email confirmation and see if your barcode is there."
    ],
    grammarChunk: "I'll + verb (instant decision)",
    badgeColor: 'border-amber-400 bg-amber-50 text-amber-900'
  },
  {
    id: 'ch_2',
    title: 'New Sculpture Impression',
    situation: 'You see a dramatic new sculpture made of recycled scrap metal at the festival. Give your opinion about it!',
    requiredFunction: 'Give an Opinion (looks / sounds / seems)',
    modelPrompt: 'Express an opinion using "looks", "seems to be", or "appears to be".',
    exampleAnswers: [
      "It looks super modern and seems to express the impact of city life.",
      "That sculpture appears to be made entirely from repurposed bicycle parts!",
      "It looks fascinating and seems to carry a strong ecological message."
    ],
    grammarChunk: "It looks... / It seems to be...",
    badgeColor: 'border-blue-400 bg-blue-50 text-blue-900'
  },
  {
    id: 'ch_3',
    title: 'Song Request to the Band',
    situation: 'You want to ask a live indie band if they could play your favourite song during the intermission. Make a polite request.',
    requiredFunction: 'Polite Request (Could you / Would you mind)',
    modelPrompt: 'Formulate a polite request with "Could you...?" or "Would you mind...?"',
    exampleAnswers: [
      "Excuse me, could you please play your acoustic track next?",
      "Would you mind playing our favourite song before your set ends?",
      "Could you dedicate your next song to our school group, please?"
    ],
    grammarChunk: "Could you please...? / Would you mind playing...?",
    badgeColor: 'border-purple-400 bg-purple-50 text-purple-900'
  },
  {
    id: 'ch_4',
    title: 'Workshop Recommendation',
    situation: 'Your friend is unsure whether to join the pottery workshop or the graffiti mural. Give your opinion and advice.',
    requiredFunction: 'Give an Opinion (looks / sounds / seems)',
    modelPrompt: 'Use opinion verbs ("sounds", "looks", "seems to be") to help your friend decide.',
    exampleAnswers: [
      "The graffiti workshop sounds more exciting because you can paint freely on the giant wall!",
      "The pottery studio looks really relaxing and you get to take your creation home.",
      "The dance masterclass seems to be full of energy, so I think you'll love it."
    ],
    grammarChunk: "It sounds / looks like the best option because...",
    badgeColor: 'border-emerald-400 bg-emerald-50 text-emerald-900'
  },
  {
    id: 'ch_5',
    title: 'Sudden Hunger Attack',
    situation: 'You are walking past the festival food trucks and suddenly feel hungry. Make an instant decision about what to eat.',
    requiredFunction: 'Instant Decision (will)',
    modelPrompt: 'Use "will" (\'ll) to decide on food right on the spot.',
    exampleAnswers: [
      "I'm starving! I'll grab an açaí bowl and a warm pastel right now.",
      "The smell of grilled skewers is irresistible. I'll get in line over there!",
      "I'll buy a fresh passionfruit juice and two cheese breads for us."
    ],
    grammarChunk: "I'll buy / get / order...",
    badgeColor: 'border-orange-400 bg-orange-50 text-orange-900'
  },
  {
    id: 'ch_6',
    title: 'Celebrity Artist Line',
    situation: 'A famous street artist is taking selfies with fans, but the line has over 40 people. What will you do?',
    requiredFunction: 'Instant Decision (will)',
    modelPrompt: 'Make a spontaneous choice on the spot using "will".',
    exampleAnswers: [
      "I don't mind waiting! I'll stay in line with you so we can get an autograph.",
      "The queue is huge! I'll visit the photo gallery first and come back later.",
      "I'll hold our place in line while you go grab some cold drinks."
    ],
    grammarChunk: "I'll wait / I'll return later / I'll hold our spot...",
    badgeColor: 'border-pink-400 bg-pink-50 text-pink-900'
  },
  {
    id: 'ch_7',
    title: 'Unfamiliar Dance Style',
    situation: 'A dancer is performing a style of street dance (Pilolo) you have never seen before. Share your thoughts with a friend.',
    requiredFunction: 'Give an Opinion (looks / sounds / seems)',
    modelPrompt: 'Share sensory impressions using "looks", "seems to be", or "appears to be".',
    exampleAnswers: [
      "Her footwork appears to be incredibly complex and fast-paced!",
      "This performance looks full of joy and cultural heritage.",
      "The rhythm seems to be from Ghana; it sounds energetic and infectious!"
    ],
    grammarChunk: "Her style looks... / The choreography seems to be...",
    badgeColor: 'border-cyan-400 bg-cyan-50 text-cyan-900'
  },
  {
    id: 'ch_8',
    title: 'Ear-Splitting Speakers',
    situation: 'The sound system at the side stage is extremely loud and vibrating uncomfortably. Make a polite request to the sound engineer.',
    requiredFunction: 'Polite Request (Could you / Would you mind)',
    modelPrompt: 'Politely ask the technician using "Would you mind...?" or "Could you...?"',
    exampleAnswers: [
      "Excuse me, would you mind lowering the master volume a little bit?",
      "Could you please check the speaker balance? The treble is very piercing.",
      "Would you mind pointing that monitor away from the front row?"
    ],
    grammarChunk: "Would you mind lowering...? / Could you adjust...?",
    badgeColor: 'border-red-400 bg-red-50 text-red-900'
  },
  {
    id: 'ch_9',
    title: 'Photo in Front of the Mural',
    situation: 'You and your friends want a group photo in front of the 20-meter Kobra-style mural. Make a polite request to a passerby.',
    requiredFunction: 'Polite Request (Could you / Would you mind)',
    modelPrompt: 'Ask someone politely to take your picture using "Could you...?"',
    exampleAnswers: [
      "Hi there! Could you take a quick photo of our group in front of the mural?",
      "Excuse me, would you mind snapping a picture of us with this camera?",
      "Could you please take one photo horizontally so the whole artwork shows?"
    ],
    grammarChunk: "Could you take a photo...? / Would you mind snapping...?",
    badgeColor: 'border-teal-400 bg-teal-50 text-teal-900'
  }
];

// Activity 7 / SEL: Brazilian Street Artists spotlight (Teacher's Guide Page 34)
export const BRAZILIAN_STREET_ARTISTS: StreetArtistProfile[] = [
  {
    id: 'kobra',
    name: 'Eduardo Kobra',
    city: 'São Paulo, Brazil',
    style: 'Kaleidoscopic realism, bright geometric patterns, photorealistic portraits',
    signatureTheme: 'Peace, tolerance, memory, human rights and environmental conservation',
    famousArtwork: 'Etnias (The Peace Mural, Rio Olympics 2016)',
    quote: '"My art is for everyone on the street. It breathes color into the grey concrete."',
    reflectionQuestion: 'How does transforming a public wall into vibrant art change how people feel about their neighbourhood?'
  },
  {
    id: 'osgemeos',
    name: 'Os Gêmeos (Gustavo & Otávio Pandolfo)',
    city: 'São Paulo, Brazil',
    style: 'Yellow-skinned characters, dreamlike surrealism, Brazilian folklore and hip-hop roots',
    signatureTheme: 'Dreams, social commentary, imagination and brotherhood',
    famousArtwork: 'The Giant in Vancouver & São Paulo Urban Murals',
    quote: '"We paint the world we see in our dreams so that waking life feels less lonely."',
    reflectionQuestion: 'What emotions do the whimsical yellow characters evoke when you look at them?'
  },
  {
    id: 'cranio',
    name: 'Cranio (Fabio de Oliveira Parnaiba)',
    city: 'São Paulo, Brazil',
    style: 'Blue indigenous characters in contemporary urban situations',
    signatureTheme: 'Preserving indigenous culture, consumerism critique and nature protection',
    famousArtwork: 'Blue Forest Keepers in Urban Jungles',
    quote: '"I use my art to provoke reflection on what we value versus what nature gives us."',
    reflectionQuestion: 'How can street art help us reflect critically on modern consumer habits?'
  },
  {
    id: 'koubik',
    name: 'Kelvin Koubik',
    city: 'Porto Alegre, Brazil',
    style: 'Large-scale botanical & biological murals, native fauna and flora',
    signatureTheme: 'Biodiversity, water preservation and Brazilian biomes',
    famousArtwork: 'Rivers & Roots of Rio Grande do Sul',
    quote: '"Painting nature in urban centers reminds citizens of the living world beneath their feet."',
    reflectionQuestion: 'If you were to paint a mural for your school, what ecological message would you choose?'
  }
];
