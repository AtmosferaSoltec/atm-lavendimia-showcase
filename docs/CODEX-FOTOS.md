# Instrucciones para Codex: fotos de producto

Flujo de carpetas (en `src/assets/`):

| Carpeta | Contenido | Quién la toca |
|---|---|---|
| `originales/` | Fotos reales del cliente, ya recortadas (PNG sin fondo). | Solo la persona dueña del proyecto. **Codex nunca la modifica.** |
| `products/` | Fotos recreadas, las que usa la landing. | Codex añade archivos nuevos aquí. |

## Tarea

Recrear fotos de producto de La Vendimia, **solo las nuevas**.

1. Lista los `.png` de `src/assets/originales/`.
2. Una foto es **nueva** si en `src/assets/products/` **no existe** un archivo con **exactamente el mismo nombre**. Procesa solo esas.
3. Las que ya existen en `products/` se **saltan**: no las abras para rehacerlas, no las sobrescribas, no las renombres.
4. Para cada foto nueva, genera la recreación y guárdala en `src/assets/products/` con **el mismo nombre** que tiene en `originales/` (ejemplo: `originales/macerado-canela.png` → `products/macerado-canela.png`).
5. No toques `originales/`, los `.webp` ni ningún archivo fuera de `products/`.

Si no hay fotos nuevas, no hagas nada y dilo.

## Cómo debe quedar cada recreación

- **Estilo de referencia (obligatorio):** `products/macerado-canela.png` y `products/macerado-cereza.png`. Copia su limpieza, luz suave y cálida, brillos y la estructura de la etiqueta: racimo, «LA VENDIMIA», «Desde 2008», «COSECHA PROPIA», sabor en mayúsculas, «VINO MACERADO», ilustración de la fruta y franja inferior vacía con filetes dorados.
- **Se conserva de la foto real:** color del líquido, color de la cápsula/tapa, y la ilustración y los colores de la etiqueta de ese sabor. Escribe el nombre del sabor tal como aparece en la etiqueta real.
- **Se elimina:** RUC, teléfonos, registro sanitario, dirección, grado alcohólico, volumen y leyendas legales. No inventes texto nuevo.
- **Formato:** PNG con fondo transparente real (alfa 0 fuera de la botella, sin halos ni resplandor), proporción 2:3 y el mayor tamaño posible (mínimo 1024 × 1536).
- **Encuadre:** una sola botella, centrada, de frente y recta, ~85 % del alto, aire a los lados, sin sombra y sin objetos.
- **Consistencia:** misma forma de botella, mismo tamaño y posición de etiqueta y misma tipografía en todas, aunque cambie el sabor.

## Al terminar

Informa dos listas: las fotos que procesaste y las que saltaste por existir ya. Indica cualquier etiqueta cuyo texto no pudiste leer bien en el original.

Después de esto, el ajuste final (encuadre 1400 × 2100, luz, sombra, `catalog.json` y build) lo hace Claude, no Codex.
