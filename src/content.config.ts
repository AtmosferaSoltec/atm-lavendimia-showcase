import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
const catalog = defineCollection({
  loader: file("src/data/catalog.json", {
    parser: (text) =>
      JSON.parse(text).products.map((p: { image?: string }, order: number) => ({
        ...p,
        order,
        image: p.image ? `../assets/products/${p.image}` : undefined,
      })),
  }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      id: z.string().regex(/^[a-z0-9-]+$/),
      name: z.string().min(1),
      category: z.enum([
        "vinos",
        "especiales",
        "piscos",
        "cremas",
        "macerados",
      ]),
      image: image().optional(),
      imageIsReference: z.boolean().default(false),
      variants: z
        .array(
          z.object({
            capacity: z.string().nullable(),
            presentation: z.string().min(1),
            price: z.number().nonnegative().optional(),
          }),
        )
        .min(1),
    }),
});
export const collections = { catalog };
