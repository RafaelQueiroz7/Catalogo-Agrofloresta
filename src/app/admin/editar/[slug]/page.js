import { notFound } from 'next/navigation';
import { prisma } from '../../../../server/db';
import FormularioEdicao from '../../../../components/FormularioEdicao';

export const dynamic = 'force-dynamic';

export default async function EditarEspecie({ params }) {
  const { slug } = await params;
  const especie = await prisma.especie.findUnique({ where: { slug } });

  if (!especie) {
    notFound();
  }

  return <FormularioEdicao especie={especie} />;
}