"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How to Use Prayer Rule Creator</DialogTitle>
          <DialogDescription>
            Create and print personalized Orthodox prayer rules
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <section>
            <h3 className="font-semibold text-base mb-2">Getting Started</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Enter your prayer rule title at the top</li>
              <li>Choose a layout: single column or two columns</li>
              <li>Add sections using the "Add Section" button</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Adding Prayers</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Browse the prayer library by clicking "Browse Prayers"</li>
              <li>Search for prayers by name or filter by type</li>
              <li>Click a prayer to add it to your current section</li>
              <li>Or type/paste custom prayers directly</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Formatting Options</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Bold:</strong> Use **text** or select and use the B button</li>
              <li><strong>Italic:</strong> Use *text* or select and use the I button</li>
              <li><strong>Red text:</strong> Use [[text]] for rubrics or instructions</li>
              <li>Add section headings to organize your prayers</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Printing</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Preview your prayer rule in real-time on the right</li>
              <li>Click "Print" when ready</li>
              <li>Adjust printer settings for best results (margins, paper size)</li>
              <li>The editor panel will be hidden when printing</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Use two-column layout to save paper</li>
              <li>Leave headings empty if you don't need section titles</li>
              <li>Drag the divider to resize editor and preview panels</li>
              <li>Your work is automatically previewed as you type</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
