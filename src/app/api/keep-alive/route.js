import { prisma } from '../../../server/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Confirma que a chamada veio do Cron da Vercel, e não de qualquer pessoa que descobrir a URL
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // 1. Apaga os pings antigos para não encher a tabela (opcional, mas recomendado)
    await prisma.keepAlive.deleteMany();

    // 2. Insere um novo registo com a data e hora atual (Isto conta como atividade real no Supabase!)
    const novoPing = await prisma.keepAlive.create({
      data: {}
    });

    return NextResponse.json({
      ok: true,
      mensagem: 'Banco acordado e log registado!',
      timestamp: novoPing.executado,
    });
  } catch (error) {
    console.error('Erro no keep-alive:', error);
    return NextResponse.json({ ok: false, error: 'Falha ao acordar o banco' }, { status: 500 });
  }
}