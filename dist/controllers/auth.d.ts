import * as puppeteer from 'puppeteer';
/**
 * Validates if client is authenticated
 * @returns true if is authenticated, false otherwise
 * @param waPage
 */
export declare const isAuthenticated: (waPage: puppeteer.Page) => Promise<boolean>;
export declare const needsToScan: (waPage: puppeteer.Page) => import("rxjs").Observable<boolean>;
export declare const isInsideChat: (waPage: puppeteer.Page) => import("rxjs").Observable<boolean>;
export declare function retrieveQR(page: puppeteer.Page): Promise<{
    code: string;
    data: string;
    asciiQR: string;
}>;
