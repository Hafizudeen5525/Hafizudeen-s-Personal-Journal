import React, { useMemo } from 'react';
import katex from 'katex';

interface MathProps {
  math: string;
  className?: string;
}

/**
 * Renders an inline math formula ($ ... $)
 */
export const InlineMath: React.FC<MathProps> = ({ math, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: false,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (e) {
      return math;
    }
  }, [math]);

  return (
    <span
      className={`inline-math font-mono text-[0.95em] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Renders a block display math equation ($$ ... $$)
 */
export const BlockMath: React.FC<MathProps> = ({ math, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: true,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (e) {
      return math;
    }
  }, [math]);

  return (
    <div
      className={`block-math my-6 py-4 px-6 bg-zinc-950 text-zinc-100 rounded-lg overflow-x-auto text-center border border-zinc-800 shadow-xs ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Parses inline math ($...$) in regular prose text
 */
export const ParseInlineMath: React.FC<{ text: string }> = ({ text }) => {
  const parts = useMemo(() => {
    // Regex splits on $...$, keeping delimiters
    const regex = /(\$[^$]+\$)/g;
    return text.split(regex);
  }, [text]);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const rawMath = part.slice(1, -1);
          return <InlineMath key={i} math={rawMath} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

/**
 * Formats full markdown-like paragraphs with headers, quotes, lists, and inline/block LaTeX math
 */
export const FormattedArticleContent: React.FC<{ content: string }> = ({ content }) => {
  const paragraphs = useMemo(() => content.split('\n\n'), [content]);

  return (
    <div className="space-y-6 text-base leading-relaxed text-zinc-800 font-sans">
      {paragraphs.map((p, idx) => {
        const trimmed = p.trim();

        // Block display math: $$ ... $$
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
          const math = trimmed.slice(2, -2).trim();
          return <BlockMath key={idx} math={math} />;
        }

        // Section header: ### Header
        if (trimmed.startsWith('### ')) {
          const title = trimmed.replace(/^###\s*/, '');
          return (
            <h3 key={idx} className="text-xl sm:text-2xl font-bold text-zinc-950 pt-6 pb-1 tracking-tight">
              <ParseInlineMath text={title} />
            </h3>
          );
        }

        // Blockquote: > Quote
        if (trimmed.startsWith('>')) {
          const quote = trimmed.replace(/^>\s*/, '').replace(/^"|"$/g, '');
          return (
            <blockquote
              key={idx}
              className="my-8 py-4 px-6 bg-zinc-100/80 border-l-3 border-zinc-950 text-zinc-800 italic text-lg leading-relaxed rounded-r-md"
            >
              "<ParseInlineMath text={quote} />"
            </blockquote>
          );
        }

        // Bullet lists: - item 1\n- item 2
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const lines = trimmed.split('\n');
          return (
            <ul key={idx} className="list-disc list-inside space-y-2 pl-2">
              {lines.map((line, lIdx) => {
                const item = line.replace(/^[-*]\s*/, '');
                return (
                  <li key={lIdx} className="leading-relaxed text-zinc-800">
                    <ParseInlineMath text={item} />
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered lists: 1. item\n2. item
        if (/^\d+\.\s/.test(trimmed)) {
          const lines = trimmed.split('\n');
          return (
            <ol key={idx} className="list-decimal list-inside space-y-2 pl-2">
              {lines.map((line, lIdx) => {
                const item = line.replace(/^\d+\.\s*/, '');
                return (
                  <li key={lIdx} className="leading-relaxed text-zinc-800">
                    <ParseInlineMath text={item} />
                  </li>
                );
              })}
            </ol>
          );
        }

        // Standard paragraph with possible inline math ($...$)
        return (
          <p key={idx} className="leading-relaxed">
            <ParseInlineMath text={trimmed} />
          </p>
        );
      })}
    </div>
  );
};
