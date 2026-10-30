# AVA bilingüe (ES / EN) — Guía técnica y didáctica

Laboratorio Virtual UV-Vis · Determinación de KMnO₄ en aguas residuales textiles
Adaptación bilingüe del AVA de Sergio Andrés Patiño Martínez.

---

## 1. Qué se agregó

| Archivo | Cambio |
|---|---|
| `i18n.js` | **Nuevo.** Motor de traducción + diccionario ES→EN (≈450 entradas) + selector de idioma. |
| `MAIN.html` | Botón **ES / EN** en la cabecera; propaga el idioma a los módulos vía `?lang=`; `data-i18n-switcher="off"` en `<body>`. |
| Los 13 módulos | Una sola línea añadida antes de `</head>`: `<script src="i18n.js"></script>`. |
| `06-calculos-previos.html` | El PDF descargable (jsPDF) y la fecha se generan en el idioma activo. |
| `09-espectros-uvvis.html` | Los encabezados del TXT de espectros se generan en el idioma activo. |

**No se modificó ninguna lógica del simulador**: ni las fórmulas, ni las validaciones,
ni los `value` de radios y selects (que el código compara internamente), ni las claves
de `localStorage`. El HTML sigue estando escrito en español; el inglés se produce en
tiempo de ejecución.

## 2. Cómo funciona

1. El idioma se resuelve en este orden: parámetro `?lang=` → `localStorage["ava_lang"]` → español.
2. Si el idioma es **es**, el motor no hace nada (coste cero).
3. Si es **en**, al cargar la página se recorre el DOM y se traducen nodos de texto y los
   atributos `title`, `placeholder`, `alt`, `aria-label`.
4. Un `MutationObserver` traduce también **todo lo que los módulos generan después**:
   mensajes del espectrofotómetro, avisos de la balanza, lista de pendientes, informe final, etc.
5. `alert()` y `confirm()` se interceptan para mostrarse traducidos.
6. Al cambiar de idioma, el AVA se recarga con `?lang=…`. **El progreso no se pierde**,
   porque vive en `localStorage`.

## 3. Cómo corregir o ampliar una traducción

Abra `i18n.js` y edite el objeto `DICCIONARIO`. La clave es el texto **en español exacto**
tal como aparece en pantalla (los espacios múltiples y saltos de línea se normalizan solos):

```js
'Verificar patrones': 'Check standards',
```

Para textos con números o variables, use `REGLAS` (expresiones regulares):

```js
[/^P1000 ajustada a (\d+) µL$/, 'P1000 set to $1 µL'],
```

Para excluir un bloque de la traducción, agregue `data-no-i18n` al elemento.

## 4. Cómo añadir un tercer idioma

El motor está preparado para ello con dos ajustes:

1. Convertir `DICCIONARIO` en `DICCIONARIOS = { en: {...}, fr: {...} }` y seleccionar
   `DICCIONARIO = DICCIONARIOS[LANG]`.
2. Añadir el código a `IDIOMAS` y un botón más en el selector de `MAIN.html`.

## 5. Notas didácticas sobre la versión en inglés

- Se usó **inglés británico-neutro de laboratorio** (*volumetric flask*, *make up to the mark*,
  *stock solution*, *aliquot*, *cuvette*, *blank*), que es el registro de la IUPAC y de los
  manuales de análisis instrumental. Es el vocabulario que el estudiante encontrará en
  Skoog, Harris y en las fichas de seguridad GHS.
- Las frases H del KMnO₄ se tradujeron con el **texto oficial GHS/CLP en inglés**
  (*May intensify fire; oxidizer*, *Causes severe skin burns and serious eye damage*, etc.),
  no con una traducción libre. Esto permite usar el módulo 05 como práctica real de
  lectura de SDS en inglés.
- Los decimales cambian de coma a punto en la versión inglesa (50,0 mL → 50.0 mL),
  como corresponde a la convención anglosajona. Los datos que el estudiante escribe
  no se alteran.
- Los nombres propios (autor, institución) permanecen sin traducir, como es correcto.

## 6. Sugerencia de uso en clase (CLIL / AICLE)

El botón de idioma permite una secuencia de andamiaje: recorrer el módulo en español
para asegurar el contenido conceptual y repetirlo en inglés para consolidar el léxico
técnico, o bien trabajar el simulador en inglés y redactar el informe final en español.
Como el progreso se conserva al cambiar de idioma, ambos recorridos pueden alternarse
dentro de la misma sesión.
