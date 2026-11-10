import hero from '../assets/editorial/hero.jpg';
import esencia from '../assets/editorial/esencia.jpg';
import catVinos from '../assets/editorial/cat-vinos.jpg';
import catPiscos from '../assets/editorial/cat-piscos.jpg';
import catCremas from '../assets/editorial/cat-cremas.jpg';
import catMacerados from '../assets/editorial/cat-macerados.jpg';
import momentoMesa from '../assets/editorial/momento-mesa.jpg';
import momentoBrindis from '../assets/editorial/momento-brindis.jpg';
import momentoDetalle from '../assets/editorial/momento-detalle.jpg';

/** Fotografía editorial de Chincha, Ica. Astro genera AVIF/WebP al compilar. */
export const editorial = {
  hero,
  esencia,
  vinos: catVinos,
  piscos: catPiscos,
  cremas: catCremas,
  macerados: catMacerados,
};

/** Una imagen por momento, indexada por la categoría que activa su filtro. */
export const momentImages = {
  vinos: momentoMesa,
  piscos: momentoBrindis,
  cremas: momentoDetalle,
};

export const momentAlt = {
  vinos: 'Mesa larga de madera bajo el emparrado de un viñedo, preparada para compartir',
  piscos: 'Tres manos brindando con copas de degustación al atardecer entre viñedos',
  cremas: 'Canasta de cosecha con uvas, atada con una cinta color vino, sobre la tierra del viñedo',
};

export const editorialAlt = {
  hero: 'Viñedo en parra al amanecer, con racimos maduros y dunas de Ica al fondo',
  esencia: 'Manos cortando un racimo de uva y llenando una canasta de cosecha',
  vinos: 'Racimos de uva tinta madura en las hileras de un viñedo de Ica',
  piscos: 'Alambique de cobre y botijas de barro en una bodega de adobe',
  cremas: 'Mesa rústica con higos, canela y dos copas de crema bajo la sombra de un algarrobo',
  macerados: 'Canasta de cosecha con maracuyá, piña, mango y fresas bajo la parra',
};
