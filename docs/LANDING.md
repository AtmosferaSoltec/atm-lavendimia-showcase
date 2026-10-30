# Landing de catálogo · La Vendimia

Documento de especificación para quien construya la página. Léelo completo antes de escribir código. Si algo aquí contradice tu criterio, **no improvises en silencio**: deja la decisión anotada en la sección «Decisiones tomadas» al final.

---

## 1. Qué es y qué NO es

**Es** una landing de una sola página, estática, que muestra el catálogo de La Vendimia (vinos, piscos, cremas de pisco y macerados). El cliente final recibe la URL, ve los productos y, cuando quiere uno, pulsa un botón que abre **WhatsApp** con un mensaje ya escrito. El pedido se cierra por WhatsApp con la persona del negocio.

**No es**:

- Una tienda en línea: sin carrito, sin checkout, sin pagos, sin cuentas de usuario.
- Un sistema: sin base de datos, sin API, sin servidor, sin CMS, sin login.
- Parte de la aplicación de gestión (`lavendimia-web`). Es un proyecto independiente y no comparte código con ella.

**Objetivo del negocio:** que quien abra el enlace desde su celular (el 90 % de los casos: el enlace llega por WhatsApp) vea una página que se sienta cuidada y premium, encuentre el producto en pocos toques y escriba al negocio.

**Objetivo técnico:** estática, ligera, instantánea. Todo el contenido (productos, fotos, textos) se edita **a mano en el repositorio** y se vuelve a publicar.

---

## 2. Stack y reglas

| Tema | Decisión |
|---|---|
| Framework | **Astro** (ya instalado, ver `package.json`). Salida estática (`output: 'static'`, el valor por defecto). |
| Estilos | **CSS propio** con variables CSS (tokens). Sin Tailwind ni librerías de UI. |
| JavaScript | **Sin React/Vue/Svelte.** La interactividad (filtros, búsqueda, diálogo, menú móvil, animaciones al scroll) se hace con TypeScript pequeño en `<script>` de Astro y elementos nativos (`<dialog>`, `<details>`). Presupuesto: **≤ 15 KB de JS comprimido en total.** |
| Iconos | SVG en línea (copiados de Tabler Icons u otro set con licencia libre). **No** instalar paquetes de iconos. |
| Imágenes | `astro:assets` (`<Image>` / `<Picture>`), ver §7. |
| Fuentes | Autoalojadas (`public/fonts`). Cormorant Garamond (titulares) ya está copiada. La fuente de texto: la del sistema (`system-ui`) o una sola familia sans autoalojada en WOFF2, máximo 2 pesos. Sin Google Fonts remoto. |
| Dependencias | Solo `astro`, `@astrojs/sitemap` y lo que Astro exija para imágenes. Cualquier otra dependencia hay que justificarla en «Decisiones tomadas». |
| Idioma | Español de Perú. `<html lang="es-PE">`. Todo el texto visible en español. |
| Hosting objetivo | Hosting estático (Cloudflare Pages, Netlify o Vercel). No uses adaptadores de servidor. |

Antes de usar una API de Astro, **consulta la documentación de la versión instalada** (`astro` en `package.json`, hoy 7.x): <https://docs.astro.build>. Las guías relevantes están enlazadas en `AGENTS.md`. No asumas la sintaxis de versiones anteriores.

Comandos: `pnpm dev`, `pnpm build`, `pnpm preview`. El servidor de desarrollo se lanza como indica `AGENTS.md` (`astro dev --background`).

---

## 3. Referencia visual

Existe una maqueta funcional hecha en Next.js dentro de otro repositorio. **Es la referencia de diseño y de textos; no se copia como código.**

- Código: `/Users/jmaldonado/Documents/Atmosfera/lavendimia-web/src/app/la-cava/` (`cava-landing.tsx`, `cava.module.css`, `catalog-data.json`, `README.md`).
- Para verla: `cd /Users/jmaldonado/Documents/Atmosfera/lavendimia-web && pnpm dev` y abrir `http://localhost:3000/la-cava`.

Qué se conserva de la maqueta: la **estructura de secciones**, la **paleta**, la **tipografía editorial**, el **tono de los textos**, el **filtrado** y el **diálogo de producto con selector de presentación**.

