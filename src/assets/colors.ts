/**
 * RIA SDK Color Palette
 * Minimal color set extracted from Rently Design System
 * Only includes colors actually used in RIA chatbot components
 */

const Colors = {
  /**
   * Neutral - (Licorice)
   * Used for text, borders, backgrounds
   */
  neutral: {
    50: "#F9FAFB",   // Light border
    100: "#F3F4F6",  // Background
    300: "#D1D5DB",  // Border
    400: "#9CA3AF",  // Placeholder text
    500: "#6B7280",  // Secondary text, shadows
    600: "#4B5563",  // Timestamp text
    700: "#374151",  // Icon colors
    800: "#1F2937",  // Primary text
  },

  /**
   * Secondary - (Dark Cornflower Blue)
   * Used for primary actions
   */
  secondary: {
    600: "#0E3290",  // Send button background
  },

  /**
   * Tertiary - (Contrast Blue)
   * Used for selections and highlights
   */
  tertiary: {
    200: "#64B8E8",  // Selected state background
    600: "#115882",  // Disclaimer text color
  },

  /**
   * Shades - (Generic)
   * Black and white
   */
  shades: {
    transparent: "transparent",
    0: "#FFFFFF",    // White - backgrounds, badge backgrounds
    200: "#000000",  // Black - text on badges
  },

  /**
   * Background and Overlays
   * Special backgrounds for chat bot
   */
  "background-overlays": {
    /**
     * (Faded Blue - 8% opacity)
     * Original: #406CA3 - 8%
     */
    600: "rgba(64, 108, 163, 0.08)",
    /**
     * (Faded Blue - 16% opacity)
     * Original: #406CA3 - 16%
     */
    601: "rgba(64, 108, 163, 0.16)",
  },

  /**
   * Chat Bot specific backgrounds
   */
  "chat-bot": {
    /**
     * (Chat Bot Background - 70% opacity)
     */
    100: 'rgba(241, 248, 255, 0.7)',
    /**
     * (Chat Bot Background - 90% opacity)
     */
    200: 'rgba(241, 248, 255, 0.9)',
  }
} as const;

export { Colors as RDColors };
