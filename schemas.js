/*
    schemas.js — Schema definitions for ReviewForge
    ================================================
    
    This file makes the extraction schemas available to app.js.
    
    The schemas are also stored as standalone JSON files in the codebook/
    folder (wsacs-fields.json and rodgers-fields.json). Those are the
    "source of truth" for documentation. This file is the version the
    app actually loads.
    
    When you add a new review type, add its schema here AND as a JSON
    file in codebook/.
*/

const SCHEMAS = {

    // ===== WSACS SYSTEMATIC REVIEW =====
    wsacs: {
        schema_name: "WSACS Systematic Review",
        schema_version: "1.0",
        description: "Data extraction for IAH/ACS clinical practice guidelines. GRADE methodology. 57-column framework.",
        
        field_groups: [
            {
                group_name: "Citation Details",
                description: "Bibliographic information (Cols 3-8)",
                fields: [
                    { field_id: "authors", label: "Authors", type: "free_text", required: true, help_text: "All authors, semicolon-separated, full names as in PDF." },
                    { field_id: "title", label: "Title", type: "free_text", required: true },
                    { field_id: "year", label: "Year", type: "numeric", required: true },
                    { field_id: "journal", label: "Journal", type: "free_text", required: true },
                    { field_id: "doi", label: "DOI", type: "free_text", required: false },
                    { field_id: "country", label: "Country", type: "coded_single", required: true,
                        options: ["Australia","Austria","Belgium","Brazil","Canada","Chile","China","Colombia","Croatia","Czech Republic","Denmark","Egypt","Finland","France","Germany","Greece","Hungary","India","Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan","Korea","Malaysia","Mexico","Multiple","Netherlands","New Zealand","Nigeria","Norway","Pakistan","Poland","Portugal","Romania","Russia","Saudi Arabia","Singapore","South Africa","Spain","Sweden","Switzerland","Taiwan","Thailand","Turkey","UAE","UK","USA","Other"],
                        help_text: "Use 'Multiple' for multicentre across countries."
                    }
                ]
            },
            {
                group_name: "Study Design & Domains",
                description: "Cols 9-13",
                fields: [
                    { field_id: "research_aim", label: "Research Aim", type: "free_text_rich", required: true, help_text: "Summarize in 1-2 sentences from the study's stated aim." },
                    { field_id: "study_design", label: "Study Design", type: "coded_single", required: true,
                        options: ["Randomized Controlled Trial","Prospective Cohort","Retrospective Cohort","Case-Control","Cross-Sectional","Before-After","Case Series","Case Report","Other"]
                    },
                    { field_id: "primary_domain", label: "Primary Domain", type: "coded_single", required: true,
                        options: ["1. Definition","2. Pathophysiology: IAP","3. Recognition/Awareness","4. Risk Factors","5. Open Abdomen","6. Pathophysiology: Organ Function","7. Measurement and Monitoring","8. IAH/ACS Classification","9. Surgical Management","10. Resuscitation","11. Nonsurgical Management","12. Outcomes"]
                    },
                    { field_id: "secondary_domain", label: "Secondary Domain", type: "coded_single", required: false,
                        options: ["1. Definition","2. Pathophysiology: IAP","3. Recognition/Awareness","4. Risk Factors","5. Open Abdomen","6. Pathophysiology: Organ Function","7. Measurement and Monitoring","8. IAH/ACS Classification","9. Surgical Management","10. Resuscitation","11. Nonsurgical Management","12. Outcomes","(none)"]
                    },
                    { field_id: "other_domain", label: "Other Domain", type: "coded_single", required: false,
                        options: ["1. Definition","2. Pathophysiology: IAP","3. Recognition/Awareness","4. Risk Factors","5. Open Abdomen","6. Pathophysiology: Organ Function","7. Measurement and Monitoring","8. IAH/ACS Classification","9. Surgical Management","10. Resuscitation","11. Nonsurgical Management","12. Outcomes","(none)"]
                    }
                ]
            },
            {
                group_name: "Population",
                description: "Cols 14-24",
                fields: [
                    { field_id: "demographics", label: "Demographics", type: "free_text_rich", required: true, help_text: "Population, institution, age, sex ratio, key clinical features." },
                    { field_id: "clinical_context", label: "Clinical Context", type: "coded_single", required: true,
                        options: ["ICU - Surgical","ICU - Medical","ICU - General / Mixed","ICU - Trauma","ICU - Burns","Emergency Department","Operating Room","General Ward","Other"]
                    },
                    { field_id: "study_n", label: "Study N", type: "free_text", required: true, help_text: "The analysed sample size (not enrolled)." },
                    { field_id: "iap_timing", label: "IAP Timing", type: "coded_single", required: true,
                        options: ["Continuous","Intermittent","Not specified","Not measured"]
                    },
                    { field_id: "iap_method", label: "IAP Method", type: "coded_single", required: true,
                        options: ["Intravesical (Bladder)","Intragastric","Direct Measurement","Not Measured","Other"],
                        help_text: "Dropdown value ONLY. Protocol details go in reviewer comments."
                    }
                ]
            },
            {
                group_name: "Primary Outcome",
                description: "Cols 29-38",
                fields: [
                    { field_id: "primary_outcome", label: "Classification", type: "coded_single", required: true,
                        options: ["1.IAH Incidence/Prevalence","2.ACS Incidence/Prevalence","3.IAP Values","4.Mortality","5.Length of Stay","6.Organ Dysfunction/Failure","7.Multiple Primary Outcomes"]
                    },
                    { field_id: "key_finding", label: "Key Finding", type: "free_text_rich", required: false }
                ]
            },
            {
                group_name: "Reviewer Comments",
                description: "Col 57",
                fields: [
                    { field_id: "reviewer_comments", label: "Comments", type: "free_text_rich", required: true,
                        help_text: "Prefix with (C). Include study period, evidence level, non-standard practices."
                    }
                ]
            }
        ],

        // Filterable fields for the sidebar
        filterable_fields: ["country", "study_design", "primary_domain", "clinical_context", "primary_outcome"]
    },

    // ===== RODGERS' CONCEPT ANALYSIS =====
    rodgers: {
        schema_name: "Rodgers' Evolutionary Concept Analysis",
        schema_version: "1.0",
        description: "Mental suffering in the context of MAiD. Rodgers' (2000) evolutionary method.",
        concept: "Mental Suffering",
        context: "Medical Assistance in Dying (MAiD)",

        field_groups: [
            {
                group_name: "Source Metadata",
                description: "Bibliographic and contextual information",
                fields: [
                    { field_id: "meta_authors", label: "Author(s)", type: "free_text", required: true, help_text: "Last name, initials. Multiple authors separated by semicolons." },
                    { field_id: "meta_year", label: "Year", type: "numeric", required: true },
                    { field_id: "meta_title", label: "Title", type: "free_text", required: true },
                    { field_id: "meta_journal", label: "Journal / Source", type: "free_text", required: true },
                    { field_id: "meta_country", label: "Country / Jurisdiction", type: "free_text", required: true, help_text: "Country of focus (not necessarily author location). Use 'International' for multi-country." },
                    { field_id: "meta_discipline", label: "Author Discipline", type: "coded_single", required: true,
                        options: ["Nursing","Psychiatry","Psychology","Palliative Care","Philosophy / Ethics","Law","Social Work","Medicine (General)","Public Health","Interdisciplinary","Other"]
                    },
                    { field_id: "meta_literature_type", label: "Literature Type", type: "coded_single", required: true,
                        options: ["Empirical (Qualitative)","Empirical (Quantitative)","Empirical (Mixed Methods)","Theoretical / Philosophical","Legal / Legislative","Clinical / Practice-Oriented","Review (Systematic / Scoping)","Policy / Position Statement","Commentary / Editorial","Case Report"]
                    },
                    { field_id: "meta_doi", label: "DOI", type: "free_text", required: false }
                ]
            },
            {
                group_name: "Rodgers' Six Elements",
                description: "Core extraction fields. Include direct quotes with page numbers.",
                fields: [
                    { field_id: "rodgers_attributes", label: "Attributes", type: "free_text_rich", required: false,
                        help_text: "Defining characteristics of mental suffering as described in this source. What IS mental suffering according to this author?"
                    },
                    { field_id: "rodgers_antecedents", label: "Antecedents", type: "free_text_rich", required: false,
                        help_text: "What precedes or gives rise to mental suffering? Note whether the source distinguishes antecedents of suffering from antecedents of the condition."
                    },
                    { field_id: "rodgers_consequences", label: "Consequences", type: "free_text_rich", required: false,
                        help_text: "What follows from mental suffering? Includes consequences for the person AND systemic consequences (MAiD requests, access barriers)."
                    },
                    { field_id: "rodgers_surrogate_terms", label: "Surrogate Terms", type: "free_text_rich", required: false,
                        help_text: "Terms used instead of 'mental suffering': psychological suffering, existential distress, unbearable psychological pain, etc."
                    },
                    { field_id: "rodgers_related_concepts", label: "Related Concepts", type: "free_text_rich", required: false,
                        help_text: "Concepts connected to but distinct from mental suffering: total pain, suicidality, capacity, demoralization, irremediability."
                    },
                    { field_id: "rodgers_context", label: "Context / References", type: "free_text_rich", required: false,
                        help_text: "Disciplinary, cultural, legal, and temporal context. How does context shape the construction of mental suffering here?"
                    }
                ]
            },
            {
                group_name: "Dissertation Analytical Framework",
                description: "Three interlocking problems, hierarchy of suffering, and epistemic assumptions",
                fields: [
                    { field_id: "analytical_three_problems", label: "Three Problems", type: "coded_multi", required: true,
                        options: [
                            { code: "L", label: "Legibility", description: "Mental suffering that cannot be observed or measured is treated as less credible than physical suffering." },
                            { code: "R", label: "Reversibility", description: "Determining irremediability for conditions with nonlinear trajectories and contested prognoses." },
                            { code: "A", label: "Autonomy", description: "The double bind where mental illness both motivates the MAiD request and undermines the legitimacy of that request." }
                        ],
                        help_text: "Select ALL that apply. Most sources speak to more than one problem."
                    },
                    { field_id: "analytical_hierarchy_position", label: "Hierarchy Position", type: "coded_single", required: true,
                        options: [
                            { code: "PRIVILEGES_PHYSICAL", label: "Privileges Physical Suffering" },
                            { code: "EQUALIZES", label: "Equalizes" },
                            { code: "CHALLENGES_HIERARCHY", label: "Challenges the Hierarchy" },
                            { code: "REPRODUCES_IMPLICITLY", label: "Reproduces Implicitly" },
                            { code: "ACKNOWLEDGES_COMPLEXITY", label: "Acknowledges Complexity" },
                            { code: "SILENT", label: "Silent" }
                        ],
                        help_text: "How does this source position mental suffering relative to physical suffering?"
                    },
                    { field_id: "analytical_epistemic_framework", label: "Epistemic Framework", type: "coded_single", required: true,
                        options: [
                            { code: "BIOMEDICAL", label: "Biomedical" },
                            { code: "PHENOMENOLOGICAL", label: "Phenomenological" },
                            { code: "RELATIONAL", label: "Relational" },
                            { code: "LEGAL_POSITIVIST", label: "Legal-Positivist" },
                            { code: "CRITICAL", label: "Critical" },
                            { code: "MIXED", label: "Mixed" }
                        ],
                        help_text: "What epistemological assumptions underpin this source's treatment of suffering?"
                    },
                    { field_id: "analytical_conflation_flag", label: "Conflates Suffering with Diagnosis", type: "boolean", required: true, default: false,
                        help_text: "Does this source use 'suffering from' to mean 'diagnosed with'? This conflation is central to the legibility problem."
                    }
                ]
            },
            {
                group_name: "Researcher Analysis",
                description: "Your interpretive work. This is where the analysis lives.",
                fields: [
                    { field_id: "analysis_memo", label: "Analytic Memo", type: "free_text_rich", required: false, prominent: true,
                        help_text: "What surprised you? What contradictions do you notice? How does this connect to other sources?"
                    },
                    { field_id: "analysis_key_quotes", label: "Key Quotes", type: "free_text_rich", required: false,
                        help_text: "Direct quotes with page numbers you may want to use in the dissertation."
                    },
                    { field_id: "analysis_quality_notes", label: "Source Quality Notes", type: "free_text", required: false }
                ]
            },
            {
                group_name: "Review Status",
                description: "Extraction progress tracking",
                fields: [
                    { field_id: "status_extraction", label: "Status", type: "coded_single", required: true, default: "Not Started",
                        options: ["Not Started","In Progress","Complete","Needs Revisit"]
                    },
                    { field_id: "status_date", label: "Date Extracted", type: "date", required: false },
                    { field_id: "status_notes", label: "Notes", type: "free_text", required: false }
                ]
            }
        ],

        // Fields that can be used for filtering in the sidebar
        filterable_fields: ["meta_discipline", "meta_literature_type", "meta_country", "analytical_three_problems", "analytical_hierarchy_position", "analytical_epistemic_framework", "status_extraction"]
    }
};
