/*
    ReviewForge v0.2.1 — Schema-Driven Extraction
    ===============================================
    
    The core idea: the app reads a schema and builds everything from it.
    Fields, dropdowns, validation, filters — all derived from the schema.
    
    New review type = new schema in schemas.js. No code changes needed.
    
    Data storage: tries localStorage first (persists between sessions).
    If localStorage is blocked (e.g., file:// protocol in Chrome), falls
    back to in-memory storage (data lives until you close the tab).
    
    For persistent storage, open this via Live Server in VS Code instead
    of double-clicking the file. See README.md for setup instructions.
*/


// ===== STORAGE WRAPPER =====
// This tries localStorage first. If Chrome blocks it (file:// protocol),
// it falls back to an in-memory object that works the same way but
// doesn't survive closing the tab.

const storage = (function() {
    let useLocalStorage = false;
    const memoryStore = {};
    
    // Test if localStorage actually works
    try {
        localStorage.setItem("__rf_test", "1");
        localStorage.removeItem("__rf_test");
        useLocalStorage = true;
    } catch (e) {
        useLocalStorage = false;
    }
    
    return {
        getItem: function(key) {
            if (useLocalStorage) return localStorage.getItem(key);
            return memoryStore[key] || null;
        },
        setItem: function(key, value) {
            if (useLocalStorage) {
                localStorage.setItem(key, value);
            } else {
                memoryStore[key] = value;
            }
        },
        isPersistent: useLocalStorage
    };
})();


// ===== APPLICATION STATE =====

let activeSchemaKey = null;
let activeSchema = null;
let articles = [];
let activeArticleIndex = -1;
let prominentFieldId = null;
let activeFilters = {};
let saveTimeout = null;


// ===== INITIALIZATION =====

document.addEventListener("DOMContentLoaded", function() {

    // Show a warning if localStorage isn't available
    if (!storage.isPersistent) {
        setStatus("Note: data won't persist after closing. Use Live Server in VS Code for persistent storage, or export before closing.");
    }

    // Populate the schema switcher dropdown
    const switcher = document.getElementById("schema-switcher");
    switcher.innerHTML = '<option value="" disabled selected>Choose a review type...</option>';
    
    for (const key in SCHEMAS) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = SCHEMAS[key].schema_name;
        switcher.appendChild(option);
    }
    
    switcher.addEventListener("change", function() {
        if (switcher.value) {
            loadSchema(switcher.value);
        }
    });
    
    // Welcome screen cards
    document.querySelectorAll(".welcome-card").forEach(function(card) {
        card.addEventListener("click", function() {
            const schemaKey = card.getAttribute("data-schema");
            switcher.value = schemaKey;
            loadSchema(schemaKey);
        });
    });
    
    document.getElementById("new-article").addEventListener("click", createNewArticle);
    
    document.getElementById("prev-article").addEventListener("click", function() {
        if (activeArticleIndex > 0) selectArticle(activeArticleIndex - 1);
    });
    document.getElementById("next-article").addEventListener("click", function() {
        if (activeArticleIndex < articles.length - 1) selectArticle(activeArticleIndex + 1);
    });
    
    document.getElementById("clear-filters").addEventListener("click", clearFilters);
    
    console.log("ReviewForge v0.2.1 loaded. Schemas available: " + Object.keys(SCHEMAS).join(", "));
    console.log("Storage mode: " + (storage.isPersistent ? "localStorage (persistent)" : "in-memory (temporary — use Live Server for persistence)"));
});


// ===== SCHEMA LOADING =====

function loadSchema(schemaKey) {
    activeSchemaKey = schemaKey;
    activeSchema = SCHEMAS[schemaKey];
    
    // Find the prominent field (for the memo panel)
    prominentFieldId = null;
    activeSchema.field_groups.forEach(function(group) {
        group.fields.forEach(function(field) {
            if (field.prominent) prominentFieldId = field.field_id;
        });
    });
    
    // Show/hide memo panel
    document.getElementById("memo-panel").style.display = prominentFieldId ? "flex" : "none";
    
    loadArticles();
    buildFilters();
    
    document.getElementById("welcome-screen").style.display = "none";
    
    if (articles.length > 0) {
        selectArticle(0);
    } else {
        document.getElementById("form-container").style.display = "none";
        updateArticleNav();
    }
    
    setStatus("Loaded: " + activeSchema.schema_name);
}


// ===== ARTICLE MANAGEMENT =====

