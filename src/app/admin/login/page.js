'use client'

import { useState } from 'react';
import { unstable_rethrow } from 'next/navigation';
import { entrarAdmin } from '../../adminActions';

export default function LoginAdmin() {
  const [mensagemErro, setMensagemErro] = useState(null);

  return (
    <div className="max-w-md mx-auto mt-20 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-stone-800">Área Administrativa</h1>
        <p className="text-stone-600 mt-1">Digite a senha para acessar o cadastro de espécies.</p>
      </div>

      {mensagemErro && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl font-medium text-center">
          ⚠️ {mensagemErro}
        </div>
      )}

      <form
        action={async (formData) => {
          try {
            setMensagemErro(null);
            await entrarAdmin(formData);
          } catch (error) {
            unstable_rethrow(error);
            setMensagemErro(error.message);
          }
        }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6"
      >
        <div>
          <label htmlFor="senha" className="block text-sm font-semibold text-stone-700 mb-1">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            required
            autoFocus
            className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}