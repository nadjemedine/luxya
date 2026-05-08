import { client } from '@/lib/sanity';
import ProductDetail from '@/components/shop/ProductDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: slug });
  
  if (!product) return { title: 'Produit non trouvé' };

  return {
    title: `${product.name.fr} | Luxya Boutique`,
    description: product.description?.fr,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: slug });
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
