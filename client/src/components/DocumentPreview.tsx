import { type DocumentSection, type LayoutType } from "@shared/schema";

interface DocumentPreviewProps {
  title: string;
  layout: LayoutType;
  sections: DocumentSection[];
}

export function DocumentPreview({ title, layout, sections }: DocumentPreviewProps) {
  return (
    <div className="w-full h-full overflow-auto bg-background p-8 print:overflow-visible print:p-0 print:bg-white print:h-auto">
      <div className="mx-auto print:mx-0 print:h-auto">
        <div 
          className="bg-white shadow-lg print:shadow-none page-container"
          style={{
            width: '8.5in',
            padding: '0.6in 0.75in',
            minHeight: '11in',
          }}
          data-testid="document-preview"
        >
          {/* Document Header */}
          <div 
            className="text-center mb-7 pb-4 border-b border-[#d4af37] print-header"
            style={{ pageBreakAfter: 'avoid' }}
          >
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
          <div 
            className="print-content"
            style={layout === "double" ? {
              columnCount: 2,
              columnGap: '0.5in',
              columnFill: 'balance',
            } : {}}
          >
            {sections.length === 0 ? (
              <div className="text-center text-muted-foreground py-16">
                <p className="font-sans text-sm">No sections yet. Add a section to begin.</p>
              </div>
            ) : (
              sections.map((section) => (
                <div 
                  key={section.id} 
                  data-testid={`preview-section-${section.id}`}
                  style={{ pageBreakInside: 'avoid' }}
                  className="section-content"
                >
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
                            pageBreakAfter: 'avoid',
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
        
        {/* Styling for page breaks and printing */}
        <style>{`
          @media screen {
            .page-container {
              box-shadow: 0 0 0.5in -0.25in rgba(0,0,0,0.2);
            }
            
            /* Column layout styling for preview */
            .print-content {
              width: 100%;
            }
          }
          
          @media print {
            /* Preserve colors in print */
            * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .page-container {
              box-shadow: none !important;
              min-height: 0 !important;
              width: 100% !important;
              position: static !important;
              padding: 0 !important;
            }
            
            /* Column layout in print */
            .print-content {
              width: 100%;
              column-fill: auto !important;
            }
            
            /* Ensure content flows across pages */
            .section-content {
              page-break-inside: avoid;
              break-inside: avoid;
              -webkit-column-break-inside: avoid;
            }
            
            /* Remove any height/overflow constraints */
            html, body {
              height: auto !important;
              overflow: visible !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
