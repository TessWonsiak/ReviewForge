/*
    schemas.js — Public Example Schemas for ReviewForge
    ====================================================
    
    This file contains example schemas that ship with ReviewForge.
    They demonstrate how the schema-driven architecture works.
    
    To add your own schemas, create a file called schemas-private.js
    in the same folder. It won't be pushed to GitHub. See the README
    for instructions.
*/

const SCHEMAS = {

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
    }
};
