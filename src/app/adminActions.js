'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { gerarTokenSessao } from '../lib/auth';

export async function entrarAdmin(formData) {
  const senhaDigitada = formData.get('senha');

  if (!senhaDigitada || senhaDigitada !== process.env.ADMIN_PASSWORD) {
    throw new Error('Senha incorreta.');
  }

  const token = await gerarTokenSessao();
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  });

  redirect('/admin/cadastrar');
}

export async function sairAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}