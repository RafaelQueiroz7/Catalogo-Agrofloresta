import { NextResponse } from 'next/server';
import { gerarTokenSessao } from './lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Não protege a própria página de login, senão vira um loop de redirecionamento
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const tokenEsperado = await gerarTokenSessao();
    const tokenCookie = request.cookies.get('admin_session')?.value;

    if (tokenCookie !== tokenEsperado) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};