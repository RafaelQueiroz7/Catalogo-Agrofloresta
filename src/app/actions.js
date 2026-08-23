'use server'

import { prisma } from '../server/db';
import { enviarArquivo } from '../server/storage';
import { redirect } from 'next/navigation';

function gerarSlug(texto) {
  return texto.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
}

export async function cadastrarEspecie(formData) {
  const nomePopular = formData.get('nomePopular');
  const nomeCientifico = formData.get('nomeCientifico');

  if (!nomePopular || !nomeCientifico) {
    throw new Error("Nome popular e científico são obrigatórios.");
  }

  const slug = gerarSlug(nomePopular);

  const [fotoRealUrl, carimboBotanicoUrl, aquarelaUrl, mapaOrigemUrl] = await Promise.all([
    enviarArquivo(formData.get('fotoReal'), slug),
    enviarArquivo(formData.get('carimboBotanico'), slug),
    enviarArquivo(formData.get('aquarela'), slug),
    enviarArquivo(formData.get('mapaOrigem'), slug),
  ]);

  const dadosParaSalvar = {
    slug,
    nomePopular,
    nomeCientifico,
    familia: formData.get('familia') || null,
    caracteristicas: formData.get('caracteristicas') || '',
    localOrigem: formData.get('localOrigem') || '',
    localEncontrada: formData.get('localEncontrada') || '',
    formaCultivo: formData.get('formaCultivo') || '',
    propriedadesUsos: formData.get('propriedadesUsos') || '',
    cuidadosRecomendacoes: formData.get('cuidadosRecomendacoes') || '',
    fotoRealUrl,
    carimboBotanicoUrl,
    aquarelaUrl,
    mapaOrigemUrl,
  };

  try {
    await prisma.especie.create({ data: dadosParaSalvar });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error("Uma espécie com este nome popular já está cadastrada.");
    }
    console.error("Erro ao salvar espécie:", error);
    throw new Error("Ocorreu um erro ao salvar os dados.");
  }

  redirect('/');
}