import wine from '../assets/editorial/hero.webp';
import pisco from '../assets/editorial/pisco.webp';
import cream from '../assets/editorial/crema.webp';
import macerado from '../assets/editorial/macerado.webp';
import borgona from '../assets/products/borgona-especial.webp';
import sangria from '../assets/products/sangria.webp';
import higo from '../assets/products/crema-higo.webp';

/** Ambientación referencial de la demo, conservada localmente y optimizada por Astro. */
export const editorial = {
  vinos: wine,
  especiales: wine,
  piscos: pisco,
  cremas: cream,
  macerados: macerado,
};

/** Solo para la demo: una imagen propia del producto siempre tiene prioridad. */
export const demoProductImage = (category: string, order: number) =>
  category === 'cremas' ? higo : [borgona, sangria, higo][order % 3];