function loadArticles() {
    const stored = storage.getItem("reviewforge_" + activeSchemaKey + "_articles");
    articles = stored ? JSON.parse(stored) : [];
    renderArticleList();
}

function saveArticles() {
    storage.setItem("reviewforge_" + activeSchemaKey + "_articles", JSON.stringify(articles));
}

function createNewArticle() {
    if (!activeSchema) {
        alert("Please select a review type first.");
        return;
    }
    
    const article = { _id: Date.now().toString(), _created: new Date().toISOString() };
    
    activeSchema.field_groups.forEach(function(group) {
        group.fields.forEach(function(field) {
            if (field.default !== undefined) {
                article[field.field_id] = field.default;
            } else if (field.type === "boolean") {
                article[field.field_id] = false;
            } else if (field.type === "coded_multi") {
                article[field.field_id] = [];
            } else {
                article[field.field_id] = "";
            }
        });
    });
    
    articles.push(article);
    saveArticles();
    renderArticleList();
    selectArticle(articles.length - 1);
    setStatus("New article created");
}

function deleteCurrentArticle() {
    if (activeArticleIndex < 0) return;
    if (!confirm("Delete this article? This cannot be undone.")) return;
    
    articles.splice(activeArticleIndex, 1);
    saveArticles();
    renderArticleList();
    
    if (articles.length > 0) {
        selectArticle(Math.min(activeArticleIndex, articles.length - 1));
    } else {
        activeArticleIndex = -1;
        document.getElementById("form-container").style.display = "none";
        document.getElementById("form-container").innerHTML = "";
        updateArticleNav();
    }
    
    setStatus("Article deleted");
}

function selectArticle(index) {
    activeArticleIndex = index;
    renderForm();
    renderArticleList();
    updateArticleNav();
    
    if (prominentFieldId && articles[index]) {
        const memoTextarea = document.getElementById("memo-textarea");
        memoTextarea.value = articles[index][prominentFieldId] || "";
        memoTextarea.oninput = function() {
            articles[activeArticleIndex][prominentFieldId] = memoTextarea.value;
            debouncedSave();
        };
    }
}

function updateArticleNav() {
    const indicator = document.getElementById("article-indicator");
    const prevBtn = document.getElementById("prev-article");
    const nextBtn = document.getElementById("next-article");
    
    if (articles.length === 0) {
        indicator.textContent = "No articles yet";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        indicator.textContent = (activeArticleIndex + 1) + " of " + articles.length;
        prevBtn.disabled = activeArticleIndex <= 0;
        nextBtn.disabled = activeArticleIndex >= articles.length - 1;
    }
}


// ===== ARTICLE LIST (SIDEBAR) =====

function renderArticleList() {
    const container = document.getElementById("article-list");
    
    if (articles.length === 0) {
        container.innerHTML = '<p class="empty-state">No articles yet. Click "+ New article" to start.</p>';
        return;
    }
    
    const filtered = getFilteredArticles();
    container.innerHTML = "";
    
    filtered.forEach(function(item) {
        const article = item.article;
        const originalIndex = item.index;
        
        const div = document.createElement("div");
        div.className = "article-list-item" + (originalIndex === activeArticleIndex ? " active" : "");
        
        const titleField = findFirstFieldValue(article, ["meta_authors", "authors", "meta_title", "title"]);
        const yearField = findFirstFieldValue(article, ["meta_year", "year"]);
        const statusField = findFirstFieldValue(article, ["status_extraction"]);
        
        const displayTitle = titleField || "Untitled article";
        const displayMeta = [yearField, statusField].filter(Boolean).join(" · ");
        
        div.innerHTML =
            '<div class="article-title">' + escapeHtml(displayTitle) + '</div>' +
            (displayMeta ? '<div class="article-meta">' + escapeHtml(displayMeta) + '</div>' : '');
        
        div.addEventListener("click", function() {
            selectArticle(originalIndex);
        });
        
        container.appendChild(div);
    });
    
    if (filtered.length < articles.length) {
        const note = document.createElement("p");
        note.className = "empty-state";
        note.textContent = "Showing " + filtered.length + " of " + articles.length;
        container.appendChild(note);
    }
}


// ===== FORM RENDERING =====

