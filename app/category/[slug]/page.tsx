import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import CategoryClientPage from './CategoryClientPage';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug: params.slug });
  
  if (!category) {
    notFound();
  }

  return <CategoryClientPage category={category} />;
}
