# Validación · 28 de octubre de 2026

## Resultado

Build estático correcto, sin errores ni advertencias de imágenes/colección. Se ejecutaron `pnpm build` y `pnpm preview` con Astro 7.4.3. No se hicieron commits ni publicaciones.

## Lighthouse móvil

Lighthouse 13.6.0 sobre `http://127.0.0.1:4321`, perfil móvil predeterminado con 4G simulado, caché limpia y Chromium headless. Los resultados son de laboratorio local, no datos de usuarios reales.

| Métrica | Resultado final | Meta |
| --- | --- | --- |
| Rendimiento | 100 | ≥ 95 |
| Accesibilidad | 100 | 100 |
| Buenas prácticas | 100 | ≥ 95 |
| SEO, configuración entregada | 69 | 100 |
| SEO, configuración indexable temporal | 100 | 100 |
| LCP | 0,8 s | ≤ 2,0 s |
| CLS | 0 | 0 |
| JS gzip, incluyendo módulos inline | 2.523 bytes | ≤ 15 KB |
| Transferencia total observada | 302 KiB, incluyendo imágenes lazy adelantadas por el navegador | ≤ 500 KB inicial sin diferidas |
| Hero móvil | 50.352 bytes AVIF, 640 px | ≤ 150 KB |
| Tarjetas en Lighthouse móvil | 4,7–10,6 KiB por foto | ≤ 40 KB |
| Tarjetas, móvil 390 px / DPR 3 | 11,9–30,0 KiB en las ocho iniciales; máximo de los recursos de categoría a 640 px: 31,4 KiB | ≤ 40 KB |
| Open Graph | JPEG 1200 × 630, aproximadamente 80 KB | ≤ 200 KB |

**SEO 100 y `noindex` son incompatibles.** El único control SEO fallido es el bloqueo deliberado de indexación. Se comprobó una compilación temporal con `indexable: true`, obteniendo 100/100/100/100; después se restauró `false` y se recompiló. La entrega contiene `noindex, nofollow` y `Disallow: /`, como exige la especificación. El dominio sigue siendo `https://example.com`.

El presupuesto de imágenes se verifica para los perfiles móviles indicados. Los recursos mayores de 800–1200 px para escritorio/diálogo pueden superar 40 KB; no forman parte de la descarga inicial de una tarjeta en esos perfiles. Los originales y las fotos reales futuras deben medirse nuevamente.

Informes completos de esta sesión (temporales, fuera del repositorio): `/tmp/vendimia-qa/lighthouse-final.report.html` y `/tmp/vendimia-qa/lighthouse-indexable.report.html`. Resumen persistente: `performance.json`.

## Comprobaciones funcionales

- 52 productos y 174 opciones: se abrió cada diálogo, se seleccionó cada opción y se comprobó nombre, capacidad cuando existe, presentación y número en el mensaje de WhatsApp.
- Las cinco categorías devuelven los conteos correctos: vinos 16, especiales 8, piscos 5, cremas 7 y macerados 16.
- Buscar `SANGRIA` encuentra las tres coincidencias con «Sangría». Se revisaron estado vacío, limpiar filtros y carga de ocho a dieciséis tarjetas.
- Precio opcional: una presentación de prueba con S/ 96.00 actualiza el precio y elimina la pregunta del precio del mensaje. La prueba no modifica el catálogo entregado.
- Se cambió temporalmente el número en `site.ts`: los 58 enlaces estáticos y el enlace dinámico del diálogo usaron el nuevo número. Se restauró el ejemplo y se recompiló.
- Diálogo: cierre con botón, Escape y clic fuera; foco devuelto a la tarjeta; scroll del fondo bloqueado.
- Menú móvil: apertura, actualización de `aria-expanded`, cierre al seguir enlace y con Escape.
- WhatsApp flotante: visible después del hero y oculto al llegar al contacto; respeta el área segura inferior.
- Sin JavaScript: 52 tarjetas visibles, filtros ocultos y enlaces directos de consulta.
- Movimiento reducido: animaciones desactivadas y contenido visible; scroll instantáneo.
- Los builds de prueba fallaron por duplicación de id, categoría inválida y archivo de foto inexistente. Los datos originales se restauraron.
- Sin errores JavaScript durante las pruebas; `git diff --check` correcto.

## Revisión visual y navegadores

Revisión con capturas a 360, 768 y 1440 px; sin scroll horizontal. Revisión adicional de tarjetas y diálogo a 390 px / DPR 3. Se comprobó el recorrido completo de las secciones, las imágenes, los rótulos referenciales y los estados de interacción.

Chromium con emulación Pixel 7 y WebKit con emulación iPhone 13: navegación móvil y diálogo correctos. **No equivale a probar dispositivos físicos:** queda pendiente Safari iOS y Chrome Android reales.

## Criterios de aceptación (§13)

| Criterio | Estado |
| --- | --- |
| Build sin errores/advertencias | Cumplido |
| 52 productos y 174 presentaciones, filtros y búsqueda | Cumplido |
| Mensajes de WhatsApp correctos | Cumplido |
| Cambiar número actualiza todos los enlaces | Cumplido |
| Todas las metas Lighthouse, CLS 0 | Parcial: todo cumple excepto SEO por `noindex` exigido; SEO indexable verificado en 100 |
| Sin JS y movimiento reducido | Cumplido |
| 360/768/1440 y Safari iOS/Chrome Android | Parcial: tamaños y emulación cumplidos; dispositivos físicos pendientes |
| Datos de ejemplo | Cumplido; no se copiaron teléfono ni dirección reales de la maqueta |
| README de productos y WhatsApp | Cumplido |

La aprobación de marca, sustitución de fotos referenciales y datos reales quedan a cargo del cliente antes de publicar.
