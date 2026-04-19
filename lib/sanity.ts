import { createClient } from '@sanity/client';
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
import { sanityConfig } from '@/sanity/config';

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
