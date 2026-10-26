import { randomUUID } from 'node:crypto';
import { hasValidSession, sameOrigin } from '../server/security.js';

export const config = {
  api: { bodyParser: { sizeLimit: '3mb' } },
};

const BUCKET = 'activity-images';
const MIME_EXTENSIONS = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const IMAGE_PATH = /^activities\/[0-9a-f-]{36}\.(?:jpg|png|webp)$/i;

function storageConfig() {
  const base = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!base || !key) throw new Error('Supabase environment variables are missing.');
  return { base, headers: { apikey: key } };
}

function safePath(value) {
  const path = String(value || '');
  return IMAGE_PATH.test(path) ? path : '';
}

function escapedPath(path) {
  return path.split('/').map(encodeURIComponent).join('/');
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (!hasValidSession(request)) return response.status(401).json({ error: 'Faça login para continuar.' });

  try {
    const { base, headers } = storageConfig();
    if (request.method === 'POST') {
      if (!sameOrigin(request)) return response.status(403).json({ error: 'Origem inválida.' });
      const contentType = String(request.body?.contentType || '');
      const extension = MIME_EXTENSIONS[contentType];
      const encoded = String(request.body?.image || '');
      if (!extension || !/^[A-Za-z0-9+/]+=*$/.test(encoded)) return response.status(400).json({ error: 'Formato de imagem inválido.' });
      const bytes = Buffer.from(encoded, 'base64');
      if (!bytes.length || bytes.length > 1_300_000) return response.status(413).json({ error: 'A imagem ficou grande demais. Tente um print menor.' });
      const path = `activities/${randomUUID()}.${extension}`;
      const upload = await fetch(`${base}/storage/v1/object/${BUCKET}/${escapedPath(path)}`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': contentType, 'x-upsert': 'false' },
        body: bytes,
      });
      if (!upload.ok) throw new Error(`Supabase image upload failed (${upload.status}).`);
      return response.status(201).json({ path });
    }

    if (request.method === 'GET') {
      const path = safePath(request.query?.path);
      if (!path) return response.status(400).json({ error: 'Imagem inválida.' });
      const image = await fetch(`${base}/storage/v1/object/authenticated/${BUCKET}/${escapedPath(path)}`, { headers, cache: 'no-store' });
      if (!image.ok) return response.status(image.status === 404 ? 404 : 502).json({ error: 'Não foi possível abrir a imagem.' });
      const type = image.headers.get('content-type') || 'application/octet-stream';
      if (!Object.keys(MIME_EXTENSIONS).includes(type)) return response.status(415).json({ error: 'Formato de imagem não permitido.' });
      response.setHeader('Content-Type', type);
      response.setHeader('Content-Disposition', 'inline');
      return response.status(200).send(Buffer.from(await image.arrayBuffer()));
    }

    if (request.method === 'DELETE') {
      if (!sameOrigin(request)) return response.status(403).json({ error: 'Origem inválida.' });
      const path = safePath(request.body?.path);
      if (!path) return response.status(400).json({ error: 'Imagem inválida.' });
      const result = await fetch(`${base}/storage/v1/object/${BUCKET}`, {
        method: 'DELETE',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prefixes: [path] }),
      });
      if (!result.ok) throw new Error(`Supabase image delete failed (${result.status}).`);
      return response.status(200).json({ deleted: true });
    }

    response.setHeader('Allow', 'GET, POST, DELETE');
    return response.status(405).json({ error: 'Método não permitido.' });
  } catch (error) {
    console.error('Falha ao acessar imagens privadas no Supabase:', error);
    return response.status(503).json({ error: 'Não foi possível acessar as imagens. Confira a configuração do Supabase Storage.' });
  }
}
