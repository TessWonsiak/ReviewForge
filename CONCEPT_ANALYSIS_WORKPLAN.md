# ReviewForge: Concept Analysis Module Workplan
**Date:** April 14, 2026
**Status:** Schema designed, ready to build

---

## What This Is

An extension of ReviewForge to support Rodgers' evolutionary concept analysis, specifically for Tess's dissertation work on mental suffering in the context of MAiD. The existing WSACS extraction schema (`wsacs-fields.json`) handles systematic review data. The new Rodgers schema (`rodgers-fields.json`) handles concept analysis extraction.

Same app, different brain.

---

## Architecture Principle: Schema-Driven Design

The single most important design decision: **the app reads whatever schema you point it at.** The extraction UI, validation logic, filtering, and export all derive from the JSON schema file. This means:

- New review type = new JSON schema, not a new app
- Fields, dropdowns, coded values, and help text all live in the schema
- The app renders the form dynamically based on the schema structure
- Switching between WSACS and Rodgers is a dropdown, not a rebuild

This is what makes Options A, B, and C build on each other rather than replacing each other.

---

## Option A: Schema + Manual Extraction (Current Priority)

**Goal:** Get Tess extracting for Chapter 2 immediately using the Rodgers schema.

### What Needs to Happen

1. **Schema file (DONE):** `codebook/rodgers-fields.json` is complete with all fields, coded values, help text, and UI notes

2. **Schema switcher:** Add a dropdown or toggle to the app that lets you select which schema to load (WSACS vs. Rodgers). The app re-renders the extraction form based on the selected schema

3. **Dynamic form rendering:** The extraction form currently has hardcoded WSACS fields. Refactor so it reads field definitions from the active schema and generates the form dynamically:
   - `free_text` fields render as text inputs
   - `free_text_rich` fields render as expandable text areas (these need room to breathe)
   - `coded_single` fields render as dropdowns
   - `coded_multi` fields render as checkbox groups
   - `boolean` fields render as toggles
   - `numeric` and `date` fields render as their respective input types

4. **Analytic memo prominence:** The `analysis_memo` field is flagged as `"prominent": true` in the schema. The UI should treat this differently: larger text area, persistent visibility, maybe a dedicated panel. This is where the analysis lives

5. **Filtering and sorting:** The sidebar or toolbar needs filters for:
   - Three Problems (L / R / A)
   - Hierarchy Position
   - Epistemic Framework
   - Author Discipline
   - Country
   - Year
   - Extraction Status
   
   This is how the data maps directly to Chapter 2 sections (see `ui_notes.chapter_mapping` in the schema)

6. **Data storage:** For now, JSON files per article (matching the current WSACS approach). Each extracted article gets a JSON file with the schema field IDs as keys

7. **Export:** Export all extractions to a single CSV/XLSX with one row per article and one column per field. This is the evidence table for the dissertation

### Estimated Effort
- Schema switcher + dynamic form: 1-2 sessions
- Filtering: 1 session
- Export: 1 session
- Polish and testing: 1 session
- **Total: 4-6 sessions in Vibe Code**

---

## Option B: AI-Assisted Extraction (Future)

**Goal:** For systematic reviews (WSACS-style), add an AI first pass that extracts structured data from PDFs, which Tess then validates.

### Important Caveat
The Concept Analysis Claude raised a critical point: **AI first-pass extraction is appropriate for systematic reviews but potentially counterproductive for concept analysis.** In a concept analysis, the researcher's interpretive engagement with each source IS the method. The slow, curious reading is where the analysis happens. An AI doing the first pass would skip the intellectually meaningful part.

**So Option B applies to the WSACS schema, not the Rodgers schema.**

For the Rodgers schema, the AI role shifts to:
- Literature discovery (finding sources)
- PDF text extraction (making the text searchable/extractable)
- Cross-reference checking (flagging when sources cite each other)
- Pattern detection across completed extractions (after Tess has done the interpretive work)

### What Needs to Happen
- Claude API integration (Node.js backend)
- System prompt built from the active schema's field definitions and help text
- Confidence scoring per field
- Side-by-side view: AI extraction vs. empty form
- This maps to v0.5 on the existing ReviewForge roadmap

---

## Option C: Full Research Platform (Future)

**Goal:** Literature discovery, screening, extraction, and synthesis in one tool.

### Components
- **Lit search:** PubMed API, Scholar Gateway, possibly CINAHL integration
- **Screening:** Include/exclude with reasons, PRISMA flow auto-generation
- **Extraction:** Already built in Options A and B
- **Synthesis dashboard:** Visualizations showing concept evolution across time, disciplines, jurisdictions. Heat maps of Rodgers elements by decade. Network graphs of related concepts
- **Writing support:** Filter extractions by Rodgers element or analytical field, pull all relevant data, generate structured outlines for each findings section

### This maps to v0.6-v1.0 on the existing roadmap

---

## How This Connects to the Dissertation

The schema is designed so that the writing workflow is built into the data structure:

| Writing Task | ReviewForge Workflow |
|---|---|
| Write "Attributes of Mental Suffering" section | Filter all extractions → Attributes field → read across sources |
| Write "Antecedents" section | Filter → Antecedents field |
| Write "Consequences" section | Filter → Consequences field |
| Write "Surrogate Terms" section | Filter → Surrogate Terms field |
| Write "Related Concepts" section | Filter → Related Concepts field |
| Write "Contextual Variations" section | Filter → Context field + Country + Discipline |
| Write Discussion: Three Problems | Filter → Three Problems = L, R, or A |
| Write Discussion: Hierarchy of Suffering | Filter → Hierarchy Position field |
| Write Discussion: Epistemic Injustice | Filter → Epistemic Framework field |
| Trace your own thinking | Read Analytic Memos chronologically |

This is the bridge between extraction and writing. The tool doesn't write the dissertation; it organizes the evidence so that when Tess sits down to write, the puzzle pieces are already sorted.

---

## Next Steps

1. Hand this workplan + schema + handover note to Vibe Code Claude
2. Build the schema switcher and dynamic form rendering (Option A core)
3. Test with 2-3 articles from the existing repository
4. Iterate on the UI based on what feels right during actual extraction
5. Start extracting for Chapter 2
