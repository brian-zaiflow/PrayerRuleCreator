import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type DocumentSection } from "@shared/schema";
import { DocumentEditor } from "@/components/DocumentEditor";
import { DocumentPreview } from "@/components/DocumentPreview";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [title, setTitle] = useState("Untitled Document");
  const [sections, setSections] = useState<DocumentSection[]>([]);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);

  // Load existing document if available
  const { data: documents, isLoading } = useQuery({
    queryKey: ['/api/documents'],
  });

  // Save document mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (currentDocId) {
        return apiRequest('PATCH', `/api/documents/${currentDocId}`, {
          title,
          sections,
        });
      } else {
        return apiRequest('POST', '/api/documents', {
          title,
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

  // Load first document on mount
  useEffect(() => {
    if (documents && Array.isArray(documents) && documents.length > 0) {
      const doc = documents[0];
      setTitle(doc.title);
      setSections(doc.sections);
      setCurrentDocId(doc.id);
    }
  }, [documents]);

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
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="border-b bg-card px-6 py-3 print:hidden">
        <h1 className="text-lg font-serif font-medium text-foreground">
          Document Creator
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 border-r print:hidden">
          <DocumentEditor
            title={title}
            sections={sections}
            onTitleChange={setTitle}
            onSectionsChange={setSections}
            onSave={() => saveMutation.mutate()}
            onPrint={handlePrint}
            isSaving={saveMutation.isPending}
          />
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 print:w-full">
          <DocumentPreview title={title} sections={sections} />
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0;
          }
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:w-full {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
