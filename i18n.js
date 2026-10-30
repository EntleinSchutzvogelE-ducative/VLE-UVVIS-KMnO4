/* =====================================================================
   i18n.js — Motor bilingüe (ES / EN) del AVA "Laboratorio Virtual UV-Vis"
   ---------------------------------------------------------------------
   Bilingual engine (ES / EN) for the UV-Vis Virtual Lab.

   Diseño / Design
   ---------------
   1. El HTML original permanece en español. Este archivo traduce el DOM
      a inglés en tiempo de ejecución (ES -> EN) cuando el idioma activo
      es "en". Si el idioma es "es", el motor no hace nada.
   2. Un MutationObserver traduce también todo el texto que los módulos
      generan dinámicamente (mensajes de estado, informe final, etc.).
   3. El idioma se guarda en localStorage ("ava_lang") y se propaga a los
      iframes mediante el parámetro ?lang= de la URL.
   4. Para añadir o corregir textos basta con editar DICCIONARIO abajo.
      La clave es el texto en español EXACTO (los espacios múltiples y
      saltos de línea se normalizan automáticamente).

   ===================================================================== */

(function () {
  'use strict';

  /* ---------- 1. Detección y persistencia del idioma ---------- */

  var STORAGE_KEY = 'ava_lang';
  var IDIOMAS = { es: 'Español', en: 'English' };

  function leerIdioma() {
    var url;
    try {
      url = new URLSearchParams(location.search).get('lang');
    } catch (e) { url = null; }

    if (url === 'en' || url === 'es') {
      try { localStorage.setItem(STORAGE_KEY, url); } catch (e) {}
      return url;
    }
    try {
      var guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado === 'en' || guardado === 'es') return guardado;
    } catch (e) {}
    return 'es';
  }

  var LANG = leerIdioma();
  window.__lang = LANG;

  /* Bloquea la traducción automática del navegador (Chrome/Edge). Sin esto,
     Chrome detecta el AVA como español y vuelve a traducir al español el
     texto que este motor ya pasó a inglés: el idioma "parpadea". */
  (function () {
    var raiz = document.documentElement;
    raiz.setAttribute('translate', 'no');
    raiz.classList.add('notranslate');
    if (!document.querySelector('meta[content="notranslate"]')) {
      var meta = document.createElement('meta');
      meta.name = 'google';
      meta.content = 'notranslate';
      (document.head || raiz).appendChild(meta);
    }
  })();

  /* Evita el "parpadeo" del texto en español mientras se traduce. */
  if (LANG === 'en') {
    document.documentElement.setAttribute('lang', 'en');
    var estilo = document.createElement('style');
    estilo.id = 'i18n-pending-style';
    estilo.textContent = 'body{visibility:hidden}';
    (document.head || document.documentElement).appendChild(estilo);
    setTimeout(quitarVelo, 1500); // salvaguarda
  }

  function quitarVelo() {
    var s = document.getElementById('i18n-pending-style');
    if (s) s.remove();
  }

  /* ---------- 2. Utilidades ---------- */

  function norm(s) {
    return String(s).replace(/\s+/g, ' ').trim();
  }

  /* ---------- 3. Diccionario ES -> EN ---------- */
  /* Editable: agregue pares "texto en español": "English text". */

  var DICCIONARIO = {

    /* ---- Comunes / créditos ---- */
    'Laboratorio Virtual UV-Vis — ESE': 'UV-Vis Virtual Laboratory — ESE',
    'Laboratorio virtual UV-Vis': 'UV-Vis Virtual Laboratory',
    'Laboratorio Virtual UV-Vis': 'UV-Vis Virtual Laboratory',
    'Laboratorio Virtual': 'Virtual Laboratory',
    'ESE — Entlein-Schutzvogel Educative': 'ESE — Entlein-Schutzvogel Educative',
    'ESE - Entlein-Schutzvogel Educative': 'ESE - Entlein-Schutzvogel Educative',
    'ESE — Entlein-Schutzvogel Educative · Educación, Simulación y Experimentación':
      'ESE — Entlein-Schutzvogel Educative · Education, Simulation and Experimentation',
    'Curso': 'Course',
    'Análisis Químico': 'Chemical Analysis',
    'Docente': 'Instructor',
    'Institución': 'Institution',
    'Versión 1.0 · ESE': 'Version 1.0 · ESE',
    'Continuar →': 'Continue →',
    'Analizar': 'Analyze',
    'Cuantificación': 'Quantification',
    'Decisión': 'Decision',
    'Fecha': 'Date',
    'Resultado': 'Result',
    'Resultado:': 'Result:',
    'Muestra': 'Sample',
    'Curva': 'Curve',
    'Patrones': 'Standards',
    'Absorbancia': 'Absorbance',
    'Verificar': 'Check',
    'Siguiente': 'Next',
    'del simulador.': 'button in the simulator.',
    'No disponible': 'Not available',
    'No cumple': 'Does not comply',
    'Cumple': 'Complies',
    'Selecciona un archivo de imagen válido.': 'Please select a valid image file.',
    'Selecciona una imagen válida.': 'Please select a valid image.',

    /* ---- 01 Portada ---- */
    'Portada — Laboratorio Virtual UV-Vis': 'Cover — UV-Vis Virtual Laboratory',
    'Determinación de permanganato de potasio': 'Determination of potassium permanganate',
    'Espectrofotometría UV-Visible': 'UV-Visible Spectrophotometry',
    'Determinación de Permanganato de Potasio en Aguas Residuales de la Industria Textil por espectrofotometría UV-Visible':
      'Determination of Potassium Permanganate in Textile Industry Wastewater by UV-Visible Spectrophotometry',
    'En este laboratorio virtual implementarás un método analítico para determinar la concentración de KMnO₄ en una muestra de agua residual textil, construirás una curva de calibración y tomarás una decisión técnica frente al límite permisible de manganeso elemental.':
      'In this virtual laboratory you will implement an analytical method to determine the KMnO₄ concentration in a textile wastewater sample, build a calibration curve and make a technical decision against the permissible limit for elemental manganese.',
    'Imagen de apoyo para ambientes virtuales de aprendizaje en química':
      'Supporting image for virtual learning environments in chemistry',

    /* ---- 02 Situación problemática ---- */
    'Problema ambiental — Laboratorio Virtual UV-Vis': 'Environmental problem — UV-Vis Virtual Laboratory',
    'Contexto profesional del método': 'Professional context of the method',
    'Caso de estudio': 'Case study',
    'Control de manganeso en un vertimiento de la industria textil':
      'Manganese control in a textile industry discharge',
    'CASO DE ESTUDIO · INDUSTRIA TEXTIL': 'CASE STUDY · TEXTILE INDUSTRY',
    'Situación problemática': 'Problem situation',
    'Una industria textil utiliza permanganato de potasio como agente oxidante en procesos de preparación, blanqueamiento o acondicionamiento de fibras. Como resultado, parte del compuesto puede permanecer en las aguas residuales generadas durante el proceso.':
      'A textile plant uses potassium permanganate as an oxidizing agent in fibre preparation, bleaching or conditioning processes. As a result, part of the compound may remain in the wastewater generated during the process.',
    'Tu papel en la práctica': 'Your role in the practical',
    'Actuarás como analista químico. Prepararás soluciones patrón, registrarás espectros UV‑Visible, construirás una curva de calibración, cuantificarás una muestra problema y emitirás una decisión basada en evidencia experimental.':
      'You will act as the analytical chemist. You will prepare standard solutions, record UV-Visible spectra, build a calibration curve, quantify an unknown sample and issue a decision based on experimental evidence.',
    'Necesidad analítica': 'Analytical need',
    'Para evaluar la calidad del vertimiento se aplicará un método por espectrofotometría UV‑Visible que permitirá determinar la concentración de permanganato de potasio y expresarla como manganeso elemental.':
      'To assess the quality of the discharge, a UV-Visible spectrophotometric method will be applied to determine the potassium permanganate concentration and express it as elemental manganese.',
    'Criterio de decisión': 'Decision criterion',
    'Para esta práctica se establece un límite máximo permisible de':
      'For this practical a maximum permissible limit of',
    'manganeso elemental': 'elemental manganese',
    'en el vertimiento.': 'is set for the discharge.',
    'Ruta general del método': 'General route of the method',
    'Planear': 'Plan',
    'Calcular masa y volúmenes de preparación.': 'Calculate preparation mass and volumes.',
    'Preparar': 'Prepare',
    'Obtener solución madre y patrones.': 'Obtain the stock solution and standards.',
    'Medir': 'Measure',
    'Registrar espectros UV-Vis.': 'Record UV-Vis spectra.',
    'Seleccionar la longitud de onda analítica.': 'Select the analytical wavelength.',
    'Cuantificar': 'Quantify',
    'Construir curva y calcular concentración.': 'Build the curve and calculate concentration.',
    'Decidir': 'Decide',
    'Evaluar cumplimiento frente al límite.': 'Assess compliance against the limit.',
    'En el siguiente módulo conocerá los objetivos de aprendizaje.':
      'In the next module you will review the learning objectives.',
    'Proceso textil donde se utiliza permanganato de potasio':
      'Textile process in which potassium permanganate is used',

    /* ---- 03 Objetivos ---- */
    'Objetivos — Laboratorio Virtual UV-Vis': 'Objectives — UV-Vis Virtual Laboratory',
    'Objetivos de aprendizaje': 'Learning objectives',
    'Al finalizar esta práctica usted será capaz de…': 'By the end of this practical you will be able to…',
    'Competencias y resultados de aprendizaje que desarrollará durante la experiencia.':
      'Competences and learning outcomes you will develop during the experience.',
    'Objetivo general': 'General objective',
    'Determinar la concentración de permanganato de potasio en una muestra de agua residual mediante espectrofotometría UV‑Visible para evaluar el cumplimiento del límite permisible de manganeso elemental.':
      'Determine the potassium permanganate concentration in a wastewater sample by UV-Visible spectrophotometry in order to assess compliance with the permissible limit for elemental manganese.',
    'Analizar el comportamiento espectral de soluciones de permanganato de potasio para seleccionar las condiciones adecuadas de cuantificación.':
      'Analyze the spectral behaviour of potassium permanganate solutions in order to select suitable quantification conditions.',
    'Construir': 'Build',
    'Aplicar procedimientos de calibración espectrofotométrica para determinar la concentración de una muestra problema.':
      'Apply spectrophotometric calibration procedures to determine the concentration of an unknown sample.',
    'Interpretar': 'Interpret',
    'Interpretar los resultados obtenidos para establecer el cumplimiento de un criterio de calidad ambiental.':
      'Interpret the results obtained in order to establish compliance with an environmental quality criterion.',
    'Competencias que se integran en la práctica': 'Competences integrated in this practical',
    'Preparación': 'Preparation',
    'Soluciones, diluciones y patrones de calibración.':
      'Solutions, dilutions and calibration standards.',
    'Análisis de datos': 'Data analysis',
    'Espectros, gráficas, regresión lineal y R².': 'Spectra, plots, linear regression and R².',
    'Uso de la ecuación de calibración para estimar concentración.':
      'Use of the calibration equation to estimate concentration.',
    'Interpretación del resultado frente a una especificación.':
      'Interpretation of the result against a specification.',
    'A continuación revisará las normas de seguridad del laboratorio.':
      'Next you will review the laboratory safety rules.',
    'Espectrofotómetro UV-Visible': 'UV-Visible spectrophotometer',

    /* ---- 04 Fundamento del método ---- */
    'Fundamento del método — Laboratorio Virtual UV-Vis': 'Method background — UV-Vis Virtual Laboratory',
    'Fundamento del método analítico': 'Background of the analytical method',
    'Fundamento de la cuantificación UV-Visible': 'Basis of UV-Visible quantification',
    'Cómo una señal de absorbancia permite determinar la concentración de KMnO₄':
      'How an absorbance signal makes it possible to determine the KMnO₄ concentration',
    'La lógica del método': 'The logic of the method',
    'El permanganato de potasio absorbe radiación en la región visible. Al medir la absorbancia de soluciones de concentración conocida, es posible construir una relación de calibración y utilizarla para determinar la concentración de una muestra problema.':
      'Potassium permanganate absorbs radiation in the visible region. By measuring the absorbance of solutions of known concentration, a calibration relationship can be built and used to determine the concentration of an unknown sample.',
    'Absorción': 'Absorption',
    'El KMnO₄ presenta color violeta porque absorbe radiación visible.':
      'KMnO₄ is violet because it absorbs visible radiation.',
    'Señal y concentración': 'Signal and concentration',
    'Dentro del intervalo lineal, una mayor concentración produce una mayor absorbancia.':
      'Within the linear range, a higher concentration produces a higher absorbance.',
    'La absorbancia de la muestra puede convertirse en concentración mediante una curva de calibración.':
      'The absorbance of the sample can be converted into concentration by means of a calibration curve.',
    'Ley de Beer-Lambert': 'Beer-Lambert law',
    'La relación fundamental entre absorbancia y concentración se expresa como:':
      'The fundamental relationship between absorbance and concentration is expressed as:',
    'absorbancia medida': 'measured absorbance',
    'absortividad molar': 'molar absorptivity',
    'camino óptico': 'optical path length',
    'concentración': 'concentration',
    'Si ε y b permanecen constantes:': 'If ε and b remain constant:',
    'Calibración por patrón externo': 'External standard calibration',
    'Se preparan soluciones patrón de concentración conocida, se mide su absorbancia y se construye una curva de calibración. La absorbancia de la muestra se introduce en esa relación para calcular su concentración.':
      'Standard solutions of known concentration are prepared, their absorbance is measured and a calibration curve is built. The absorbance of the sample is entered into that relationship to calculate its concentration.',
    'Concentraciones conocidas.': 'Known concentrations.',
    'Señales medidas.': 'Measured signals.',
    'Relación A frente a C.': 'A versus C relationship.',
    'Absorbancia desconocida.': 'Unknown absorbance.',
    'Concentración calculada.': 'Calculated concentration.',
    'Verificación rápida': 'Quick check',
    'Selecciona la opción correcta para completar este módulo.':
      'Select the correct option to complete this module.',
    '¿Por qué el permanganato de potasio puede determinarse mediante espectrofotometría UV-Visible?':
      'Why can potassium permanganate be determined by UV-Visible spectrophotometry?',
    'Porque absorbe radiación en la región UV-Visible y su absorbancia se relaciona con la concentración.':
      'Because it absorbs radiation in the UV-Visible region and its absorbance is related to concentration.',
    'Porque es una sal incolora que no interactúa con la luz.':
      'Because it is a colourless salt that does not interact with light.',
    'Porque no requiere una curva de calibración.': 'Because it does not require a calibration curve.',
    'Porque todas las soluciones presentan siempre absorbancia igual a 1.':
      'Because every solution always shows an absorbance equal to 1.',
    '✔ Correcto. El KMnO₄ puede cuantificarse porque absorbe radiación y su absorbancia se relaciona con la concentración.':
      '✔ Correct. KMnO₄ can be quantified because it absorbs radiation and its absorbance is related to concentration.',
    'Revisa la explicación anterior. La clave del método es que el KMnO₄ absorbe radiación UV-Visible y esa señal puede relacionarse con la concentración.':
      'Review the explanation above. The key idea is that KMnO₄ absorbs UV-Visible radiation and that signal can be related to concentration.',

    /* ---- 05 Seguridad ---- */
    'Seguridad — Laboratorio Virtual UV-Vis v2': 'Safety — UV-Vis Virtual Laboratory v2',
    'Seguridad química — ACS/RAMP': 'Chemical safety — ACS/RAMP',
    'Seguridad y gestión del riesgo': 'Safety and risk management',
    'Reconoce los peligros, minimiza la exposición y actúa como en un laboratorio real':
      'Recognize the hazards, minimize exposure and act as in a real laboratory',
    'Reactivo principal: permanganato de potasio, KMnO₄.':
      'Main reagent: potassium permanganate, KMnO₄.',
    'Es un oxidante fuerte. Puede agravar incendios, causar lesiones graves por contacto y representa un peligro ambiental.':
      'It is a strong oxidizer. It may intensify fire, cause severe injury on contact and is an environmental hazard.',
    'Pictogramas y palabra de advertencia': 'Pictograms and signal word',
    'PELIGRO': 'DANGER',
    'En el laboratorio debe consultarse siempre la ficha de datos de seguridad vigente del proveedor.':
      'In the laboratory, always consult the current safety data sheet supplied by the manufacturer.',
    'Peligros principales': 'Main hazards',
    'Puede agravar un incendio; comburente.': 'May intensify fire; oxidizer.',
    'Nocivo en caso de ingestión.': 'Harmful if swallowed.',
    'Provoca quemaduras graves en la piel y lesiones oculares graves.':
      'Causes severe skin burns and serious eye damage.',
    'Muy tóxico para los organismos acuáticos, con efectos duraderos.':
      'Very toxic to aquatic life with long lasting effects.',
    'Modelo RAMP aplicado a la práctica': 'RAMP model applied to this practical',
    'Reconocer': 'Recognize',
    'Oxidante fuerte, corrosivo y peligroso para el ambiente.':
      'Strong oxidizer, corrosive and hazardous to the environment.',
    'Evaluar': 'Assess',
    'Riesgo de polvo, salpicaduras, ingestión y vertimientos.':
      'Risk of dust, splashes, ingestion and discharges.',
    'Minimizar': 'Minimize',
    'Usar EPP, rotular, evitar combustibles y controlar derrames.':
      'Use PPE, label containers, keep away from combustibles and control spills.',
    'Prepararse': 'Prepare',
    'Conocer ducha, lavaojos, manejo de residuos y reporte de incidentes.':
      'Know the safety shower, eyewash station, waste handling and incident reporting.',
    'Elementos de protección personal': 'Personal protective equipment',
    'Bata': 'Lab coat',
    'Abotonada durante toda la práctica.': 'Buttoned up throughout the practical.',
    'Gafas': 'Safety goggles',
    'Protección frente a salpicaduras.': 'Protection against splashes.',
    'Guantes': 'Gloves',
    'Preferiblemente de nitrilo.': 'Preferably nitrile.',
    'Calzado cerrado': 'Closed-toe shoes',
    'Protección ante derrames.': 'Protection against spills.',
    'Conductas esenciales': 'Essential behaviours',
    'Mantener el reactivo alejado de materiales combustibles.':
      'Keep the reagent away from combustible materials.',
    'Evitar inhalar polvo y prevenir salpicaduras.': 'Avoid inhaling dust and prevent splashes.',
    'No verter residuos de KMnO₄ directamente al drenaje.':
      'Do not pour KMnO₄ waste directly down the drain.',
    'Reportar inmediatamente cualquier derrame o exposición.':
      'Report any spill or exposure immediately.',
    'Compromiso de seguridad': 'Safety commitment',
    'Marca todas las condiciones antes de continuar.': 'Tick every condition before continuing.',
    'Reconozco que el KMnO₄ es un oxidante fuerte.': 'I acknowledge that KMnO₄ is a strong oxidizer.',
    'Usaría bata, gafas, guantes y calzado cerrado.':
      'I would wear a lab coat, goggles, gloves and closed-toe shoes.',
    'Mantendría el reactivo alejado de combustibles.':
      'I would keep the reagent away from combustibles.',
    'Evitaría inhalar polvo y generar salpicaduras.': 'I would avoid inhaling dust and creating splashes.',
    'Gestionaría los residuos como residuos químicos.': 'I would manage the waste as chemical waste.',
    'Reportaría inmediatamente cualquier incidente.': 'I would report any incident immediately.',
    'Completa toda la lista de verificación para habilitar el siguiente módulo.':
      'Complete the whole checklist to unlock the next module.',
    'Completa toda la lista de verificación para desbloquear el siguiente módulo.':
      'Complete the whole checklist to unlock the next module.',
    'Pictogramas GHS aplicables al permanganato de potasio':
      'GHS pictograms applicable to potassium permanganate',
    '✔ Compromiso de seguridad completado. Puedes continuar al siguiente módulo.':
      '✔ Safety commitment completed. You may continue to the next module.',

    /* ---- 06 Cálculos previos ---- */
    'Planeación experimental — Preparación de soluciones UV-Vis':
      'Experimental planning — Preparation of UV-Vis solutions',
    'Cálculos previos': 'Preliminary calculations',
    'Solución madre y patrones de calibración': 'Stock solution and calibration standards',
    'Planeación experimental': 'Experimental planning',
    'Calcula antes de preparar': 'Calculate before you prepare',
    'Determina la masa necesaria para preparar la solución madre de KMnO₄ y los volúmenes que utilizarás para obtener la serie de patrones de calibración.':
      'Determine the mass required to prepare the KMnO₄ stock solution and the volumes you will use to obtain the series of calibration standards.',
    'Solución madre': 'Stock solution',
    'Preparar 50,0 mL de KMnO₄ a 2000 ppm.': 'Prepare 50.0 mL of 2000 ppm KMnO₄.',
    'Calcula la masa de KMnO₄ puro y expresa el resultado en':
      'Calculate the mass of pure KMnO₄ and express the result in',
    'Masa de KMnO₄:': 'Mass of KMnO₄:',
    'Soluciones patrón': 'Standard solutions',
    'Preparar 25,0 mL de cada patrón a partir de la solución madre de 2000 ppm.':
      'Prepare 25.0 mL of each standard from the 2000 ppm stock solution.',
    'Solución': 'Solution',
    'V₁ de solución madre (µL)': 'V₁ of stock solution (µL)',
    'Blanco': 'Blank',
    'registrado': 'recorded',
    'Patrón 1': 'Standard 1',
    'Patrón 2': 'Standard 2',
    'Patrón 3': 'Standard 3',
    'Patrón 4': 'Standard 4',
    'Patrón 5': 'Standard 5',
    'Patrón 6': 'Standard 6',
    'Verificar patrones': 'Check standards',
    'Tolerancia aceptada: ±20 µL.': 'Accepted tolerance: ±20 µL.',
    'Conservar la proyección': 'Keep the worksheet',
    'Cuando ambos cálculos sean correctos podrás descargar una copia con la masa y los volúmenes que utilizarás en los módulos siguientes.':
      'Once both calculations are correct you will be able to download a copy with the mass and volumes you will use in the following modules.',
    'Estudiante:': 'Student:',
    'Descargar PDF': 'Download PDF',
    'Verifica primero la masa y los volúmenes.': 'Check the mass and the volumes first.',
    'Completa correctamente los dos cálculos para habilitar el siguiente módulo.':
      'Complete both calculations correctly to unlock the next module.',
    'Nombre opcional': 'Optional name',
    'Cálculos verificados. El PDF está disponible.': 'Calculations verified. The PDF is available.',
    'Ingrese un valor numérico en mg.': 'Enter a numeric value in mg.',
    'Masa demasiado baja. Revisa el planteamiento del problema.':
      'Mass is too low. Review how you set up the problem.',
    '✔ Correcto: se requieren 100,0 mg de KMnO₄.': '✔ Correct: 100.0 mg of KMnO₄ are required.',
    'El valor no corresponde. Revisa el cálculo.': 'That value is not right. Review the calculation.',
    '✔ Volúmenes correctos para la serie de patrones.':
      '✔ Correct volumes for the series of standards.',
    'Revisa los volúmenes calculados.': 'Review the calculated volumes.',
    'Primero debes verificar correctamente la masa y la tabla de patrones.':
      'You must first verify the mass and the table of standards correctly.',
    'No fue posible cargar el generador de PDF. Verifica la conexión a internet e inténtalo nuevamente.':
      'The PDF generator could not be loaded. Check your internet connection and try again.',
    'PDF descargado correctamente. Consérvalo para los módulos siguientes.':
      'PDF downloaded successfully. Keep it for the following modules.',
    '✔ Cálculos verificados. Puedes continuar al siguiente módulo.':
      '✔ Calculations verified. You may continue to the next module.',
    /* Texto del PDF generado (sin tildes, como en el original) */
    'PROYECCION DE CALCULOS - LABORATORIO UV-VIS': 'CALCULATION WORKSHEET - UV-VIS LABORATORY',
    'Preparacion de soluciones de permanganato de potasio (KMnO4)':
      'Preparation of potassium permanganate solutions (KMnO4)',
    'Calibracion por patron externo': 'External standard calibration',
    '1. Solucion madre': '1. Stock solution',
    'Concentracion requerida:': 'Required concentration:',
    'Volumen final:': 'Final volume:',
    'Relacion empleada:': 'Relationship used:',
    'masa = concentracion x volumen': 'mass = concentration x volume',
    'Calculo:': 'Calculation:',
    'Masa de KMnO4 = 100.0 mg = 0.1000 g': 'Mass of KMnO4 = 100.0 mg = 0.1000 g',
    '2. Soluciones patron': '2. Standard solutions',
    'Solucion madre: 2000 ppm': 'Stock solution: 2000 ppm',
    'Volumen final de cada patron: 25.0 mL': 'Final volume of each standard: 25.0 mL',
    'Ecuacion de dilucion: C1 x V1 = C2 x V2': 'Dilution equation: C1 x V1 = C2 x V2',
    'Patron': 'Standard',
    'Importante:': 'Important:',
    'Conserva esta proyeccion. La masa de 0.1000 g se utilizara para preparar la solucion madre y los volumenes de 125 a 750 uL se emplearan para preparar la serie patron con una micropipeta P1000.':
      'Keep this worksheet. The 0.1000 g mass will be used to prepare the stock solution and the volumes from 125 to 750 uL will be used to prepare the standard series with a P1000 micropipette.',

    /* ---- 07 Solución madre ---- */
    'Preparación de solución madre 2000 ppm — KMnO₄':
      'Preparation of the 2000 ppm stock solution — KMnO₄',
    'Preparación de la solución madre': 'Preparation of the stock solution',
    'KMnO₄ 2000 ppm · 50,0 mL': 'KMnO₄ 2000 ppm · 50.0 mL',
    'Propósito experimental': 'Experimental purpose',
    '¿Qué vas a preparar?': 'What are you going to prepare?',
    'Prepararás': 'You will prepare',
    '50,0 mL de KMnO₄ a 2000 ppm': '50.0 mL of 2000 ppm KMnO₄',
    '. Esta solución se utilizará posteriormente para obtener los patrones de calibración.':
      '. This solution will later be used to obtain the calibration standards.',
    'Meta:': 'Goal:',
    'pesar 0,1000 g, disolver, aforar a 50,0 mL y homogeneizar.':
      'weigh 0.1000 g, dissolve, make up to 50.0 mL and homogenize.',
    'Secuencia experimental': 'Experimental sequence',
    'Enciende, ajusta el cero, tara, pesa': 'Switch on, zero, tare, weigh',
    ', disuelve, afora y homogeneiza.': ', dissolve, make up to the mark and homogenize.',
    'Colocar balón': 'Place flask',
    'Añadir KMnO₄': 'Add KMnO₄',
    'Retirar balón': 'Remove flask',
    'Añadir agua': 'Add water',
    'Disolver': 'Dissolve',
    'Completar aforo': 'Make up to mark',
    'Homogeneizar': 'Homogenize',
    '↺ Reiniciar': '↺ Restart',
    '1. Encender': '1. Switch on',
    '2. Cero': '2. Zero',
    '3. Colocar': '3. Place',
    '4. Tarar': '4. Tare',
    '5. Pesar': '5. Weigh',
    '6. Retirar': '6. Remove',
    '7. Agua': '7. Water',
    '8. Disolver': '8. Dissolve',
    '9. Aforar': '9. Make up',
    '10. Homogeneizar': '10. Homogenize',
    'Completa la secuencia experimental para continuar.':
      'Complete the experimental sequence to continue.',
    'Obtén la masa objetivo de KMnO₄ y prepara correctamente la solución madre de 2000 ppm.':
      'Reach the target mass of KMnO₄ and correctly prepare the 2000 ppm stock solution.',
    'La balanza debe permanecer encendida durante el procedimiento. Usa Reiniciar si deseas comenzar de nuevo.':
      'The balance must stay on during the procedure. Use Restart if you want to begin again.',
    'Balanza encendida. Ajusta el cero antes de colocar el balón aforado.':
      'Balance switched on. Zero it before placing the volumetric flask.',
    'El ajuste de cero debe realizarse con la balanza encendida y sin recipiente sobre el plato.':
      'Zeroing must be done with the balance on and no container on the pan.',
    '✔ Balanza ajustada a cero. Coloca ahora el balón aforado.':
      '✔ Balance zeroed. Now place the volumetric flask.',
    'Balón colocado. Usa TARE para descontar la masa del recipiente.':
      'Flask in place. Use TARE to subtract the mass of the container.',
    '✔ Recipiente tarado. Añade KMnO₄ hasta alcanzar exactamente 0.1000 g.':
      '✔ Container tared. Add KMnO₄ until exactly 0.1000 g is reached.',
    'La masa objetivo ya fue alcanzada. Retira el balón de la balanza.':
      'The target mass has already been reached. Remove the flask from the balance.',
    '✔ Masa objetivo alcanzada: 0.1000 g. Retira el balón de la balanza.':
      '✔ Target mass reached: 0.1000 g. Remove the flask from the balance.',
    'Masa actual:': 'Current mass:',
    '. Continúa añadiendo pequeñas porciones.': '. Keep adding small portions.',
    '✔ Balón retirado. Añade primero una porción de agua destilada; todavía no completes hasta la marca.':
      '✔ Flask removed. First add a portion of distilled water; do not fill up to the mark yet.',
    'Se añadió agua destilada hasta aproximadamente dos tercios del cuerpo del balón. Ahora agita hasta disolver completamente el KMnO₄.':
      'Distilled water was added up to about two thirds of the body of the flask. Now swirl until the KMnO₄ dissolves completely.',
    'Disolviendo el sólido mediante agitación suave…': 'Dissolving the solid with gentle swirling…',
    '✔ El KMnO₄ se disolvió completamente. Completa ahora el volumen hasta la línea de aforo.':
      '✔ The KMnO₄ has dissolved completely. Now make up the volume to the graduation mark.',
    'Añadiendo agua destilada lentamente. La lectura final debe hacerse a la altura de los ojos.':
      'Adding distilled water slowly. The final reading must be taken at eye level.',
    '✔ El punto más bajo del menisco coincide con la línea de aforo. Falta homogeneizar la solución.':
      '✔ The bottom of the meniscus is level with the graduation mark. The solution still has to be homogenized.',
    'Tapando e invirtiendo el balón varias veces para homogeneizar la solución…':
      'Stoppering and inverting the flask several times to homogenize the solution…',
    '✔ Solución madre de KMnO₄ preparada y homogeneizada correctamente.':
      '✔ KMnO₄ stock solution prepared and homogenized correctly.',
    '✔ Solución madre preparada correctamente. Puedes continuar.':
      '✔ Stock solution prepared correctly. You may continue.',
    'Práctica reiniciada. Enciende la balanza para comenzar.':
      'Practical restarted. Switch on the balance to begin.',

    /* ---- 08 Diluciones / patrones ---- */
    'Preparación de soluciones patrón — Diluciones KMnO₄':
      'Preparation of standard solutions — KMnO₄ dilutions',
    'Preparación de soluciones patrón': 'Preparation of standard solutions',
    'Dilución directa desde KMnO₄ 2000 ppm · P1000 · 25,0 mL':
      'Direct dilution from 2000 ppm KMnO₄ · P1000 · 25.0 mL',
    '¿Qué harás en este módulo?': 'What will you do in this module?',
    'Prepararás seis patrones de KMnO₄ entre': 'You will prepare six KMnO₄ standards between',
    '10 y 60 ppm': '10 and 60 ppm',
    '. Para cada uno, verificarás la alícuota, la tomarás con una micropipeta P1000, la transferirás a un balón aforado de 25,0 mL y completarás el volumen con agua destilada.':
      '. For each one you will check the aliquot, draw it with a P1000 micropipette, transfer it to a 25.0 mL volumetric flask and make up the volume with distilled water.',
    'Secuencia:': 'Sequence:',
    'verificar volumen → aspirar → transferir → aforar → continuar.':
      'check volume → aspirate → transfer → make up to mark → continue.',
    'Control de preparación': 'Preparation control',
    'Preparación de patrones': 'Preparation of standards',
    'Patrón actual': 'Current standard',
    'Ingrese el volumen de solución madre que debe transferirse al balón aforado.':
      'Enter the volume of stock solution that must be transferred to the volumetric flask.',
    '1. Tomar alícuota': '1. Draw aliquot',
    '2. Transferir al balón': '2. Transfer to flask',
    '3. Completar al aforo': '3. Make up to mark',
    '4. Siguiente patrón': '4. Next standard',
    'Verifica el volumen de alícuota para iniciar la preparación del patrón.':
      'Check the aliquot volume to start preparing the standard.',
    'Preparación del Patrón 1': 'Preparation of Standard 1',
    'Verifique el volumen antes de transferir.': 'Check the volume before transferring.',
    'Serie preparada': 'Series prepared',
    'Volumen de alícuota en microlitros': 'Aliquot volume in microlitres',
    'P1000 lista': 'P1000 ready',
    'Ingrese un valor numérico en µL.': 'Enter a numeric value in µL.',
    '❌ Volumen incorrecto. Revisa el cálculo de dilución para este patrón.':
      '❌ Incorrect volume. Review the dilution calculation for this standard.',
    'La punta entra centrada en la solución madre. Se presiona el émbolo antes de aspirar.':
      'The tip enters centred in the stock solution. The plunger is pressed before aspirating.',
    'El émbolo sube y la solución morada entra en la punta.':
      'The plunger rises and the purple solution enters the tip.',
    '✔ Alícuota tomada desde el vaso. Ahora deposítala dentro del balón aforado.':
      '✔ Aliquot drawn from the beaker. Now deliver it into the volumetric flask.',
    'La micropipeta se desplaza hacia la boca del balón con la alícuota en la punta.':
      'The micropipette moves towards the neck of the flask with the aliquot in the tip.',
    'La punta entra centrada en el cuello del balón antes de dispensar.':
      'The tip enters centred in the neck of the flask before dispensing.',
    'La alícuota se descarga dentro del balón.': 'The aliquot is dispensed into the flask.',
    'La alícuota quedó en el balón. Se retira la micropipeta antes de completar al aforo.':
      'The aliquot is now in the flask. The micropipette is removed before making up to the mark.',
    '✔ Alícuota depositada dentro del balón. Ahora completa con agua destilada hasta la línea de aforo.':
      '✔ Aliquot delivered into the flask. Now make up with distilled water to the graduation mark.',
    '✔ Serie completa. Los seis patrones están listos para el registro espectral.':
      '✔ Series complete. The six standards are ready for spectral recording.',
    'Serie de patrones completada': 'Series of standards completed',
    'Puede continuar al registro de espectros UV-Vis.':
      'You may continue to the recording of UV-Vis spectra.',
    'Serie completa': 'Series complete',

    /* ---- 09 Espectros ---- */
    'Toma de espectros UV-Vis — KMnO₄': 'Recording UV-Vis spectra — KMnO₄',
    'Registro de espectros UV-Visible': 'Recording of UV-Visible spectra',
    'Patrones de KMnO₄ y muestra problema · Barrido de 800 a 210 nm':
      'KMnO₄ standards and unknown sample · Scan from 800 to 210 nm',
    'Soluciones para analizar': 'Solutions to analyze',
    'Espectros registrados': 'Recorded spectra',
    'Muestra problema': 'Unknown sample',
    'Llenar cubeta de muestra': 'Fill sample cuvette',
    'Vaciar y lavar cubeta': 'Empty and rinse cuvette',
    'Registra los seis patrones y la muestra para habilitar el botón':
      'Record the six standards and the sample to enable the',
    'Cubeta vacía': 'Empty cuvette',
    'Equipo apagado': 'Instrument off',
    'Insertar blanco': 'Insert blank',
    'Leer blanco': 'Read blank',
    'Insertar muestra': 'Insert sample',
    'Sacar muestra': 'Remove sample',
    'Tomar espectro': 'Record spectrum',
    'Descargar TXT': 'Download TXT',
    'Primero retire, vacíe y lave la cubeta antes de cambiar de solución.':
      'First remove, empty and rinse the cuvette before changing solution.',
    'Seleccionada muestra problema': 'Unknown sample selected',
    'Equipo encendido — inserte el blanco': 'Instrument on — insert the blank',
    'Encienda el equipo antes de insertar el blanco.':
      'Switch on the instrument before inserting the blank.',
    'Blanco insertado — realice la lectura': 'Blank inserted — take the reading',
    'Encienda el equipo e inserte el blanco.': 'Switch on the instrument and insert the blank.',
    'Blanco registrado — A = 0,000 y línea base corregida':
      'Blank recorded — A = 0.000 and baseline corrected',
    'Seleccione una solución.': 'Select a solution.',
    'Retire la cubeta del equipo antes de llenarla.':
      'Remove the cuvette from the instrument before filling it.',
    'La cubeta ya contiene una solución. Vacíela y lávela antes de volver a llenarla.':
      'The cuvette already contains a solution. Empty and rinse it before filling it again.',
    'Llene la cubeta antes de insertarla.': 'Fill the cuvette before inserting it.',
    'Espere a que finalice el barrido.': 'Wait for the scan to finish.',
    'Espectro registrado — retire, vacíe y lave': 'Spectrum recorded — remove, empty and rinse',
    'Cubeta retirada': 'Cuvette removed',
    'Retire la cubeta del equipo antes de vaciarla.':
      'Remove the cuvette from the instrument before emptying it.',
    'Cubeta vaciada y lavada — seleccione la siguiente solución':
      'Cuvette emptied and rinsed — select the next solution',
    'Complete la secuencia: encender, leer blanco, seleccionar, llenar e insertar la cubeta.':
      'Complete the sequence: switch on, read the blank, select, fill and insert the cuvette.',
    'Barrido en curso': 'Scan in progress',
    'Corrigiendo línea base': 'Correcting baseline',
    'Primero debe registrar el espectro de la solución seleccionada.':
      'You must first record the spectrum of the selected solution.',
    '✔ Se registraron los seis patrones y la muestra. Puedes continuar.':
      '✔ The six standards and the sample have been recorded. You may continue.',
    /* Encabezados del archivo TXT */
    'Intervalo instrumental: 800-210 nm': 'Instrument range: 800-210 nm',
    'Sentido del barrido: descendente': 'Scan direction: descending',
    'Longitud_onda(nm)': 'Wavelength_nm',

    /* ---- 10 Análisis espectral ---- */
    'Módulo 5 — Análisis espectral UV-Vis': 'Module 5 — UV-Vis spectral analysis',
    'Análisis espectral': 'Spectral analysis',
    'Identifica los máximos de absorción y selecciona la longitud de onda analítica para construir la curva de calibración.':
      'Identify the absorption maxima and select the analytical wavelength you will use to build the calibration curve.',
    'Propósito del módulo': 'Purpose of the module',
    'Superpone los seis espectros patrón, identifica tres máximos de absorción y selecciona la longitud de onda que utilizarás para construir la curva de calibración.':
      'Overlay the six standard spectra, identify three absorption maxima and select the wavelength you will use to build the calibration curve.',
    'Actividad 1. Construcción de los espectros': 'Activity 1. Building the spectra',
    'Descarga los archivos TXT de las soluciones patrón desde el módulo anterior.':
      'Download the TXT files of the standard solutions from the previous module.',
    'Importa los datos en Excel, LibreOffice Calc o Google Sheets.':
      'Import the data into Excel, LibreOffice Calc or Google Sheets.',
    'Construye una gráfica de absorbancia contra longitud de onda.':
      'Build a plot of absorbance versus wavelength.',
    'Incluye en una sola figura los seis espectros patrón: 10, 20, 30, 40, 50 y 60 ppm.':
      'Include the six standard spectra in a single figure: 10, 20, 30, 40, 50 and 60 ppm.',
    'Guarda la gráfica como imagen o toma una captura clara.':
      'Save the plot as an image or take a clear screenshot.',
    'La gráfica debe permitir comparar la forma de las bandas y el aumento de absorbancia con la concentración.':
      'The plot must allow you to compare the shape of the bands and the increase in absorbance with concentration.',
    'Evidencia 1: espectros patrón superpuestos': 'Evidence 1: overlaid standard spectra',
    'Adjunta una imagen de la gráfica construida en hoja de cálculo.':
      'Attach an image of the plot built in the spreadsheet.',
    'Actividad 2. Identificación de máximos de absorción':
      'Activity 2. Identification of absorption maxima',
    'A partir de la gráfica construida, identifica tres longitudes de onda donde se observen máximos o bandas importantes de absorción.':
      'From the plot you built, identify three wavelengths where absorption maxima or major bands are observed.',
    'Máximo o banda': 'Maximum or band',
    'Longitud de onda observada (nm)': 'Observed wavelength (nm)',
    'Actividad 3. Selección de la longitud de onda analítica':
      'Activity 3. Selection of the analytical wavelength',
    'Longitud de onda seleccionada para cuantificar (nm)':
      'Wavelength selected for quantification (nm)',
    'Criterio principal usado para la selección': 'Main criterion used for the selection',
    'Seleccione una opción': 'Select an option',
    'Mayor absorbancia': 'Higher absorbance',
    'Mayor sensibilidad analítica': 'Greater analytical sensitivity',
    'Banda más definida': 'Better defined band',
    'Menor interferencia o mejor selectividad': 'Lower interference or better selectivity',
    'Otro criterio': 'Another criterion',
    'Justificación técnica': 'Technical justification',
    'Orientación:': 'Guidance:',
    'Para seleccionar la longitud de onda, considera la intensidad de la señal, la sensibilidad frente a cambios de concentración, la forma de la banda y la posibilidad de trabajar en una zona donde la señal sea estable y fácil de comparar entre patrones.':
      'To select the wavelength, consider the intensity of the signal, the sensitivity to changes in concentration, the shape of the band and the possibility of working in a region where the signal is stable and easy to compare between standards.',
    'Actividad 4. Interpretación': 'Activity 4. Interpretation',
    '¿Qué ocurre con la absorbancia cuando aumenta la concentración de KMnO₄?':
      'What happens to the absorbance when the KMnO₄ concentration increases?',
    'Aumenta.': 'It increases.',
    'Disminuye.': 'It decreases.',
    '¿La posición de los máximos cambia de manera apreciable?':
      'Does the position of the maxima change appreciably?',
    'Estado del módulo': 'Module status',
    'Completa el análisis para habilitar el siguiente módulo.':
      'Complete the analysis to unlock the next module.',
    'Vista previa de espectros patrón': 'Preview of standard spectra',
    'Explica por qué esa longitud de onda es adecuada para construir la curva de calibración.':
      'Explain why that wavelength is suitable for building the calibration curve.',
    'adjuntar la imagen de los seis espectros patrón superpuestos.':
      'attach the image of the six overlaid standard spectra.',
    'registrar tres longitudes de onda válidas entre 190 y 800 nm.':
      'record three valid wavelengths between 190 and 800 nm.',
    'seleccionar la longitud de onda analítica.': 'select the analytical wavelength.',
    'desarrollar un poco más la justificación técnica de la longitud de onda.':
      'develop the technical justification of the wavelength a little further.',
    'revisar la relación entre concentración y absorbancia.':
      'review the relationship between concentration and absorbance.',
    'responder si cambia la posición de los máximos.':
      'answer whether the position of the maxima changes.',
    'revisar la posición de los máximos entre los patrones.':
      'review the position of the maxima across the standards.',
    'Completa todas las actividades para habilitar el botón':
      'Complete every activity to enable the',
    'del simulador.<br>': 'button in the simulator.<br>',
    'Pendiente:': 'Pending:',
    '✔ Módulo completado. La longitud de onda analítica y el análisis espectral':
      '✔ Module completed. The analytical wavelength and the spectral analysis',
    'quedaron guardados. Ahora puedes avanzar desde el botón':
      'have been saved. You may now move on using the',

    /* ---- 11 Curva de calibración ---- */
    'Curva de calibración UV-Vis': 'UV-Vis calibration curve',
    'Tratamiento cuantitativo': 'Quantitative treatment',
    'Curva de calibración': 'Calibration curve',
    'Registra las absorbancias de los seis patrones, calcula la recta de calibración y evalúa si el modelo es adecuado para cuantificar la muestra.':
      'Record the absorbances of the six standards, calculate the calibration line and assess whether the model is suitable for quantifying the sample.',
    '1. Longitud de onda analítica': '1. Analytical wavelength',
    'Se recupera automáticamente del módulo anterior.':
      'It is retrieved automatically from the previous module.',
    'λ analítica:': 'Analytical λ:',
    '2. Evidencia gráfica': '2. Graphical evidence',
    'Adjunta una imagen de la curva de calibración construida en la hoja de cálculo.':
      'Attach an image of the calibration curve built in the spreadsheet.',
    '3. Datos de calibración': '3. Calibration data',
    'Registra las absorbancias de los patrones a la longitud de onda seleccionada. Puedes llenar la tabla manualmente con los datos obtenidos en la hoja de cálculo.':
      'Record the absorbances of the standards at the selected wavelength. You can fill in the table manually with the data obtained in the spreadsheet.',
    'Solución patrón': 'Standard solution',
    'Concentración KMnO₄ (ppm)': 'KMnO₄ concentration (ppm)',
    'Absorbancia a λ seleccionada': 'Absorbance at the selected λ',
    'Calcular regresión con la tabla': 'Calculate regression from the table',
    'Limpiar tabla': 'Clear table',
    'aún no se ha calculado la regresión.': 'the regression has not been calculated yet.',
    '4. Parámetros del modelo': '4. Model parameters',
    'Pendiente, m': 'Slope, m',
    'Intercepto, b': 'Intercept, b',
    'Coeficiente de determinación, R²': 'Coefficient of determination, R²',
    '5. Interpretación': '5. Interpretation',
    '¿La curva presenta comportamiento lineal en el intervalo evaluado?':
      'Does the curve show linear behaviour over the range evaluated?',
    'Parcialmente': 'Partially',
    'Justifica tu respuesta': 'Justify your answer',
    'Completa la calibración para habilitar el siguiente módulo.':
      'Complete the calibration to unlock the next module.',
    'Vista previa de la curva de calibración': 'Preview of the calibration curve',
    'Comenta la tendencia de los puntos, el valor de R² y si la recta permite cuantificar la muestra.':
      'Comment on the trend of the points, the R² value and whether the line allows the sample to be quantified.',
    'Ecuación estimada:': 'Estimated equation:',
    'registra al menos tres puntos para calcular una regresión.':
      'record at least three points to calculate a regression.',
    'no es posible calcular la regresión con estos datos.':
      'the regression cannot be calculated with these data.',
    '✔ Información guardada en este navegador.': '✔ Information saved in this browser.',
    '✔ Información guardada. El módulo cumple todos los requisitos.':
      '✔ Information saved. The module meets every requirement.',
    'completar primero la selección de la longitud de onda.':
      'first complete the selection of the wavelength.',
    'adjuntar la imagen de la curva de calibración.':
      'attach the image of the calibration curve.',
    'registrar el coeficiente de determinación R².':
      'record the coefficient of determination R².',
    'usar un valor de R² entre 0 y 1.': 'use an R² value between 0 and 1.',
    'desarrollar la interpretación de la curva.': 'develop the interpretation of the curve.',
    'Completa la calibración para habilitar el botón': 'Complete the calibration to enable the',
    '✔ Curva de calibración completada. La ecuación y el valor de R² quedaron guardados.':
      '✔ Calibration curve completed. The equation and the R² value have been saved.',
    'No se pudieron cargar los datos guardados': 'The saved data could not be loaded',

    /* ---- 12 Cuantificación ---- */
    'Cuantificación de la muestra — UV-Vis KMnO₄': 'Quantification of the sample — UV-Vis KMnO₄',
    'Cuantificación de la muestra': 'Quantification of the sample',
    'Calcula la concentración de KMnO₄, conviértela a manganeso elemental y compara el resultado con el límite de 5,00 ppm de Mn.':
      'Calculate the KMnO₄ concentration, convert it to elemental manganese and compare the result with the limit of 5.00 ppm Mn.',
    '1. Datos de calibración y muestra': '1. Calibration and sample data',
    'Longitud de onda analítica, λ': 'Analytical wavelength, λ',
    'Absorbancia de la muestra': 'Absorbance of the sample',
    '2. Concentración de KMnO₄ en la muestra': '2. KMnO₄ concentration in the sample',
    'Concentración de KMnO₄ (ppm)': 'KMnO₄ concentration (ppm)',
    'Verificar resultado': 'Check result',
    '3. Concentración de manganeso elemental': '3. Elemental manganese concentration',
    'Concentración de Mn elemental (ppm)': 'Elemental Mn concentration (ppm)',
    '4. Decisión frente a la especificación': '4. Decision against the specification',
    'Límite permisible:': 'Permissible limit:',
    '5,00 ppm de Mn elemental': '5.00 ppm of elemental Mn',
    'Verificar decisión': 'Check decision',
    'Verifica los dos resultados y la decisión para habilitar el botón':
      'Check both results and the decision to enable the',
    'Registra la absorbancia': 'Record the absorbance',
    'Escribe tu resultado': 'Enter your result',
    'Sustenta tu decisión con el resultado obtenido y el límite establecido.':
      'Support your decision with the result obtained and the established limit.',
    'No es posible verificar.': 'Verification is not possible.',
    'Revisa que estén disponibles los datos de calibración y la absorbancia de la muestra.':
      'Check that the calibration data and the absorbance of the sample are available.',
    'Ingresa primero tu resultado.': 'Enter your result first.',
    '✔ Resultado correcto.': '✔ Correct result.',
    'El resultado no es coherente.': 'The result is not consistent.',
    'Revisa el planteamiento, el despeje y las unidades empleadas.':
      'Review the set-up, the rearrangement and the units used.',
    'Primero completa correctamente la cuantificación de KMnO₄.':
      'First complete the KMnO₄ quantification correctly.',
    'Revisa la relación estequiométrica y las unidades.':
      'Review the stoichiometric relationship and the units.',
    'Primero verifica correctamente la concentración de Mn elemental.':
      'First verify the elemental Mn concentration correctly.',
    'Selecciona una decisión.': 'Select a decision.',
    'La justificación es demasiado breve.': 'The justification is too short.',
    'Sustenta la comparación entre el resultado y el límite establecido.':
      'Support the comparison between the result and the established limit.',
    '✔ Decisión coherente con el resultado obtenido.':
      '✔ Decision consistent with the result obtained.',
    'La decisión no coincide con el criterio de aceptación.':
      'The decision does not match the acceptance criterion.',
    'Revisa la comparación entre tu resultado y el límite.':
      'Review the comparison between your result and the limit.',
    '✔ Información guardada. El módulo está completo.':
      '✔ Information saved. The module is complete.',
    'Avance guardado.': 'Progress saved.',
    'Continúa con las verificaciones pendientes.': 'Continue with the pending checks.',
    '✔ Módulo completado.': '✔ Module completed.',
    'Ahora puedes avanzar desde el botón': 'You may now move on using the',

    /* ---- 13 Informe final ---- */
    '08. Informe final — Laboratorio Virtual UV-Vis KMnO₄':
      '08. Final report — UV-Vis Virtual Laboratory KMnO₄',
    'Informe final de laboratorio': 'Final laboratory report',
    'Cierre de la experiencia': 'Closing of the experience',
    'Informe final': 'Final report',
    'Integra los resultados obtenidos, discute su calidad y formula las conclusiones del análisis.':
      'Integrate the results obtained, discuss their quality and state the conclusions of the analysis.',
    '1. Datos generales': '1. General information',
    'Estudiante o equipo': 'Student or team',
    'Título del informe': 'Report title',
    'Identificación de la muestra': 'Sample identification',
    '2. Resultados recuperados': '2. Retrieved results',
    'Estos datos se cargan automáticamente desde los módulos anteriores y no deben volver a calcularse aquí.':
      'These data are loaded automatically from the previous modules and should not be recalculated here.',
    'Longitud de onda seleccionada': 'Selected wavelength',
    'Ecuación de calibración': 'Calibration equation',
    'Concentración de KMnO₄': 'KMnO₄ concentration',
    'Concentración de Mn elemental': 'Elemental Mn concentration',
    'Límite permisible': 'Permissible limit',
    '5,00 ppm de Mn': '5.00 ppm of Mn',
    '3. Evidencias gráficas': '3. Graphical evidence',
    'Espectros de las soluciones patrón': 'Spectra of the standard solutions',
    'Espectros de soluciones patrón': 'Spectra of standard solutions',
    'Espectros': 'Spectra',
    'Imagen cargada': 'Uploaded image',
    'La imagen se recupera automáticamente. Puedes reemplazarla si lo necesitas.':
      'The image is retrieved automatically. You can replace it if you need to.',
    'Sin imagen disponible': 'No image available',
    '4. Discusión de resultados': '4. Discussion of results',
    'Selección de la longitud de onda': 'Selection of the wavelength',
    'Calidad de la curva de calibración': 'Quality of the calibration curve',
    'Fuentes de error y confiabilidad': 'Sources of error and reliability',
    '5. Conclusiones': '5. Conclusions',
    'Conclusiones del análisis': 'Conclusions of the analysis',
    'Generar informe': 'Generate report',
    'Imprimir / guardar PDF': 'Print / save as PDF',
    'Completa la discusión y las conclusiones; después genera el informe para finalizar.':
      'Complete the discussion and the conclusions, then generate the report to finish.',
    'Guarda primero el informe en PDF. Al finalizar, se eliminarán del navegador el progreso, los resultados y las imágenes guardadas por el AVA.':
      'Save the report as a PDF first. When you finish, the progress, results and images stored by the learning environment will be deleted from the browser.',
    'Nombre completo o equipo': 'Full name or team',
    'Determinación de KMnO₄ en agua residual textil por UV-Vis':
      'Determination of KMnO₄ in textile wastewater by UV-Vis',
    'Muestra problema de agua residual textil': 'Unknown textile wastewater sample',
    'Discute por qué la longitud de onda seleccionada fue adecuada para la cuantificación.':
      'Discuss why the selected wavelength was suitable for the quantification.',
    'Interpreta el valor de R² y la relación entre absorbancia y concentración.':
      'Interpret the R² value and the relationship between absorbance and concentration.',
    'Analiza las principales fuentes de error y la confiabilidad del resultado.':
      'Analyze the main sources of error and the reliability of the result.',
    'Redacta tres conclusiones respondiendo los objetivos,con base en los resultados obtenidos.':
      'Write three conclusions that answer the objectives, based on the results obtained.',
    'No fue posible leer la imagen.': 'The image could not be read.',
    'El archivo no contiene una imagen válida.': 'The file does not contain a valid image.',
    'ecuación de calibración': 'calibration equation',
    'concentración de KMnO₄': 'KMnO₄ concentration',
    'concentración de Mn': 'Mn concentration',
    'decisión de cumplimiento': 'compliance decision',
    'recuperar desde los módulos anteriores:': 'retrieve from the previous modules:',
    'desarrollar la discusión sobre la longitud de onda.':
      'develop the discussion about the wavelength.',
    'desarrollar la discusión sobre la curva de calibración.':
      'develop the discussion about the calibration curve.',
    '✔ Informe guardado y completo.': '✔ Report saved and complete.',
    'Informe final de análisis químico': 'Final chemical analysis report',
    'Estudiante/equipo:': 'Student/team:',
    'Curso:': 'Course:',
    'Fecha:': 'Date:',
    'Muestra:': 'Sample:',
    '1. Resultados': '1. Results',
    '2. Evidencias gráficas': '2. Graphical evidence',
    '3. Discusión de resultados': '3. Discussion of results',
    '4. Conclusiones': '4. Conclusions',
    'No se adjuntó imagen de espectros.': 'No spectra image was attached.',
    'No se adjuntó imagen de curva de calibración.': 'No calibration curve image was attached.',
    'El informe aún no está completo:': 'The report is not complete yet:',
    'Antes de continuar, asegúrate de haber guardado el informe en PDF.':
      'Before continuing, make sure you have saved the report as a PDF.',
    'Esta acción eliminará el progreso, los resultados y las imágenes guardadas por el AVA.':
      'This action will delete the progress, results and images stored by the learning environment.',
    '¿Deseas finalizar?': 'Do you want to finish?',

    /* ---- MAIN ---- */
    'Determinación de permanganato de potasio en aguas residuales de la industria textil':
      'Determination of potassium permanganate in textile industry wastewater',
    'Progreso': 'Progress',
    'Progreso general': 'Overall progress',
    'Ruta del AVA': 'Learning path',
    'El progreso se guarda en este navegador.': 'Progress is stored in this browser.',
    'Actual': 'Current',
    'Completado': 'Completed',
    'Bloqueado': 'Locked',
    'MODO DEMOSTRACIÓN': 'DEMONSTRATION MODE',
    '⌂ Inicio': '⌂ Home',
    '← Anterior': '← Previous',
    'Presentar': 'Presentation mode',
    'Salir de presentación': 'Exit presentation mode',
    'Siguiente →': 'Next →',
    'Volver a la portada': 'Back to the cover',
    'Experiencia finalizada': 'Experience finished',
    'Los datos, imágenes y el progreso guardados por este laboratorio virtual fueron eliminados.':
      'The data, images and progress stored by this virtual laboratory have been deleted.',
    'El navegador puede impedir el cierre automático de una pestaña abierta directamente.':
      'The browser may prevent a directly opened tab from closing automatically.',
    'Cerrar pestaña': 'Close tab',
    'Volver a iniciar': 'Start again',
    'Activar o desactivar modo demostración': 'Turn demonstration mode on or off',
    'Modo demostración': 'Demonstration mode',
    'Activar modo demostración': 'Turn on demonstration mode',
    'Desactivar modo demostración': 'Turn off demonstration mode',
    'Pantalla completa': 'Full screen',
    'Plegar menú': 'Collapse menu',
    'Módulo de la práctica virtual': 'Virtual practical module',
    'Portada': 'Cover',
    'Presentación general del AVA': 'General presentation of the environment',
    'Contexto ambiental e industrial': 'Environmental and industrial context',
    'Propósito y resultados esperados': 'Purpose and expected outcomes',
    'Fundamento del método': 'Method background',
    'Base analítica de la medición UV-Vis': 'Analytical basis of the UV-Vis measurement',
    'Seguridad': 'Safety',
    'Condiciones antes de iniciar': 'Conditions before starting',
    'Planeación de la preparación experimental': 'Planning of the experimental preparation',
    'Pesada, transferencia y aforo': 'Weighing, transfer and making up to volume',
    'Construcción de la serie de calibración': 'Construction of the calibration series',
    'Medición de espectros': 'Spectrum measurement',
    'Operación del espectrofotómetro': 'Operation of the spectrophotometer',
    'Análisis': 'Analysis',
    'Modelo analítico y ecuación': 'Analytical model and equation',
    'Concentración de permanganato y manganeso': 'Permanganate and manganese concentration',
    'Cierre': 'Closing',
    'Inicio': 'Introduction',
    'Desarrollo': 'Development',
    'Integración de resultados y conclusiones': 'Integration of results and conclusions',
    'Complete el módulo anterior': 'Complete the previous module',
    'Complete el módulo anterior para continuar.': 'Complete the previous module to continue.',
    'Complete el módulo actual antes de avanzar.': 'Complete the current module before moving on.',
    'Experiencia completada. Has regresado a la portada.':
      'Experience completed. You are back at the cover page.',
    'El navegador bloqueó el cierre automático. Puede cerrar esta pestaña manualmente.':
      'The browser blocked the automatic closing. You can close this tab manually.',
    'El navegador no permitió activar la pantalla completa.':
      'The browser did not allow full screen mode.',
    'Esta acción eliminará el progreso, los resultados y las imágenes guardadas por el AVA. Los archivos TXT o PDF ya descargados no se eliminarán. ¿Desea finalizar?':
      'This action will delete the progress, results and images stored by the learning environment. TXT or PDF files that have already been downloaded will not be deleted. Do you want to finish?',
    'Los archivos TXT o PDF ya descargados no se eliminarán. ¿Desea finalizar?':
      'TXT or PDF files that have already been downloaded will not be deleted. Do you want to finish?'
  };

  /* ---------- 4. Reglas dinámicas (textos con números o variables) ---------- */

  var REGLAS = [
    [/^Fecha: (.+)$/, 'Date: $1'],
    [/^Estudiante: (.+)$/, 'Student: $1'],
    [/^Muestra: (.+)$/, function (m) { return 'Sample: ' + (DICCIONARIO[norm(m[1])] || m[1]); }],
    [/^P1000 ajustada a (\d+) µL$/, 'P1000 set to $1 µL'],
    [/^✔ Volumen correcto\. La punta debe entrar en el vaso para tomar (\d+) µL\.$/,
      '✔ Correct volume. The tip must enter the beaker to draw $1 µL.'],
    [/^✔ (P\d) preparado correctamente: (\d+) ppm, (\d+) µL y aforo a 25,0 mL\. La solución queda homogénea\.$/,
      '✔ $1 prepared correctly: $2 ppm, $3 µL and made up to 25.0 mL. The solution is homogeneous.'],
    [/^Preparación del Patrón (\d)$/, 'Preparation of Standard $1'],
    [/^Seleccionado (.+) · (\d+) ppm$/, 'Selected $1 · $2 ppm'],
    [/^Cubeta llena con (.+)$/, function (m) { return 'Cuvette filled with ' + dt(m[1]); }],
    [/^Cubeta de (.+) insertada$/, function (m) { return dt(m[1]) + ' cuvette inserted'; }],
    [/^Espectro de (.+) registrado$/, function (m) { return 'Spectrum of ' + dt(m[1]) + ' recorded'; }],
    [/^(\d+) de (\d+) · (.*)$/, function (m) {
      return m[1] + ' of ' + m[2] + ' · ' + traducirCompuesto(m[3]);
    }],
    [/^Pendiente: (.+)$/, function (m) { return 'Pending: ' + traducirLista(m[1]); }],
    [/^El informe aún no está completo: (.+)$/, function (m) {
      return 'The report is not complete yet: ' + traducirLista(m[1]);
    }],
    [/^Muestra problema de (.+)$/, 'Unknown sample of $1']
  ];

  /* Traduce una etiqueta suelta usando el diccionario o sus partes. */
  function dt(txt) {
    return DICCIONARIO[norm(txt)] || traducirCompuesto(txt);
  }

  /* Traduce fragmentos separados por " · " (p. ej. "05 · Seguridad · Completado"). */
  function traducirCompuesto(txt) {
    return txt.split(' · ').map(function (p) {
      return DICCIONARIO[norm(p)] || p;
    }).join(' · ');
  }

  /* Traduce listas de pendientes separadas por ";" o ",". */
  function traducirLista(txt) {
    return txt.split(/;\s*/).map(function (p) {
      var t = DICCIONARIO[norm(p)];
      if (t) return t;
      /* Fragmentos del tipo "prefijo: elemento, elemento" */
      var dosPuntos = p.match(/^([^:]+:)\s*(.+)$/);
      if (dosPuntos && DICCIONARIO[norm(dosPuntos[1])]) {
        return DICCIONARIO[norm(dosPuntos[1])] + ' ' + traducirEnumeracion(dosPuntos[2]);
      }
      return traducirEnumeracion(p);
    }).join('; ');
  }

  function traducirEnumeracion(txt) {
    return txt.split(/,\s*/).map(function (q) {
      return DICCIONARIO[norm(q)] || q;
    }).join(', ');
  }

  /* ---------- 5. Traductor de cadenas ---------- */

  function t(texto) {
    if (LANG !== 'en' || texto == null) return texto;
    var bruto = String(texto);
    var clave = norm(bruto);
    if (!clave) return bruto;

    if (Object.prototype.hasOwnProperty.call(DICCIONARIO, clave)) {
      return conservarEspacios(bruto, DICCIONARIO[clave]);
    }

    for (var i = 0; i < REGLAS.length; i++) {
      var m = clave.match(REGLAS[i][0]);
      if (m) {
        var salida = typeof REGLAS[i][1] === 'function'
          ? REGLAS[i][1](m)
          : clave.replace(REGLAS[i][0], REGLAS[i][1]);
        return conservarEspacios(bruto, salida);
      }
    }

    if (clave.indexOf(' · ') > -1) {
      var comp = traducirCompuesto(clave);
      if (comp !== clave) return conservarEspacios(bruto, comp);
    }
    return bruto;
  }

  /* Mantiene el espacio inicial/final del nodo original (importante en frases
     partidas por etiquetas <strong> o <span>). */
  function conservarEspacios(original, traducido) {
    var pre = (original.match(/^\s*/) || [''])[0];
    var post = (original.match(/\s*$/) || [''])[0];
    return pre + traducido + post;
  }

  window.__t = t;
  window.AVA_I18N = {
    lang: LANG,
    dict: DICCIONARIO,
    rules: REGLAS,
    t: t,
    setLang: cambiarIdioma
  };

  /* ---------- 6. Traducción del DOM ---------- */

  var ATTR_TEXTO = ['title', 'placeholder', 'alt', 'aria-label'];
  var OMITIR = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, CODE: 1 };

  function traducirNodoTexto(nodo) {
    var padre = nodo.parentNode;
    if (!padre || OMITIR[padre.nodeName]) return;
    if (padre.closest && padre.closest('[data-no-i18n]')) return;
    var nuevo = t(nodo.nodeValue);
    if (nuevo !== nodo.nodeValue) nodo.nodeValue = nuevo;
  }

  function traducirElemento(el) {
    if (el.nodeType !== 1) return;
    if (el.hasAttribute && el.hasAttribute('data-no-i18n')) return;

    for (var i = 0; i < ATTR_TEXTO.length; i++) {
      var a = ATTR_TEXTO[i];
      if (el.hasAttribute && el.hasAttribute(a)) {
        var v = t(el.getAttribute(a));
        if (v !== el.getAttribute(a)) el.setAttribute(a, v);
      }
    }
    /* El atributo value solo se traduce en botones: en radios, selects y
       campos de texto es un identificador que la lógica del módulo compara. */
    if (el.tagName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type || '')) {
      el.value = t(el.value);
    }
  }

  function traducirArbol(raiz) {
    if (LANG !== 'en' || !raiz) return;

    if (raiz.nodeType === 3) { traducirNodoTexto(raiz); return; }
    if (raiz.nodeType !== 1 && raiz.nodeType !== 9 && raiz.nodeType !== 11) return;

    if (raiz.nodeType === 1) traducirElemento(raiz);

    var elementos = raiz.querySelectorAll ? raiz.querySelectorAll('*') : [];
    for (var i = 0; i < elementos.length; i++) traducirElemento(elementos[i]);

    var walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null, false);
    var lote = [];
    while (walker.nextNode()) lote.push(walker.currentNode);
    for (var j = 0; j < lote.length; j++) traducirNodoTexto(lote[j]);
  }

  /* ---------- 7. Diálogos nativos ---------- */

  if (LANG === 'en') {
    var alertOriginal = window.alert.bind(window);
    var confirmOriginal = window.confirm.bind(window);
    window.alert = function (msg) { return alertOriginal(t(msg)); };
    window.confirm = function (msg) { return confirmOriginal(t(msg)); };
  }

  /* ---------- 8. Selector de idioma ---------- */

  function cambiarIdioma(nuevo) {
    if (nuevo !== 'es' && nuevo !== 'en') return;
    try { localStorage.setItem(STORAGE_KEY, nuevo); } catch (e) {}

    /* Si estamos dentro del MAIN, se recarga todo el AVA para mantener
       coherencia entre el menú lateral y el módulo visible. */
    try {
      if (window.parent && window.parent !== window && window.parent.__recargarIdioma) {
        window.parent.__recargarIdioma(nuevo);
        return;
      }
    } catch (e) {}

    var url = new URL(location.href);
    url.searchParams.set('lang', nuevo);
    location.replace(url.toString());
  }

  function construirSelector() {
    if (document.body.getAttribute('data-i18n-switcher') === 'off') return;
    if (window.top !== window.self) return; /* dentro del MAIN no se duplica */

    var caja = document.createElement('div');
    caja.setAttribute('data-no-i18n', '');
    caja.style.cssText =
      'position:fixed;z-index:99999;right:14px;bottom:14px;display:flex;' +
      'gap:4px;padding:4px;border-radius:999px;background:rgba(255,255,255,.96);' +
      'border:1px solid #d7dee8;box-shadow:0 4px 14px rgba(15,23,42,.18);' +
      'font:bold 12px Arial,Helvetica,sans-serif;';

    ['es', 'en'].forEach(function (codigo) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = codigo.toUpperCase();
      b.title = IDIOMAS[codigo];
      b.style.cssText =
        'border:0;cursor:pointer;padding:6px 12px;border-radius:999px;font:inherit;' +
        (codigo === LANG
          ? 'background:#6a1b9a;color:#fff;'
          : 'background:transparent;color:#475467;');
      b.addEventListener('click', function () { cambiarIdioma(codigo); });
      caja.appendChild(b);
    });

    document.body.appendChild(caja);
  }

  /* ---------- 9. Arranque ---------- */

  function iniciar() {
    if (LANG === 'en') {
      if (document.title) document.title = t(document.title);
      traducirArbol(document.body);

      var observer = new MutationObserver(function (mutaciones) {
        for (var i = 0; i < mutaciones.length; i++) {
          var m = mutaciones[i];
          if (m.type === 'characterData') {
            traducirNodoTexto(m.target);
          } else if (m.type === 'attributes') {
            traducirElemento(m.target);
          } else {
            for (var j = 0; j < m.addedNodes.length; j++) traducirArbol(m.addedNodes[j]);
          }
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ATTR_TEXTO
      });
    }
    construirSelector();
    quitarVelo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
