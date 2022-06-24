import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  pedantic: false,
  gfm: true,
});

/**
 * Get HTML content from Markdown content.
 *
 * @param {string} markdownContent - The Markdown content.
 * @returns {string} The HTML content.
 */
export function getHtmlFromMarkdown(
  markdownContent: string
): string {
  const html = marked.parse(markdownContent);
  return DOMPurify.sanitize(html);
}