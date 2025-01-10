// src/pages/api/analyze.js
import { analyzeWithLangFlow } from '../../services/langflowService.js';
import { insertAnalysis } from '../../services/dbService.js';
import { generateUUID } from '../../utils/generateUUID.js';
import { validateQuery } from '../../utils/validateInput.js';
import { errorHandler } from '../../utils/errorHandler.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { query } = req.body;
    validateQuery(query);

    const langflowResult = await analyzeWithLangFlow(query);
    const id = generateUUID();
    const timestamp = new Date().toISOString();

    await insertAnalysis(id, query, langflowResult.response, timestamp);

    res.status(200).json({ id, response: langflowResult.response });
  } catch (error) {
    errorHandler(res, error);
  }
}
