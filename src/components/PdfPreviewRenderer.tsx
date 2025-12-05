// components/PdfPreviewRenderer.tsx (FINAL FIXED VERSION)
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, ZoomIn, ZoomOut, RotateCcw, AlertCircle } from "lucide-react";

interface PdfPreviewRendererProps {
  pdfData: string;
  templateId: string;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function PdfPreviewRenderer({
  pdfData,
  templateId,
  onLoadingChange,
  onError,
}: PdfPreviewRendererProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(0.8);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // ✅ CRITICAL: Refs for render management
  const renderTaskRef = useRef<any>(null);
  const isRenderingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const addDebugInfo = (info: string) => {
    console.log(`[DEBUG] ${info}`);
    setDebugInfo((prev) => [
      ...prev.slice(-10),
      `[${new Date().toLocaleTimeString()}] ${info}`,
    ]);
  };

  // Load PDF.js on component mount
  useEffect(() => {
    addDebugInfo("Component mounted, loading PDF.js");
    loadPdfJs();
  }, []);

  // ✅ FIXED: Cleanup on unmount
  useEffect(() => {
    return () => {
      addDebugInfo("Component unmounting - cleaning up");
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {}
        renderTaskRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      isRenderingRef.current = false;
    };
  }, []);

  // ✅ FIXED: Simple callback ref - NO RENDER TRIGGER
  const canvasCallbackRef = useCallback((el: HTMLCanvasElement | null) => {
    canvasRef.current = el;
    if (el) {
      addDebugInfo("Canvas mounted in DOM");
    } else {
      addDebugInfo("Canvas unmounted from DOM");
    }
  }, []);

  // ✅ FIXED: Single render trigger
  useEffect(() => {
    addDebugInfo(
      `Render check - pdfData: ${!!pdfData}, pdfjsLoaded: ${pdfjsLoaded}, canvas: ${!!canvasRef.current}`
    );

    if (pdfData && pdfjsLoaded && canvasRef.current) {
      addDebugInfo("All requirements met - triggering render");
      renderPdf();
    }
  }, [pdfData, pdfjsLoaded, scale]);

  const loadPdfJs = async () => {
    if (window.pdfjsLib) {
      addDebugInfo("PDF.js already loaded");
      setPdfjsLoaded(true);
      return;
    }

    try {
      addDebugInfo("Loading PDF.js from CDN...");

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";

      script.onload = () => {
        addDebugInfo("PDF.js loaded successfully");
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        setPdfjsLoaded(true);
      };

      script.onerror = () => {
        addDebugInfo("Failed to load PDF.js script");
        setError("Failed to load PDF viewer library");
      };

      document.head.appendChild(script);
    } catch (err) {
      addDebugInfo(`Error loading PDF.js: ${err}`);
      setError("Failed to initialize PDF viewer");
    }
  };

  // ✅ FIXED: Safe render function with concurrency control
  const renderPdf = useCallback(async () => {
    const canvas = canvasRef.current;

    // ✅ HARD GUARDS
    if (!canvas) {
      addDebugInfo("Render aborted - canvas is null");
      return;
    }

    if (!pdfData) {
      addDebugInfo("Render aborted - no PDF data");
      return;
    }

    if (!window.pdfjsLib) {
      addDebugInfo("Render aborted - PDF.js not loaded");
      return;
    }

    // ✅ Prevent concurrent renders
    if (isRenderingRef.current) {
      addDebugInfo("Render skipped - already rendering");
      return;
    }

    // ✅ Set rendering state
    isRenderingRef.current = true;
    setIsLoading(true);
    setError(null);
    onLoadingChange?.(true);

    // ✅ Create abort controller for cleanup
    abortControllerRef.current = new AbortController();

    try {
      addDebugInfo("Starting safe PDF render...");

      // ✅ Cancel any previous render task
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
          addDebugInfo("Cancelled previous render task");
        } catch (e) {
          addDebugInfo(
            "Previous task cancellation failed (likely already completed)"
          );
        }
        renderTaskRef.current = null;
      }

      // Check if we should abort
      if (abortControllerRef.current.signal.aborted) {
        addDebugInfo("Render aborted by signal");
        return;
      }

      // ✅ Convert base64 to Uint8Array
      const cleanBase64 = pdfData.replace(/\s/g, "");
      const binaryString = atob(cleanBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      addDebugInfo(`PDF bytes: ${bytes.length}, loading document...`);

      // ✅ Load PDF document
      const pdf = await window.pdfjsLib.getDocument({ data: bytes }).promise;

      if (abortControllerRef.current.signal.aborted) {
        addDebugInfo("Render aborted after PDF load");
        return;
      }

      addDebugInfo(`PDF loaded - ${pdf.numPages} pages`);

      // ✅ Render the first page
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale });

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Could not get canvas 2D context");
      }

