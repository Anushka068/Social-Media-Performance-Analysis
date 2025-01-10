// src/utils/validateInput.js
export const validateQuery = (query) => {
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query');
    }
  };
  