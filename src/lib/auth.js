export async function gerarTokenSessao() {
  const senha = process.env.ADMIN_PASSWORD;
  const segredo = process.env.SESSION_SECRET;
  const dados = new TextEncoder().encode(`${senha}:${segredo}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dados);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}