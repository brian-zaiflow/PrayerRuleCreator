import { type DocumentSection } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GripVertical, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SectionEditorProps {
  section: DocumentSection;
  onUpdate: (id: string, updates: Partial<DocumentSection>) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetId: string) => void;
}

export function SectionEditor({
  section,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: SectionEditorProps) {
  if (section.type === 'divider') {
    return (
      <Card
        draggable
        onDragStart={(e) => onDragStart(e, section.id)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, section.id)}
        className="group p-4 cursor-move hover-elevate"
        data-testid={`section-${section.id}`}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1 text-center">
            <span className="text-primary text-lg">✦</span>
            <span className="ml-3 text-sm text-muted-foreground">Decorative Divider</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(section.id)}
            data-testid={`button-delete-${section.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, section.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, section.id)}
      className="group p-4 cursor-move hover-elevate"
      data-testid={`section-${section.id}`}
    >
      <div className="flex gap-3">
        <GripVertical className="w-4 h-4 text-muted-foreground mt-2 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Input
            placeholder="Section Title"
            value={section.title || ''}
            onChange={(e) => onUpdate(section.id, { title: e.target.value })}
            className="font-serif text-base"
            data-testid={`input-section-title-${section.id}`}
          />
          <Textarea
            placeholder="Section content..."
            value={section.content || ''}
            onChange={(e) => onUpdate(section.id, { content: e.target.value })}
            className="font-sans text-sm min-h-[100px] resize-y"
            data-testid={`textarea-section-content-${section.id}`}
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete(section.id)}
          data-testid={`button-delete-${section.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
