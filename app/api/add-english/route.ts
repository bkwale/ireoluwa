import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Add English Language unit and topics WITHOUT touching existing data
 * This route safely adds English curriculum to existing database
 */
export async function GET() {
  try {
    console.log('Adding English Language unit...');

    // Check if English unit already exists
    let unit7 = await prisma.unit.findFirst({
      where: { code: 'UNIT_7' },
    });

    if (!unit7) {
      // Create English unit
      unit7 = await prisma.unit.create({
        data: {
          code: 'UNIT_7',
          name: 'English Language',
          description: 'Reading comprehension, grammar, vocabulary, writing techniques, spelling',
          order: 7,
        },
      });
      console.log('Created English unit');
    } else {
      console.log('English unit already exists');
    }

    // Check if topics exist
    const existingTopics = await prisma.topic.findMany({
      where: { unitId: unit7.id },
    });

    if (existingTopics.length === 0) {
      // Create English topics
      const topics7Data = [
        { name: 'Reading Comprehension', description: 'Understanding texts, identifying main ideas and inferences', order: 1 },
        { name: 'Grammar & Punctuation', description: 'Sentence structure, verb tenses, punctuation rules', order: 2 },
        { name: 'Vocabulary', description: 'Word meanings, synonyms, antonyms, context clues', order: 3 },
        { name: 'Writing Techniques', description: 'Persuasive writing, literary devices, tone and style', order: 4 },
        { name: 'Spelling', description: 'Common spelling rules, homophones, frequently misspelled words', order: 5 },
        { name: 'Sentence Construction', description: 'Building effective sentences, avoiding fragments and run-ons', order: 6 },
      ];

      for (const topic of topics7Data) {
        await prisma.topic.create({
          data: { ...topic, unitId: unit7.id, difficulty: 'INTERMEDIATE' },
        });
      }
      console.log('Created 6 English topics');
    } else {
      console.log(`English topics already exist (${existingTopics.length} topics)`);
    }

    // Get all English topics
    const allEnglishTopics = await prisma.topic.findMany({
      where: { unitId: unit7.id },
    });

    const readingTopic = allEnglishTopics.find(t => t.name === 'Reading Comprehension');
    const grammarTopic = allEnglishTopics.find(t => t.name === 'Grammar & Punctuation');
    const vocabTopic = allEnglishTopics.find(t => t.name === 'Vocabulary');
    const writingTopic = allEnglishTopics.find(t => t.name === 'Writing Techniques');
    const spellingTopic = allEnglishTopics.find(t => t.name === 'Spelling');
    const sentenceTopic = allEnglishTopics.find(t => t.name === 'Sentence Construction');

    // Check if problems already exist
    const existingProblems = await prisma.problem.count({
      where: {
        topic: { unitId: unit7.id }
      },
    });

    if (existingProblems > 0) {
      return NextResponse.json({
        success: true,
        message: 'English unit already set up!',
        counts: {
          unit: 1,
          topics: allEnglishTopics.length,
          problems: existingProblems,
        },
        note: 'English curriculum already exists. Visit /api/seed-english to add more questions.',
      });
    }

    // Add sample English problems (10 per topic to start)
    const problems: any[] = [];

    // Sample grammar questions
    if (grammarTopic) {
      const grammarSamples = [
        {
          question: 'Which sentence uses correct past tense?',
          correctAnswer: 'She went to the shop yesterday',
          wrongAnswers: ['She goed to the shop yesterday', 'She goes to the shop yesterday', 'She going to the shop yesterday'],
          explanation: 'The past tense of "go" is "went", not "goed".',
        },
        {
          question: 'Choose the correctly punctuated sentence:',
          correctAnswer: 'The teacher said, "Please sit down."',
          wrongAnswers: ['The teacher said "Please sit down".', 'The teacher said, Please sit down.', 'The teacher said "Please sit down."'],
          explanation: 'Direct speech needs quotation marks, with punctuation inside the quotes.',
        },
        {
          question: 'Which sentence uses commas correctly?',
          correctAnswer: 'I need eggs, milk, bread, and butter',
          wrongAnswers: ['I need eggs milk bread and butter', 'I need, eggs, milk, bread, and, butter', 'I need eggs, milk bread, and butter'],
          explanation: 'Commas separate items in a list.',
        },
      ];

      for (const q of grammarSamples) {
        problems.push({
          topicId: grammarTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'grammar,gcse',
          estimatedTime: 90,
          examRelevance: true,
        });
      }
    }

    // Sample vocabulary questions
    if (vocabTopic) {
      const vocabSamples = [
        {
          question: 'What does "benevolent" mean?',
          correctAnswer: 'Kind and generous',
          wrongAnswers: ['Cruel', 'Confused', 'Wealthy'],
          explanation: 'Benevolent means well-meaning and kindly.',
        },
        {
          question: 'Choose the best synonym for "abundant":',
          correctAnswer: 'Plentiful',
          wrongAnswers: ['Scarce', 'Expensive', 'Tiny'],
          explanation: 'Abundant means existing in large quantities; plentiful.',
        },
      ];

      for (const q of vocabSamples) {
        problems.push({
          topicId: vocabTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'vocabulary,gcse',
          estimatedTime: 90,
          examRelevance: true,
        });
      }
    }

    // Sample writing techniques
    if (writingTopic) {
      const writingSamples = [
        {
          question: 'Which technique is used: "The wind whispered through the trees"?',
          correctAnswer: 'Personification',
          wrongAnswers: ['Simile', 'Metaphor', 'Alliteration'],
          explanation: 'Personification gives human qualities to non-human things.',
        },
        {
          question: 'Identify the literary device: "She was as brave as a lion"',
          correctAnswer: 'Simile',
          wrongAnswers: ['Metaphor', 'Personification', 'Hyperbole'],
          explanation: 'A simile compares two things using "like" or "as".',
        },
      ];

      for (const q of writingSamples) {
        problems.push({
          topicId: writingTopic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          template: q.question,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: q.correctAnswer,
            wrongAnswers: q.wrongAnswers,
            explanation: q.explanation,
          }),
          tags: 'writing,techniques,gcse',
          estimatedTime: 60,
          examRelevance: true,
        });
      }
    }

    // Add spelling samples
    if (spellingTopic) {
      problems.push({
        topicId: spellingTopic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which spelling is correct?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Definitely',
          wrongAnswers: ['Definately', 'Definetly', 'Defiantly'],
          explanation: '"Definitely" has "finite" in it - think "definite".',
        }),
        tags: 'spelling,gcse',
        estimatedTime: 75,
        examRelevance: true,
      });
    }

    // Insert sample problems
    if (problems.length > 0) {
      await prisma.problem.createMany({ data: problems });
    }

    const finalCounts = {
      units: await prisma.unit.count(),
      topics: await prisma.topic.count(),
      englishTopics: allEnglishTopics.length,
      problems: await prisma.problem.count(),
      englishProblems: problems.length,
    };

    return NextResponse.json({
      success: true,
      message: 'English Language unit added successfully!',
      counts: finalCounts,
      note: 'Sample English questions added. Visit /api/seed-english for 145+ more questions.',
    });
  } catch (error: any) {
    console.error('Error adding English:', error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
