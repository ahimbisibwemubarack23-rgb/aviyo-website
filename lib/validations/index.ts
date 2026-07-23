// lib/validations/index.ts
import { z } from 'zod'

// ============ User Validations ============
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2, 'Full name is required'),
  role: z.enum(['super_admin', 'admin', 'editor', 'publisher', 'reviewer']).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// ============ Blog Validations ============
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featured_image: z.string().url('Invalid image URL').optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
})

// ============ Product Validations ============
export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().min(1, 'Description is required'),
  short_description: z.string().optional(),
  images: z.array(z.string().url('Invalid image URL')).default([]),
  price: z.number().positive('Price must be positive').optional(),
  category: z.string().optional(),
  features: z.array(z.string()).default([]),
  nutrition_info: z.record(z.string()).default({}),
  how_to_use: z.string().optional(),
  in_stock: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
})

// ============ Team Member Validations ============
export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().optional(),
  photo: z.string().url('Invalid photo URL').optional(),
  social_links: z.object({
    twitter: z.string().url('Invalid URL').optional(),
    linkedin: z.string().url('Invalid URL').optional(),
    instagram: z.string().url('Invalid URL').optional(),
  }).default({}),
  display_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
})

// ============ FAQ Validations ============
export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  category: z.string().optional(),
  display_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
})

// ============ Testimonial Validations ============
export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  photo: z.string().url('Invalid photo URL').optional(),
  quote: z.string().min(1, 'Testimonial is required'),
  rating: z.number().int().min(1).max(5).default(5),
  is_active: z.boolean().default(true),
})

// ============ Contact Validations ============
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

// ============ Newsletter Validations ============
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// ============ Farmer Registration Validations ============
export const farmerRegistrationSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address').optional(),
  district: z.string().optional(),
  village: z.string().optional(),
  crops: z.array(z.string()).default([]),
  farm_size: z.enum(['small', 'medium', 'large']).optional(),
  experience_years: z.number().int().min(0).optional(),
})

// ============ Form Validation Helpers ============
export type LoginForm = z.infer<typeof loginSchema>
export type BlogPostForm = z.infer<typeof blogPostSchema>
export type ProductForm = z.infer<typeof productSchema>
export type TeamMemberForm = z.infer<typeof teamMemberSchema>
export type FAQForm = z.infer<typeof faqSchema>
export type TestimonialForm = z.infer<typeof testimonialSchema>
export type ContactForm = z.infer<typeof contactSchema>
export type NewsletterForm = z.infer<typeof newsletterSchema>
export type FarmerRegistrationForm = z.infer<typeof farmerRegistrationSchema>

// ============ Validation Error Messages ============
export const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be at most ${max} characters`,
  minValue: (min: number) => `Must be at least ${min}`,
  maxValue: (max: number) => `Must be at most ${max}`,
  passwordMatch: 'Passwords do not match',
  invalidSlug: 'Invalid slug format',
  invalidUUID: 'Invalid ID format',
}