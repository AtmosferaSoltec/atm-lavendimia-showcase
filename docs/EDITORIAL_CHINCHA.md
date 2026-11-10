# La Vendimia · Serie Chincha

Entrega del 10 de noviembre de 2026. Diez imágenes nuevas en `src/assets/editorial/`, JPEG calidad 90 y perfil ICC sRGB. Las imágenes son generadas con estética documental: no constituyen un registro fotográfico real de la propiedad, sus trabajadores o instalaciones. No se usaron fotografías de banco.

Los cuatro WebP anteriores, los SVG de marca, la serie `editorial_v2/` y los productos se conservan. No se modificaron componentes, catálogo ni referencias de imágenes en la landing. Solo OG incluye una marca, compuesta después con el SVG original.

## Imágenes y revisión visual

La revisión busca deformaciones claras y coherencia, pero no certifica cada detalle botánico, mecánico o geográfico. No se detectaron botellas, rostros, menores ni texto accidental en las diez imágenes seleccionadas. En las escenas de cosecha y brindis no se aprecian manos extra o dedos claramente duplicados; las oclusiones impiden contar todos los dedos de cada mano.

| Imagen | Tamaño | Revisión / duda residual |
|---|---|---|
| [hero.jpg](../src/assets/editorial/hero.jpg) | 1920 × 2400 | Parra, emparrado, arena y dunas; cielo libre arriba a la izquierda. No hay anomalías claras. El árbol del horizonte y la variedad de uva no pueden identificarse con certeza. |
| [esencia.jpg](../src/assets/editorial/esencia.jpg) | 1600 × 2000 | Dos manos cosechando, tijera y canasta. Agarre plausible; parte del mecanismo y contacto exacto del corte quedan ocultos por dedos y tallo. |
| [cat-vinos.jpg](../src/assets/editorial/cat-vinos.jpg) | 1200 × 1500 | Hileras de vid sobre arena y racimos maduros. Las manchas de las hojas son abundantes, algo reiteradas; no se puede asegurar que la variedad sea quebranta. |
| [cat-piscos.jpg](../src/assets/editorial/cat-piscos.jpg) | 1200 × 1500 | Cobre, cañón hacia una alberca, botijas, adobe y techo de caña. Es la imagen con mayor incertidumbre técnica: la refrigeración y el circuito completo no son visibles y deben contrastarse con la falca real. |
| [cat-cremas.jpg](../src/assets/editorial/cat-cremas.jpg) | 1200 × 1500 | Higos, canela y dos copas bajo follaje fino. Se corrigió una primera versión cuyo árbol tenía hojas demasiado anchas. No se aprecian copas deformadas; sigue sin certificarse la especie del árbol. |
| [cat-macerados.jpg](../src/assets/editorial/cat-macerados.jpg) | 1200 × 1500 | Canasta con maracuyá, piña y mango; fresas en plato de barro bajo la parra. Sin anomalías evidentes; la disposición de fruta sigue siendo algo cuidada para una toma espontánea. |
| [momento-mesa.jpg](../src/assets/editorial/momento-mesa.jpg) | 1800 × 1200 | Mesa completa bajo emparrado, adobe y quincha, sin personas. Copas pequeñas y utensilios del fondo pierden definición por la distancia; no hay deformación clara en primer plano. |
| [momento-brindis.jpg](../src/assets/editorial/momento-brindis.jpg) | 1800 × 1200 | Exactamente tres manos y tres copas, sin dedos extra evidentes. Es la escena más posada: copas y reflejos resultan muy equilibrados y semejantes. |
| [momento-detalle.jpg](../src/assets/editorial/momento-detalle.jpg) | 1800 × 1200 | Canasta gastada, racimos, cinta vino deshilachada y arena. Sin anomalías claras, texto ni etiquetas. |
| [og.jpg](../src/assets/editorial/og.jpg) | 1200 × 630 | Viñedo, dunas y SVG real a la izquierda sobre cielo limpio. No hay texto adicional. Uvas verdes y árbol referenciales; no certifican cepa ni especie local. |

## Producción y logo

- Generación con la herramienta integrada `image_gen`, un prompt por escena. [Prompts completos y corrección del árbol](editorial-chincha-prompts.json).
- Cámara solicitada: aspecto de película de 35 mm, óptica de 35–50 mm, grano fino, luz natural dorada, contraste suave y verdes naturales. Polvo, hojas manchadas y madera usada sustituyen la estética de estudio de la serie anterior.
- Los archivos generados se ajustaron al tamaño final mediante Sharp, disponible transitivamente en el proyecto, sin instalar dependencias. En los tamaños grandes esto incluye ampliación por interpolación; no equivale a detalle óptico nativo de una captura a esas dimensiones.
- `lavendimia-logotipo.svg` se rasterizó proporcionalmente a 350 px de ancho y se compuso en `(62, 205)` dentro del OG de 1200 × 630. Trazados, color y proporciones se conservaron. El SVG no se envió al generador y su archivo permanece intacto.
- JPEG calidad 90, 4:4:4 en las nueve imágenes editoriales; OG con MozJPEG 4:2:0, también calidad 90, para quedar por debajo de 200 KB. Perfil ICC sRGB incrustado, sin EXIF de cámara o geolocalización inventados.

Para orientar la falca se consultó la descripción del equipo y su cañón en la propuesta peruana de [bodegas y viñedos para la producción tradicional de pisco de UNESCO](https://whc.unesco.org/en/tentativelists/6414). Esa referencia no valida la instalación generada ni demuestra que corresponda a La Vendimia.

## Validación de archivos

Se comprobaron los diez nombres solicitados, dimensiones exactas, formato JPEG y perfil ICC sRGB. Todos los originales están por debajo de 1,5 MB; OG ocupa 153 900 bytes. Los hashes SHA-256 de los cuatro editoriales preexistentes y los tres SVG de marca coinciden antes y después. No se borraron archivos existentes ni se ejecutó un despliegue.
