"use strict";

/**
 * Generate a random key for chat messages
 */
export const generateRandomKey = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
//# sourceMappingURL=chatbotHelperFunctions.js.map