function renderForm() {
    const container = document.getElementById("form-container");
    const article = articles[activeArticleIndex];
    
    if (!article || !activeSchema) {
        container.style.display = "none";
        return;
    }
    
    container.style.display = "block";
    container.innerHTML = "";
    
    activeSchema.field_groups.forEach(function(group) {
        const groupDiv = document.createElement("div");
        groupDiv.className = "field-group";
        
        const header = document.createElement("div");
        header.className = "group-header";
        header.innerHTML = escapeHtml(group.group_name) +
            (group.description ? ' <span class="group-description">' + escapeHtml(group.description) + '</span>' : '');
        groupDiv.appendChild(header);
        
        const fieldsDiv = document.createElement("div");
        fieldsDiv.className = "group-fields";
        
        group.fields.forEach(function(field) {
            // Skip the prominent field here (it's in the memo panel)
            if (field.prominent && prominentFieldId) return;
            
            fieldsDiv.appendChild(renderFieldRow(field, article));
        });
        
        groupDiv.appendChild(fieldsDiv);
        container.appendChild(groupDiv);
    });
    
    // Action buttons
    const actions = document.createElement("div");
    actions.className = "form-actions";
    actions.innerHTML =
        '<button class="btn btn-danger" id="delete-article-btn">Delete article</button>' +
        '<button class="btn btn-outline" id="export-article-btn">Export JSON</button>' +
        '<button class="btn btn-outline" id="export-all-btn">Export all (' + articles.length + ')</button>';
    container.appendChild(actions);
    
    document.getElementById("delete-article-btn").addEventListener("click", deleteCurrentArticle);
    document.getElementById("export-article-btn").addEventListener("click", exportCurrentArticle);
    document.getElementById("export-all-btn").addEventListener("click", exportAllArticles);
}

function renderFieldRow(field, article) {
    const row = document.createElement("div");
    row.className = "field-row";
    
    // Label cell
    const labelCell = document.createElement("div");
    labelCell.className = "field-label-cell";
    
    const labelText = document.createElement("div");
    labelText.className = "field-label-text";
    labelText.innerHTML = escapeHtml(field.label) +
        (field.required ? ' <span class="field-required">*</span>' : '');
    labelCell.appendChild(labelText);
    
    if (field.help_text) {
        const help = document.createElement("div");
        help.className = "field-help";
        help.textContent = field.help_text;
        labelCell.appendChild(help);
    }
    
    row.appendChild(labelCell);
    
    // Value cell
    const valueCell = document.createElement("div");
    valueCell.className = "field-value-cell";
    
    const currentValue = article[field.field_id];
    
    // Each field type gets the appropriate input element
    switch (field.type) {
        case "free_text":
            valueCell.appendChild(renderTextInput(field, currentValue));
            break;
        case "free_text_rich":
            valueCell.appendChild(renderTextarea(field, currentValue));
            break;
        case "coded_single":
            valueCell.appendChild(renderSelect(field, currentValue));
            break;
        case "coded_multi":
            valueCell.appendChild(renderCheckboxGroup(field, currentValue));
            break;
        case "boolean":
            valueCell.appendChild(renderToggle(field, currentValue));
            break;
        case "numeric":
            valueCell.appendChild(renderNumericInput(field, currentValue));
            break;
        case "date":
            valueCell.appendChild(renderDateInput(field, currentValue));
            break;
        default:
            valueCell.appendChild(renderTextInput(field, currentValue));
    }
    
    row.appendChild(valueCell);
    return row;
}


// ===== FIELD RENDERERS =====

function renderTextInput(field, value) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "rf-input";
    input.id = "field-" + field.field_id;
    input.name = field.field_id;
    input.value = value || "";
    input.placeholder = field.label;
    input.oninput = function() { updateField(field.field_id, input.value); };
    return input;
}

function renderTextarea(field, value) {
    const textarea = document.createElement("textarea");
    textarea.className = "rf-textarea rf-textarea-rich";
    textarea.id = "field-" + field.field_id;
    textarea.name = field.field_id;
    textarea.value = value || "";
    textarea.placeholder = field.help_text || field.label;
    textarea.rows = 4;
    textarea.oninput = function() { updateField(field.field_id, textarea.value); };
    return textarea;
}

function renderSelect(field, value) {
    const select = document.createElement("select");
    select.className = "rf-select";
    select.id = "field-" + field.field_id;
    select.name = field.field_id;
    
    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = "Select...";
    emptyOpt.disabled = field.required;
    emptyOpt.selected = !value;
    select.appendChild(emptyOpt);
    
    field.options.forEach(function(opt) {
        const option = document.createElement("option");
        if (typeof opt === "string") {
            option.value = opt;
            option.textContent = opt;
            option.selected = (value === opt);
        } else {
            option.value = opt.code;
            option.textContent = opt.label;
            option.selected = (value === opt.code);
        }
        select.appendChild(option);
    });
    
    select.onchange = function() { updateField(field.field_id, select.value); };
    return select;
}

