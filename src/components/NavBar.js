import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-emerald-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-cedvb.png"
            alt="Símbolo da Escola CEDVB"
            width={55}
            height={55}
            className="object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">
            Agro<span className="text-emerald-300">floresta</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <Link href="/" className="hover:text-emerald-200 transition">Início</Link>
          <Link
            href="/admin/cadastrar"
            className="bg-emerald-700 hover:bg-emerald-600 border border-emerald-600 px-4 py-2 rounded-lg transition"
          >
            Área Administrativa
          </Link>
        </nav>
      </div>
    </header>
  )
}