Qué se mejora (ver §6): rendimiento, animaciones, barra de WhatsApp fija en móvil, SEO, accesibilidad y el modo de editar contenido.

---

## 4. Sistema de diseño

### 4.1 Tokens (definirlos como variables CSS en `:root`, un solo archivo `src/styles/tokens.css`)

```css
:root {
  --cream: #f8f5ed;      /* fondo base */
  --paper: #eeeadf;      /* fondo de tarjetas / bandas */
  --studio: #f3eee5;     /* fondo continuo de las fotos de producto */
  --wine: #54242e;       /* color de marca, botones primarios */
  --wine-dark: #321b24;  /* secciones oscuras, footer */
  --ink: #342d2b;        /* texto */
  --muted: #75685d;      /* texto secundario */
  --copper: #9c5a45;     /* acento: palabras en cursiva, detalles */
  --rule: #ddd6c9;       /* líneas finas */
  --whatsapp: #1fa855;   /* solo el botón flotante / iconos de WhatsApp */
}
```

La paleta definitiva la fija la marca real; mantén los **nombres** de los tokens para que cambiar un color sea tocar una línea. Contraste mínimo AA (4.5:1 texto normal, 3:1 texto grande y controles).

### 4.2 Tipografía

- Titulares (`h1`, `h2`, `h3`): **Cormorant Garamond**, peso 400, con palabras clave en *cursiva* color `--copper` (por ejemplo «Los buenos momentos se sirven *en copa.*»).
- Texto: sans de sistema, 14–16 px, interlineado 1.6.
- Etiquetas pequeñas (`eyebrow`): mayúsculas, `letter-spacing` amplio, 11–12 px, con una línea fina antes.
- Escala fluida con `clamp()` (el `h1` va de ~44 px en móvil a ~96 px en escritorio).
- WOFF2 con `font-display: swap` y **`<link rel="preload">` solo de la fuente de titulares en normal**. La cursiva se carga sin preload.

### 4.3 Espaciado y forma

- Contenedor máximo 1280 px, márgenes laterales `clamp(20px, 5vw, 64px)`.
- Bordes casi rectos (radio 0–4 px); líneas finas `--rule`; mucho aire. La sensación es editorial, de revista, no de e-commerce.
- Botón primario: fondo `--wine`, texto crema, flecha ↗ que se desplaza al hacer hover. Botón secundario: contorno fino.

---

## 5. Estructura de la página

Una sola ruta: `src/pages/index.astro`. Cada sección es un componente en `src/components/`.

Orden y contenido (los textos son los de la maqueta; puedes pulirlos pero conserva el tono cálido, breve y sin tecnicismos):

1. **Saltar al contenido** (enlace oculto hasta recibir foco) → `#coleccion`.
2. **Franja superior (announcement):** «DESDE ICA, CON MUCHO GUSTO.» · «Envíos a todo el Perú».
3. **Header** pegajoso: logo, navegación (`La colección`, `Nuestra esencia`, `Para cada momento`), botón «Escríbenos» (WhatsApp), menú hamburguesa en móvil (usar `<button aria-expanded>`; menú a pantalla completa o desplegable).
4. **Hero** (`#inicio`): eyebrow «EL GUSTO DE COMPARTIR»; `h1` «Los buenos momentos se sirven *en copa.*»; subtítulo «Un vino que reúne. Un pisco que celebra. Un sabor que se queda contigo.»; botón «Encuentra tu favorito» → `#coleccion`; a la derecha (arriba en móvil, después del texto) la foto editorial `hero.webp` (4:5) con leyenda. Indicador de scroll.
5. **Cinta de marca** (marquee CSS lento, decorativa, `aria-hidden`): «VINOS · PISCOS · CREMAS · MACERADOS · DESDE ICA».
6. **Colección** (`#coleccion`) «01 / NUESTRA COLECCIÓN»: 4 tarjetas grandes (Vinos, Piscos, Cremas, Macerados) con foto editorial, número y flecha. Al pulsar una, hace scroll al catálogo con ese filtro activo.
7. **Catálogo** (`#catalogo`) «ELIGE. DESCUBRE. DISFRUTA.»:
   - Filtros por categoría (chips): Toda la colección · Vinos · Especiales · Piscos · Cremas de pisco · Macerados. Usa `aria-pressed`.
   - Búsqueda por texto, **sin tildes ni mayúsculas** (normalizar con `NFD`).
   - Contador de resultados con `aria-live="polite"`.
   - Rejilla de tarjetas: foto, categoría, nombre. 2 columnas en móvil, 3 en tablet, 4 en escritorio. Se muestran 8 y un botón «Ver más» agrega 8 más (o «Ver toda la colección»).
   - Estado vacío: «Tu favorito puede estar a una búsqueda.» + botón para limpiar filtros.
   - **Todas las tarjetas están en el HTML** (para SEO y para que funcione sin JS); el script solo oculta/muestra con el atributo `hidden`.