function renderCheckboxGroup(field, value) {
    const container = document.createElement("div");
    container.className = "rf-checkbox-group";
    
    const currentValues = Array.isArray(value) ? value : [];
    
    field.options.forEach(function(opt) {
        const item = document.createElement("label");
        item.className = "rf-checkbox-item";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "field-" + field.field_id + "-" + (typeof opt === "string" ? opt : opt.code);
        checkbox.name = field.field_id;
        const code = typeof opt === "string" ? opt : opt.code;
        checkbox.checked = currentValues.includes(code);
        
        const textDiv = document.createElement("div");
        if (typeof opt === "string") {
            textDiv.innerHTML = '<div class="rf-checkbox-label">' + escapeHtml(opt) + '</div>';
        } else {
            textDiv.innerHTML =
                '<div class="rf-checkbox-label">' + escapeHtml(opt.label) + '</div>' +
                (opt.description ? '<div class="rf-checkbox-desc">' + escapeHtml(opt.description) + '</div>' : '');
        }
        
        checkbox.onchange = function() {
            const vals = getCurrentMultiValue(field.field_id);
            if (checkbox.checked) {
                vals.push(code);
            } else {
                const idx = vals.indexOf(code);
                if (idx > -1) vals.splice(idx, 1);
            }
            updateField(field.field_id, vals);
        };
        
        item.appendChild(checkbox);
        item.appendChild(textDiv);
        container.appendChild(item);
    });
    
    return container;
}

function renderToggle(field, value) {
    const label = document.createElement("label");
    label.className = "rf-toggle";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "field-" + field.field_id;
    checkbox.name = field.field_id;
    checkbox.checked = !!value;
    
    const span = document.createElement("span");
    span.textContent = value ? "Yes" : "No";
    
    checkbox.onchange = function() {
        span.textContent = checkbox.checked ? "Yes" : "No";
        updateField(field.field_id, checkbox.checked);
    };
    
    label.appendChild(checkbox);
    label.appendChild(span);
    return label;
}

function renderNumericInput(field, value) {
    const input = document.createElement("input");
    input.type = "number";
    input.className = "rf-input rf-input-numeric";
    input.id = "field-" + field.field_id;
    input.name = field.field_id;
    input.value = value || "";
    input.oninput = function() { updateField(field.field_id, input.value); };
    return input;
}

function renderDateInput(field, value) {
    const input = document.createElement("input");
    input.type = "date";
    input.className = "rf-input rf-input-date";
    input.id = "field-" + field.field_id;
    input.name = field.field_id;
    input.value = value || "";
    input.onchange = function() { updateField(field.field_id, input.value); };
    return input;
}


// ===== DATA UPDATE AND SAVE =====

function updateField(fieldId, value) {
    if (activeArticleIndex < 0) return;
    articles[activeArticleIndex][fieldId] = value;
    debouncedSave();
    renderArticleList();
}

function getCurrentMultiValue(fieldId) {
    if (activeArticleIndex < 0) return [];
    const val = articles[activeArticleIndex][fieldId];
    return Array.isArray(val) ? val.slice() : [];
}

function debouncedSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(function() {
        saveArticles();
        const indicator = document.getElementById("save-indicator");
        indicator.textContent = "Saved";
        indicator.className = "save-indicator-saved";
        setTimeout(function() { indicator.textContent = ""; }, 2000);
    }, 500);
}


// ===== FILTERING =====

