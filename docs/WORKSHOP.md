# Build Something and Break It: A Coding Workshop for People Who Don't Code (Yet)

**Learn to build your own web tools by building your own web tool.**

A self-paced workshop for anyone who's never written a line of code: researchers, clinicians, educators, students, or anyone who's ever thought "someone should make an app for this." Work at your own pace, meet up regularly to share progress, troubleshoot together, and cheer each other on.

---

## The Idea

You probably have a workflow that frustrates you. Maybe it's a clunky spreadsheet you maintain by hand. Maybe it's a tracking system that doesn't exist yet. Maybe it's a calculator, a checklist, a scheduler, or a data organiser. Maybe you've thought "someone should make an app for this" and then nobody did.

This workshop teaches you to be the someone.

You'll learn the same skills that every web developer uses (HTML, CSS, JavaScript), but instead of building generic exercises, you'll build a tool that solves a real problem in your own work. The facilitator shares their project as a case study, but the goal is yours: by the end of this workshop, you'll have something you built, something that works, and something you understand well enough to keep improving.

---

## Before You Start

### What you need
- A computer (Windows, Mac, or Linux)
- Chrome or another modern browser
- A problem you wish you had a tool for (we'll help you find one if you're not sure)

### What you don't need
- Any coding experience
- A computer science background
- Permission from anyone
- A good idea (a half-formed idea is perfect)

---

## Module 1: See What's Possible

**Goal:** Get inspired. See real tools built by real people (not developers). Identify your own problem.

### Part A: Case study

Your facilitator walks you through a tool they built: why they built it, what it does, and what it looks like under the hood. This isn't a demo of a polished product; it's a story about a problem, a process, and a lot of trial and error.

Key takeaway: every tool you use was built by someone who didn't know how to build it when they started.

### Part B: Find your problem

Think about your work. What do you do repeatedly that's tedious, error-prone, or frustrating? Some examples:

**Health and research:**
- A patient education tracker that shows which topics have been covered
- A clinical shift handover template that structures the right information
- A study log for tracking research activities and hours
- A CPD (continuing professional development) tracker
- A journal club organiser that tracks articles, discussants, and key takeaways
- A consent form checklist for research protocols

**Education:**
- A course planning tool that maps learning outcomes to assessments
- A student feedback organiser
- A resource library with filters by topic and level

**Any field:**
- A project tracker with deadlines and status updates
- A meeting notes template that structures decisions and action items
- A personal budget calculator
- A recipe organiser (because why not)
- An inventory tracker for supplies or equipment

You don't need a fully formed idea. You need a frustration.

### Deliverable
One sentence: "I wish I had a tool that ___________."

### Check-in prompt
Share your sentence with the group. You'll be surprised how many people have the same frustrations.

---

## Module 2: Set Up and Your First Page

**Goal:** Install your tools, create a folder, and build a web page that displays text. See that you made something.

### Steps

