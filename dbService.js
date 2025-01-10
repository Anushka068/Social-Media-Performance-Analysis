// src/services/dbService.js
import client from '../db/astraClient.js';

export const insertAnalysis = async (id, queryText, responseText, timestamp) => {
  const query = `
    INSERT INTO social_media_analysis (id, query_text, response_text, timestamp)
    VALUES (?, ?, ?, ?)
  `;
  await client.execute(query, [id, queryText, responseText, timestamp], { prepare: true });
};

export const fetchHistory = async () => {
  const query = 'SELECT * FROM social_media_analysis';
  const result = await client.execute(query);
  return result.rows;
};
