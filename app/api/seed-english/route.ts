import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get all English topics
    const englishUnit = await prisma.unit.findFirst({
      where: { code: 'UNIT_7' },
      include: { topics: true },
    });

    if (!englishUnit) {
      return NextResponse.json({ error: 'English unit not found. Run /api/setup-db first.' }, { status: 404 });
    }

    const problems: any[] = [];

    // Find topic IDs
    const readingTopic = englishUnit.topics.find(t => t.name === 'Reading Comprehension');
    const grammarTopic = englishUnit.topics.find(t => t.name === 'Grammar & Punctuation');
    const vocabTopic = englishUnit.topics.find(t => t.name === 'Vocabulary');
    const writingTopic = englishUnit.topics.find(t => t.name === 'Writing Techniques');
    const spellingTopic = englishUnit.topics.find(t => t.name === 'Spelling');
    const sentenceTopic = englishUnit.topics.find(t => t.name === 'Sentence Construction');

    // READING COMPREHENSION (20 questions)
    const readingPassages = [
      {
        passage: `Renewable energy sources are becoming increasingly important in the fight against climate change. Solar panels convert sunlight into electricity, while wind turbines harness the power of moving air. Unlike fossil fuels, these energy sources do not produce harmful emissions and are naturally replenished.`,
        questions: [
          {
            question: 'What is the main purpose of this passage?',
            correctAnswer: 'To explain the benefits of renewable energy',
            wrongAnswers: ['To criticize fossil fuels', 'To describe how solar panels work', 'To discuss climate change solutions'],
            explanation: 'The passage focuses on explaining renewable energy sources and their advantages.',
          },
          {
            question: 'According to the passage, what do solar panels and wind turbines have in common?',
            correctAnswer: 'They both produce clean energy',
            wrongAnswers: ['They both use water', 'They both require batteries', 'They both work at night'],
            explanation: 'The passage states both are renewable sources that do not produce harmful emissions.',
          },
          {
            question: 'What can be inferred about fossil fuels from this passage?',
            correctAnswer: 'They produce harmful emissions',
            wrongAnswers: ['They are renewable', 'They are more efficient', 'They are naturally replenished'],
            explanation: 'The passage contrasts renewable sources with fossil fuels, noting renewables do not produce harmful emissions.',
          },
        ],
      },
      {
        passage: `The Industrial Revolution transformed society in the 18th and 19th centuries. Factories replaced home-based production, cities grew rapidly, and new inventions like the steam engine revolutionized transportation. However, these changes also brought challenges including poor working conditions and pollution.`,
        questions: [
          {
            question: 'Which word best describes the author\'s tone in this passage?',
            correctAnswer: 'Balanced',
            wrongAnswers: ['Entirely positive', 'Completely negative', 'Humorous'],
            explanation: 'The author presents both benefits (transformation, inventions) and drawbacks (poor conditions, pollution).',
          },
          {
            question: 'What is the main idea of this passage?',
            correctAnswer: 'The Industrial Revolution brought both progress and problems',
            wrongAnswers: ['The steam engine was the most important invention', 'Cities should not have grown so quickly', 'Factories were better than home production'],
            explanation: 'The passage discusses transformations and inventions, but also mentions the challenges they brought.',
          },
        ],
      },
      {
        passage: `Effective time management is crucial for academic success. Students should create a study schedule, prioritize important tasks, and avoid procrastination. Breaking large assignments into smaller, manageable parts can make them less overwhelming and easier to complete.`,
        questions: [
          {
            question: 'According to the passage, how can large assignments be made easier?',
            correctAnswer: 'By breaking them into smaller parts',
            wrongAnswers: ['By doing them at the last minute', 'By ignoring them', 'By asking others to do them'],
            explanation: 'The passage explicitly states breaking assignments into smaller parts makes them less overwhelming.',
          },
          {
            question: 'What is the author\'s purpose in writing this passage?',
            correctAnswer: 'To advise students on managing their time',
            wrongAnswers: ['To criticize procrastination', 'To explain why students fail', 'To describe study schedules'],
            explanation: 'The passage provides practical advice about time management for academic success.',
          },
        ],
      },
    ];

    if (readingTopic) {
      let questionNum = 1;
      for (const item of readingPassages) {
        for (const q of item.questions) {
          problems.push({
            topicId: readingTopic.id,
            type: 'MULTIPLE_CHOICE',
            difficulty: 'MEDIUM',
            template: `Read the passage below and answer the question.\n\n${item.passage}\n\nQuestion: ${q.question}`,
            variables: '{}',
            solution: JSON.stringify({
              correctAnswer: q.correctAnswer,
              wrongAnswers: q.wrongAnswers,
              explanation: q.explanation,
            }),
            tags: 'reading,comprehension,gcse',
            estimatedTime: 120,
            examRelevance: true,
          });
          questionNum++;
        }
      }

      // Additional inference and detail questions
      const additionalReading = [
        {
          question: 'A text states: "Despite the rain, the match continued." What can be inferred?',
          correctAnswer: 'The rain was not heavy enough to stop the match',
          wrongAnswers: ['The match was cancelled', 'Everyone got wet', 'The players complained'],
          explanation: 'The word "despite" indicates the match went on in spite of the rain.',
        },
        {
          question: 'An article says: "The experiment yielded unexpected results." What does "yielded" mean here?',
          correctAnswer: 'Produced',
          wrongAnswers: ['Destroyed', 'Avoided', 'Questioned'],
          explanation: 'In this context, "yielded" means produced or gave as a result.',
        },
        {
          question: 'A passage describes someone as "meticulous." What does this suggest about them?',
          correctAnswer: 'They pay careful attention to detail',
          wrongAnswers: ['They are careless', 'They work slowly', 'They are friendly'],
          explanation: 'Meticulous means showing great attention to detail; very careful and precise.',
        },
      ];

      for (const q of additionalReading) {
        problems.push({
          topicId: readingTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'reading,inference,vocabulary',
          estimatedTime: 90,
          examRelevance: true,
        });
      }
    }

    // GRAMMAR & PUNCTUATION (25 questions)
    const grammarQuestions = [
      // Verb Tenses
      {
        question: 'Which sentence uses the correct past tense?',
        correctAnswer: 'She went to the shop yesterday',
        wrongAnswers: ['She goed to the shop yesterday', 'She goes to the shop yesterday', 'She going to the shop yesterday'],
        explanation: 'The past tense of "go" is "went", not "goed".',
        difficulty: 'EASY',
      },
      {
        question: 'Identify the sentence with correct subject-verb agreement:',
        correctAnswer: 'The students are studying for their exams',
        wrongAnswers: ['The students is studying for their exams', 'The student are studying for their exams', 'The students be studying for their exams'],
        explanation: 'Plural subject "students" requires the plural verb "are".',
        difficulty: 'EASY',
      },
      {
        question: 'Which sentence is in the present perfect tense?',
        correctAnswer: 'I have finished my homework',
        wrongAnswers: ['I finish my homework', 'I finished my homework', 'I am finishing my homework'],
        explanation: 'Present perfect uses "have/has" + past participle to show completed action.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence correctly uses the future tense?',
        correctAnswer: 'They will arrive at 3pm',
        wrongAnswers: ['They arriving at 3pm', 'They arrives at 3pm', 'They arrived at 3pm'],
        explanation: 'Future tense uses "will" + base form of the verb.',
        difficulty: 'EASY',
      },
      // Punctuation
      {
        question: 'Which sentence is punctuated correctly?',
        correctAnswer: "It's a beautiful day, isn't it?",
        wrongAnswers: ["Its a beautiful day, isnt it?", "It's a beautiful day isnt it?", "Its a beautiful day, isn't it?"],
        explanation: "Contractions need apostrophes: it's (it is), isn't (is not). Questions end with a question mark.",
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the correctly punctuated sentence:',
        correctAnswer: 'The teacher said, "Please sit down."',
        wrongAnswers: ['The teacher said "Please sit down".', 'The teacher said, Please sit down.', 'The teacher said "Please sit down."'],
        explanation: 'Direct speech needs quotation marks, with punctuation inside the quotes.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence uses commas correctly?',
        correctAnswer: 'I need eggs, milk, bread, and butter',
        wrongAnswers: ['I need eggs milk bread and butter', 'I need, eggs, milk, bread, and, butter', 'I need eggs, milk bread, and butter'],
        explanation: 'Commas separate items in a list.',
        difficulty: 'EASY',
      },
      {
        question: 'Identify the correctly punctuated sentence:',
        correctAnswer: 'However, we decided to continue',
        wrongAnswers: ['However we decided to continue', 'However; we decided to continue', 'However: we decided to continue'],
        explanation: 'Introductory words like "however" are followed by a comma.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence uses apostrophes correctly?',
        correctAnswer: "The dog's collar is red",
        wrongAnswers: ["The dogs' collar is red", "The dog's collar's is red", "The dogs collar is red"],
        explanation: "For singular possession, use apostrophe + s (dog's = belonging to one dog).",
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the sentence with correct apostrophe use for plural possession:',
        correctAnswer: "The teachers' staffroom is upstairs",
        wrongAnswers: ["The teacher's staffroom is upstairs", "The teachers staffroom is upstairs", "The teacher's' staffroom is upstairs"],
        explanation: "For plural possession ending in 's', add apostrophe after the s (teachers').",
        difficulty: 'HARD',
      },
      // Sentence Types
      {
        question: 'Which of these is a complex sentence?',
        correctAnswer: 'Although it was raining, we went outside',
        wrongAnswers: ['It was raining and we went outside', 'We went outside', 'It was raining'],
        explanation: 'A complex sentence has a main clause and a subordinate clause (starting with "although").',
        difficulty: 'HARD',
      },
      {
        question: 'Identify the compound sentence:',
        correctAnswer: 'I studied hard, so I passed the exam',
        wrongAnswers: ['I studied hard and passed the exam', 'Because I studied hard, I passed', 'I studied hard'],
        explanation: 'A compound sentence joins two independent clauses with a coordinating conjunction (so).',
        difficulty: 'MEDIUM',
      },
      // Parts of Speech
      {
        question: 'In the sentence "The quick brown fox jumped swiftly," what is "swiftly"?',
        correctAnswer: 'An adverb',
        wrongAnswers: ['An adjective', 'A verb', 'A noun'],
        explanation: 'Adverbs describe how an action is performed. "Swiftly" describes how the fox jumped.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What part of speech is "and" in "bread and butter"?',
        correctAnswer: 'Conjunction',
        wrongAnswers: ['Preposition', 'Adverb', 'Pronoun'],
        explanation: '"And" is a conjunction that connects words or phrases.',
        difficulty: 'EASY',
      },
      {
        question: 'In "The cat sat on the mat," what is "on"?',
        correctAnswer: 'A preposition',
        wrongAnswers: ['A verb', 'An adjective', 'An adverb'],
        explanation: 'Prepositions show relationships between words, often indicating position or direction.',
        difficulty: 'EASY',
      },
      // Common Errors
      {
        question: 'Which sentence is grammatically correct?',
        correctAnswer: 'She and I went to the cinema',
        wrongAnswers: ['Her and me went to the cinema', 'Her and I went to the cinema', 'She and me went to the cinema'],
        explanation: 'Use subject pronouns (I, she) when they are the subject of the sentence.',
        difficulty: 'HARD',
      },
      {
        question: 'Choose the correct sentence:',
        correctAnswer: 'There are fewer people here today',
        wrongAnswers: ['There are less people here today', 'There is fewer people here today', 'There is less people here today'],
        explanation: 'Use "fewer" for countable nouns (people), "less" for uncountable nouns.',
        difficulty: 'HARD',
      },
      {
        question: 'Which sentence is correct?',
        correctAnswer: 'The effect of the experiment was surprising',
        wrongAnswers: ['The affect of the experiment was surprising', 'The effect of the experiment were surprising', 'The affects of the experiment was surprising'],
        explanation: '"Effect" is a noun meaning result; "affect" is a verb meaning to influence.',
        difficulty: 'HARD',
      },
      {
        question: 'Identify the correct usage:',
        correctAnswer: 'You should have gone earlier',
        wrongAnswers: ['You should of gone earlier', 'You should have went earlier', 'You should of went earlier'],
        explanation: 'The correct form is "should have" (not "should of") + past participle "gone".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence uses "their/there/they\'re" correctly?',
        correctAnswer: 'They\'re going to their house over there',
        wrongAnswers: ['Their going to they\'re house over there', 'There going to their house over they\'re', 'They\'re going to there house over their'],
        explanation: 'They\'re = they are, their = belonging to them, there = place.',
        difficulty: 'MEDIUM',
      },
    ];

    if (grammarTopic) {
      for (const q of grammarQuestions) {
        problems.push({
          topicId: grammarTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: q.difficulty || 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'grammar,punctuation,gcse',
          estimatedTime: q.difficulty === 'EASY' ? 60 : q.difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }
    }

    // VOCABULARY (20 questions)
    const vocabQuestions = [
      {
        question: 'What does "benevolent" mean?',
        correctAnswer: 'Kind and generous',
        wrongAnswers: ['Cruel', 'Confused', 'Wealthy'],
        explanation: 'Benevolent means well-meaning and kindly.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the best synonym for "abundant":',
        correctAnswer: 'Plentiful',
        wrongAnswers: ['Scarce', 'Expensive', 'Tiny'],
        explanation: 'Abundant means existing in large quantities; plentiful.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What is an antonym of "transparent"?',
        correctAnswer: 'Opaque',
        wrongAnswers: ['Clear', 'Visible', 'Honest'],
        explanation: 'Opaque means not transparent; not able to be seen through.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What does "conscientious" mean?',
        correctAnswer: 'Careful and thorough',
        wrongAnswers: ['Lazy', 'Quick', 'Loud'],
        explanation: 'Conscientious means wishing to do what is right and taking care to do things well.',
        difficulty: 'HARD',
      },
      {
        question: 'Choose the word that means "to make worse":',
        correctAnswer: 'Exacerbate',
        wrongAnswers: ['Alleviate', 'Improve', 'Strengthen'],
        explanation: 'Exacerbate means to make a problem or situation worse.',
        difficulty: 'HARD',
      },
      {
        question: 'What does "ambiguous" mean?',
        correctAnswer: 'Unclear or having multiple meanings',
        wrongAnswers: ['Very clear', 'Expensive', 'Quick'],
        explanation: 'Ambiguous means open to more than one interpretation; not clear.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which word means "short-lived" or "lasting a very short time"?',
        correctAnswer: 'Ephemeral',
        wrongAnswers: ['Eternal', 'Permanent', 'Ancient'],
        explanation: 'Ephemeral means lasting for a very short time.',
        difficulty: 'HARD',
      },
      {
        question: 'What does "diligent" mean?',
        correctAnswer: 'Hard-working and careful',
        wrongAnswers: ['Lazy', 'Careless', 'Slow'],
        explanation: 'Diligent means showing care and effort in your work.',
        difficulty: 'EASY',
      },
      {
        question: 'Choose the synonym for "pessimistic":',
        correctAnswer: 'Negative',
        wrongAnswers: ['Optimistic', 'Happy', 'Excited'],
        explanation: 'Pessimistic means tending to see the worst aspect of things; negative.',
        difficulty: 'EASY',
      },
      {
        question: 'What does "resilient" mean?',
        correctAnswer: 'Able to recover quickly from difficulties',
        wrongAnswers: ['Weak', 'Brittle', 'Soft'],
        explanation: 'Resilient means able to withstand or recover quickly from difficult conditions.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'In context: "The evidence was irrefutable." What does "irrefutable" mean?',
        correctAnswer: 'Impossible to deny or disprove',
        wrongAnswers: ['Questionable', 'Weak', 'Hidden'],
        explanation: 'Irrefutable means impossible to deny or disprove; undeniable.',
        difficulty: 'HARD',
      },
      {
        question: 'What does "contemporary" mean?',
        correctAnswer: 'Belonging to the present time; modern',
        wrongAnswers: ['Ancient', 'Future', 'Medieval'],
        explanation: 'Contemporary means living or occurring at the same time; modern.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the word that means "relevant to the subject":',
        correctAnswer: 'Pertinent',
        wrongAnswers: ['Irrelevant', 'Boring', 'Complicated'],
        explanation: 'Pertinent means relevant or applicable to a particular matter.',
        difficulty: 'HARD',
      },
      {
        question: 'What does "articulate" mean when describing a person?',
        correctAnswer: 'Able to express ideas clearly',
        wrongAnswers: ['Unable to speak', 'Confused', 'Angry'],
        explanation: 'Articulate means having or showing the ability to speak fluently and clearly.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What is the meaning of "advocate" as a verb?',
        correctAnswer: 'To publicly support or recommend',
        wrongAnswers: ['To oppose', 'To ignore', 'To question'],
        explanation: 'To advocate means to publicly recommend or support a cause or policy.',
        difficulty: 'MEDIUM',
      },
    ];

    // Tier 3 Vocabulary - Advanced adjectives to replace basic words (user requested)
    const tier3VocabQuestions = [
      {
        question: 'Which Tier 3 word best replaces "happy" in: "She was very happy about the news"?',
        correctAnswer: 'Elated',
        wrongAnswers: ['Sad', 'Okay', 'Fine'],
        explanation: 'Elated means extremely happy and excited - a sophisticated replacement for "very happy".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose a better word than "sad": "He felt sad after losing the match"',
        correctAnswer: 'Despondent',
        wrongAnswers: ['Happy', 'Tired', 'Hungry'],
        explanation: 'Despondent means in low spirits from loss of hope or courage - more precise than "sad".',
        difficulty: 'HARD',
      },
      {
        question: 'Replace "angry" with a Tier 3 word: "She was angry about the decision"',
        correctAnswer: 'Incensed',
        wrongAnswers: ['Pleased', 'Bored', 'Confused'],
        explanation: 'Incensed means very angry; enraged - a sophisticated alternative to "angry".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What sophisticated word could replace "scared" in: "The child was scared of the dark"?',
        correctAnswer: 'Terrified',
        wrongAnswers: ['Brave', 'Calm', 'Interested'],
        explanation: 'Terrified means extremely frightened - more vivid than "scared".',
        difficulty: 'EASY',
      },
      {
        question: 'Which word is better than "tired": "After the marathon, he felt tired"?',
        correctAnswer: 'Exhausted',
        wrongAnswers: ['Energetic', 'Fresh', 'Alert'],
        explanation: 'Exhausted means completely drained of energy - more descriptive than "tired".',
        difficulty: 'EASY',
      },
      {
        question: 'Replace "big" with Tier 3 vocabulary: "They lived in a big house"',
        correctAnswer: 'Spacious',
        wrongAnswers: ['Tiny', 'Small', 'Narrow'],
        explanation: 'Spacious means having ample space - more sophisticated than "big" for describing buildings.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What word enhances "beautiful": "The sunset was beautiful"?',
        correctAnswer: 'Breathtaking',
        wrongAnswers: ['Ugly', 'Plain', 'Dull'],
        explanation: 'Breathtaking means astonishingly beautiful - more impactful than "beautiful".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose a better word than "good": "She gave a good presentation"',
        correctAnswer: 'Exemplary',
        wrongAnswers: ['Bad', 'Poor', 'Weak'],
        explanation: 'Exemplary means serving as a desirable model; outstanding - more precise than "good".',
        difficulty: 'HARD',
      },
      {
        question: 'Replace "bad" in: "The weather was bad during our trip"',
        correctAnswer: 'Atrocious',
        wrongAnswers: ['Perfect', 'Nice', 'Pleasant'],
        explanation: 'Atrocious means horrifyingly bad - much stronger than "bad".',
        difficulty: 'HARD',
      },
      {
        question: 'What Tier 3 word replaces "excited": "The children were excited about the trip"?',
        correctAnswer: 'Enthusiastic',
        wrongAnswers: ['Bored', 'Uninterested', 'Apathetic'],
        explanation: 'Enthusiastic means having intense and eager enjoyment - more sophisticated than "excited".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose a better word than "quiet": "The library was very quiet"',
        correctAnswer: 'Serene',
        wrongAnswers: ['Noisy', 'Loud', 'Chaotic'],
        explanation: 'Serene means calm, peaceful, and untroubled - more evocative than "quiet".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Replace "smart" in: "She is a smart student"',
        correctAnswer: 'Astute',
        wrongAnswers: ['Foolish', 'Ignorant', 'Unintelligent'],
        explanation: 'Astute means having sharp judgment; shrewd - more sophisticated than "smart".',
        difficulty: 'HARD',
      },
      {
        question: 'What word improves "old": "The old building stood at the corner"?',
        correctAnswer: 'Ancient',
        wrongAnswers: ['New', 'Modern', 'Contemporary'],
        explanation: 'Ancient means belonging to the very distant past - more descriptive than "old".',
        difficulty: 'EASY',
      },
      {
        question: 'Choose a Tier 3 replacement for "cold": "It was a cold winter morning"',
        correctAnswer: 'Frigid',
        wrongAnswers: ['Warm', 'Hot', 'Boiling'],
        explanation: 'Frigid means extremely cold - more vivid than "cold".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Replace "interesting" in: "The documentary was interesting"',
        correctAnswer: 'Captivating',
        wrongAnswers: ['Boring', 'Dull', 'Tedious'],
        explanation: 'Captivating means capable of attracting and holding interest - stronger than "interesting".',
        difficulty: 'MEDIUM',
      },
    ];

    if (vocabTopic) {
      // Add original vocabulary questions
      for (const q of vocabQuestions) {
        problems.push({
          topicId: vocabTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: q.difficulty || 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'vocabulary,words,gcse',
          estimatedTime: q.difficulty === 'EASY' ? 60 : q.difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }

      // Add Tier 3 vocabulary questions
      for (const q of tier3VocabQuestions) {
        problems.push({
          topicId: vocabTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: q.difficulty || 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'vocabulary,tier3,advanced,gcse',
          estimatedTime: q.difficulty === 'EASY' ? 60 : q.difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }
    }

    // WRITING TECHNIQUES (15 questions)
    const writingQuestions = [
      {
        question: 'Which technique is being used: "The wind whispered through the trees"?',
        correctAnswer: 'Personification',
        wrongAnswers: ['Simile', 'Metaphor', 'Alliteration'],
        explanation: 'Personification gives human qualities (whispering) to non-human things (wind).',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Identify the literary device: "She was as brave as a lion"',
        correctAnswer: 'Simile',
        wrongAnswers: ['Metaphor', 'Personification', 'Hyperbole'],
        explanation: 'A simile compares two things using "like" or "as".',
        difficulty: 'EASY',
      },
      {
        question: 'What device is used here: "Time is a thief"?',
        correctAnswer: 'Metaphor',
        wrongAnswers: ['Simile', 'Personification', 'Onomatopoeia'],
        explanation: 'A metaphor makes a direct comparison without using "like" or "as".',
        difficulty: 'EASY',
      },
      {
        question: 'Which technique is shown: "Peter Piper picked a peck of pickled peppers"?',
        correctAnswer: 'Alliteration',
        wrongAnswers: ['Rhyme', 'Simile', 'Metaphor'],
        explanation: 'Alliteration is the repetition of the same sound at the start of words.',
        difficulty: 'EASY',
      },
      {
        question: 'Identify the device: "I\'ve told you a million times!"',
        correctAnswer: 'Hyperbole',
        wrongAnswers: ['Understatement', 'Metaphor', 'Simile'],
        explanation: 'Hyperbole is exaggerated statements not meant to be taken literally.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What is the tone of this sentence: "The magnificent sunset painted the sky with brilliant colours"?',
        correctAnswer: 'Admiring and descriptive',
        wrongAnswers: ['Angry and hostile', 'Sad and depressing', 'Humorous and playful'],
        explanation: 'Words like "magnificent" and "brilliant" create an admiring, appreciative tone.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'In persuasive writing, what is the purpose of rhetorical questions?',
        correctAnswer: 'To make the reader think and engage with the argument',
        wrongAnswers: ['To confuse the reader', 'To ask for information', 'To avoid making a point'],
        explanation: 'Rhetorical questions engage readers by making them consider the answer.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence starter is most effective for a persuasive essay?',
        correctAnswer: 'It is undeniable that...',
        wrongAnswers: ['I think maybe...', 'Some people might say...', 'Perhaps it could be...'],
        explanation: 'Strong, confident language is more persuasive than uncertain phrases.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What is the main purpose of a topic sentence?',
        correctAnswer: 'To introduce the main idea of a paragraph',
        wrongAnswers: ['To conclude the paragraph', 'To provide evidence', 'To entertain the reader'],
        explanation: 'A topic sentence states the main point that the paragraph will develop.',
        difficulty: 'EASY',
      },
      {
        question: 'In formal writing, which is most appropriate?',
        correctAnswer: 'Furthermore, this demonstrates...',
        wrongAnswers: ['And also, this shows...', 'Plus, this is like...', 'And then it shows...'],
        explanation: 'Formal writing uses sophisticated connectives like "furthermore".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which technique creates suspense: "The door creaked open slowly. A shadow moved in the darkness."?',
        correctAnswer: 'Short sentences and sensory details',
        wrongAnswers: ['Long, complex sentences', 'Humorous language', 'Factual description'],
        explanation: 'Short sentences and mysterious details build tension and suspense.',
        difficulty: 'HARD',
      },
      {
        question: 'What is anaphora in writing?',
        correctAnswer: 'Repetition of a word or phrase at the start of successive clauses',
        wrongAnswers: ['Using many adjectives', 'Asking questions', 'Making comparisons'],
        explanation: 'Anaphora repeats words/phrases for emphasis (e.g., "We shall fight... We shall never surrender...").',
        difficulty: 'HARD',
      },
      {
        question: 'Which connective shows contrast?',
        correctAnswer: 'However',
        wrongAnswers: ['Additionally', 'Furthermore', 'Similarly'],
        explanation: '"However" introduces a contrasting or opposing point.',
        difficulty: 'EASY',
      },
      {
        question: 'What makes a strong conclusion in an essay?',
        correctAnswer: 'Summarizing main points and reinforcing the argument',
        wrongAnswers: ['Introducing completely new ideas', 'Apologizing for your opinions', 'Asking what the reader thinks'],
        explanation: 'Effective conclusions summarize and reinforce without introducing new information.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'In descriptive writing, which is most effective?',
        correctAnswer: 'The ancient oak groaned under the weight of winter snow',
        wrongAnswers: ['The tree had snow on it', 'There was a tree and it was snowing', 'A tree was there'],
        explanation: 'Effective description uses specific details, strong verbs, and imagery.',
        difficulty: 'HARD',
      },
    ];

    // Additional Writing Techniques (user requested)
    const additionalWritingTechniques = [
      {
        question: 'Identify the technique: "She sells seashells by the seashore"',
        correctAnswer: 'Alliteration',
        wrongAnswers: ['Assonance', 'Consonance', 'Onomatopoeia'],
        explanation: 'Alliteration is the repetition of the same consonant sound at the beginning of words.',
        difficulty: 'EASY',
      },
      {
        question: 'What is the purpose of using anecdotes in persuasive writing?',
        correctAnswer: 'To make arguments more relatable and engaging through personal stories',
        wrongAnswers: ['To confuse the reader', 'To avoid making a clear point', 'To fill up space'],
        explanation: 'Anecdotes are short personal stories that make writing more engaging and relatable.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which of these is an example of a rhetorical question?',
        correctAnswer: 'Is it not our duty to protect the environment for future generations?',
        wrongAnswers: ['What time does the meeting start?', 'Can you pass me the book?', 'Where did you go yesterday?'],
        explanation: 'Rhetorical questions don\'t require an answer; they make the reader think about the obvious answer.',
        difficulty: 'EASY',
      },
      {
        question: 'Identify the technique: "We must act now. We must change. We must succeed."',
        correctAnswer: 'Repetition (Anaphora)',
        wrongAnswers: ['Alliteration', 'Simile', 'Metaphor'],
        explanation: 'Repetition of "We must" at the start of each sentence creates emphasis and rhythm.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence uses emotive language most effectively?',
        correctAnswer: 'Innocent children are suffering from devastating hunger',
        wrongAnswers: ['Children are hungry', 'Some people don\'t have food', 'There is a food shortage'],
        explanation: 'Words like "innocent," "suffering," and "devastating" create emotional impact.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What is exaggeration (hyperbole) used for in writing?',
        correctAnswer: 'To emphasize a point or create dramatic effect',
        wrongAnswers: ['To lie to the reader', 'To be mathematically precise', 'To confuse the audience'],
        explanation: 'Hyperbole uses exaggeration for emphasis or effect, not to be taken literally.',
        difficulty: 'EASY',
      },
      {
        question: 'Why are statistics effective in persuasive writing?',
        correctAnswer: 'They provide concrete evidence and credibility to arguments',
        wrongAnswers: ['They make writing longer', 'They confuse the reader', 'They are always true'],
        explanation: 'Statistics add factual support and make arguments more convincing.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Identify the Rule of Three: Which is most effective?',
        correctAnswer: 'This policy is unfair, unjust, and unacceptable',
        wrongAnswers: ['This policy is bad', 'This policy is unfair and wrong', 'This policy is unfair, unjust, unacceptable, and terrible'],
        explanation: 'The Rule of Three uses three related words/phrases for impact and memorability.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What is juxtaposition in writing?',
        correctAnswer: 'Placing contrasting ideas or images side by side for effect',
        wrongAnswers: ['Using the same word repeatedly', 'Comparing two things with "like" or "as"', 'Giving human qualities to objects'],
        explanation: 'Juxtaposition highlights differences by placing contrasting elements together.',
        difficulty: 'HARD',
      },
      {
        question: 'Which example demonstrates juxtaposition?',
        correctAnswer: 'The palace gleamed with gold while beggars starved in the streets',
        wrongAnswers: ['The palace was very beautiful', 'The palace was like a golden castle', 'The palace sparkled'],
        explanation: 'The contrast between wealth (palace/gold) and poverty (beggars/starved) creates juxtaposition.',
        difficulty: 'HARD',
      },
      {
        question: 'What is foreshadowing?',
        correctAnswer: 'Hints or clues about events that will happen later in the story',
        wrongAnswers: ['Describing past events', 'Using shadows in descriptions', 'Making predictions about real life'],
        explanation: 'Foreshadowing gives the reader hints about future plot developments.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Identify foreshadowing: "The sky darkened ominously as she set off on her journey"',
        correctAnswer: 'The dark sky hints that trouble is coming',
        wrongAnswers: ['It\'s just a weather description', 'She likes dark weather', 'The journey will be quick'],
        explanation: 'The ominous darkening sky suggests difficulties ahead.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'What is a cyclical narrative structure?',
        correctAnswer: 'A story that ends where it began, creating a circle',
        wrongAnswers: ['A story about bicycles', 'A story with many cycles', 'A confusing story structure'],
        explanation: 'Cyclical narratives return to the opening scene or idea at the end.',
        difficulty: 'HARD',
      },
      {
        question: 'Which sentence uses the Rule of Three effectively for persuasion?',
        correctAnswer: 'We need action, commitment, and change',
        wrongAnswers: ['We need action', 'We need action and commitment', 'We need action, commitment, change, and determination'],
        explanation: 'Three powerful words create a memorable, rhythmic impact.',
        difficulty: 'EASY',
      },
      {
        question: 'Why might a writer use a cyclical structure?',
        correctAnswer: 'To show how the character has changed while returning to familiar setting',
        wrongAnswers: ['To confuse the reader', 'Because they forgot the beginning', 'To make the story shorter'],
        explanation: 'Cyclical structures emphasize character growth by contrasting the beginning and end.',
        difficulty: 'HARD',
      },
    ];

    if (writingTopic) {
      // Add original writing questions
      for (const q of writingQuestions) {
        problems.push({
          topicId: writingTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: q.difficulty || 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'writing,techniques,gcse',
          estimatedTime: q.difficulty === 'EASY' ? 60 : q.difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }

      // Add additional writing techniques
      for (const q of additionalWritingTechniques) {
        problems.push({
          topicId: writingTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: q.difficulty || 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'writing,techniques,persuasive,gcse',
          estimatedTime: q.difficulty === 'EASY' ? 60 : q.difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }
    }

    // SPELLING (15 questions)
    const spellingQuestions = [
      {
        question: 'Which spelling is correct?',
        correctAnswer: 'Definitely',
        wrongAnswers: ['Definately', 'Definetly', 'Defiantly'],
        explanation: '"Definitely" has "finite" in it - think "definite".',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the correct spelling:',
        correctAnswer: 'Necessary',
        wrongAnswers: ['Neccessary', 'Necessery', 'Neccesary'],
        explanation: 'Necessary: one collar (c) and two sleeves (ss).',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which is spelled correctly?',
        correctAnswer: 'Accommodation',
        wrongAnswers: ['Accomodation', 'Acommodation', 'Acomodation'],
        explanation: 'Accommodation has double c and double m.',
        difficulty: 'HARD',
      },
      {
        question: 'Select the correct spelling:',
        correctAnswer: 'Separate',
        wrongAnswers: ['Seperate', 'Separete', 'Seprate'],
        explanation: 'Separate has "a rat" in it - sep-a-rate.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which spelling is correct?',
        correctAnswer: 'Occurred',
        wrongAnswers: ['Occured', 'Ocurred', 'Ocured'],
        explanation: 'Occurred doubles the r before adding -ed.',
        difficulty: 'HARD',
      },
      {
        question: 'Choose the correct spelling:',
        correctAnswer: 'Rhythm',
        wrongAnswers: ['Rythm', 'Rhythem', 'Rythym'],
        explanation: 'Rhythm: "Rhythm Helps Your Two Hips Move".',
        difficulty: 'HARD',
      },
      {
        question: 'Which is spelled correctly?',
        correctAnswer: 'Receive',
        wrongAnswers: ['Recieve', 'Receeve', 'Receve'],
        explanation: '"I before E except after C" - receive follows this rule.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Select the correct spelling:',
        correctAnswer: 'Believe',
        wrongAnswers: ['Beleive', 'Belive', 'Beleeve'],
        explanation: '"I before E except after C" - believe follows this rule.',
        difficulty: 'EASY',
      },
      {
        question: 'Which spelling is correct?',
        correctAnswer: 'Environment',
        wrongAnswers: ['Enviroment', 'Enviorment', 'Enviornment'],
        explanation: 'Environment: "iron" is in the environment.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the correct spelling:',
        correctAnswer: 'Conscience',
        wrongAnswers: ['Concience', 'Consience', 'Conscence'],
        explanation: 'Conscience ends in -ence and has "sci" in the middle.',
        difficulty: 'HARD',
      },
      {
        question: 'Which homophone fits: "_____ going to the park"?',
        correctAnswer: "They're",
        wrongAnswers: ['Their', 'There', 'Theyre'],
        explanation: "They're is the contraction of 'they are'.",
        difficulty: 'EASY',
      },
      {
        question: 'Complete: "The decision will _____ everyone"',
        correctAnswer: 'Affect',
        wrongAnswers: ['Effect', 'Afect', 'Efect'],
        explanation: '"Affect" is the verb meaning to influence; "effect" is usually a noun.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which is correct: "I _____ the advice"?',
        correctAnswer: 'Accept',
        wrongAnswers: ['Except', 'Acsept', 'Exept'],
        explanation: '"Accept" means to receive; "except" means excluding.',
        difficulty: 'EASY',
      },
      {
        question: 'Choose the correct spelling:',
        correctAnswer: 'Embarrass',
        wrongAnswers: ['Embarass', 'Embarras', 'Embaress'],
        explanation: 'Embarrass has double r and double s.',
        difficulty: 'HARD',
      },
      {
        question: 'Which is spelled correctly?',
        correctAnswer: 'Privilege',
        wrongAnswers: ['Priviledge', 'Privilage', 'Privlege'],
        explanation: 'Privilege: ends in -lege (not -ledge).',
        difficulty: 'HARD',
      },
    ];

    if (spellingTopic) {
      for (const q of spellingQuestions) {
        problems.push({
          topicId: spellingTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: q.difficulty || 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'spelling,homophones,gcse',
          estimatedTime: q.difficulty === 'EASY' ? 60 : q.difficulty === 'MEDIUM' ? 75 : 90,
          examRelevance: true,
        });
      }
    }

    // SENTENCE CONSTRUCTION (15 questions)
    const sentenceQuestions = [
      {
        question: 'Which is a complete sentence?',
        correctAnswer: 'The cat slept on the mat.',
        wrongAnswers: ['The cat on the mat.', 'Slept on the mat.', 'On the mat.'],
        explanation: 'A complete sentence needs a subject (cat) and a verb (slept).',
        difficulty: 'EASY',
      },
      {
        question: 'Identify the sentence fragment:',
        correctAnswer: 'Because it was raining.',
        wrongAnswers: ['It was raining.', 'We stayed inside because it was raining.', 'The rain stopped.'],
        explanation: 'Starting with "because" creates a fragment without a main clause.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which is a run-on sentence?',
        correctAnswer: 'I went to the shop I bought milk.',
        wrongAnswers: ['I went to the shop, and I bought milk.', 'I went to the shop. I bought milk.', 'After going to the shop, I bought milk.'],
        explanation: 'Two independent clauses joined without proper punctuation create a run-on.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'How can you fix this run-on: "The test was hard I studied all night"?',
        correctAnswer: 'The test was hard, so I studied all night.',
        wrongAnswers: ['The test was hard I studied all night.', 'The test was hard studied all night.', 'The test was, hard I studied all night.'],
        explanation: 'Add a comma and conjunction (so) to properly connect the clauses.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence is most concise and effective?',
        correctAnswer: 'The meeting starts at 9am.',
        wrongAnswers: ['The meeting is going to be starting at 9am.', 'At 9am is when the meeting will start.', 'The meeting, it starts at the time of 9am.'],
        explanation: 'Concise writing avoids unnecessary words while maintaining clarity.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the sentence with parallel structure:',
        correctAnswer: 'She likes reading, writing, and painting.',
        wrongAnswers: ['She likes reading, to write, and painting.', 'She likes to read, writing, and to paint.', 'She likes reading, writing, and to paint.'],
        explanation: 'Parallel structure uses the same grammatical form for items in a list.',
        difficulty: 'HARD',
      },
      {
        question: 'Which sentence varies sentence structure effectively?',
        correctAnswer: 'Although tired, she finished her homework. The next test would be challenging.',
        wrongAnswers: ['She was tired. She finished homework. The test would be hard.', 'She was tired and finished homework and the test would be hard.', 'She was tired, she finished homework, the test would be hard.'],
        explanation: 'Varying sentence length and structure makes writing more engaging.',
        difficulty: 'HARD',
      },
      {
        question: 'What is wrong with: "Walking down the street, the trees looked beautiful"?',
        correctAnswer: 'Dangling modifier - the trees weren\'t walking',
        wrongAnswers: ['Nothing is wrong', 'Missing punctuation', 'Run-on sentence'],
        explanation: 'The modifier "walking down the street" should describe a person, not trees.',
        difficulty: 'HARD',
      },
      {
        question: 'Which sentence correctly combines these: "The dog barked. It was loud"?',
        correctAnswer: 'The dog barked loudly.',
        wrongAnswers: ['The dog it barked loud.', 'The dog, barked loud.', 'The dog loud barked.'],
        explanation: 'Combining sentences by converting adjectives to adverbs creates concise writing.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Identify the sentence with correct modifier placement:',
        correctAnswer: 'She almost drove to every state in the country.',
        wrongAnswers: ['She drove almost to every state in the country.', 'Almost she drove to every state in the country.', 'She drove to almost every state in the country.'],
        explanation: '"Almost" should modify "every state" to show she didn\'t quite visit all of them.',
        difficulty: 'HARD',
      },
      {
        question: 'Which sentence uses a subordinate clause correctly?',
        correctAnswer: 'When the bell rang, students left the classroom.',
        wrongAnswers: ['When the bell rang students left the classroom.', 'The bell rang, when students left the classroom.', 'When the bell, rang students left the classroom.'],
        explanation: 'Subordinate clauses at the start of a sentence need a comma after them.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Choose the most effective sentence opening:',
        correctAnswer: 'Despite the challenges, we succeeded.',
        wrongAnswers: ['There were challenges but we succeeded.', 'We succeeded and there were challenges.', 'Challenges were there we succeeded.'],
        explanation: 'Starting with a subordinate clause creates variety and sophistication.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which sentence avoids passive voice most effectively?',
        correctAnswer: 'The committee approved the proposal.',
        wrongAnswers: ['The proposal was approved by the committee.', 'Approval of the proposal was given by the committee.', 'The proposal received approval from the committee.'],
        explanation: 'Active voice (subject + verb + object) is usually clearer and more direct.',
        difficulty: 'HARD',
      },
      {
        question: 'Identify the correctly constructed complex sentence:',
        correctAnswer: 'If you study regularly, you will improve your grades.',
        wrongAnswers: ['If you study regularly you will improve your grades.', 'You study regularly, you will improve your grades.', 'If you study regularly. You will improve your grades.'],
        explanation: 'Complex sentences join a subordinate clause (if...) with a main clause, using a comma.',
        difficulty: 'MEDIUM',
      },
      {
        question: 'Which demonstrates effective use of a colon?',
        correctAnswer: 'She had one goal: to pass her exams.',
        wrongAnswers: ['She had: one goal to pass her exams.', 'She had one: goal to pass her exams.', 'She had one goal to pass: her exams.'],
        explanation: 'Colons introduce explanations or lists that follow a complete clause.',
        difficulty: 'HARD',
      },
    ];

    if (sentenceTopic) {
      for (const q of sentenceQuestions) {
        problems.push({
          topicId: sentenceTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: q.difficulty || 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'sentences,construction,gcse',
          estimatedTime: q.difficulty === 'EASY' ? 60 : q.difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }
    }

    // Create all problems
    await prisma.problem.createMany({ data: problems });

    const totalProblems = await prisma.problem.count();
    const englishProblems = problems.length;

    return NextResponse.json({
      success: true,
      message: 'English practice questions created!',
      englishProblems,
      totalProblems,
      breakdown: {
        'Reading Comprehension': problems.filter(p => p.topicId === readingTopic?.id).length,
        'Grammar & Punctuation': problems.filter(p => p.topicId === grammarTopic?.id).length,
        'Vocabulary': problems.filter(p => p.topicId === vocabTopic?.id).length,
        'Writing Techniques': problems.filter(p => p.topicId === writingTopic?.id).length,
        'Spelling': problems.filter(p => p.topicId === spellingTopic?.id).length,
        'Sentence Construction': problems.filter(p => p.topicId === sentenceTopic?.id).length,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
