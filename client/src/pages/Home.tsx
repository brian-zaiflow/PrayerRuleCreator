import { useState } from "react";
import { type DocumentSection, type LayoutType } from "@/types/schema";
import { DocumentEditor } from "@/components/DocumentEditor";
import { DocumentPreview } from "@/components/DocumentPreview";
import { HelpDialog } from "@/components/HelpDialog";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export default function Home() {
  const [title, setTitle] = useState("My Prayer Rule");
  const [layout, setLayout] = useState<LayoutType>("single");
  const [sections, setSections] = useState<DocumentSection[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen flex flex-col bg-background print:h-auto print:block print:bg-white">
      {/* Top Bar */}
      <header className="border-b bg-card px-6 py-3 print:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-serif font-medium text-foreground">
            Orthodox Prayer Rule Creator
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHelpOpen(true)}
            className="gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </div>
      </header>

      {/* Help Dialog */}
      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden print:overflow-visible print:block print:h-auto">
        <ResizablePanelGroup direction="horizontal" className="h-full print:h-auto">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={33} minSize={25} maxSize={70} className="print:hidden">
            <DocumentEditor
              title={title}
              layout={layout}
              sections={sections}
              onTitleChange={setTitle}
              onLayoutChange={setLayout}
              onSectionsChange={setSections}
              onPrint={handlePrint}
            />
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle className="print:hidden" withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={67} minSize={30} maxSize={75} className="print:w-full print:h-auto">
            <DocumentPreview title={title} layout={layout} sections={sections} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.6in 0.75in;
          }

          /* Ensure all containers can expand to show full content */
          * {
            overflow: visible !important;
          }

          html, body {
            overflow: visible !important;
            height: auto !important;
            width: 100% !important;
            background: white !important;
          }

          /* Remove all height constraints */
          .print\\:h-auto,
          .h-screen,
          .h-full,
          .flex-1 {
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
          }

          .print\\:hidden {
            display: none !important;
          }
          .print\\:w-full {
            width: 100% !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:overflow-visible {
            overflow: visible !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:mx-0 {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}
