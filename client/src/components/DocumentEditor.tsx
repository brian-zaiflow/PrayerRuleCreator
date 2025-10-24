import { useState } from "react";
import { type DocumentSection, type LayoutType } from "@shared/schema";
import { type Prayer } from "@shared/prayerLibrary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionEditor } from "./SectionEditor";
import { PrayerBrowser } from "./PrayerBrowser";
import { Plus, Divide, Printer, Save, BookOpen, Columns2, RectangleVertical } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DocumentEditorProps {
  title: string;
  layout: LayoutType;
  sections: DocumentSection[];
  onTitleChange: (title: string) => void;
  onLayoutChange: (layout: LayoutType) => void;
  onSectionsChange: (sections: DocumentSection[]) => void;
  onSave: () => void;
  onPrint: () => void;
  isSaving?: boolean;
}

export function DocumentEditor({
  title,
  layout,
  sections,
  onTitleChange,
  onLayoutChange,
  onSectionsChange,
  onSave,
  onPrint,
  isSaving,
}: DocumentEditorProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [prayerBrowserOpen, setPrayerBrowserOpen] = useState(false);

  const addSection = () => {
    const newSection: DocumentSection = {
      id: crypto.randomUUID(),
      type: 'section',
      title: '',
      content: '',
      order: sections.length,
    };
    onSectionsChange([...sections, newSection]);
  };

  const addDivider = () => {
    const newDivider: DocumentSection = {
      id: crypto.randomUUID(),
      type: 'divider',
      order: sections.length,
    };
    onSectionsChange([...sections, newDivider]);
  };

  const updateSection = (id: string, updates: Partial<DocumentSection>) => {
    onSectionsChange(
      sections.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteSection = (id: string) => {
    const filtered = sections.filter((s) => s.id !== id);
    // Normalize order values after deletion
    const normalized = filtered.map((s, index) => ({ ...s, order: index }));
    onSectionsChange(normalized);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = sections.findIndex((s) => s.id === draggedId);
    const targetIndex = sections.findIndex((s) => s.id === targetId);

    const newSections = [...sections];
    const [removed] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, removed);

    // Update order values
    const reorderedSections = newSections.map((s, index) => ({
      ...s,
      order: index,
    }));

    onSectionsChange(reorderedSections);
    setDraggedId(null);
  };

  const handleImportPrayer = (prayer: Prayer) => {
    const newSection: DocumentSection = {
      id: crypto.randomUUID(),
      type: 'section',
      title: prayer.title,
      content: prayer.content,
      order: sections.length,
    };
    onSectionsChange([...sections, newSection]);
  };

  return (
    <div className="w-full h-full overflow-auto p-6 space-y-4">
      {/* Header */}
      <Card className="p-4">
        <div className="space-y-4">
          <Input
            placeholder="Document Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-xl font-serif"
            data-testid="input-document-title"
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={addSection}
              variant="default"
              size="sm"
              data-testid="button-add-section"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
            <Button
              onClick={() => setPrayerBrowserOpen(true)}
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary"
              data-testid="button-prayer-library"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Prayer Library
            </Button>
            <Button
              onClick={addDivider}
              variant="outline"
              size="sm"
              data-testid="button-add-divider"
            >
              <Divide className="w-4 h-4 mr-2" />
              Add Divider
            </Button>
            <div className="flex-1" />
            <Button
              onClick={() => onLayoutChange(layout === "single" ? "double" : "single")}
              variant="outline"
              size="sm"
              data-testid="button-toggle-layout"
            >
              {layout === "single" ? (
                <>
                  <Columns2 className="w-4 h-4 mr-2" />
                  Double Column
                </>
              ) : (
                <>
                  <RectangleVertical className="w-4 h-4 mr-2" />
                  Single Column
                </>
              )}
            </Button>
            <Button
              onClick={onSave}
              variant="default"
              size="sm"
              disabled={isSaving}
              data-testid="button-save"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={onPrint}
              variant="outline"
              size="sm"
              data-testid="button-print"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </Card>

      {/* Prayer Browser Dialog */}
      <PrayerBrowser
        open={prayerBrowserOpen}
        onOpenChange={setPrayerBrowserOpen}
        onImportPrayer={handleImportPrayer}
      />

      {/* Sections */}
      <div className="space-y-3">
        {sections.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No sections yet. Add a section to begin creating your document.
            </p>
            <Button onClick={addSection} data-testid="button-add-first-section">
              <Plus className="w-4 h-4 mr-2" />
              Add First Section
            </Button>
          </Card>
        ) : (
          sections.map((section) => (
            <SectionEditor
              key={section.id}
              section={section}
              onUpdate={updateSection}
              onDelete={deleteSection}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))
        )}
      </div>
    </div>
  );
}