8. **Diálogo de producto** (`<dialog>` nativo, uno solo reutilizado, relleno desde atributos `data-*` de la tarjeta): foto grande, categoría, nombre, frase de la categoría, **selector de presentación** (capacidad · presentación), precio si existe (ver §8), nota «Consulta el precio y la disponibilidad…», botón WhatsApp «Consultar este producto» y «Envíos a todo el Perú». Se cierra con Esc, con el botón y con clic fuera. Bloquear el scroll del fondo mientras está abierto.
9. **Nuestra esencia** (`#esencia`): banda oscura `--wine-dark`, foto editorial a un lado y texto al otro. «Más que una copa. *Lo que compartimos.*». Firma «La Vendimia · EL GUSTO DE COMPARTIR.»
10. **Para cada momento** (`#momentos`): 3 tarjetas (Una mesa compartida → Vinos; Un brindis especial → Piscos; Un detalle con gusto → Cremas). Cada una activa el filtro correspondiente y baja al catálogo.
11. **Contacto** (`#contacto`): «¿Brindamos por *algo bueno?*», botón grande «Hablemos por WhatsApp», tres checks: Atención directa · Envíos a todo el Perú · Diferentes presentaciones.
12. **Footer:** logo, lema, enlaces, teléfono, dirección, «Solo para mayores de 18 años. Disfruta con responsabilidad.», © año actual.
13. **Botón flotante de WhatsApp** (solo móvil, aparece al pasar el hero, desaparece cerca del bloque de contacto para no duplicarse). Debe respetar `env(safe-area-inset-bottom)`.

---

## 6. Experiencia, animación y rendimiento

La página debe **impresionar sin pesar**. Reglas:

**Animación (todo CSS salvo lo indicado, nada de librerías):**

- Carga del hero: aparición escalonada del eyebrow, titular, subtítulo, botón y foto (`@keyframes`, 600–900 ms, `cubic-bezier(.2,.7,.2,1)`).
- Reveal al hacer scroll: las secciones y tarjetas entran con fundido + desplazamiento de 16–24 px. Implementar con un único `IntersectionObserver` que añade `.is-visible`; si el navegador soporta `animation-timeline: view()`, se puede usar como mejora progresiva.
- Tarjetas de producto: zoom suave de la foto en hover (`scale(1.04)`, 600 ms), el signo `+` rota/aparece.
- Parallax muy sutil en la foto del hero (solo con scroll-driven animations, si hay soporte).
- Diálogo: entrada con `@starting-style` / transición de opacidad y escala.
- Botones: la flecha ↗ se desplaza al hover/foco.
- **Solo se animan `transform` y `opacity`.** Nada que dispare layout.
- **`prefers-reduced-motion: reduce` desactiva todo lo anterior** (sin excepciones) y el scroll a anclas pasa a instantáneo.

**Presupuestos (verificar con Lighthouse móvil sobre `pnpm preview`):**

| Métrica | Meta |
|---|---|
| Performance / Accesibilidad / Buenas prácticas / SEO | ≥ 95 / 100 / ≥ 95 / 100 |
| LCP (4G simulado, móvil) | ≤ 2,0 s |
| CLS | 0 |
| JS total comprimido | ≤ 15 KB |
| Peso inicial de la página (sin imágenes diferidas) | ≤ 500 KB |
| Imagen del hero en móvil | ≤ 150 KB |
| Tarjeta de producto en móvil | ≤ 40 KB cada una |

**Móvil primero:** diseña y prueba a 360 px de ancho antes que en escritorio. Áreas táctiles ≥ 44 px. Nada de scroll horizontal. Probar también en 768 px y 1440 px.

---

## 7. Imágenes (lo más importante para la calidad y el peso)

