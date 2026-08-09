export default function NavBar() {
  return (
    <header className="bg-emerald-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">
          Agro<span className="text-emerald-300">Catálogo</span>
        </div>
        
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="/" className="hover:text-emerald-200 transition">Início</a>
          <a href="#" className="hover:text-emerald-200 transition">Estratos</a>
          <a href="#" className="hover:text-emerald-200 transition">Sobre</a>
        </nav>
      </div>
    </header>
  )
}