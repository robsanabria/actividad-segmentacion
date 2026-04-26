import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { profile } = request.body;
    
    if (!profile) {
      return response.status(400).json({ error: 'Profile is required' });
    }

    // Increment the score for the specific profile
    const newValue = await kv.hincrby('pd2_segmentation_scores', profile, 1);

    return response.status(200).json({ success: true, profile, newValue });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
