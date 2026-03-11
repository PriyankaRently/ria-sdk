/**
 * Date/time helper utilities using native JavaScript Date
 * (Replaces luxon dependency for lightweight SDK)
 */
export declare const luxonHelper: {
    getCurrentDateTime(format?: string): string;
    formatDateTime(dateTime: string, format: string): string;
    now(): Date;
};
//# sourceMappingURL=luxonHelper.d.ts.map