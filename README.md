# UV-Vis Virtual Laboratory — Determination of Potassium Permanganate in Textile Wastewater

A self-contained virtual learning environment (VLE) that reproduces the full
sequence of a UV-Visible spectrophotometric quantification, from preparing the
stock solution to issuing a technical judgement against a regulatory limit.

Built for the *Chemical Analysis* course of the Pharmaceutical Chemistry
programme at Fundación Universitaria Salesiana (Bogotá, Colombia). It runs in
any modern browser, with no installation, no account and no server.

> **Español:** entorno virtual de aprendizaje para la cuantificación de
> permanganato de potasio por espectrofotometría UV-Visible. La interfaz está
> disponible en español e inglés; el selector ES/EN está en la esquina superior
> derecha. Un resumen en español se encuentra al final de este documento.

---

## Quick start

No build step and no dependencies.

```
git clone <REPOSITORY-URL>
cd <REPOSITORY-FOLDER>
```

Then open `MAIN.html` in a browser. That is all.

If your browser restricts local file access, serve the folder instead:

```
python3 -m http.server 8000
```

and open <http://localhost:8000/MAIN.html>.

Progress is stored in the browser itself, so closing the tab does not lose the
session, and nothing is sent anywhere.

---

## What the environment does

The workflow is sequential: each module unlocks only once the criterion of the
previous one has been met. Every activity validates the student's response and,
when it does not meet the expected criterion, gives feedback and allows another
attempt.

**Introduction** — Cover · Problem situation · Learning objectives · Method
background · Safety

**Development** — Preliminary calculations · Preparation of the stock solution ·
Preparation of standards · Spectrum measurement

**Analysis** — Spectral analysis (wavelength selection) · Calibration curve ·
Quantification of the sample

**Closing** — Final report

The final module is not a calculation. The student interprets the result
against a pre-established specification and issues an acceptance or rejection
decision supported by the spectra and the calibration curve generated along the
way. The report can be exported to PDF.

---

## Pedagogical design

The environment was built around four decisions, derived from the Salesian
Preventive System that frames the institution's educational model:

1. **Early diagnosis** — identify calculation and reasoning difficulties during
   the task, before they block progress.
2. **Repeated feedback** — let students review and correct, using repetition as
   a learning opportunity rather than as a grading mechanism.
3. **Progressive autonomy** — move from guided procedures towards tasks that
   require interpretation, calculation, decision and justification.
4. **Issuance of a technical judgement** — close the workflow with a decision
   grounded in the results.

The first three are also found in broader traditions of formative assessment.
What the Preventive System contributes is their rationale and timing:
intervening while the course is still running, and treating repetition as
accompaniment rather than as a penalty.

---

## Repository contents

```
MAIN.html              entry point
<...>                  modules, styles and scripts of the environment
analysis/              R and Quarto workflow of the longitudinal study
data/                  anonymised dataset used in the analysis
LICENSE.txt            GNU AGPL v3        — source code
LICENSE-CONTENT.txt    CC BY-SA 4.0       — educational materials
LICENSE-ANALYSIS.txt   MIT                — analysis scripts
NOTICE.txt             which licence covers what
```

> Adjust the folder names above to match the repository as it was actually
> uploaded.

---

## The study behind it

The environment was evaluated in a single-cohort longitudinal study with four
repeated measurements. Thirty-three students contributed 126 observations,
scored with a five-criterion analytic rubric linked to two declared Learning
Outcomes. The analysis used generalized least squares with a heterogeneous
autoregressive covariance structure, selected among five alternatives, followed
by sensitivity analyses.

The study has no pre-intervention baseline and no concurrent comparison group,
so it describes how performance evolved during implementation and does not
attribute the change to the environment. The paper states this explicitly.

To reproduce the analysis, open the Quarto document in `analysis/` and render it
in R. The random seed is fixed, and `sessionInfo()` output is included so that
package versions can be checked against the ones used.

---

## How to cite

If you use this environment, the materials or the analysis, please cite the
chapter:

> Patiño, S., Sanjuanelo, D., Suaza, B., Cárdenas, J., Muñoz, D.: Results of a
> Longitudinal Evaluation of a Virtual Learning Environment in Chemical
> Analysis: A Single-Cohort Study in Salesian Higher Education. Lecture Notes in
> Educational Technology. Springer (in press).

and, for the software itself, the archived release: `<DOI>`.

---

## Licensing

Three licences apply, one per kind of material. `NOTICE.txt` states which covers
what, and is the file to read first.

The **source code** is under the **GNU Affero General Public License v3**. This
is deliberate: anyone who modifies this environment and offers it to users over
a network must make the corresponding source available to those users. A virtual
laboratory that a student uses through a browser is exactly the case the AGPL
was written for.

The **educational materials** are under **CC BY-SA 4.0**, so they can be
translated, adapted and reused by other institutions, provided the result stays
equally open.

The **analysis scripts** are under the **MIT Licence**, with no copyleft, so
that verification and reuse of the statistical work face no obstacle at all.
Reproducibility requires the lowest possible barrier.

---

## Author

Sergio Andrés Patiño Martínez
Pharmaceutical Chemistry Programme, Fundación Universitaria Salesiana
Bogotá, Colombia · <sergio.patino@salesiana.edu.co>
ORCID [0009-0006-0438-1252](https://orcid.org/0009-0006-0438-1252)

Generative AI tools were used to support programming. The author retains full
responsibility for the design, the analysis, the interpretation and the
conclusions.

---

## Resumen en español

Entorno virtual de aprendizaje que reproduce la secuencia completa de una
cuantificación por espectrofotometría UV-Visible: preparación de la solución
madre, construcción de la serie de patrones, medición de espectros, selección de
la longitud de onda analítica, curva de calibración, cuantificación de la
muestra problema y emisión de un juicio técnico frente a un límite permisible.

No requiere instalación: basta abrir `MAIN.html` en un navegador. La interfaz
está disponible en español e inglés y el progreso se guarda en el propio
navegador.

El código se distribuye bajo **GNU AGPL v3**, los materiales educativos bajo
**CC BY-SA 4.0** y los scripts de análisis bajo **MIT**. El archivo `NOTICE.txt`
indica qué licencia cubre cada parte.

Se desarrolló para la asignatura Análisis Químico del programa de Química
Farmacéutica de la Fundación Universitaria Salesiana y fue evaluado en un
estudio longitudinal de cohorte única cuyos resultados se publican en la serie
Lecture Notes in Educational Technology de Springer.
