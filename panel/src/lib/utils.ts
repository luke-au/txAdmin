import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import humanizeDuration from '@/lib/humanizeDuration';
import { io } from "socket.io-client";


/**
 * clsx then tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


/**
 * Validates if a redirect path is valid or not.
 * To prevent open redirect, we need to make sure the first char is / and the second is not,
 * otherwise //example.com would be a valid redirect to <proto>://example.com
 */
export function isValidRedirectPath(location: unknown) {
    if (typeof location !== 'string' || !location) return false;
    const url = new URL(location, window.location.href);
    return location.startsWith('/') && !location.startsWith('//') && url.hostname === window.location.hostname;
}


/**
 * Removes the indentation of multiline strings based on the minimum length of indentation
 */
export const stripIndent = (src: string) => {
    const indentSearchRegex = /^[ \t]*(?=\S)/gm;
    const indents = src.substring(src.indexOf('\n')).match(indentSearchRegex);
    if (!indents) return src;
    const minIndent = indents.reduce((r, a) => Math.min(r, a.length), Infinity);
    const indentRemoverRegex = new RegExp(`^[ \\t]{${minIndent}}`, 'gm');
    return src.replace(indentRemoverRegex, '');
};


/**
 * Converts a number of milliseconds to english words
 * Accepts a humanizeDuration config object
 * eg: msToDuration(ms, { units: ['h', 'm'] });
 */
export const msToDuration = humanizeDuration.humanizer({
    round: true,
});


/**
 * Converts a number of milliseconds to short english words
 * Accepts a humanizeDuration config object
 * eg: msToDuration(ms, { units: ['h', 'm'] });
 */
export const msToShortDuration = humanizeDuration.humanizer({
    round: true,
    spacer: '',
    language: 'shortEn',
});


/**
 * Converts a timestamp to a locale date string
 */
export const tsToLocaleDate = (
    ts: number,
    dateStyle: 'full' | 'long' | 'medium' | 'short' = 'long',
) => {
    return new Date(ts * 1000)
        .toLocaleDateString(
            navigator.language,
            { dateStyle }
        );
}

/**
 * Translates a timestamp into a localized date time string
 */
export const tsToLocaleDateTime = (
    ts: number,
    dateStyle: 'full' | 'long' | 'medium' | 'short' = 'long',
    timeStyle: 'full' | 'long' | 'medium' | 'short' = 'medium',
) => {
    return new Date(ts * 1000)
        .toLocaleString(
            navigator.language,
            { dateStyle, timeStyle }
        );
}


/**
 * Returns a socket.io client instance
 */
export const getSocket = (rooms: string[] | string) => {
    const socketOpts = {
        transports: ['polling'],
        upgrade: false,
        query: {
            rooms,
            uiVersion: window.txConsts.txaVersion,
        }
    };

    const socket = window.txConsts.isWebInterface
        ? io({ ...socketOpts, path: '/socket.io' })
        : io('monitor', { ...socketOpts, path: '/WebPipe/socket.io' });

    return socket;
}


/**
 * Opens a link in a new tab, or calls the native function to open a link in the default browser
 */
export const openExternalLink = (url: string) => {
    if (!url) return;
    if (window.invokeNative) {
        window.invokeNative('openUrl', url);
    } else {
        window.open(url, '_blank');
    }
}


/**
 * Overwrites the href behavior in NUI to open external links
 */
export const handleExternalLinkClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (window.txConsts.isWebInterface) return;
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;

    event.preventDefault();
    openExternalLink(href);
}


/**
 * Returns a random hsl() color - useful for testing react rendering stuff
 */
export const createRandomHslColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 65%)`;
}


/**
 * Copy text to clipboard.
 * Because we don't have access to Clipboard API in FiveM's CEF, as well as on
 * non-localhost origins without https, we need to use the old school method.
 * FIXME: literally not working
 */
export const copyToClipboard = async (value: string) => {
    if (navigator?.clipboard) { 
        return navigator.clipboard.writeText(value);
    } else {
        const clipElem = document.createElement("textarea");
        clipElem.value = value;
        document.body.appendChild(clipElem);
        clipElem.select();
        const result = document.execCommand("copy");
        document.body.removeChild(clipElem);
        return result;
    }
}
