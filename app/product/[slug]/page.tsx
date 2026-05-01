import { client } from '@/lib/sanity';
import ProductDetail from '@/components/shop/ProductDetail';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: params.slug });
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
