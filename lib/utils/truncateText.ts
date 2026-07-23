// lib/utils/truncateText.ts

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncateText(
  text: string,
  maxLength: number = 100,
  ellipsis: string = '...'
): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + ellipsis
}

/**
 * Truncate text by words (preserves whole words)
 */
export function truncateByWords(
  text: string,
  wordCount: number = 20,
  ellipsis: string = '...'
): string {
  if (!text) return ''
  const words = text.split(/\s+/)
  if (words.length <= wordCount) return text
  return words.slice(0, wordCount).join(' ') + ellipsis
}

/**
 * Truncate text by sentences
 */
export function truncateBySentences(
  text: string,
  sentenceCount: number = 2,
  ellipsis: string = '...'
): string {
  if (!text) return ''
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  if (sentences.length <= sentenceCount) return text
  return sentences.slice(0, sentenceCount).join(' ').trim() + ellipsis
}

/**
 * Get the first paragraph of text
 */
export function getFirstParagraph(text: string): string {
  if (!text) return ''
  const paragraphs = text.split(/\n\s*\n/)
  return paragraphs[0] || text
}

/**
 * Extract plain text from HTML
 */
export function stripHtml(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Get a text preview with preserved formatting
 */
export function getTextPreview(
  text: string,
  maxLength: number = 150,
  preserveWords: boolean = true
): string {
  if (!text) return ''
  const plainText = stripHtml(text)
  if (preserveWords) {
    return truncateByWords(plainText, maxLength / 5)
  }
  return truncateText(plainText, maxLength)
}