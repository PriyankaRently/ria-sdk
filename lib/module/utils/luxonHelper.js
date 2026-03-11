"use strict";

/**
 * Date/time helper utilities using native JavaScript Date
 * (Replaces luxon dependency for lightweight SDK)
 */
export const luxonHelper = {
  getCurrentDateTime(format = 'yyyy-MM-dd HH:mm:ss') {
    const now = new Date();

    // Simple format support for common patterns
    if (format === 'h:mm a') {
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${displayHours}:${displayMinutes} ${ampm}`;
    }

    // Default ISO format
    return now.toISOString();
  },
  formatDateTime(dateTime, format) {
    const date = new Date(dateTime);
    if (format === 'h:mm a') {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${displayHours}:${displayMinutes} ${ampm}`;
    }
    return date.toISOString();
  },
  now() {
    return new Date();
  }
};
//# sourceMappingURL=luxonHelper.js.map