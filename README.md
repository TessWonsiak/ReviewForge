# ReviewForge

**A flexible data extraction tool for systematic reviews, scoping reviews, and concept analysis.**

Powered by gay audacity.

---

## What is ReviewForge?

ReviewForge is a browser-based extraction tool that lets researchers define their own extraction schemas and use them to extract structured data from literature. It's designed for anyone doing evidence synthesis: systematic reviews, scoping reviews, concept analyses, or any other type of literature review that requires structured data extraction.

**The key idea:** the app is schema-driven. You define your fields, dropdowns, coded values, and help text in a JSON file. The app reads that file and builds the extraction form automatically. New review type = new JSON file, not new code.

### Features

- **Schema switcher:** Toggle between different review types (e.g., a systematic review and a concept analysis) in the same app
- **Dynamic form rendering:** Text inputs, rich text areas, coded dropdowns, multi-select checkboxes, boolean toggles, date fields, all generated from your schema
- **Analytic memo panel:** A dedicated side panel for interpretive notes (configurable per schema)
- **Sidebar filters:** Filter your articles by any coded field, mapped directly to your writing workflow
- **Paste Import:** Get metadata from Claude (or any LLM) as JSON and import it directly into a new article
- **JSON export:** Export individual articles or your entire dataset
- **Local storage:** Your data stays on your machine. No cloud, no accounts, no one else's server
- **GPL-3.0 licensed:** Use it, modify it, share it, credit the creator. Nobody gets to close-source it

---

## Quick Start

### 1. Download

Click the green **Code** button above, then **Download ZIP**. Unzip it anywhere on your computer.

### 2. Open in VS Code

- Install [VS Code](https://code.visualstudio.com/) if you don't have it
- Install the **Live Server** extension (search in the Extensions sidebar)
- Open the ReviewForge folder in VS Code (**File > Open Folder**)
- Right-click `index.html` > **Open with Live Server**

### 3. Start extracting

- Select a review type from the dropdown (the example scoping review schema is included)
- Click **+ New article** to create your first extraction
- Fill in the fields, and your data auto-saves

---

## Creating Your Own Schema

ReviewForge ships with an example scoping review schema. To create your own:

1. Open `codebook/example-scoping-review.json` and study the structure
2. Create a new JSON file in the `codebook/` folder with your fields
3. Add your schema to `schemas.js` (follow the existing pattern)
4. Reload the app and select your new schema from the dropdown

### Field Types

| Type | Renders as | Use for |
|------|-----------|---------|
| `free_text` | Single-line text input | Authors, titles, DOIs |
| `free_text_rich` | Expandable text area | Findings, notes, quotes |
| `coded_single` | Dropdown | Study design, country |
| `coded_multi` | Checkbox group | Multi-select categories |
| `boolean` | Toggle (Yes/No) | Flags, binary indicators |
| `numeric` | Number input | Year, sample size |
| `date` | Date picker | Extraction date |

### Special Features

- Add `"prominent": true` to a field to display it in the dedicated side panel (great for analytic memos or reviewer notes)
- Add `"filterable_fields"` array to your schema to enable sidebar filtering by those fields
- Add `"help_text"` to any field to show guidance text below the label
- Add `"default"` to set an initial value for new articles

### Private Schemas

If you create schemas you don't want to share publicly (e.g., proprietary extraction frameworks), put them in a file called `schemas-private.js` instead of `schemas.js`. Add `schemas-private.js` to your `.gitignore` and it won't be pushed to GitHub. The app loads both files automatically.

---

## The Paste Import Workflow

ReviewForge works with LLMs (like Claude) for metadata extraction:

1. Share a PDF with Claude and ask it to extract the metadata fields as JSON
2. Claude returns something like:
   ```json
   {
     "authors": "Smith, J.; Jones, K.",
     "year": 2023,
     "title": "Example study title",
     "journal": "Example Journal",
     "study_design": "Qualitative"
   }
   ```
3. Click **Paste import** in ReviewForge, paste the JSON, click Import
4. A new article is created with the metadata pre-filled
5. You do the interpretive fields yourself

This saves time on data entry while keeping the analytical work where it belongs: with the researcher.

---

## Project Structure

```
ReviewForge/
  index.html              The app
  styles.css              Styling
  schemas.js              Public schemas (example scoping review)
  schemas-private.js      Your private schemas (gitignored)
  app.js                  Core logic: form rendering, data management
  import.js               Paste Import feature
  LICENSE                 GPL-3.0
  codebook/
    example-scoping-review.json   Example schema (reference copy)
  docs/
    LEARNING_PATH.md      Resources for learning to code
    ROADMAP.md            Feature roadmap
```

---

## Roadmap

- **v0.2 (current):** Schema-driven extraction, JSON import/export, filters, analytic memo
- **v0.3:** CSV/XLSX export
- **v0.4:** PDF viewer side panel for reading articles alongside the extraction form
- **v0.5:** AI extraction pipeline (Claude API integration for first-pass metadata extraction)
- **v0.6:** Batch processing
- **v1.0:** Database storage, audit trail, multi-reviewer support

---

## Contributing

ReviewForge is open source under GPL-3.0. Contributions are welcome! If you create a useful schema for a common review type, consider submitting it as an example.

---

## About

ReviewForge was built by [Tess Wonsiak](https://github.com/TessWonsiak), a nurse researcher and PhD candidate at the University of Victoria. It grew out of the experience of doing data extraction for systematic reviews and realising that the hardest part of building an extraction tool isn't the code; it's the methodological infrastructure. The code is just the shell around your expertise.

---

## License

GPL-3.0. Use it, modify it, share it. Credit the creator. Don't close-source it.
