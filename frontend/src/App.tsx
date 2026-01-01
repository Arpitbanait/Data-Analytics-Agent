import { useState } from "react";
import { generateSlides } from "./api";
import SlideRenderer from "./components/SlideRenderer";
import { Sparkles, Loader, Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react";
import "./App.css";

export default function App() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("Artificial Intelligence");
  const [audience, setAudience] = useState("Business executives");
  const [uploadMode, setUploadMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileProcessed, setFileProcessed] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");
  const [exporting, setExporting] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await generateSlides({
        topic,
        audience,
        tone: "visionary",
      });
      setSlides(data.slides);
    } catch (error) {
      console.error("Failed to generate slides:", error);
      alert("Error generating slides. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file");
      return;
    }

    setUploadedFile(file);
  }

  async function handleGenerateFromFile() {
    if (!uploadedFile) {
      alert("Please select a file first");
      return;
    }

    setUploadLoading(true);
    setProcessingStatus("Processing file and creating embeddings...");
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("topic", topic);

      console.log("Uploading file with RAG:", uploadedFile.name);
      setProcessingStatus("Extracting text from file...");
      
      const response = await fetch("http://127.0.0.1:8000/generate-from-file", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.status === "error") {
        alert(`Error: ${data.message}`);
        return;
      }
      
      // Show file processing details
      if (data.file_processed) {
        setProcessingStatus(`✓ File processed: ${data.file_processed.chunks} chunks created with embeddings`);
        setFileProcessed(true);
      }
      
      if (!data.slides || !Array.isArray(data.slides)) {
        console.error("Invalid response format:", data);
        alert("Invalid response format from server");
        return;
      }
      
      console.log(`Setting ${data.slides.length} slides`);
      setSlides(data.slides);
      setUploadMode(false);
      setUploadedFile(null);
    } catch (error) {
      console.error("Failed to generate slides from file:", error);
      alert("Error processing file. Please make sure it's a valid PDF or DOCX file.");
    } finally {
      setUploadLoading(false);
    }
  }

  async function handleExportPptx() {
    if (!slides || slides.length === 0) {
      alert("Generate slides first");
      return;
    }

    try {
      setExporting(true);
      const response = await fetch("http://127.0.0.1:8000/export-pptx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: topic || "Presentation", slides }),
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${topic || "slides"}.pptx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
      alert("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-emerald-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-rose-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Slide Generator</h1>
          </div>
          <p className="text-slate-400 text-sm">AI-Powered Presentation Creator</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Config Panel */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-emerald-900 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Configure Your Presentation</h2>
          
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUploadMode(false)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                !uploadMode
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              Manual Input
            </button>
            <button
              onClick={() => setUploadMode(true)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                uploadMode
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              Upload File
            </button>
          </div>

          {/* Manual Input Mode */}
          {!uploadMode && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter presentation topic"
                    className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>

                {/* Audience Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Audience
                  </label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="Target audience"
                    className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
              </div>
              
              <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-lg p-4 mb-8">
                <p className="text-emerald-200 text-sm">
                  ℹ️ All presentations will contain exactly 10 slides covering: Title, Overview, Problem, Background, Concepts, Process, Applications, Benefits, Challenges, and Conclusion.
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating 10 Slides...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Slides
                  </>
                )}
              </button>
            </>
          )}

          {/* File Upload Mode */}
          {uploadMode && (
            <>
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  Upload PDF or DOCX File (RAG Context)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="px-6 py-12 border-2 border-dashed border-emerald-700 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 transition flex flex-col items-center justify-center gap-3">
                    <Upload className="w-8 h-8 text-emerald-300" />
                    <div className="text-center">
                      <p className="text-white font-semibold">
                        {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                      </p>
                      {!uploadedFile && (
                        <p className="text-slate-400 text-sm">PDF or DOCX files supported</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic Input for File Mode */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Presentation Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter presentation topic (will be extracted from file if not specified)"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              {/* Audience Input for File Mode */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g., Business executives, Technical team, Students"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              {/* RAG Status */}
              {fileProcessed && (
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 mb-8 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div className="text-green-300 text-sm">
                    <p className="font-semibold">{processingStatus}</p>
                  </div>
                </div>
              )}

              {uploadLoading && (
                <div className="bg-emerald-900/25 border border-emerald-700/40 rounded-lg p-4 mb-8 flex items-center gap-3">
                  <Loader className="w-5 h-5 text-emerald-300 animate-spin" />
                  <div className="text-emerald-200 text-sm">
                    <p className="font-semibold">{processingStatus}</p>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-lg p-4 mb-8">
                <p className="text-emerald-200 text-sm">
                  💡 RAG Pipeline: Upload a PDF/DOCX to extract text, create embeddings, and generate topic-specific slides using your document as reference context.
                </p>
              </div>

              <button
                onClick={handleGenerateFromFile}
                disabled={uploadLoading || !uploadedFile}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                {uploadLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing File with RAG...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate from File (RAG)
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Slides Display */}
        {slides && slides.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">Your Presentation</h2>
                <span className="text-slate-400">
                  {slides.length} slide{slides.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportPptx}
                  disabled={exporting}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center gap-2"
                >
                  {exporting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Export PPTX
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {slides.map((slide, i) => (
                <div key={i} className="animate-slideIn">
                  <SlideRenderer slide={slide} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!slides || slides.length === 0) && !loading && (
          <div className="text-center py-16">
            <div className="p-4 bg-slate-700/30 rounded-full w-fit mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              Create Your First Presentation
            </h3>
            <p className="text-slate-400">
              Configure your preferences above and click "Generate Slides" to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

