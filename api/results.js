import { Redis } from '@upstash/redis';

const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get all scores from the hash
    let scores = await kv.hgetall('pd2_segmentation_scores');
    let questionScores = await kv.hgetall('pd2_question_scores');
    
    // If it's empty/null, initialize it
    if (!scores) {
      scores = {
        Frutinovelas: 0,
        Doomscroller: 0,
        CEO: 0,
        Conspiranoico: 0
      };
    } else {
      // Ensure all profiles exist in the response even if they have 0 votes
      const profiles = ['Frutinovelas', 'Doomscroller', 'CEO', 'Conspiranoico'];
      profiles.forEach(p => {
        if (scores[p] === undefined) scores[p] = 0;
      });
    }

    if (!questionScores) {
      questionScores = {};
    }

    return response.status(200).json({ profiles: scores, questions: questionScores });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
