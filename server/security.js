import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'meu_ritmo_session';
const SESSION_SECONDS = 60 * 60 * 24 * 30;

function safeEqual(left, right) {
  const a = Buffer.from(String(left ?? ''));
  const b = Buffer.from(String(right ?? ''));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwordMatches(candidate) {
  return Boolean(process.env.APP_PASSWORD) && safeEqual(candidate, process.env.APP_PASSWORD);
}

export function createSessionCookie() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const signature = createHmac('sha256', process.env.SESSION_SECRET).update(String(expires)).digest('base64url');
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `${COOKIE_NAME}=${expires}.${signature}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export function hasValidSession(request) {
  if (!process.env.SESSION_SECRET) return false;
  const cookie = String(request.headers.cookie ?? '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return false;
  const token = cookie.slice(COOKIE_NAME.length + 1);
  const [expires, signature] = token.split('.');
  if (!/^\d+$/.test(expires || '') || Number(expires) <= Math.floor(Date.now() / 1000) || !signature) return false;
  const expected = createHmac('sha256', process.env.SESSION_SECRET).update(expires).digest('base64url');
  return safeEqual(signature, expected);
}

export function sameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.host;
  } catch {
    return false;
  }
}
