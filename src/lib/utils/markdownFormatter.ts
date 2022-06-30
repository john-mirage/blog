import { unified } from "unified";
import markdownParser from "remark-parse";
import markdownToHtml from "remark-rehype";
import htmlSanitizer, { defaultSchema } from "rehype-sanitize";
import htmlSerializer from "rehype-stringify";

/**
 * Get HTML content from Markdown content.
 *
 * @param {string} markdownContent - The Markdown content.
 * @returns {Promise<string>} The HTML content.
 */
export async function getHtmlFromMarkdown(
  markdownContent: string
): Promise<string> {
  const htmlContent = await unified()
    .use(markdownParser)
    .use(markdownToHtml)
    .use(htmlSanitizer, defaultSchema)
    .use(htmlSerializer)
    .process(markdownContent);
  return String(htmlContent);
}
