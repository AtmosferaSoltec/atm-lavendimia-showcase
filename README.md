# La Vendimia · Catálogo

Landing estática en Astro 7.4.3, CSS propio y TypeScript pequeño. Sin carrito, backend, cookies ni scripts de terceros. El pedido se consulta por WhatsApp.

## Comandos

Requiere Node >= 22.23.4 y pnpm.

```sh
pnpm install
pnpm dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
pnpm build
pnpm preview
pnpm astro preview stop
```

`pnpm build` valida el catálogo y genera el sitio en `dist/`, listo para hosting estático. La versión instalada de Astro ejecuta preview en segundo plano; imprime la URL y los comandos de gestión.

## Agregar un producto

1. Guarda una foto real en `src/assets/products/`: JPEG sRGB de 1400 × 2100 px (2:3), calidad 88–92, sin EXIF y de menos de 1,5 MB. Fondo uniforme `#f3eee5`. Usa PNG si necesita transparencia.
2. Añade un objeto al array `products` de `src/data/catalog.json`. Conserva un `id` único y estable:

```json
{
  "id": "vino-ejemplo",
  "name": "Vino Ejemplo",
  "category": "vinos",
  "image": "vino-ejemplo.jpg",
  "imageIsReference": false,
  "variants": [
    { "capacity": "750 ml", "presentation": "Caja x12", "price": 96 }
  ]
}
```

Categorías: `vinos`, `especiales`, `piscos`, `cremas`, `macerados`. `image` y `price` son opcionales; `capacity` admite `null`. No escribas `price: null`: omite el campo si no publicas precio. Los precios son soles por la presentación seleccionada. La configuración actual `site.showPrices: false` los oculta aunque existan en los datos; para publicarlos en el futuro, activa ese campo y recompila. Las capacidades se ordenan de menor a mayor; los productos conservan el orden del JSON.

Sin foto, se muestra una ambientación de la categoría con su aviso. Las fotos de estudio actuales llevan `imageIsReference: true`; al reemplazarlas por una fotografía real, cambia ese campo a `false`. Astro genera automáticamente AVIF y WebP. No guardes versiones redimensionadas manualmente.

3. Ejecuta `pnpm build`: fallará ante ids repetidos, categorías inválidas o fotografías inexistentes. Revisa con `pnpm preview` y publica `dist/`.

## Cambiar WhatsApp y los datos del negocio

Edita `src/data/site.ts`: `whatsapp` lleva solo dígitos con código de país, por ejemplo `51999999999`; `phoneDisplay` es el teléfono visible. Todos los enlaces, incluido el diálogo, pasan por `whatsappUrl()`. Edita también dirección, dominio y los SVG indicados por `logo` (imagotipo del footer y SEO), `logoHeader` (logotipo del encabezado) y `logoSymbol` (isotipo del hero). Los datos pendientes están marcados `TODO(cliente)`.

Antes de publicar: reemplaza las fotos referenciales, revisa `public/og.jpg` y los iconos, configura `site.url` y pide la aprobación del cliente. Solo entonces cambia `indexable` a `true` y recompila: actualizará robots y la meta de indexación. No hay muro de edad; se conserva el aviso para mayores de 18 años.

## Arquitectura y comprobaciones

- `src/content.config.ts`: esquema Zod y loader del JSON, usando `image()`.
- `src/components/`: una sección por componente; `Photo.astro` centraliza imágenes responsive.
- `src/scripts/`: catálogo/diálogo, menú y un único observer para reveal y WhatsApp flotante.
- `src/styles/tokens.css`: paleta de marca; `base.css`: diseño y movimiento reducido.
- `docs/LANDING.md`: especificación, criterios y decisiones.
- `docs/VALIDATION.md`: resultados medidos y límites de la validación.

Sin JavaScript se muestra el catálogo completo y cada tarjeta consulta por WhatsApp su primera presentación. Con JavaScript hay filtros, búsqueda sin tildes, grupos de ocho y selector de todas las presentaciones.

Lighthouse puede ejecutarse como herramienta externa, sin añadir dependencias al proyecto:

```sh
pnpm dlx lighthouse http://localhost:4321 --view
```

La configuración de ejemplo **bloquea deliberadamente la indexación**; por eso Lighthouse SEO no puede alcanzar 100 hasta activar `indexable`. No desactives esta protección solo para mejorar la puntuación.

## Logos de marca

Los tres SVG originales entregados están en `src/assets/brand/lavendimia-{logotipo,imagotipo,isotipo}.svg`. El logotipo horizontal aparece en el header; el imagotipo completo en el footer (en blanco mediante CSS); el isotipo en el hero y los iconos del sitio. La imagen para compartir también usa el logotipo real. Los originales se conservan sin modificar.

## Presentaciones y cotización

El diálogo explica la presentación, capacidad por envase y cantidad incluida. «Caja x12» se muestra como «Caja de 12 unidades», sin modificar el JSON ni asumir que todos los envases son botellas. Las capacidades ausentes se muestran como «Por confirmar». Se mantiene una imagen por producto.

El botón «Consultar esta presentación» envía a WhatsApp el producto y la opción elegida, y pide precio y disponibilidad. La cantidad de cajas que se desea comprar se acuerda por WhatsApp; no hay carrito ni selector de cantidad de pedido.

### Imágenes de la demo

`src/data/imagery.ts` centraliza la ambientación y las tres fotos reutilizadas cuando un producto no tiene `image`. El respaldo es solo referencial y se identifica en tarjeta y detalle. Para sustituirlo, asigna la foto correspondiente en `src/data/catalog.json`; tendrá prioridad automáticamente. Si la nueva foto es real, establece `imageIsReference: false`.