1. **Install VS Code** (https://code.visualstudio.com/). This is your code editor
2. **Install the Live Server extension** (search in Extensions sidebar)
3. **Create your project folder** on your Desktop. Name it whatever your tool is called (or just "my-project" for now)
4. **Create your first file.** In VS Code, create a new file called `index.html` in your project folder
5. **Type this** (yes, type it, don't copy-paste; typing builds muscle memory):

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Tool</title>
</head>
<body>
    <h1>Hello, world!</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

6. **Open it.** Right-click `index.html` > Open with Live Server
7. **Change something.** Replace "Hello, world!" with the name of your tool. Save. Watch it update

### What you just learned
- HTML is text with tags. Tags come in pairs: `<opening>` and `</closing>`
- `<h1>` is a heading. `<p>` is a paragraph
- The browser reads this file and renders it as a web page
- When you save, Live Server refreshes automatically

### Deliverable
A web page with your tool's name on it, running in your browser.

### Check-in prompt
Show your page. What did you name your tool?

---

## Module 3: Structure and Style

**Goal:** Add structure to your page (HTML) and make it look good (CSS).

### Part A: Add structure

Think about what your tool needs to display. A form? A list? A table? Add the elements:

```html
<h2>My Section Title</h2>

<label>Name:</label>
<input type="text" placeholder="Type here...">

<label>Category:</label>
<select>
    <option>Option A</option>
    <option>Option B</option>
    <option>Option C</option>
</select>

<button>Save</button>
```

Try building a rough skeleton of your tool's layout. It won't be pretty yet. That's fine.

### Part B: Add style

Create a new file called `styles.css` in your project folder. Link it in your HTML by adding this line inside `<head>`:

```html
<link rel="stylesheet" href="styles.css">
```

Then in `styles.css`, try:

```css
body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

button {
    background: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
```

### Resources
- **HTML elements reference:** https://developer.mozilla.org/en-US/docs/Web/HTML/Element
- **CSS basics:** https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps

### Deliverable
A styled skeleton of your tool with the basic layout in place.

### Check-in prompt
Show your skeleton. What's working? What looks weird? (Weird is normal and fixable.)

---

## Module 4: Make It Interactive

**Goal:** Add JavaScript so your page responds to what the user does.

### The core pattern

All interactivity follows the same pattern:
1. **Find an element** on the page
2. **Listen** for something to happen (a click, a change, a keystroke)
3. **Do something** in response

Create a new file called `app.js`. Link it at the bottom of your HTML, just before `</body>`:

```html
<script src="app.js"></script>
```

Then in `app.js`:

```javascript
// Find the button
const myButton = document.querySelector("button");

// Listen for a click
myButton.addEventListener("click", function() {

    // Do something
    alert("You clicked the button!");

});
```

### Things to try
- Read a value from a text input: `document.querySelector("input").value`
- Change text on the page: `document.querySelector("h1").textContent = "New text"`
- Show/hide an element: `document.querySelector(".my-thing").style.display = "none"`
- React to a dropdown change: `mySelect.addEventListener("change", function() { ... })`

### Resources
- **JavaScript basics:** https://javascript.info/ (chapters 1-5)
- **DOM manipulation:** https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

### Deliverable
Your tool responds to at least one user action (a button click, a form submission, a dropdown change).

### Check-in prompt
Demo your interaction! What happens when you click/type/select? What was the hardest part?

---

## Module 5: Polish and Problem-Solve

**Goal:** Make your tool actually useful. Fix the things that bug you. Add the feature you've been wanting.

### This is the real work

By now you have a page with structure, style, and interactivity. This module is about iterating: making it better, fixing what's broken, adding what's missing.

### Common next steps
- **Save data to localStorage** so it persists between sessions
- **Add form validation** (don't let someone submit without filling in required fields)
- **Calculate something** (scores, totals, averages)
- **Filter or sort** a list of items
- **Export data** as a downloadable file

### How to learn what you need

You'll hit a point where you think "I want to do X but I don't know how." Here's what to do:

1. Google it: "how to [do the thing] in JavaScript"
2. Look for answers on MDN (Mozilla Developer Network) or Stack Overflow
3. Try it. Break it. Read the error. Try again
4. Ask your group. Someone may have solved the same problem
5. Ask an AI assistant. Describe what you're trying to do and what's not working. AI is good at debugging and explaining code, even if you're cautious about using it for other things

### Deliverable
A tool that does something genuinely useful for you. It doesn't have to be perfect. It has to work.

### Check-in prompt
Demo your tool doing the thing it was built to do. What are you most proud of? What would you add next?

---

## Module 6: Share Your Work

**Goal:** Put your project on GitHub and share it with at least one person.

### Steps

1. **Create a GitHub account** (https://github.com/signup)
2. **Create a repository** for your project
3. **Push your code** (your facilitator can walk you through the Git commands)
4. **Write a README** that explains what your tool does and how to use it
5. **Share the link** with someone who would find it useful

### Deliverable
Your project is on GitHub with a README that someone else could follow.

### Check-in prompt
Share your GitHub link. How does it feel to have something public that you built from nothing?

---

## After the Workshop

You now know how to:
- Build a web page (HTML)
- Style it (CSS)
- Make it interactive (JavaScript)
- Save and manage data
- Share your code on GitHub

These are the same skills used to build every website and web app you've ever used. The only difference between your tool and a "real" app is time and iteration.

### Keep going
- Add features to your tool as you discover what's missing
- Learn a framework like React for more complex interfaces
- Explore AI-assisted coding tools like Claude Code
- Build another tool for a different problem
- Teach someone else what you learned

---

## Facilitation Guide

### For the person running the workshop

**Your role:** You're a peer who's a few steps ahead, not an expert. Share your own learning journey: the mistakes, the confusion, the moments where it clicked. Be honest about what you still don't know.

**Structure:** Let people work at their own pace. Some will finish a module in an evening; others will take a week. That's fine. The check-ins are where the learning happens: seeing other people's approaches, troubleshooting together, and realising that everyone struggles with the same things.

**The most important thing you can do:** When someone breaks something, resist the urge to fix it for them. Ask them what they've tried. Ask them what the error message says. Guide them toward the answer rather than giving it. The struggle is where the learning lives.

**Group size:** 2-4 people is ideal. Big enough to have diverse projects and problems, small enough that everyone gets airtime at every check-in.

**Check-in frequency:** Every 1-2 weeks, depending on pace. Keep them casual: coffee, screen-sharing, show and tell. 30-45 minutes is plenty.

---

## Acknowledgements

This workshop was built on the belief that you shouldn't have to wait for developers to build the tools you need. You understand your problems better than any developer ever will. All you need are the building blocks. Now you have them.

You don't need permission to learn this. You just need to start.
