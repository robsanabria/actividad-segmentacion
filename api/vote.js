import { Redis } from '@upstash/redis';

const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { profile, questionIndex, optionIndex } = request.body;
    
    if (!profile) {
      return response.status(400).json({ error: 'Profile is required' });
    }

    // 1. Increment global profile score (for final result)
    await kv.hincrby('pd2_segmentation_scores', profile, 1);
    
    // 2. Increment specific question option score (for live bars)
    let newValue = 1;
    if (questionIndex !== undefined && optionIndex !== undefined) {
      newValue = await kv.hincrby('pd2_question_scores', `q${questionIndex}_opt${optionIndex}`, 1);
    }

    return response.status(200).json({ success: true, profile, newValue });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
