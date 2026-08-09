import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "Catálogo de Agrofloresta",
  description: "Guia completo de espécies para sistemas agroflorestais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
        <NavBar />
        
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}