### 7.1 Qué se guarda en el repositorio (los «originales»)

Los originales viven en `src/assets/` y **Astro genera las versiones optimizadas al compilar**. No se suben a mano versiones redimensionadas.

| Tipo | Dónde | Formato del original | Tamaño del original |
|---|---|---|---|
| Foto de producto (botella) | `src/assets/products/` | **JPEG calidad 88–92** (o PNG/WebP sin pérdida si hay transparencia) | 1400 × 2100 px (proporción **2:3**, vertical) |
| Foto editorial grande (hero, esencia) | `src/assets/editorial/` | JPEG calidad 88–92 | 1920 × 2400 px (4:5) o 2400 × 1600 (3:2) |
| Foto de categoría (colección) | `src/assets/editorial/` | JPEG calidad 88–92 | 1600 × 1600 px (1:1) o 4:5 |
| Logo | `src/assets/brand/` | **SVG** (vectorial). Nunca un PNG gigante | — |
| Favicon / icono | `public/` | SVG + `apple-touch-icon.png` 180 × 180 | — |
| Imagen para compartir (Open Graph) | `public/og.jpg` | JPEG | 1200 × 630 px, ≤ 200 KB |

- Perfil de color **sRGB**. Sin metadatos (EXIF) innecesarios.
- **No subir fotos crudas de cámara/celular** (6000 px, 8 MB): reducir antes a los tamaños de la tabla.
- Fondo de las fotos de producto: **continuo y del mismo color en todas** (`--studio`, `#f3eee5`) para que la rejilla se vea uniforme. Si se entregan recortadas con transparencia, guardar en PNG y dejar que Astro las convierta; el fondo lo pone el CSS.
- Peso máximo de un original: ~1,5 MB. Si el repositorio supera ~100 MB con los originales, hay que mover los originales fuera de Git (almacenamiento externo o Git LFS); consultar antes de hacerlo.

### 7.2 Qué se sirve al navegador (lo hace Astro; tú solo lo configuras)

- Usar `<Picture>` de `astro:assets` con `formats={['avif', 'webp']}` y como último recurso el formato original. **AVIF primero** (el más pequeño con la misma calidad), **WebP de respaldo**.
- Calidad objetivo: **AVIF ~60–65**, **WebP ~78–82**. Ajustar a ojo en el hero, el único lugar donde la compresión se nota.
- `widths` y `sizes` reales (no dejar que el navegador descargue 2400 px para una tarjeta de 170 px):
  - Tarjeta de producto: `widths={[320, 480, 640, 800]}`, `sizes="(min-width:1024px) 22vw, (min-width:640px) 31vw, 46vw"`.
  - Diálogo de producto: `widths={[600, 900, 1200]}`, `sizes="(min-width:640px) 400px, 90vw"`.
  - Hero: `widths={[640, 960, 1280, 1920]}`, `sizes="(min-width:1024px) 50vw, 100vw"`.
  - Categorías / editorial: `widths={[480, 800, 1200]}`.
- **Hero:** `loading="eager"`, `fetchpriority="high"`, `decoding="async"`. **Todo lo demás:** `loading="lazy"`, `decoding="async"`.
- **Reservar el espacio** de cada imagen con `width`/`height` o `aspect-ratio` en el contenedor, y un color de fondo (`--paper`) mientras carga: así no hay saltos (CLS 0) y se ve elegante aun antes de que llegue la foto.
- `alt` descriptivo en cada imagen informativa; `alt=""` en las decorativas.

**Resumen de la recomendación de formato:** guardar el original en **JPEG de alta calidad (o PNG sin pérdida si hay transparencia)** a 2× del tamaño máximo en pantalla, y servir **AVIF con WebP de respaldo** generados automáticamente. Eso da calidad nítida en retina/móvil y el menor peso posible.

### 7.3 Estado actual de las imágenes

Las imágenes que hay hoy en `src/assets/` vienen de la maqueta y son **referenciales, generadas con IA** (ambientación y tres botellas recreadas). Están en WebP con pérdida, así que **no sirven como originales definitivos**. Hay que reemplazarlas por fotografías reales del cliente antes de publicar. Mientras tanto:

- Los productos sin foto usan la foto editorial de su categoría y muestran una pequeña etiqueta «Imagen referencial de la categoría».
- Los que tienen foto de estudio (`image` en el JSON) muestran «Recreación de estudio del producto». **Esa etiqueta se controla con un campo y desaparece cuando las fotos sean reales** (ver §8, `imageIsReference`).

