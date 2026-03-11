/**
 * Generate a random key for chat messages
 */
export const generateRandomKey = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
