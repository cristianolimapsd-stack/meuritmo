# Meu Ritmo

Painel pessoal de esportes, agenda, destinos, metas, refeições e listas. O visual foi redesenhado com uma identidade atlética e foco no movimento.

## Publicar manualmente

### 1. GitHub

Extraia o ZIP incluído em `outputs` e envie todo o conteúdo extraído para um repositório **privado**, preservando as pastas. O arquivo `server/seed.js` contém as receitas, o cardápio, as metas nutricionais e os itens iniciais de compras.

### 2. Supabase

1. Crie um projeto Supabase.
2. Abra o **SQL Editor** e execute o conteúdo de `supabase/schema.sql` para criar a tabela segura do painel e o bucket privado `activity-images` para os prints.
3. Em **Project Settings → API Keys**, copie o **Project URL** e crie/copiei uma **Secret key** no formato `sb_secret_...`. Essa chave é somente para o servidor e nunca deve ser colocada no navegador ou no GitHub.

A tabela mantém um único registro JSON do painel, e o bucket `activity-images` guarda os prints em modo privado (até 2 MB por arquivo). O RLS fica ativo na tabela; as permissões são concedidas à função de servidor `service_role`, usada pela chave secreta. O bucket não é público, e as imagens só são entregues pela API após o login.

### 3. Vercel

1. Crie um projeto novo e importe o repositório privado do GitHub.
2. Use o preset **Other**. `vercel.json` já aponta para `outputs` como pasta do site; as funções de API ficam em `api/`.
3. Em **Settings → Environment Variables**, configure para Production (e Preview, se quiser):
   - `SUPABASE_URL`: URL do projeto Supabase.
   - `SUPABASE_SECRET_KEY`: chave secreta `sb_secret_...` do Supabase.
   - `APP_PASSWORD`: senha forte que você usará para entrar no painel.
   - `SESSION_SECRET`: segredo aleatório e exclusivo com pelo menos 32 caracteres.
4. Salve as variáveis e faça o deploy.

Depois de conectar o GitHub à Vercel, novos envios para a branch principal geram novos deploys automaticamente.

## Usar no iPhone sem App Store

Depois que o site estiver publicado em HTTPS na Vercel:

1. Abra o endereço do site no **Safari** do iPhone.
2. Toque em **Compartilhar** → **Adicionar à Tela de Início**.
3. Ative **Abrir como App** e toque em **Adicionar**.

O Meu Ritmo abrirá em uma janela própria com ícone na tela inicial, sem precisar passar pela App Store. No iPhone, a instalação é feita pelo Safari; APK é um formato Android. Ao abrir pela primeira vez, entre com sua senha. O app instalado pode ter uma sessão local separada do Safari, mas os registros sincronizados no Supabase ficam disponíveis nos dois. O modo offline guarda apenas os arquivos da interface; para entrar, ver e sincronizar seus dados, conecte-se à internet.
## Como os dados são salvos

- O painel pede uma senha antes de mostrar os dados quando está publicado.
- A API valida uma sessão HttpOnly e faz a leitura e gravação no Supabase pelo servidor.
- A chave secreta do Supabase não aparece no site público.
- As alterações são salvas no navegador e sincronizadas com o Supabase automaticamente. Os prints das atividades são comprimidos no navegador antes do envio e ficam no Storage privado.
- No primeiro acesso, se a tabela ainda estiver vazia, o site usa os dados deste projeto para inicializar o cardápio, as receitas e a lista de compras. Se houver dados antigos neste navegador, eles são enviados para a nuvem nessa primeira conexão.
- O botão de backup do painel continua disponível.
- Abrir `outputs/index.html` diretamente funciona no modo local, salvando neste navegador. A sincronização entre dispositivos funciona no endereço da Vercel.

## Arquivos de configuração

- `.env.example`: nomes das variáveis necessárias para desenvolvimento.
- `supabase/schema.sql`: tabela, RLS e permissões.
- `api/auth.js`: login e sessão.
- `api/data.js`: leitura e sincronização com Supabase.
- `api/activity-image.js`: envio, visualização protegida e remoção dos prints de atividades.
- `server/security.js`: validação da senha e assinatura da sessão.
- `server/seed.js`: dados iniciais do cardápio e compras.
