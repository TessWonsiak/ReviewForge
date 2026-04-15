# Learning path

A curated, no-bullshit guide to learning to code, organized around what you actually need for ReviewForge. Skip the generic "learn to code" courses that spend three weeks on variables. You have a real project and that's the best teacher.

---

## Phase 1: Foundations (weeks 1-2)

**Goal:** Understand the three files you already have (HTML, CSS, JS) well enough to modify them confidently.

### HTML and CSS
- **freeCodeCamp Responsive Web Design** (free): https://www.freecodecamp.org/learn/2022/responsive-web-design/
  - Do the first 5 projects. Skip if you feel comfortable after 3.
- **CSS Tricks: A Complete Guide to Flexbox**: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
  - Bookmark this. You'll reference it constantly. Flexbox is how ReviewForge's layout works.
- **CSS Tricks: A Complete Guide to Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/
  - The two-panel layout uses CSS Grid. This is the other layout system you need.

### JavaScript basics
- **javascript.info** (free): https://javascript.info/
  - Chapters 1-5 cover what you need. Focus on: variables, functions, DOM manipulation, events.
- **MDN Web Docs** (free): https://developer.mozilla.org/en-US/docs/Learn/JavaScript
  - The reference you'll use forever. When you Google "how do I do X in JavaScript," MDN is the answer.

### Your practice project
Open `app.js` in ReviewForge and try:
1. Add a "changes saved" counter that increments when any field changes
2. Make the approve button disabled until all flagged fields are reviewed
3. Add keyboard shortcuts (Ctrl+S to save, Ctrl+Right Arrow for next article)

---

## Phase 2: React (weeks 3-6)

**Goal:** Rebuild ReviewForge in React so you can manage state (which article you're on, what's been changed, what's flagged) without spaghetti code.

### Why React?
Right now, ReviewForge is a single page with hardcoded data. React lets you:
- Load any article dynamically (from a JSON file or API)
- Track the state of every field (original value, current value, reviewed/flagged)
- Build reusable components (a "coded field" component you use for every dropdown)
- Navigate between articles without reloading the page

### Resources
- **React official tutorial** (free): https://react.dev/learn
  - The new React docs are genuinely excellent. Do the tic-tac-toe tutorial.
- **Vite** (build tool): https://vite.dev/guide/
  - This replaces the old Create React App. It's how you'll set up the project.

### Your practice project
Rebuild the extraction form as a React component that:
1. Reads field definitions from `wsacs-fields.json`
2. Renders the correct input type (dropdown for coded, textarea for free text)
3. Tracks which fields have been modified (show a "changed" indicator)
4. Exports the extraction as JSON

---

## Phase 3: PDF rendering (weeks 7-8)

**Goal:** Display actual PDFs in the right panel with text highlighting.

### PDF.js
- **Mozilla PDF.js**: https://mozilla.github.io/pdf.js/
  - This is what every browser-based PDF viewer uses, including the one in Sentinel's demo.
- **PDF.js examples**: https://mozilla.github.io/pdf.js/examples/
  - Start with the "basic" example, then add text layer for highlighting.

### The key challenge
The hard part isn't rendering the PDF; it's mapping extracted data back to specific text positions so you can highlight them. This is where the Claude API comes in: you can ask it to return both the extracted value AND the page/location where it found it.

---

## Phase 4: AI integration (weeks 9-12)

**Goal:** Wire up the Claude API to do first-pass extraction from uploaded PDFs.

### Anthropic API
- **Anthropic docs**: https://docs.anthropic.com/
  - You'll use the Messages API with a system prompt built from your extraction instructions.
- **PDF support**: Claude can read PDFs natively. You upload the PDF as part of the API call and get structured extraction back.

### The system prompt
This is where your methodological expertise becomes code. Your extraction instructions, Code Book, QA checklist, and the known AI weaknesses from your validation report all become the system prompt that guides the AI extraction. You've already written this content; it just needs to be formatted for the API.

### Your practice project
1. Create a simple Node.js script that sends a PDF to Claude with your extraction instructions
2. Parse the response into your 57-column schema
3. Compare the AI output against your hand-extracted data (you already have this from the pilot!)

---

## Phase 5: Full application (ongoing)

**Goal:** A complete tool you can use for real systematic reviews.

- **Database**: Store extraction data in SQLite or PostgreSQL instead of JSON files
- **Multi-user**: Add authentication so multiple reviewers can extract simultaneously
- **Export**: Generate XLSX files matching your master extraction spreadsheet format
- **Batch processing**: Queue up articles for AI extraction and process them overnight
- **Audit trail**: Track every change, who made it, and when (critical for systematic review reproducibility)

---

## Tools to install now

1. **VS Code**: https://code.visualstudio.com/
2. **Node.js (LTS)**: https://nodejs.org/
3. **Git**: https://git-scm.com/
4. **Chrome** (you probably have this): DevTools is your debugging companion

## VS Code extensions to install

- **Live Server** (Ritwick Dey): Auto-refreshes browser when you save
- **Prettier** (Prettier): Auto-formats your code so it looks clean
- **ES7+ React/Redux/React-Native snippets**: Shortcuts for React boilerplate
- **GitLens**: See who changed what and when (useful once you're using Git)
- **Auto Rename Tag**: When you change an opening HTML tag, the closing tag updates too

---

## Mindset notes

- **You don't need to understand everything before you start.** Change a colour, see what happens. Break something, undo it. That's learning.
- **Google everything.** Every developer does. "How to center a div CSS" has been searched billions of times.
- **The code is the easy part.** You already have the hard part: the domain expertise, the methodological framework, and the validation data to prove it works. Most developers trying to build this tool would have no idea what a WSACS domain is or why "Multiple Primary Outcomes" matters. You do.
- **Build for yourself first.** Don't try to make it perfect or sellable right away. Make it work for your next systematic review. Then make it good. Then make it for others.
