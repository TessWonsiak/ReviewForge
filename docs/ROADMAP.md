# ReviewForge Roadmap

What we're building, in what order, and why.

---

## Current Release: v0.2

**Schema-driven extraction with manual data entry.**

What's working right now:
- Schema switcher (toggle between review types)
- Dynamic form rendering (dropdowns, text fields, checkboxes, toggles, dates)
- Article creation, navigation, and deletion
- Paste Import (get metadata from Claude as JSON, paste it in)
- JSON export (single article or full dataset)
- Sidebar filters (filter articles by coded fields)
- Analytic memo panel (dedicated space for researcher notes)
- Auto-save to browser storage (with Live Server)
- Two public templates: Scoping Review and Rodgers' Concept Analysis

---

## Next Up: v0.3 — Excel/CSV Export

**Goal:** Export your extractions as a spreadsheet you can open in Excel or Google Sheets.

Why this matters: most review teams need to share data with collaborators who work in spreadsheets. Right now you can export JSON (which is great for data portability) but most people want an .xlsx or .csv file with one row per article and one column per field.

---

## v0.4 — PDF Viewer

**Goal:** Read articles side-by-side with the extraction form.

This is the big one. Instead of switching between your PDF reader and ReviewForge, you'll see the article on the right and the extraction form on the left. Click on a field, and the PDF highlights the relevant passage.

This is where ReviewForge becomes a genuine alternative to expensive proprietary tools.

---

## v0.5 — AI Metadata Extraction

**Goal:** Upload a PDF and get the metadata fields auto-filled.

Right now the Paste Import workflow requires you to go to Claude, share the PDF, ask for the metadata, copy the JSON, and paste it into ReviewForge. This version brings the AI into the app itself: upload a PDF, the app calls the Claude API, and the metadata fields populate automatically.

Important: AI extraction is for metadata and objective fields only (authors, year, journal, study design, sample size). Interpretive fields (findings, quality assessment, analytic notes) remain human-only. This is a design principle, not a limitation.

---

## v0.6 — Batch Processing

**Goal:** Process multiple articles at once.

Upload a batch of PDFs, queue them for AI metadata extraction, and work through the review queue one article at a time. A progress dashboard shows how many articles are extracted, reviewed, and complete.

---

## v1.0 — Production Ready

**Goal:** Everything needed for a real multi-reviewer project.

- Database storage (instead of browser localStorage)
- Audit trail (every change tracked with timestamp and reviewer name)
- Multi-reviewer support (assign articles, track who extracted what)
- PRISMA flow diagram auto-generation
- Export in multiple formats (XLSX, CSV, GRADE evidence tables)

---

## Community Templates

The schema-driven architecture means anyone can create a template for their review type. Here's what's available and what's planned:

### Available Now
- Scoping Review (Arksey & O'Malley / JBI)
- Rodgers' Evolutionary Concept Analysis

### Planned
- Systematic Review (PRISMA)
- JBI Scoping Review
- Integrative Review
- Rapid Review
- Walker & Avant Concept Analysis
- Narrative / Critical Review
- JBI Evidence Synthesis
- Realist Review

### Want to Contribute a Template?

If you've created a schema for your review type and want to share it, submit a pull request or open an Issue on GitHub with your JSON schema. We'll review it and add it to the public templates.

Templates should include:
- Clear field labels and help text
- Coded dropdowns with sensible default options
- A method reference (citation for the review methodology)
- Enough fields to be useful, not so many that it's overwhelming

---

## Philosophy

ReviewForge is built on three principles:

1. **The researcher is the instrument.** AI can do data entry. Humans do analysis. The tool supports both but never confuses them.

2. **Your data is yours.** Everything runs locally. No cloud accounts, no data sharing, no vendor lock-in. Export your work in open formats anytime.

3. **Your expertise is yours.** The schema-driven architecture means your extraction framework, your Code Book, your analytical lens stays on your machine unless you choose to share it. Nobody gets to monetise your methodology without your consent.
