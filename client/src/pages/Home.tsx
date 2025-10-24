import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { type DocumentSection, type Document, type LayoutType } from "@shared/schema";
import { DocumentEditor } from "@/components/DocumentEditor";
import { DocumentPreview } from "@/components/DocumentPreview";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function Home() {
  const { toast } = useToast();
  const [, params] = useRoute("/edit/:id");
  const [, setLocation] = useLocation();
  const documentId = params?.id;
  
  const [title, setTitle] = useState("My Prayer Rule");
  const [layout, setLayout] = useState<LayoutType>("single");
  const [sections, setSections] = useState<DocumentSection[]>([]);
  const [currentDocId, setCurrentDocId] = useState<string | null>(documentId || null);

  // Load existing document if editing
  const { data: document, isLoading } = useQuery<Document>({
    queryKey: ['/api/documents', documentId],
    enabled: !!documentId,
  });

  // Save document mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (currentDocId) {
        return apiRequest('PATCH', `/api/documents/${currentDocId}`, {
          title,
          layout,
          sections,
        });
      } else {
        return apiRequest('POST', '/api/documents', {
          title,
          layout,
          sections,
        });
      }
    },
    onSuccess: (data: any) => {
      if (!currentDocId) {
        setCurrentDocId(data.id);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Document saved",
        description: "Your document has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save document. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Load document data when editing
  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setLayout(document.layout || "single");
      setSections(document.sections);
      setCurrentDocId(document.id);
    }
  }, [document]);

  const handlePrint = () => {
    window.print();
  };

  // Show loading state while fetching initial documents
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <header className="border-b bg-card px-6 py-3 print:hidden">
          <h1 className="text-lg font-serif font-medium text-foreground">
            Document Creator
          </h1>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading document...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background print:h-auto print:block">
      {/* Top Bar */}
      <header className="border-b bg-card px-6 py-3 print:hidden">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/')}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-serif font-medium text-foreground">
            {documentId ? 'Edit Prayer Rule' : 'Create Prayer Rule'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden print:overflow-visible print:block print:h-auto">
        <ResizablePanelGroup direction="horizontal" className="h-full print:h-auto">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={50} minSize={30} maxSize={70} className="print:hidden">
            <DocumentEditor
              title={title}
              layout={layout}
              sections={sections}
              onTitleChange={setTitle}
              onLayoutChange={setLayout}
              onSectionsChange={setSections}
              onSave={() => saveMutation.mutate()}
              onPrint={handlePrint}
              isSaving={saveMutation.isPending}
            />
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle className="print:hidden" withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={50} minSize={30} maxSize={70} className="print:w-full print:h-auto">
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
