/*
    import.js — Paste Import Feature for ReviewForge
    =================================================
    
    This adds a "Paste Import" button that lets you paste JSON
    from Claude (or any other source) to create a pre-filled article.
    
    Workflow:
    1. Share a PDF with Claude in chat
    2. Claude extracts the metadata and gives you a JSON block
    3. Click "Paste import" in ReviewForge
    4. Paste the JSON, click Import
    5. A new article is created with all the metadata pre-filled
    6. You do the interpretive fields (Rodgers elements, Three Problems, etc.)
*/

document.addEventListener("DOMContentLoaded", function() {
    
    const importBtn = document.getElementById("import-article");
    const importPanel = document.getElementById("import-panel");
    const importTextarea = document.getElementById("import-textarea");
    const importCancel = document.getElementById("import-cancel");
    const importGo = document.getElementById("import-go");
    
    // Toggle the import panel
    importBtn.addEventListener("click", function() {
        if (!activeSchemaKey) {
            alert("Please select a review type first.");
            return;
        }
        
        const isVisible = importPanel.style.display !== "none";
        importPanel.style.display = isVisible ? "none" : "block";
        
        if (!isVisible) {
            importTextarea.value = "";
            importTextarea.focus();
        }
    });
    
    // Cancel: hide the panel
    importCancel.addEventListener("click", function() {
        importPanel.style.display = "none";
        importTextarea.value = "";
    });
    
    // Import: parse the JSON and create an article
    importGo.addEventListener("click", function() {
        const raw = importTextarea.value.trim();
        
        if (!raw) {
            alert("Please paste JSON data first.");
            return;
        }
        
        try {
            // Try to parse the JSON. Handle cases where Claude wraps it in ```json blocks
            let cleanJson = raw;
            if (cleanJson.startsWith("```")) {
                cleanJson = cleanJson.replace(/^```json?\n?/, "").replace(/\n?```$/, "");
            }
            
            const imported = JSON.parse(cleanJson);
            
            // Create a new article with defaults from the schema
            const article = { _id: Date.now().toString(), _created: new Date().toISOString() };
            
            // Fill in defaults first
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
            
            // Overlay the imported data on top of the defaults
            let fieldCount = 0;
            for (const key in imported) {
                if (key.startsWith("_")) continue; // Skip internal fields
                article[key] = imported[key];
                fieldCount++;
            }
            
            // Add the article
            articles.push(article);
            saveArticles();
            renderArticleList();
            selectArticle(articles.length - 1);
            
            // Hide the import panel
            importPanel.style.display = "none";
            importTextarea.value = "";
            
            setStatus("Imported article with " + fieldCount + " fields pre-filled");
            
        } catch (e) {
            alert("Could not parse JSON. Make sure you copied the entire JSON block.\n\nError: " + e.message);
            console.error("Import parse error:", e);
        }
    });
    
    // Also allow Ctrl+Enter to import
    importTextarea.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.key === "Enter") {
            importGo.click();
        }
    });
});
