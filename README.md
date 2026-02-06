# Text to Diagram Generator

A full-stack, open-source web application that converts natural language descriptions into visual diagrams such as flowcharts, sequence diagrams, and mind maps.  
The project is designed to be lightweight, explainable, and fully compliant with open-source requirements.

---

## Project Overview

This application allows users to describe a process in plain English or upload a text file.  
The system analyzes the input, generates a structured diagram, previews it in real time, and allows exporting the diagram in multiple formats.

The project focuses on:
- Explainable AI logic
- No paid APIs or proprietary services
- Clear separation of frontend, backend, and AI processing layers

---

## Features and Requirement Mapping

### What You'll Build

- Text input for diagram description  
- AI-powered diagram generation from natural language  
- Support for flowcharts, sequence diagrams, and mind maps  
- Editable diagram output (edit text and regenerate)  
- Multiple export formats (PNG, SVG, PDF)  
- Template suggestions based on input context  

---

### User Experience

- Drag-and-drop file upload (.txt)
- Real-time processing progress indicator
- Live preview before downloading
- Download processed output
- Rate limited to 5 free uses per day per IP
- Mobile-responsive design

---

## Architecture Overview

User Input (Text / File)  
↓  
Frontend (Next.js)  
↓  
Backend API (FastAPI)  
↓  
AI Processing (Rule-based NLP)  
↓  
Mermaid Diagram Code  
↓  
Rendered Diagram and Export

## Application Screenshots
1. App Interface
<img width="100%" alt="App Interface" src="https://github.com/user-attachments/assets/58c9c7d0-e77c-47c7-92d0-40a43e2f757c" />

User interface showing text input, template suggestion, and real-time diagram generation preview.

2. Generated Flowchart
<img width="100%" alt="Generated Flowchart" src="https://github.com/user-attachments/assets/547a615f-bd9b-4702-ac10-44c23deab286" />

Automatically generated flowchart from natural language input demonstrating decision-based process visualization.

3. PDF Export
<img width="100%" alt="PDF Export" src="https://github.com/user-attachments/assets/88b2ab7c-03a8-4d70-86d6-facd944ed403" />

Diagram exported in PDF format preserving structure and layout for print-ready documentation.

4. PNG Export
<img width="100%" alt="PNG Export" src="https://github.com/user-attachments/assets/b4301b93-b5ed-456d-b964-3094cfe75c8f" />

High-quality PNG image export of the generated diagram for easy sharing and presentation.

5. SVG Export
<img width="100%" alt="SVG Export" src="https://github.com/user-attachments/assets/333b6ea5-f8c0-4c74-8f76-e577e30310db" />

Scalable Vector Graphics (SVG) export ensuring resolution-independent and editable diagram output.


## AI Processing Approach

The system uses a lightweight, rule-based Natural Language Processing (NLP) pipeline to convert text into diagrams.

### Techniques Used
- Sentence segmentation using regular expressions
- Keyword-based intent detection (e.g., if / else)
- Dynamic node and edge generation
- Deterministic and explainable logic

### Why Rule-Based NLP?

- Fully open-source and free
- No dependency on paid APIs or proprietary models
- Fast and suitable for real-time usage
- Transparent and easy to debug
- Architecture is extensible to future LLM-based models

---

## Research on Open-Source Tools

During development, several open-source tools and approaches were explored conceptually:

- **next-ai-draw-io**: Natural language to diagram using draw.io. Not used due to heavier editor dependency.
- **dataflow**: Diagram-as-code approach. Conceptually aligned with our Mermaid-based solution.
- **RAG-Anything**: Multimodal RAG pipeline. Out of scope for a lightweight text-only tool.
- **Dolphin**: Document parsing for diagrams. A lightweight version is implemented using .txt uploads.
- **Lingbot**: Text-to-visual research tool. Helped inform design decisions.

The final implementation uses Mermaid.js with custom NLP logic to ensure simplicity, explainability, and full open-source compliance.

---

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Mermaid.js
- html2canvas
- jsPDF

### Backend
- FastAPI (Python)
- Rate limiting middleware
- Custom NLP logic

### AI / NLP
- Regex-based sentence segmentation
- Keyword-driven decision extraction
- Diagram-as-code generation

---

## Running the Project Locally

### Backend

cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload  

### Frontend

cd frontend  
npm install  
npm run dev  

Open in browser:  
http://localhost:3000

---

## API Endpoint

POST /generate-diagram

Request body:
{
  "text": "User logs in, if valid go to dashboard else show error",
  "diagram_type": ""
}

Response:
{
  "diagram_type": "flowchart",
  "mermaid_code": "flowchart TD ..."
}

---

## Export Formats

- SVG (vector format)
- PNG (image format)
- PDF (print-ready)

---

## Mobile Responsiveness

The application has been tested using:
- Browser developer tools (mobile emulation)
- Real mobile devices on the same network

The layout adapts correctly across screen sizes.

---

## Future Improvements

- LLM-based parsing (Flan-T5 / LLaMA)
- Drag-and-edit diagram nodes
- PDF and DOC file parsing
- Advanced sequence and mind map generation
- Intelligent template learning

---

## Deliverables

- Frontend page with file upload and preview
- Backend API for AI processing
- Downloadable diagram output
- Mobile-responsive design

---

## Conclusion

This project demonstrates a complete text-to-diagram generation pipeline using fully open-source technologies.  
It balances simplicity, explainability, and extensibility while fulfilling all assignment requirements.
