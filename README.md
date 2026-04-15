# ReviewForge

**AI-assisted data extraction with human validation for systematic reviews.**

Built by Tess Wonsiak. Powered by gay audacity.

---

## What is this?

ReviewForge is a tool for systematic review data extraction that:
- Uses AI to do a first-pass extraction from PDF articles
- Presents the extraction alongside the source document for human validation
- Enforces coded dropdown values from your Code Book
- Flags low-confidence fields for reviewer attention
- Tracks QA validation across all 57 extraction columns

Right now it's a working prototype in plain HTML/CSS/JavaScript.
No fancy frameworks yet, just files you can open in a browser.

---

## Quick start (5 minutes)

### Step 1: Open in VS Code
1. Open VS Code
2. File > Open Folder > select this `ReviewForge` folder
3. You should see all the files in the left sidebar

### Step 2: Install Live Server extension
1. In VS Code, click the Extensions icon (four squares) in the left sidebar
2. Search for "Live Server" by Ritwick Dey
3. Click Install
4. Wait 10 seconds

### Step 3: Launch it
1. Open `index.html` in VS Code
2. Right-click anywhere in the file
3. Click "Open with Live Server"
4. Your browser opens with ReviewForge running locally!

### Step 4: Try changing something
1. In `index.html`, find the text "ReviewForge" near the top
2. Change it to "ReviewForge Beta" or whatever you want
3. Save the file (Ctrl+S)
4. Watch your browser update automatically

That's it. You're coding.

---

## Project structure

```
ReviewForge/
  index.html          <- The main app (start here!)
  styles.css          <- All the visual styling
  app.js              <- Interactive behaviour (JavaScript)
  codebook/
    wsacs-fields.json  <- Your extraction schema as structured data
  docs/
    LEARNING_PATH.md   <- Curated learning resources
    ROADMAP.md         <- What we'll build next
```

---

## What you need installed

1. **VS Code** - https://code.visualstudio.com/ (free)
   - Your code editor. This is where you'll live.

2. **Node.js** - https://nodejs.org/ (free, get the LTS version)
   - Not needed yet for the prototype, but you'll want it soon for React.

3. **Git** - https://git-scm.com/ (free)
   - Version control. Even if you don't use GitHub yet, install it now.

That's all you need to get started. Python and the Claude API come later.

---

## The philosophy

The hardest part of building a systematic review extraction tool isn't the code.
It's the methodological infrastructure: knowing what to extract, how to code it,
how to validate it, and how to structure the evidence.

You already built that. The 57-column schema, the Code Book, the three-tier QA
validation, the confidence flagging system. That's the product.

The code is just the shell around your expertise.