function buildFilters() {
    const container = document.getElementById("filters-container");
    const section = document.getElementById("filters-section");
    container.innerHTML = "";
    activeFilters = {};
    
    if (!activeSchema.filterable_fields || activeSchema.filterable_fields.length === 0) {
        section.style.display = "none";
        return;
    }
    
    section.style.display = "block";
    
    activeSchema.filterable_fields.forEach(function(fieldId) {
        const field = findFieldById(fieldId);
        if (!field) return;
        
        const group = document.createElement("div");
        group.className = "filter-group";
        
        const label = document.createElement("label");
        label.className = "filter-label";
        label.textContent = field.label;
        group.appendChild(label);
        
        if (field.type === "coded_multi") {
            const chipContainer = document.createElement("div");
            chipContainer.className = "filter-checkbox-group";
            
            field.options.forEach(function(opt) {
                const code = typeof opt === "string" ? opt : opt.code;
                const displayLabel = typeof opt === "string" ? opt : opt.label;
                
                const chip = document.createElement("span");
                chip.className = "filter-chip";
                chip.textContent = displayLabel;
                chip.addEventListener("click", function() {
                    chip.classList.toggle("active");
                    updateFilterState(fieldId, code, chip.classList.contains("active"));
                });
                chipContainer.appendChild(chip);
            });
            
            group.appendChild(chipContainer);
        } else if (field.type === "coded_single") {
            const select = document.createElement("select");
            select.className = "filter-select";
            
            const allOpt = document.createElement("option");
            allOpt.value = "";
            allOpt.textContent = "All";
            select.appendChild(allOpt);
            
            field.options.forEach(function(opt) {
                const option = document.createElement("option");
                if (typeof opt === "string") {
                    option.value = opt;
                    option.textContent = opt;
                } else {
                    option.value = opt.code;
                    option.textContent = opt.label;
                }
                select.appendChild(option);
            });
            
            select.onchange = function() {
                if (select.value) {
                    activeFilters[fieldId] = select.value;
                } else {
                    delete activeFilters[fieldId];
                }
                renderArticleList();
            };
            
            group.appendChild(select);
        }
        
        container.appendChild(group);
    });
}

function updateFilterState(fieldId, code, isActive) {
    if (!activeFilters[fieldId]) activeFilters[fieldId] = [];
    
    if (isActive) {
        if (!activeFilters[fieldId].includes(code)) activeFilters[fieldId].push(code);
    } else {
        activeFilters[fieldId] = activeFilters[fieldId].filter(function(c) { return c !== code; });
        if (activeFilters[fieldId].length === 0) delete activeFilters[fieldId];
    }
    
    renderArticleList();
}

function clearFilters() {
    activeFilters = {};
    document.querySelectorAll(".filter-chip").forEach(function(chip) {
        chip.classList.remove("active");
    });
    document.querySelectorAll(".filter-select").forEach(function(select) {
        select.value = "";
    });
    renderArticleList();
}

function getFilteredArticles() {
    const result = [];
    
    articles.forEach(function(article, index) {
        let matches = true;
        
        for (const fieldId in activeFilters) {
            const filterValue = activeFilters[fieldId];
            const articleValue = article[fieldId];
            
            if (Array.isArray(filterValue)) {
                if (!Array.isArray(articleValue) || !filterValue.some(function(v) { return articleValue.includes(v); })) {
                    matches = false;
                    break;
                }
            } else {
                if (articleValue !== filterValue) {
                    matches = false;
                    break;
                }
            }
        }
        
        if (matches) {
            result.push({ article: article, index: index });
        }
    });
    
    return result;
}


// ===== EXPORT =====

function exportCurrentArticle() {
    if (activeArticleIndex < 0) return;
    
    const article = articles[activeArticleIndex];
    downloadJson(article, makeFilename(article));
    setStatus("Exported 1 article as JSON");
}

function exportAllArticles() {
    if (articles.length === 0) return;
    
    const exportData = {
        schema: activeSchemaKey,
        exported: new Date().toISOString(),
        count: articles.length,
        articles: articles
    };
    
    const filename = "reviewforge_" + activeSchemaKey + "_" + articles.length + "articles_" + today() + ".json";
    downloadJson(exportData, filename);
    setStatus("Exported " + articles.length + " articles as JSON");
}

function downloadJson(data, filename) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function makeFilename(article) {
    const author = findFirstFieldValue(article, ["meta_authors", "authors"]) || "article";
    const year = findFirstFieldValue(article, ["meta_year", "year"]) || "";
    const clean = author.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30);
    return "extraction_" + clean + (year ? "_" + year : "") + ".json";
}

function today() {
    return new Date().toISOString().split("T")[0];
}


// ===== UTILITY FUNCTIONS =====

function findFieldById(fieldId) {
    for (const group of activeSchema.field_groups) {
        for (const field of group.fields) {
            if (field.field_id === fieldId) return field;
        }
    }
    return null;
}

function findFirstFieldValue(article, fieldIds) {
    for (const id of fieldIds) {
        if (article[id] && article[id].toString().trim()) return article[id].toString().trim();
    }
    return null;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function setStatus(message) {
    document.getElementById("status-message").textContent = message;
}
