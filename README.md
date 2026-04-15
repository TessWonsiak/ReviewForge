# ReviewForge

**A flexible data extraction tool for systematic reviews, scoping reviews, and concept analysis.**

Powered by gay audacity. 🏳️‍🌈

---

## What is This?

If you've ever done a literature review and spent hours copying data from PDFs into a spreadsheet, this tool is for you.

ReviewForge is a free, browser-based app that gives you a structured extraction form for pulling data out of research articles. You define the fields you need (authors, study design, findings, whatever your review requires), and ReviewForge builds the form for you. Fill it in, filter your data, export it when you're done.

No coding required to use it. No accounts to create. No data leaves your computer.

### Who is This For?

- **Graduate students** doing their first systematic or scoping review
- **Researchers** who want a structured extraction workflow without paying for proprietary tools
- **Anyone** who's been using a spreadsheet and wishes there was something better
- **People who are cautious about AI** (this tool was built by someone who was too; read on)

---

## A Note About AI and Ethics

ReviewForge was built by a researcher who was initially sceptical about using AI in evidence synthesis. That scepticism wasn't unfounded, and it wasn't just about accuracy.

### The practical concerns are real

AI makes mistakes. It hallucinates. It can't make the interpretive judgments that research requires. When an AI extracts data from a study, it pattern-matches; it doesn't *understand* the study. For objective fields (who wrote it, when, where it was published), that's fine. For analytical fields (what does this study mean, how does it connect to the literature, what are its limitations), that requires a human researcher.

### The social concerns matter too

AI tools aren't neutral. They're built by companies with commercial interests, trained on data that reflects existing power structures, and deployed in ways that can deepen inequities rather than address them. In the context of research, this raises real questions:

- **Whose labour builds these tools?** Researchers, often women and early-career scholars, frequently contribute expertise that gets absorbed into commercial products without credit or compensation. ReviewForge exists partly because of this experience. Your methodological frameworks, your extraction logic, your domain expertise: these have value, and that value should be recognised
- **Who benefits?** Proprietary extraction tools charge significant subscription fees while researchers do the intellectual work of designing the extraction. Open-source alternatives ensure the tools belong to the community that uses them
- **What gets centred?** AI models trained predominantly on English-language, Western, biomedical literature can reproduce the same biases in evidence synthesis. Researchers using these tools should be aware of what the AI might be missing or misrepresenting
- **Environmental impact matters.** Large language models consume significant computational resources. Using AI for metadata entry (small, bounded tasks) rather than wholesale extraction (large, continuous processing) is a more responsible use of these tools

### Where ReviewForge stands

This tool takes a specific position: **AI can help with data entry, but the analytical work belongs to the human.**

What that means in practice:

- AI can extract metadata from a PDF (authors, year, journal, study design) and save you from typing it manually. That's data entry, not analysis
- YOU read the article. YOU fill in the findings, the quality assessment, the analytical notes. That's the research
- The tool never makes decisions for you. It organises your decisions so you can find them later

If you're not comfortable using AI at all, that's completely fine. ReviewForge works without any AI involvement. You can create articles manually and type everything yourself. The AI integration is optional and clearly separated from the human analytical work.

Your scepticism is welcome here.

---

## Quick Start (No Coding Required)

### Step 1: Download

Click the green **Code** button at the top of this page, then click **Download ZIP**. Unzip the folder anywhere on your computer (your Desktop is fine).

### Step 2: Open It

You have two options:

**Option A: Just open the file (simplest)**
- Double-click `index.html` in the ReviewForge folder
- It opens in your web browser
- Everything works, but your data won't be saved if you close the browser
- Use the **Export** button to save your work before closing