      // ✅ Set canvas dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.style.height = `${viewport.height}px`;
      canvas.style.width = `${viewport.width}px`;

      addDebugInfo(
        `Rendering at scale ${scale}, size: ${viewport.width}x${viewport.height}`
      );

      // ✅ Create render task
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      // ✅ Wait for render to complete
      await renderTask.promise;

      if (abortControllerRef.current.signal.aborted) {
        addDebugInfo("Render aborted after completion");
        return;
      }

      addDebugInfo("PDF rendered successfully!");
    } catch (err) {
      // Don't show error if it was an abort
      if (abortControllerRef.current?.signal.aborted) {
        addDebugInfo("Render cancelled gracefully");
        return;
      }

      const errorMsg =
        err instanceof Error ? err.message : "Unknown rendering error";
      addDebugInfo(`RENDER FAILED: ${errorMsg}`);
      setError(`Failed to render PDF: ${errorMsg}`);
      onError?.(errorMsg);
    } finally {
      // ✅ Cleanup
      renderTaskRef.current = null;
      isRenderingRef.current = false;
      setIsLoading(false);
      onLoadingChange?.(false);
      abortControllerRef.current = null;
    }
  }, [pdfData, scale, onLoadingChange, onError]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setScale(0.8);

  const handleRetry = () => {
    addDebugInfo("Manual retry triggered");
    setError(null);
    renderPdf();
  };

  const handleDebugCopy = () => {
    const debugText = debugInfo.join("\n");
    navigator.clipboard.writeText(debugText);
    addDebugInfo("Debug info copied to clipboard");
  };

  // Show loading state while PDF.js is loading
  if (!pdfjsLoaded && !error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-600 bg-gray-50 rounded-lg p-4">
        <Loader2 className="w-8 h-8 mb-2 animate-spin" />
        <p className="text-sm text-center font-medium">Loading PDF viewer...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 rounded-lg p-4">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="text-sm text-center font-medium mb-2">{error}</p>
        <p className="text-xs text-red-500 text-center mb-4">
          PDF Data: {pdfData ? `${pdfData.length} chars` : "None"}
        </p>

        {/* Debug Info */}
        <div className="w-full max-w-md bg-red-100 border border-red-200 rounded p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-red-800">
              Debug Info:
            </span>
            <button
              onClick={handleDebugCopy}
              className="text-xs bg-red-200 hover:bg-red-300 px-2 py-1 rounded"
            >
              Copy Logs
            </button>
          </div>
          <div className="max-h-20 overflow-y-auto text-xs text-red-700 font-mono">
            {debugInfo.slice(-5).map((info, index) => (
              <div key={index} className="truncate">
                {info}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Retry Rendering
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white">
      {/* Controls */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <span className="text-sm text-gray-600 font-medium">
          {templateId} Template
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5 || isLoading}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>

          <span className="text-xs text-gray-600 mx-2 min-w-[40px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 2 || isLoading}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>

          <button
            onClick={resetZoom}
            disabled={isLoading}
            className="p-1 rounded hover:bg-gray-200 ml-1"
            title="Reset Zoom"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* PDF Canvas Area - ALWAYS RENDER CANVAS */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4 flex items-center justify-center min-h-[400px] relative">
        {/* Canvas container (always mounted) */}
        <div className="bg-white shadow-sm border rounded max-w-full max-h-full overflow-auto">
          <canvas
            ref={canvasCallbackRef}
            className="max-w-full max-h-full block"
          />
        </div>

        {/* Loader overlay while rendering */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm">Rendering PDF preview...</span>
              <div className="text-xs text-gray-400 max-w-xs text-center">
                {debugInfo.slice(-1)[0]}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