---

## 8. Contenido y modelo de datos

Todo el contenido editable está en **dos archivos**; ningún texto de configuración debe quedar escrito dentro de componentes.

### 8.1 `src/data/site.ts` (configuración del negocio)

Crear este archivo con **datos de ejemplo** (marcados con `// TODO(cliente)`), que luego reemplazará el dueño del proyecto:

```ts
export const site = {
  name: 'La Vendimia',
  tagline: 'El gusto de compartir',
  url: 'https://example.com',            // TODO(cliente): dominio real
  indexable: false,                      // true cuando el cliente apruebe publicar en buscadores
  whatsapp: '51999999999',               // TODO(cliente): solo dígitos, con código de país
  phoneDisplay: '+51 999 999 999',       // TODO(cliente)
  address: ['Dirección de ejemplo 123', 'Ica, Perú'], // TODO(cliente)
  shipping: 'Envíos a todo el Perú',
  ageNotice: 'Solo para mayores de 18 años. Disfruta con responsabilidad.',
  logo: '../assets/brand/logo-placeholder.svg', // TODO(cliente): logo real en SVG
};
```

Función única para generar enlaces: `whatsappUrl(message: string) => https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`. **Todo botón de WhatsApp pasa por ella** con `target="_blank" rel="noopener noreferrer"`.

Mensajes prellenados (en español, con tono cordial):

- General: «¡Hola, La Vendimia! Vi su catálogo y me gustaría conocer más sobre sus productos.»
- Producto: «¡Hola, La Vendimia! Me interesa {nombre}{ de {capacidad}}, presentación {presentación}. ¿Me comparten el precio y la disponibilidad?» (si hay precio, omitir la pregunta del precio).

### 8.2 `src/data/catalog.json` (productos)

Ya existe, copiado de la maqueta: **52 productos y 174 presentaciones**, en 5 categorías (`vinos`, `especiales`, `piscos`, `cremas`, `macerados`).

Forma de cada producto:

```jsonc
{
  "id": "vino-sangria",            // slug único, estable
  "name": "Vino Sangría",
  "category": "vinos",             // una de las 5 categorías
  "image": "sangria.webp",          // opcional: archivo dentro de src/assets/products/
  "imageIsReference": true,         // opcional, por defecto false: muestra la etiqueta «Recreación de estudio»
  "variants": [
    { "capacity": "750 ml", "presentation": "Caja x12", "price": 96.0 } // price opcional (soles)
  ]
}
```

- `capacity` puede ser `null`. Las presentaciones se **ordenan por capacidad** (ml/Lt → número) al mostrarse, como en la maqueta (`capacityValue`).
- **Precios:** hoy el catálogo **no trae precios** y la página dice «Consulta el precio y la disponibilidad». El diseño debe soportar `price` opcional por presentación: si existe, se muestra «S/ 96.00» junto a la presentación elegida y cambia al cambiar el selector; si no existe, se muestra la nota de consulta. El cliente decidirá si publica precios.
- Visualmente se quita el prefijo del nombre en la tarjeta («Vino », «Crema de », «Macerado de ») con `productTitle`, pero el nombre completo se usa en el diálogo y en el mensaje de WhatsApp.
- **Validación:** definir el catálogo como *content collection* con esquema Zod (`src/content.config.ts`, loader `file`) usando el helper `image()` para `image`. Así, **el build falla** si falta una foto, si la categoría no existe o si hay un id repetido. Verifica la sintaxis exacta en la documentación de la versión instalada.

### 8.3 Cómo se agrega un producto (esto debe quedar documentado también en el `README.md` del proyecto)

1. Poner la foto en `src/assets/products/` (JPEG 1400 × 2100, ver §7).
2. Añadir el objeto en `src/data/catalog.json`.
3. `pnpm build` (si no falla, está bien) y publicar.

Escribe en el `README.md` raíz (reemplazando el de la plantilla de Astro) esos pasos, los comandos y cómo cambiar el número de WhatsApp.

---

## 9. SEO, compartir y cumplimiento

