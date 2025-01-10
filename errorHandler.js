// src/utils/errorHandler.js
export const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  };
  