import { clearSessionCookie, createSessionCookie, hasValidSession, passwordMatches, sameOrigin } from '../server/security.js';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method === 'GET') {
    return hasValidSession(request)
      ? response.status(200).json({ authenticated: true })
      : response.status(401).json({ authenticated: false });
  }

  if (request.method === 'POST') {
    if (!sameOrigin(request)) return response.status(403).json({ error: 'Origem inválida.' });
    if (!process.env.APP_PASSWORD || !process.env.SESSION_SECRET) {
      return response.status(503).json({ error: 'Configure APP_PASSWORD e SESSION_SECRET.' });
    }
    if (!passwordMatches(request.body?.password)) return response.status(401).json({ error: 'Senha inválida.' });
    response.setHeader('Set-Cookie', createSessionCookie());
    return response.status(200).json({ authenticated: true });
  }

  if (request.method === 'DELETE') {
    if (!sameOrigin(request)) return response.status(403).json({ error: 'Origem inválida.' });
    response.setHeader('Set-Cookie', clearSessionCookie());
    return response.status(200).json({ authenticated: false });
  }

  response.setHeader('Allow', 'GET, POST, DELETE');
  return response.status(405).json({ error: 'Método não permitido.' });
}