- `<title>`: «La Vendimia · El gusto de compartir» (≤ 60 caracteres). `<meta name="description">` ≤ 155 caracteres.
- Open Graph y Twitter Card con `public/og.jpg` (1200 × 630).
- JSON-LD `LocalBusiness`/`Store` con nombre, teléfono, dirección y logo, generado desde `site.ts`.
- `@astrojs/sitemap` y `robots.txt`. **Mientras `site.indexable` sea `false`**, emitir `<meta name="robots" content="noindex, nofollow">` y `Disallow: /`. Al ponerlo en `true`, se permite indexar.
- Un solo `h1`. Jerarquía de encabezados sin saltos. Enlaces de anclaje con `scroll-margin-top` para que el header pegajoso no tape el título.
- Productos con alcohol: mantener el aviso de mayores de 18 años en el footer. **No** poner un muro de verificación de edad en v1; es una decisión del cliente (anotarla como pendiente).
- Sin cookies, sin analítica y sin scripts de terceros en v1. Si el cliente pide métricas, usar una solución sin cookies (por ejemplo Cloudflare Web Analytics) y registrar los clics a WhatsApp como evento.

---

## 10. Accesibilidad (obligatorio, no opcional)

- Navegación completa con teclado; `:focus-visible` con anillo visible en todos los controles.
- `<dialog>` nativo (gestiona foco y Esc); devolver el foco a la tarjeta que lo abrió al cerrar.
- Chips de filtro con `aria-pressed`; contador con `aria-live="polite"`; botón del menú con `aria-expanded` y `aria-controls`.
- Contraste AA verificado en texto sobre fotos (usar degradado/velo si hace falta).
- Respetar `prefers-reduced-motion` (ver §6) y que la página sea totalmente legible y navegable **sin JavaScript** (el catálogo completo está en el HTML; sin JS, los filtros no aparecen o se ocultan y se ven todos los productos).
- El enlace de WhatsApp debe tener texto accesible («Consultar Vino Sangría por WhatsApp»), no solo un icono.

---

## 11. Estructura de archivos esperada

```
atm-lavendimia-showcase/
├── docs/LANDING.md              ← este documento
├── public/
│   ├── fonts/                   ← Cormorant Garamond (ya copiada) + OFL.txt
│   ├── favicon.svg, favicon.ico, apple-touch-icon.png
│   ├── og.jpg                   ← TODO: imagen para compartir
│   └── robots.txt               ← (o generado según site.indexable)
├── src/
│   ├── assets/
│   │   ├── brand/logo-placeholder.svg
│   │   ├── editorial/           ← hero, pisco, crema, macerado (referenciales)
│   │   └── products/            ← fotos de producto
│   ├── components/              ← Header, Hero, Collections, Catalog, ProductCard,
│   │                              ProductDialog, Essence, Moments, Contact, Footer,
│   │                              WhatsAppFab, Seo, icons/
│   ├── data/
│   │   ├── catalog.json         ← ya existe
│   │   └── site.ts              ← crear
│   ├── layouts/Base.astro
│   ├── pages/index.astro
│   ├── scripts/                 ← catalog.ts (filtros/búsqueda/diálogo), reveal.ts, menu.ts
│   ├── styles/                  ← tokens.css, base.css (reset + tipografía), utilidades
│   └── content.config.ts
└── README.md
```

---

## 12. Orden de trabajo sugerido

1. `site.ts`, `content.config.ts` (con esquema), tokens y estilos base, fuentes, layout con SEO.
2. Header, hero, cinta, colección (estáticos, ya con imágenes optimizadas).
3. Catálogo: tarjetas estáticas → filtros/búsqueda/«Ver más» → diálogo con selector → mensajes de WhatsApp.
4. Esencia, momentos, contacto, footer, botón flotante móvil.
5. Animaciones y `prefers-reduced-motion`.
6. SEO (JSON-LD, sitemap, robots, OG), accesibilidad, README.
7. Medición: `pnpm build` + `pnpm preview` + Lighthouse móvil. Ajustar hasta cumplir §6.

---

## 13. Criterios de aceptación

