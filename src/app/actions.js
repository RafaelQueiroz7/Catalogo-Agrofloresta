'use server'

import { prisma } from '../server/db';
import { redirect } from 'next/navigation';

// Função auxiliar para gerar o link amigável da URL (slug)
function gerarSlug(texto) {
  return texto
    .toString()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífen
    .replace(/[^\w-]+/g, '') // Remove caracteres não alfanuméricos
    .replace(/--+/g, '-'); // Remove hífens duplicados
}

export async function cadastrarEspecie(formData) {
  // 1. Extrair os dados do FormData
  const nomePopular = formData.get('nomePopular');
  const nomeCientifico = formData.get('nomeCientifico');
  
  // Validação básica: Nome Popular e Científico são obrigatórios
  if (!nomePopular || !nomeCientifico) {
    throw new Error("Nome popular e científico são obrigatórios.");
  }

  // 2. Gerar o slug automaticamente para a URL
  const slug = gerarSlug(nomePopular);

  // 3. Preparar os dados para o Prisma
  // As imagens serão enviadas como null até a integração com o bucket de armazenamento
  const dadosParaSalvar = {
    slug: slug, 
    nomePopular: nomePopular,
    nomeCientifico: nomeCientifico,
    familia: formData.get('familia') || null,
    caracteristicas: formData.get('caracteristicas') || '',
    localOrigem: formData.get('localOrigem') || '',
    localEncontrada: formData.get('localEncontrada') || '',
    formaCultivo: formData.get('formaCultivo') || '',
    propriedadesUsos: formData.get('propriedadesUsos') || '',
    cuidadosRecomendacoes: formData.get('cuidadosRecomendacoes') || '',
    fotoRealUrl: null,
    carimboBotanicoUrl: null,
    aquarelaUrl: null,
    mapaOrigemUrl: null,
  };

  try {
    // 4. Salvar no PostgreSQL usando o Prisma
    await prisma.especie.create({
      data: dadosParaSalvar,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error("Uma espécie com este nome popular já está cadastrada.");
    }
    console.error("Erro ao salvar espécie:", error);
    throw new Error("Ocorreu um erro ao salvar os dados.");
  }

  // 5. Redirecionar para a página inicial em caso de sucesso
  redirect('/');
}