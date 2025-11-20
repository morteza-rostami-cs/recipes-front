// src/utils/truncateText.js

/**
 * Truncates text to a specified length and adds ellipsis if needed.
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis if longer than maxLength
 */
export const truncateText = (text, maxLength) => {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
};