- [x] `pnpm build` termina sin errores ni advertencias de imágenes o de la colección.
- [x] Los 52 productos aparecen, filtran y se buscan correctamente (sin tildes/mayúsculas); las 174 presentaciones se pueden elegir en el diálogo.
- [x] Cada botón de WhatsApp abre `wa.me/<número>` con el mensaje correcto; el del producto incluye nombre, capacidad y presentación elegidos.
- [x] Cambiar el número en `site.ts` actualiza **todos** los enlaces.
- [ ] Lighthouse móvil cumple las metas de §6; CLS = 0.
- [x] Funciona sin JS (catálogo visible) y con `prefers-reduced-motion`.
- [ ] Probado a 360, 768 y 1440 px, en Safari iOS y Chrome Android como mínimo.
- [x] Ningún dato real sensible en el repo: número, dirección y logo son los de ejemplo salvo que el dueño diga lo contrario.
- [x] `README.md` explica cómo agregar un producto y cómo cambiar el número.

---


## 14. Fuera de alcance de v1 (propuestas, no construir sin pedirlo)

- **Lista de consulta («Mi pedido»):** que el visitante marque varios productos y se genere **un solo** mensaje de WhatsApp con todos. Sin precios ni checkout. Es la mejora más probable, pero cambia la interacción; el dueño debe aprobarla.
- Muro de verificación de edad.
- Versión en inglés u otros idiomas.
- Analítica.
- Panel para que el cliente edite productos sin tocar el repositorio.

---

## 15. Decisiones tomadas

_(El agente que construya la página anota aquí cada decisión que se aparte de este documento o que este documento deje abierta: fecha, qué se decidió y por qué.)_

### 2026-10-28 · Implementación inicial

- Se conserva el orden de `products` del JSON mediante un campo interno `order` en el loader; `getCollection()` no garantiza el orden editorial original. No se regeneraron productos ni presentaciones. Se añadieron únicamente `imageIsReference: true` a las tres imágenes de estudio existentes.
- El metadato histórico `source.presentationCount` dice 173; el array contiene 174 opciones contando «Por confirmar» de Crema de Higo. La interfaz y la validación usan el array, sin alterar ese metadato histórico.
- `file()` adapta el objeto raíz `{ source, products }` y resuelve los nombres de imagen relativos al JSON. `prerenderConflictBehavior: 'error'` obliga a fallar ante ids repetidos. Se probaron builds negativos para id repetido, categoría inválida y foto ausente.
- Los `sizes` de hero y productos usan cálculos del ancho real de la rejilla (incluyendo márgenes y separaciones), en vez de porcentajes aproximados, para evitar descargar un escalón mayor innecesariamente. Se conservan los `widths` pedidos.
- Se usa calidad 65 para hero/editoriales/diálogo y 50 para tarjetas, tanto en AVIF como en WebP. El ajuste de tarjetas mantiene las imágenes de 640 px por debajo de 40 KB también en móviles de DPR 3, donde calidad 65 excedía la meta. `Picture` comparte la propiedad de calidad entre formatos; se priorizó el presupuesto y se revisó visualmente la salida de las imágenes referenciales. Antes de sustituir por originales reales, volver a revisar compresión y pesos. El respaldo final es WebP mientras los originales suministrados son WebP.
- El OG y los iconos son archivos derivados localmente de la foto editorial y un motivo vectorial de copa, sin IA adicional ni descarga de imágenes. OG e iconos quedan pendientes de aprobación de marca. El logo placeholder permanece configurado en `site.ts`, acompañado del nombre legible.
- Sin JavaScript las tarjetas enlazan a WhatsApp con la primera presentación ordenada y se muestran todos los productos. El selector completo es mejora progresiva mediante el diálogo. No hay controles de filtrado inertes visibles.
- La especificación exige simultáneamente SEO 100 y bloquear la indexación. Se conserva `indexable: false`: Lighthouse penaliza únicamente el bloqueo intencional. Se mide también una compilación local temporal con `indexable: true` y luego se restablece `false`; esto no implica autorización para publicar.
- Los tamaños 360, 768 y 1440 px se prueban con navegador automatizado. Chromium/Android y WebKit/iPhone se verifican por emulación; no se dispone de dispositivos físicos. Queda pendiente confirmar Safari iOS y Chrome Android reales.
- Solo se añadió `@astrojs/sitemap` a las dependencias. Playwright, Lighthouse y el formateador se ejecutaron desde `/tmp`, fuera del proyecto; no se incorporaron como dependencias de la landing. No se hicieron commits ni despliegues.
- Pendientes del cliente: dominio, teléfono, dirección, logo y fotografías reales; aprobación del material para compartir; decisión futura sobre muro de edad. En v1 se conserva únicamente el aviso de mayores de 18 años.

