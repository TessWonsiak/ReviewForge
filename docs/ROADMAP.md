# ReviewForge Roadmap

What we're building, in what order, and why.

---

## v0.1: Static prototype (DONE)
**What it is:** A working HTML page with hardcoded data from Khanna et al. 2023.
- Side-by-side extraction form and source text
- Coded dropdowns enforcing Code Book values
- Flagged field indicators with reviewer workflow
- Approve/save button with validation check

**Why it matters:** Proves the concept. Shows colleagues what we're building.

---

## v0.2: Dynamic data loading
**What it adds:** Load any article's extraction data from a JSON file.
- Move hardcoded article data into a JSON structure
- Build an article switcher (Previous / Next buttons)
- Load the correct data when switching articles
- Track "reviewed" vs "unreviewed" status per article

**Skills needed:** JavaScript fundamentals (reading JSON, updating the DOM)

---

## v0.3: React rebuild
**What it adds:** Proper state management and reusable components.
- Rebuild the extraction form as React components
- Each field type (coded dropdown, free text, numeric) as its own component
- Global state tracking: which fields changed, which are flagged, which are reviewed
- Article list sidebar with progress indicators

**Skills needed:** React basics (components, state, props)

---

## v0.4: PDF viewer
**What it adds:** Real PDF rendering in the right panel.
- PDF.js integration for displaying uploaded PDFs
- Page navigation (previous/next/jump to page)
- Text layer for copy/paste and highlighting
- Click-to-highlight: click a field on the left to jump to its source in the PDF

**Skills needed:** PDF.js library, coordinate mapping

---

## v0.5: AI extraction pipeline
**What it adds:** First-pass AI extraction from uploaded PDFs.
- Upload a PDF and get a structured extraction back
- System prompt built from your Code Book and extraction instructions
- Confidence scoring per field (based on AI's certainty)
- Known weakness handling (auto-flag domains, primary outcome, IAP method)
- Side-by-side comparison: AI extraction vs empty form for human review

**Skills needed:** Claude API, Node.js backend, prompt engineering

---

## v0.6: Batch processing
**What it adds:** Process multiple articles at once.
- Upload a batch of PDFs
- Queue them for AI extraction
- Review queue: work through extractions one at a time
- Progress dashboard: X of Y articles extracted, reviewed, approved
- Export to XLSX matching the master extraction spreadsheet format

**Skills needed:** Backend queuing, file management, XLSX generation

---

## v1.0: Production ready
**What it adds:** Everything needed to use this for a real systematic review.
- Database storage (SQLite initially, PostgreSQL for multi-user)
- Audit trail (every change tracked with timestamp and reviewer)
- Multi-reviewer support (assign articles, track who extracted what)
- Code Book editor (modify dropdown values, add new lists)
- PRISMA flow diagram auto-generation from screening data
- Export formats: XLSX, CSV, GRADE evidence tables

---

## Future possibilities
- **Template system:** Create extraction schemas for different review types (not just WSACS)
- **Calibration mode:** Compare AI vs human extraction to measure and improve AI accuracy over time
- **Freelance tool:** Package ReviewForge as part of your systematic review remediation service
- **Open source:** Release the tool for the research community (with your name on it)

---

## What makes ReviewForge different from Sentinel's tool

1. **Built by a methodologist, not a dev team.** The extraction logic isn't an afterthought bolted onto a PDF viewer. It IS the product.

2. **Code Book-first architecture.** Every coded field validates against the actual Code Book. The schema is the source of truth, not a suggestion.

3. **Known weakness handling.** The AI flags fields it's historically bad at (domains, primary outcomes, treatment arm interpretation) BEFORE the reviewer sees them. This comes directly from your validation report.

4. **Transparent QA.** The three-tier validation model (Tier 1: numerical accuracy, Tier 2: categorical codes, Tier 3: free-text fidelity) is built into the workflow, not a separate step.

5. **You own it.** Your intellectual property stays yours. No training someone else's AI with your methodological framework so they can sell it back to you.
