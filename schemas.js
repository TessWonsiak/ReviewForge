/*
    schemas.js — Public Example Schemas for ReviewForge
    ====================================================
    
    This file contains example schemas that ship with ReviewForge.
    They demonstrate how the schema-driven architecture works.
    
    To add your own private schemas, create a file called
    schemas-private.js in the same folder. It won't be pushed
    to GitHub. See the README for instructions.
*/

const SCHEMAS = {

    // ===== EXAMPLE: SCOPING REVIEW =====
    example_scoping: {
        schema_name: "Example: Scoping Review",
        schema_version: "1.0",
        description: "Sample extraction schema for scoping reviews following Arksey & O'Malley (2005) / JBI methodology.",

        field_groups: [
            {
                group_name: "Citation Details",
                description: "Bibliographic information",
                fields: [
                    { field_id: "authors", label: "Author(s)", type: "free_text", required: true, help_text: "Last name, initials. Multiple authors separated by semicolons." },
                    { field_id: "year", label: "Year", type: "numeric", required: true },
                    { field_id: "title", label: "Title", type: "free_text", required: true },
                    { field_id: "journal", label: "Journal / Source", type: "free_text", required: true },
                    { field_id: "doi", label: "DOI", type: "free_text", required: false },
                    { field_id: "country", label: "Country", type: "free_text", required: false }
                ]
            },
            {
                group_name: "Study Characteristics",
                description: "Design and context",
                fields: [
                    { field_id: "study_design", label: "Study Design", type: "coded_single", required: true,
                        options: ["Qualitative", "Quantitative", "Mixed Methods", "Theoretical", "Review", "Case Study", "Other"],
                        help_text: "Primary methodology used in the study."
                    },
                    { field_id: "population", label: "Population", type: "free_text_rich", required: false, help_text: "Who was studied? Include sample size, demographics, and setting." },
                    { field_id: "context", label: "Context / Setting", type: "free_text_rich", required: false, help_text: "Where and when did the study take place?" }
                ]
            },
            {
                group_name: "Key Findings",
                description: "What the study found",
                fields: [
                    { field_id: "aims", label: "Study Aims", type: "free_text_rich", required: true, help_text: "What was the study trying to find out?" },
                    { field_id: "key_findings", label: "Key Findings", type: "free_text_rich", required: true, help_text: "Main results or conclusions." },
                    { field_id: "implications", label: "Implications", type: "free_text_rich", required: false, help_text: "What do the authors suggest these findings mean for practice, policy, or future research?" }
                ]
            },
            {
                group_name: "Reviewer Notes",
                description: "Your observations",
                fields: [
                    { field_id: "reviewer_notes", label: "Notes", type: "free_text_rich", required: false, prominent: true, help_text: "Your observations, questions, and connections to other sources." },
                    { field_id: "quality_notes", label: "Quality Notes", type: "free_text", required: false, help_text: "Any concerns about methodology, bias, or limitations." }
                ]
            },
            {
                group_name: "Status",
                description: "Extraction tracking",
                fields: [
                    { field_id: "status", label: "Status", type: "coded_single", required: true, default: "Not Started",
                        options: ["Not Started", "In Progress", "Complete", "Needs Revisit"]
                    },
                    { field_id: "date_extracted", label: "Date Extracted", type: "date", required: false }
                ]
            }
        ],

        filterable_fields: ["study_design", "country", "status"]
    },

    // ===== EXAMPLE: RODGERS' CONCEPT ANALYSIS =====
    example_rodgers: {
        schema_name: "Example: Rodgers' Concept Analysis",
        schema_version: "1.0",
        description: "Template for concept analysis using Rodgers' (2000) evolutionary method. Customise the 'Your Analytical Framework' section for your research questions.",
        method_reference: "Rodgers, B.L. (2000). Concept analysis: An evolutionary view. In B.L. Rodgers & K.A. Knafl (Eds.), Concept Development in Nursing (2nd ed., pp. 77-102). Saunders.",

        field_groups: [
            {
                group_name: "Source Metadata",
                description: "Bibliographic and contextual information",
                fields: [
                    { field_id: "meta_authors", label: "Author(s)", type: "free_text", required: true, help_text: "Last name, initials. Multiple authors separated by semicolons." },
                    { field_id: "meta_year", label: "Year", type: "numeric", required: true },
                    { field_id: "meta_title", label: "Title", type: "free_text", required: true },
                    { field_id: "meta_journal", label: "Journal / Source", type: "free_text", required: true },
                    { field_id: "meta_country", label: "Country / Jurisdiction", type: "free_text", required: false },
                    { field_id: "meta_discipline", label: "Author Discipline", type: "coded_single", required: true,
                        options: ["Nursing", "Medicine", "Psychology", "Social Work", "Philosophy / Ethics", "Law", "Public Health", "Interdisciplinary", "Other"]
                    },
                    { field_id: "meta_literature_type", label: "Literature Type", type: "coded_single", required: true,
                        options: ["Empirical (Qualitative)", "Empirical (Quantitative)", "Empirical (Mixed Methods)", "Theoretical / Philosophical", "Clinical / Practice-Oriented", "Review (Systematic / Scoping)", "Policy / Position Statement", "Commentary / Editorial", "Case Report", "Other"]
                    },
                    { field_id: "meta_doi", label: "DOI", type: "free_text", required: false }
                ]
            },
            {
                group_name: "Rodgers' Six Elements",
                description: "Core extraction fields from Rodgers' evolutionary method. Include direct quotes with page numbers.",
                fields: [
                    { field_id: "rodgers_attributes", label: "Attributes", type: "free_text_rich", required: false,
                        help_text: "Defining characteristics of the concept as described in this source. What IS the concept according to this author?"
                    },
                    { field_id: "rodgers_antecedents", label: "Antecedents", type: "free_text_rich", required: false,
                        help_text: "What precedes or gives rise to the concept? What conditions, contexts, or events lead to it?"
                    },
                    { field_id: "rodgers_consequences", label: "Consequences", type: "free_text_rich", required: false,
                        help_text: "What follows from the concept? What outcomes, responses, or effects are described?"
                    },
                    { field_id: "rodgers_surrogate_terms", label: "Surrogate Terms", type: "free_text_rich", required: false,
                        help_text: "Terms used interchangeably with or instead of the concept. Note the term AND the context of use."
                    },
                    { field_id: "rodgers_related_concepts", label: "Related Concepts", type: "free_text_rich", required: false,
                        help_text: "Concepts connected to but distinct from the target concept. Note how the source distinguishes or conflates them."
                    },
                    { field_id: "rodgers_context", label: "Context / References", type: "free_text_rich", required: false,
                        help_text: "Disciplinary, cultural, legal, and temporal context. How does context shape the construction of the concept here?"
                    }
                ]
            },
            {
                group_name: "Your Analytical Framework",
                description: "Customise this section for your research questions. These are placeholder fields to demonstrate different types.",
                fields: [
                    { field_id: "custom_theme", label: "Primary Theme", type: "coded_single", required: false,
                        options: ["Theme A", "Theme B", "Theme C", "Multiple", "Other"],
                        help_text: "Replace these with your own themes or analytical categories."
                    },
                    { field_id: "custom_tags", label: "Tags", type: "coded_multi", required: false,
                        options: [
                            { code: "TAG1", label: "Example Tag 1", description: "Replace with your own tag and description." },
                            { code: "TAG2", label: "Example Tag 2", description: "Multi-select fields let you code sources across multiple categories." },
                            { code: "TAG3", label: "Example Tag 3", description: "Great for tracking which research questions each source speaks to." }
                        ],
                        help_text: "Select all that apply. Customise these to match your analytical framework."
                    },
                    { field_id: "custom_flag", label: "Example Flag", type: "boolean", required: false, default: false,
                        help_text: "Boolean fields are useful for flagging sources that do something specific."
                    }
                ]
            },
            {
                group_name: "Researcher Analysis",
                description: "Your interpretive work. This is where the analysis lives.",
                fields: [
                    { field_id: "analysis_memo", label: "Analytic Memo", type: "free_text_rich", required: false, prominent: true,
                        help_text: "Your thinking about this source. What surprised you? What contradictions do you notice? This is your researcher voice."
                    },
                    { field_id: "analysis_key_quotes", label: "Key Quotes", type: "free_text_rich", required: false,
                        help_text: "Direct quotes with page numbers that capture something essential."
                    },
                    { field_id: "analysis_quality_notes", label: "Source Quality Notes", type: "free_text", required: false }
                ]
            },
            {
                group_name: "Status",
                description: "Extraction progress tracking",
                fields: [
                    { field_id: "status", label: "Status", type: "coded_single", required: true, default: "Not Started",
                        options: ["Not Started", "In Progress", "Complete", "Needs Revisit"]
                    },
                    { field_id: "date_extracted", label: "Date Extracted", type: "date", required: false },
                    { field_id: "status_notes", label: "Notes", type: "free_text", required: false }
                ]
            }
        ],

        filterable_fields: ["meta_discipline", "meta_literature_type", "meta_country", "custom_theme", "custom_tags", "status"]
    }
};