Resultados y alcance detallado de pruebas: [`VALIDATION.md`](VALIDATION.md).

### 2026-10-28 · Logos entregados por el cliente

- Se copiaron sin modificar los tres SVG `lavendimia-logotipo`, `lavendimia-imagotipo` y `lavendimia-isotipo` desde Descargas a `src/assets/brand/`, con autorización del cliente.
- Se eligió el logotipo horizontal para el encabezado por su legibilidad y menor altura; el imagotipo completo para el footer, mostrado en blanco mediante CSS sobre fondo vino; y el isotipo para el sello del hero y los iconos SVG/ICO/Apple Touch.
- Se actualizó el logo del JSON-LD y el logotipo en `public/og.jpg`. `site.ts` centraliza las tres variantes. Esta entrega reemplaza el pendiente anterior del logo placeholder; teléfono, dirección y dominio siguen pendientes.
- Build correcto y revisión en navegador a 360 y 1440 px, sin desbordamiento y con los SVG cargados. No se añadieron dependencias ni se hicieron commits. Las métricas Lighthouse del informe anterior corresponden a la versión previa de los logos; no se repitió la auditoría completa para este cambio visual.

### 2026-10-28 · Catálogo sin precios y presentaciones explícitas

- Por solicitud del cliente, se mantiene la cotización en WhatsApp mediante `site.showPrices: false`. El modelo conserva el precio opcional para una futura activación explícita; con el ajuste apagado no se serializan precios en las tarjetas ni se omite la pregunta del precio en WhatsApp.
- El selector explica «Caja xN» como «Caja de N unidades · capacidad cada unidad» y el diálogo añade un resumen con presentación, capacidad por envase y cantidad incluida. Se usa «envase/unidad» para no deducir el material o tipo de recipiente solo por su capacidad. Se preservan las denominaciones existentes, incluidos «Galón 4 Lt» y «Bidón». Lo desconocido se indica como «Por confirmar».
- «Consultar esta presentación» incluye el producto y la opción seleccionada en el mensaje. Se invita a indicar por WhatsApp cuántas cajas o unidades se necesitan, sin añadir carrito ni gestión de pedidos. Se conserva una foto por producto y los 52 productos/174 presentaciones del JSON sin alterarlos.
- Build correcto; se comprobaron las 174 opciones y sus mensajes, la ausencia de precios y el resumen móvil de una caja de seis envases de 2 Lt. Las mediciones Lighthouse anteriores no se repitieron para este ajuste.

### 2026-10-30 · Presentación visual para la demo

- Por solicitud del cliente, los 52 productos muestran imágenes: se conservan las tres fotos asignadas y se reutilizan como respaldo para los demás productos. La selección se centraliza en `src/data/imagery.ts`, sin modificar el catálogo ni sus presentaciones. Una futura foto propia tiene prioridad automática. Las tarjetas indican «Imagen referencial» y el diálogo aclara que etiqueta/envase pueden variar.
- Se recuperaron del historial las cuatro imágenes editoriales retiradas, sin generar imágenes nuevas ni descargar material externo. Sustituyen los escudos en portada, colección y esencia, y añaden ambientación a los tres momentos.
- Tarjetas de categoría fotográficas sin forma de estandarte, zoom suave con ratón y foco, flechas animadas, filtros más visibles y fotografías en AVIF/WebP. Se conserva la preferencia de movimiento reducido y no se añaden dependencias.
- Validación: build correcto; Chromium a 360, 768 y 1440 px, WebKit móvil emulado, filtros, búsqueda sin tildes, estado vacío, paginación, 52 diálogos con imagen, 174 presentaciones con mensaje de WhatsApp correcto y catálogo sin JavaScript. No se ha desplegado ni hecho commit.
- Lighthouse móvil sobre `pnpm preview`: rendimiento 99, accesibilidad 100, buenas prácticas 100, SEO 69 por bloqueo intencional de indexación; CLS 0 y LCP 2,2 s (ligeramente sobre la meta de 2 s). Auditoría local, no una medición en dispositivos físicos ni del hosting. Las fotos editoriales se comprobaron cargadas y las animaciones se revisaron también sin movimiento reducido.
