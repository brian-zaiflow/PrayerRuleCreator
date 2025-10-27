import React from "react";

interface StyledTextProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Parses and renders text with markdown-like syntax:
 * - **bold** for bold text
 * - *italic* for italic text
 * - {red} for Byzantine red colored text
 * - ___ for blank lines (e.g., for writing names in commemorations)
 */
export function StyledText({ content, className = "", style = {} }: StyledTextProps) {
  const parseText = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    let key = 0;

    // Combined regex to match **bold**, *italic*, {red}, or ___
    // Order matters: match ** before * to avoid conflicts
    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\{([^}]+)\}|(_{3,}))/g;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(
          <React.Fragment key={`text-${key++}`}>
            {text.substring(currentIndex, match.index)}
          </React.Fragment>
        );
      }

      // Determine which pattern matched and render accordingly
      if (match[2]) {
        // **bold** pattern
        parts.push(
          <strong key={`bold-${key++}`} className="font-semibold">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        // *italic* pattern
        parts.push(
          <em key={`italic-${key++}`} className="italic">
            {match[3]}
          </em>
        );
      } else if (match[4]) {
        // {red} pattern
        parts.push(
          <span key={`red-${key++}`} style={{ color: "#B33434" }}>
            {match[4]}
          </span>
        );
      } else if (match[5]) {
        // ___ pattern - blank line for names
        parts.push(
          <span
            key={`blank-${key++}`}
            className="inline-block border-b border-gray-400 min-w-[200px]"
            style={{ marginBottom: '-2px' }}
          >
            &nbsp;
          </span>
        );
      }

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text after the last match
    if (currentIndex < text.length) {
      parts.push(
        <React.Fragment key={`text-${key++}`}>
          {text.substring(currentIndex)}
        </React.Fragment>
      );
    }

    return parts;
  };

  // Split by newlines to preserve line breaks
  const lines = content.split('\n');

  return (
    <span className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={`line-${lineIndex}`}>
          {parseText(line)}
          {lineIndex < lines.length - 1 && '\n'}
        </React.Fragment>
      ))}
    </span>
  );
}
