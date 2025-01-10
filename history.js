// src/pages/api/history.js
import { fetchHistory } from '../../services/dbService.js';
import { errorHandler } from '../../utils/errorHandler.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const history = await fetchHistory();
    res.status(200).json({ history });
  } catch (error) {
    errorHandler(res, error);
  }
}
