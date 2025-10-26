import { useState } from "react";
import { prayerLibrary, prayerCategories, type Prayer, type PrayerCategory } from "@/lib/prayerLibrary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Plus } from "lucide-react";

interface PrayerBrowserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportPrayer: (prayer: Prayer) => void;
}

export function PrayerBrowser({ open, onOpenChange, onImportPrayer }: PrayerBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PrayerCategory | "All">("All");
  const [previewPrayer, setPreviewPrayer] = useState<Prayer | null>(null);

  const filteredPrayers = prayerLibrary.filter(prayer => {
    const matchesSearch = searchQuery === "" || 
      prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || prayer.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleImport = (prayer: Prayer) => {
    onImportPrayer(prayer);
    setPreviewPrayer(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-serif">
              <BookOpen className="w-5 h-5 text-primary" />
              Orthodox Prayer Library
            </DialogTitle>
            <DialogDescription>
              Browse and import classic Orthodox prayers into your prayer rule
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 flex flex-col gap-4 min-h-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search prayers by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-prayers"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as PrayerCategory | "All")} className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full justify-start flex-wrap h-auto">
                <TabsTrigger value="All" data-testid="tab-all">All</TabsTrigger>
                {prayerCategories.map(category => (
                  <TabsTrigger key={category} value={category} data-testid={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={selectedCategory} className="flex-1 mt-4 min-h-0">
                <ScrollArea className="h-full pr-4">
                  {filteredPrayers.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No prayers found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPrayers.map(prayer => (
                        <div
                          key={prayer.id}
                          className="border rounded-md p-4 hover-elevate active-elevate-2 cursor-pointer"
                          onClick={() => setPreviewPrayer(prayer)}
                          data-testid={`prayer-item-${prayer.id}`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-serif font-medium text-base">
                              {prayer.title}
                            </h3>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImport(prayer);
                              }}
                              data-testid={`button-import-${prayer.id}`}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Import
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {prayer.content}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {prayer.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prayer Preview Dialog */}
      <Dialog open={!!previewPrayer} onOpenChange={() => setPreviewPrayer(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          {previewPrayer && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  {previewPrayer.title}
                </DialogTitle>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {previewPrayer.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </DialogHeader>
              
              <ScrollArea className="max-h-[50vh] pr-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {previewPrayer.content}
                </p>
              </ScrollArea>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setPreviewPrayer(null)}>
                  Close
                </Button>
                <Button onClick={() => handleImport(previewPrayer)} data-testid="button-import-preview">
                  <Plus className="w-4 h-4 mr-1" />
                  Import Prayer
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