**Option B: Use VS Code with Live Server (recommended)**
- Download [VS Code](https://code.visualstudio.com/) (free)
- Open VS Code, go to **File > Open Folder**, select the ReviewForge folder
- Install the **Live Server** extension (click the Extensions icon in the sidebar, search "Live Server", click Install)
- Right-click `index.html` in the sidebar, click **Open with Live Server**
- Your data now saves automatically between sessions

### Step 3: Start Extracting

1. Select a review type from the dropdown at the top (two examples are included)
2. Click **+ New article**
3. Fill in the fields
4. Your data saves automatically
5. When you're done, click **Export** to download your data

That's it. You're extracting.

---

## Included Templates

ReviewForge ships with two example templates you can use right away or customise:

| Template | Use For |
|----------|---------|
| **Scoping Review** | General scoping review extraction following Arksey & O'Malley / JBI |
| **Rodgers' Concept Analysis** | Evolutionary concept analysis with the standard six elements plus a customisable analytical framework |

### Templates on the Roadmap

We're building more. If you create one for your own review and want to share it, contributions are welcome!

- Systematic review (PRISMA)
- JBI scoping review
- Integrative review
- Rapid review
- Walker & Avant concept analysis
- Narrative / critical review
- JBI evidence synthesis
- Realist review

---

## Creating Your Own Template

ReviewForge is **schema-driven**, which means the extraction form is built from a simple text file that defines your fields. You don't need to write code to create a new template.

### How It Works

1. Open `codebook/example-scoping-review.json` in any text editor
2. You'll see a list of field groups, each containing fields with a label, type, and help text
3. Copy this file and modify it for your review
4. Add your new schema to `schemas.js` (follow the pattern in the file)
5. Reload ReviewForge and your template appears in the dropdown

### Field Types You Can Use

| Type | What It Looks Like | Good For |
|------|-------------------|----------|
| `free_text` | Single-line text box | Authors, titles, DOIs |
| `free_text_rich` | Expandable text area | Findings, notes, quotes with page numbers |
| `coded_single` | Dropdown menu | Study design, country, any single-choice field |
| `coded_multi` | Checkboxes | Tags, themes, any multi-choice field |
| `boolean` | Yes/No toggle | Flags (e.g., "uses validated instrument?") |
| `numeric` | Number input | Year, sample size |
| `date` | Date picker | Date extracted |

### Tips

- Add `"prominent": true` to a field to give it its own side panel (great for analytic memos or detailed notes)
- Add `"help_text"` to any field to show guidance below the label (helpful for team extraction where everyone needs to code consistently)
- Add `"default"` to pre-fill a value for new articles (e.g., setting status to "Not Started")

### Private Templates

If you create a template you don't want to share publicly (e.g., a proprietary extraction framework for a funded project), put it in `schemas-private.js` instead of `schemas.js`. This file is excluded from GitHub by default, so your intellectual property stays on your machine.

---

## Using the Paste Import Feature

This is optional but saves a lot of time on metadata entry.

1. Share a PDF with an AI assistant (like Claude) and ask: "Extract the metadata from this article as JSON using these field names: authors, year, title, journal, doi, country, study_design"
2. The AI gives you something like:
   ```json
   {
     "authors": "Smith, J.; Jones, K.",
     "year": 2023,
     "title": "A study about something important",
     "journal": "Journal of Important Studies",
     "study_design": "Qualitative"
   }
   ```
3. In ReviewForge, click **Paste import**, paste the JSON, click **Import**
4. A new article appears with the metadata already filled in
5. You do the rest: reading the article, extracting findings, writing your notes

The AI handles the tedious part (typing bibliographic details). You handle the meaningful part (engaging with the research). That's the division of labour.

---

## Project Structure

```
ReviewForge/
  index.html          The app (open this!)
  styles.css          How it looks
  schemas.js          Public templates
  schemas-private.js  Your private templates (not shared)
  app.js              App logic
  import.js           Paste Import feature
  LICENSE             GPL-3.0
  codebook/           Template reference files (JSON)
  docs/               Learning resources and roadmap
```

---

## Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full development plan. Highlights:

- **Now:** Schema-driven extraction, JSON import/export, sidebar filters, analytic memo panel
- **Next:** CSV/Excel export, PDF viewer for side-by-side reading
- **Later:** AI metadata extraction, batch processing, multi-reviewer support
- **Ongoing:** More community templates

---

## Contributing

ReviewForge is open source under GPL-3.0. Contributions are welcome, especially:

- **New templates** for common review types
- **Bug reports** (open an Issue on this page)
- **Feature suggestions** (open an Issue with "feature request" in the title)
- **Translations** (the app currently only supports English)

---

## About

ReviewForge was built by [Tess Wonsiak](https://github.com/TessWonsiak), a registered nurse and PhD candidate at the University of Victoria. It grew out of the experience of doing data extraction across multiple large reviews and realising that the tools available were either expensive, proprietary, or designed for developers rather than researchers.

The hardest part of building an extraction tool isn't the code. It's knowing what to extract, how to structure it, and how to make it useful for the people actually doing the work. The code is just the shell around that expertise.

---

## License

[GPL-3.0](LICENSE). Use it, modify it, share it. Credit the creator. Don't close-source it.

If ReviewForge saves you time on a project, consider giving the repo a star. It helps other researchers find it. ⭐
