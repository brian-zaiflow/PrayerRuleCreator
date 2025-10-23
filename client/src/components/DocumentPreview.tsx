import { type DocumentSection } from "@shared/schema";

interface DocumentPreviewProps {
  title: string;
  sections: DocumentSection[];
}

export function DocumentPreview({ title, sections }: DocumentPreviewProps) {
  return (
    <div className="w-full h-full overflow-auto bg-background p-8 print:overflow-visible print:p-0">
      <div 
        className="mx-auto bg-white shadow-lg print:shadow-none print:mx-0"
        style={{
          width: '8.5in',
          minHeight: '11in',
          padding: '0.6in 0.75in',
        }}
        data-testid="document-preview"
      >
        {/* Document Header */}
        <div className="text-center mb-7 pb-4 border-b border-[#d4af37]">
          <h1 
            className="font-serif font-light uppercase text-foreground mb-1.5"
            style={{
              fontSize: '36px',
              letterSpacing: '3px',
              color: '#1a1a1a',
            }}
            data-testid="preview-title"
          >
            {title || 'Untitled Document'}
          </h1>
        </div>

        {/* Document Content */}
        <div className="flex flex-col">
          {sections.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              <p className="font-sans text-sm">No sections yet. Add a section to begin.</p>
            </div>
          ) : (
            sections.map((section) => (
              <div key={section.id} data-testid={`preview-section-${section.id}`}>
                {section.type === 'divider' ? (
                  <div 
                    className="text-center mb-5"
                    style={{ marginBottom: '20px' }}
                  >
                    <span 
                      className="inline-block opacity-60"
                      style={{ 
                        color: '#d4af37',
                        fontSize: '12px',
                      }}
                    >
                      ✦
                    </span>
                  </div>
                ) : (
                  <div className="mb-6">
                    {section.title && (
                      <h2 
                        className="font-serif font-medium mb-2"
                        style={{
                          fontSize: '17px',
                          letterSpacing: '0.5px',
                          color: '#1a1a1a',
                        }}
                        data-testid={`preview-section-title-${section.id}`}
                      >
                        {section.title}
                      </h2>
                    )}
                    {section.content && (
                      <p 
                        className="font-sans pl-[18px] leading-relaxed whitespace-pre-wrap"
                        style={{
                          fontSize: '12px',
                          color: '#4a4a4a',
                          lineHeight: '1.6',
                        }}
                        data-testid={`preview-section-content-${section.id}`}
                      >
                        {section.content}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
