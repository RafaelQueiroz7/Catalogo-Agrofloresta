import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const NOME_BUCKET = 'especies-arquivos';

// Recebe um File (do FormData) e devolve a URL pública, ou null se o campo veio vazio
export async function enviarArquivo(file, pastaSlug) {
  if (!file || file.size === 0) return null;

  const extensao = file.name.split('.').pop();
  const nomeUnico = `${pastaSlug}/${crypto.randomUUID()}.${extensao}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(NOME_BUCKET)
    .upload(nomeUnico, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error('Erro ao subir arquivo para o Storage:', error);
    throw new Error(`Falha ao enviar o arquivo "${file.name}".`);
  }

  const { data } = supabaseAdmin.storage.from(NOME_BUCKET).getPublicUrl(nomeUnico);
  return data.publicUrl;
}