import { seedData } from '../server/seed.js';
import { hasValidSession, sameOrigin } from '../server/security.js';

export const config = {
  api: { bodyParser: { sizeLimit: '2mb' } },
};

function supabaseConfig() {
  const projectUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!projectUrl || !secretKey) throw new Error('Supabase environment variables are missing.');
  return {
    endpoint: `${projectUrl}/rest/v1/planner_state`,
    headers: { apikey: secretKey, 'Content-Type': 'application/json' },
  };
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (!hasValidSession(request)) return response.status(401).json({ error: 'Faça login para continuar.' });

  try {
    const { endpoint, headers } = supabaseConfig();
    if (request.method === 'GET') {
      const result = await fetch(`${endpoint}?id=eq.main&select=data&limit=1`, { headers, cache: 'no-store' });
      if (!result.ok) throw new Error(`Supabase read failed (${result.status}).`);
      const rows = await result.json();
      if (!rows.length) return response.status(200).json({ data: null, seed: seedData });
      return response.status(200).json({ data: rows[0].data });
    }

    if (request.method === 'PUT') {
      if (!sameOrigin(request)) return response.status(403).json({ error: 'Origem inválida.' });
      const payload = request.body;
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        return response.status(400).json({ error: 'Formato de dados inválido.' });
      }
      const serialized = JSON.stringify(payload);
      if (Buffer.byteLength(serialized, 'utf8') > 1_800_000) {
        return response.status(413).json({ error: 'O backup ultrapassa o limite permitido.' });
      }
      const result = await fetch(`${endpoint}?on_conflict=id`, {
        method: 'POST',
        headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ id: 'main', data: payload, updated_at: new Date().toISOString() }),
      });
      if (!result.ok) throw new Error(`Supabase write failed (${result.status}).`);
      return response.status(200).json({ saved: true, updatedAt: new Date().toISOString() });
    }

    response.setHeader('Allow', 'GET, PUT');
    return response.status(405).json({ error: 'Método não permitido.' });
  } catch (error) {
    console.error('Falha ao acessar o armazenamento Supabase:', error);
    return response.status(503).json({ error: 'Não foi possível acessar o Supabase. Confira as variáveis de ambiente e a tabela.' });
  }
}
