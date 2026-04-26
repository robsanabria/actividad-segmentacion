import { Redis } from '@upstash/redis';

const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(request, response) {
  if (request.method === 'GET') {
    try {
      let state = await kv.hgetall('pd2_game_state');
      if (!state) {
        state = { gameState: 'start', currentQuestionIndex: 0 };
      }
      return response.status(200).json(state);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  } 
  
  if (request.method === 'POST') {
    try {
      const { gameState, currentQuestionIndex, resetVotes } = request.body;
      
      if (resetVotes) {
        // Reset all votes to 0
        await kv.del('pd2_segmentation_scores');
      }

      await kv.hset('pd2_game_state', {
        gameState: gameState || 'start',
        currentQuestionIndex: currentQuestionIndex || 0
      });

      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
