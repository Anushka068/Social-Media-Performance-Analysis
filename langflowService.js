// src/services/langflowService.js
import fetch from 'node-fetch';

const LANGFLOW_API_URL = process.env.LANGFLOW_API_URL;
const LANGFLOW_API_KEY = process.env.LANGFLOW_API_KEY;

export const analyzeWithLangFlow = async (query) => {
  const response = await fetch(LANGFLOW_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LANGFLOW_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      model: 'gemini-pro',
      options: {
        temperature: 0.7,
        max_tokens: 1000,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analysis from LangFlow');
  }

  return response.json();
};
