import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import CategoryClientPage from './CategoryClientPage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug: slug });
  
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name.fr} | Luxya Boutique`,
    description: category.description?.fr || `Découvrez nos produits dans la catégorie ${category.name.fr}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug: slug });
  
  if (!category) {
    notFound();
  }

  return <CategoryClientPage category={category} />;
}
