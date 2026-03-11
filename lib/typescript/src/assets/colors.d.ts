/**
 * RIA SDK Color Palette
 * Minimal color set extracted from Rently Design System
 * Only includes colors actually used in RIA chatbot components
 */
declare const Colors: {
    /**
     * Neutral - (Licorice)
     * Used for text, borders, backgrounds
     */
    readonly neutral: {
        readonly 50: "#F9FAFB";
        readonly 100: "#F3F4F6";
        readonly 300: "#D1D5DB";
        readonly 400: "#9CA3AF";
        readonly 500: "#6B7280";
        readonly 600: "#4B5563";
        readonly 700: "#374151";
        readonly 800: "#1F2937";
    };
    /**
     * Secondary - (Dark Cornflower Blue)
     * Used for primary actions
     */
    readonly secondary: {
        readonly 600: "#0E3290";
    };
    /**
     * Tertiary - (Contrast Blue)
     * Used for selections and highlights
     */
    readonly tertiary: {
        readonly 200: "#64B8E8";
        readonly 600: "#115882";
    };
    /**
     * Shades - (Generic)
     * Black and white
     */
    readonly shades: {
        readonly transparent: "transparent";
        readonly 0: "#FFFFFF";
        readonly 200: "#000000";
    };
    /**
     * Background and Overlays
     * Special backgrounds for chat bot
     */
    readonly "background-overlays": {
        /**
         * (Faded Blue - 8% opacity)
         * Original: #406CA3 - 8%
         */
        readonly 600: "rgba(64, 108, 163, 0.08)";
        /**
         * (Faded Blue - 16% opacity)
         * Original: #406CA3 - 16%
         */
        readonly 601: "rgba(64, 108, 163, 0.16)";
    };
    /**
     * Chat Bot specific backgrounds
     */
    readonly "chat-bot": {
        /**
         * (Chat Bot Background - 70% opacity)
         */
        readonly 100: "rgba(241, 248, 255, 0.7)";
        /**
         * (Chat Bot Background - 90% opacity)
         */
        readonly 200: "rgba(241, 248, 255, 0.9)";
    };
};
export { Colors as RDColors };
//# sourceMappingURL=colors.d.ts.map