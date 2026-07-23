// lib/utils/slugify.ts

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a random string
 */
export function generateUniqueSlug(text: string): string {
  const base = slugify(text)
  const random = Math.random().toString(36).substring(2, 8)
  return `${base}-${random}`
}

/**
 * Check if a slug is valid (only letters, numbers, and hyphens)
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/**
 * Convert a slug back to a readable title
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Truncate a slug to a maximum length
 */
export function truncateSlug(slug: string, maxLength: number = 50): string {
  if (slug.length <= maxLength) return slug
  return slug.substring(0, maxLength).replace(/-+$/, '')
}