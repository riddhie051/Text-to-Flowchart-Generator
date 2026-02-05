"use client";

import { useState, useEffect } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const [text, setText] = useState("");
  const [diagram, setDiagram] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "default" });
  }, []);

  // -------- TEMPLATE SUGGESTION --------

  const detectTemplate = (input) => {
    const t = input.toLowerCase();
    if (t.includes("login")) return "login";
    if (t.includes("payment")) return "payment";
    if (t.includes("signup") || t.includes("register")) return "signup";
    if (t.includes("order") || t.includes("cart")) return "order";
    return "";
  };

  const templates = {
    login: `User opens login page
User enters credentials
If credentials valid
Go to dashboard
Else show error`,

    payment: `User selects product
User proceeds to payment
If payment successful
Order confirmed
Else retry payment`,

    signup: `User opens signup page
User enters details
If details valid
Account created
Else show error`,

    order: `Customer adds item to cart
Customer proceeds to checkout
If payment successful
Order placed
Else payment failed`,
  };

  // -------- DRAG & DROP --------

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      readFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      readFile(e.target.files[0]);
    }
  };

  const readFile = (file) => {
    if (!file.name.endsWith(".txt")) {
      setError("Only .txt files are supported");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setText(content);
      setSuggestion(detectTemplate(content));
    };
    reader.readAsText(file);
  };

  // -------- GENERATE --------

  const generateDiagram = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setDiagram("");

    try {
      const res = await fetch("http://127.0.0.1:8000/generate-diagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          diagram_type: "",
        }),
      });

      const data = await res.json();
      setDiagram(data.mermaid_code);

      setTimeout(() => {
        mermaid.run();
      }, 100);
    } catch (e) {
      setError("Failed to generate diagram.");
    } finally {
      setLoading(false);
    }
  };

  // -------- EXPORT --------

  const exportSVG = () => {
    const svg = document.querySelector("#diagram-container svg");
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPNG = async () => {
    const canvas = await html2canvas(
      document.getElementById("diagram-container")
    );
    const link = document.createElement("a");
    link.download = "diagram.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(
      document.getElementById("diagram-container")
    );
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save("diagram.pdf");
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Text → Diagram Generator</h1>

      {/* Drag & Drop */}
      <div
        className={`border-2 border-dashed rounded p-6 mb-4 text-center cursor-pointer ${
          dragActive ? "border-blue-400 bg-gray-800" : "border-gray-500"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleFileInput}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload">
          Drag & drop .txt file or click to upload
        </label>
      </div>

      {/* Textarea */}
      <textarea
        className="border p-2 w-full h-32 bg-white text-black"
        value={text}
        placeholder="Enter process..."
        onChange={(e) => {
          const val = e.target.value;
          setText(val);
          setSuggestion(detectTemplate(val));
        }}
      />

      {/* Template Suggestion */}
      {suggestion && (
        <div className="mt-2 bg-gray-800 p-3 rounded">
          Suggested template: <b>{suggestion.toUpperCase()}</b>
          <button
            onClick={() => setText(templates[suggestion])}
            className="ml-3 bg-blue-600 px-2 py-1 rounded"
          >
            Use Template
          </button>
        </div>
      )}

      <button
        onClick={generateDiagram}
        className="bg-blue-500 text-white px-4 py-2 mt-3"
      >
        Generate Diagram
      </button>

      {loading && <p className="mt-2">Generating...</p>}
      {error && <p className="mt-2 text-red-400">{error}</p>}

      {diagram && (
        <>
          <div
            id="diagram-container"
            className="bg-white text-black p-4 mt-4 rounded"
          >
            <div className="mermaid">{diagram}</div>
          </div>

          <div className="mt-3 flex gap-3">
            <button onClick={exportSVG}>SVG</button>
            <button onClick={exportPNG}>PNG</button>
            <button onClick={exportPDF}>PDF</button>
          </div>
        </>
      )}
    </div>
  );
}
