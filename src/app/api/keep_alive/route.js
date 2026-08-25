import { prisma } from '../../../server/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Confirma que a chamada veio do Cron da Vercel, e não de qualquer pessoa que descobrir a URL
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // Consulta trivial — só para gerar atividade real no banco via Prisma
    const total = await prisma.especie.count();
    return NextResponse.json({
      ok: true,
      especiesCadastradas: total,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro no keep-alive:', error);
    return NextResponse.json({ ok: false, error: 'Falha ao consultar o banco' }, { status: 500 });
  }
}