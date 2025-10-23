import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type Document } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, FileText, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DocumentList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ['/api/documents'],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/documents/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Document deleted",
        description: "The document has been deleted successfully.",
      });
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteClick = (id: string) => {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (documentToDelete) {
      deleteMutation.mutate(documentToDelete);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const generateThumbnailText = (doc: Document) => {
    const textSections = doc.sections.filter(s => s.type === 'section');
    if (textSections.length === 0) return 'No content yet';
    
    const firstSection = textSections[0];
    const preview = firstSection.content?.slice(0, 150) || firstSection.title || '';
    return preview.length > 150 ? preview.slice(0, 150) + '...' : preview;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <header className="border-b bg-card px-6 py-4">
          <h1 className="text-2xl font-serif font-medium" style={{ color: '#1a1a1a' }}>
            Orthodox Prayer Rule Creator
          </h1>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#d4af37', borderTopColor: 'transparent' }}></div>
            <p className="text-sm text-muted-foreground">Loading documents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-serif font-medium" style={{ color: '#1a1a1a' }}>
            Orthodox Prayer Rule Creator
          </h1>
          <Button
            onClick={() => setLocation('/edit')}
            className="gap-2"
            style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
            data-testid="button-new-document"
          >
            <Plus className="w-4 h-4" />
            New Document
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {!documents || documents.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: '#d4af37' }} />
              <h2 className="text-xl font-serif mb-2 text-foreground">No prayer rules yet</h2>
              <p className="text-muted-foreground mb-6">Create your first Orthodox prayer rule to get started</p>
              <Button
                onClick={() => setLocation('/edit')}
                className="gap-2"
                style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                data-testid="button-create-first"
              >
                <Plus className="w-4 h-4" />
                Create Your First Prayer Rule
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <Card key={doc.id} className="hover-elevate" data-testid={`card-document-${doc.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        className="font-serif font-medium text-lg line-clamp-2 flex-1"
                        style={{ color: '#1a1a1a' }}
                        data-testid={`text-title-${doc.id}`}
                      >
                        {doc.title}
                      </h3>
                    </div>
                    <p className="text-xs" style={{ color: '#d4af37' }} data-testid={`text-date-${doc.id}`}>
                      Created {formatDate(doc.createdAt)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="bg-background/50 rounded-md p-3 border min-h-[120px] max-h-[120px] overflow-hidden"
                      data-testid={`preview-${doc.id}`}
                    >
                      <p className="text-xs text-muted-foreground line-clamp-5 font-sans" style={{ lineHeight: '1.6' }}>
                        {generateThumbnailText(doc)}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-2">
                    <Button
                      variant="default"
                      className="flex-1 gap-2"
                      onClick={() => setLocation(`/edit/${doc.id}`)}
                      data-testid={`button-edit-${doc.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteClick(doc.id)}
                      data-testid={`button-delete-${doc.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent data-testid="dialog-delete-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete document?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your prayer rule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover-elevate"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
