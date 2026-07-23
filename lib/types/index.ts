// lib/types/index.ts

// ============ User Types ============
export interface User {
  id: string
  email: string
  full_name: string
  role: 'super_admin' | 'admin' | 'editor' | 'publisher' | 'reviewer'
  avatar_url?: string
  created_at: string
  updated_at: string
}

// ============ Blog Types ============
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author_id: string
  author?: User
  status: 'draft' | 'published' | 'archived'
  categories: string[]
  tags: string[]
  published_at: string
  created_at: string
  updated_at: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
}

export interface BlogPostInput {
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  status: 'draft' | 'published' | 'archived'
  categories?: string[]
  tags?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
}

// ============ Product Types ============
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  images: string[]
  price: number
  category: string
  features: string[]
  nutrition_info: Record<string, string>
  how_to_use: string
  in_stock: boolean
  is_featured: boolean
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  seo_title?: string
  seo_description?: string
}

export interface ProductInput {
  name: string
  slug: string
  description: string
  short_description?: string
  images?: string[]
  price?: number
  category?: string
  features?: string[]
  nutrition_info?: Record<string, string>
  how_to_use?: string
  in_stock?: boolean
  is_featured?: boolean
  status: 'draft' | 'published' | 'archived'
  seo_title?: string
  seo_description?: string
}

// ============ Team Types ============
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  social_links: {
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============ FAQ Types ============
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============ Testimonial Types ============
export interface Testimonial {
  id: string
  name: string
  role: string
  photo: string
  quote: string
  rating: number
  is_active: boolean
  created_at: string
}

// ============ Contact Types ============
export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  created_at: string
}

// ============ Newsletter Types ============
export interface NewsletterSubscriber {
  id: string
  email: string
  is_active: boolean
  created_at: string
}

// ============ Farmer Types ============
export interface FarmerRegistration {
  id: string
  full_name: string
  phone: string
  email: string
  district: string
  village: string
  crops: string[]
  farm_size: 'small' | 'medium' | 'large'
  experience_years: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

// ============ API Response Types ============
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  totalPages: number
}

// ============ Component Props Types ============
export interface WithClassName {
  className?: string
}

export interface WithChildren {
  children: React.ReactNode
}

export interface WithId {
  id: string
}

export interface WithSlug {
  slug: string
}

// ============ Form Types ============
export interface FormError {
  field: string
  message: string
}

export interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errors: FormError[]
}

// ============ Filter/Sort Types ============
export interface FilterOptions {
  category?: string
  status?: string
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

export interface PaginationOptions {
  page: number
  limit: number
}

// ============ SEO Types ============
export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  noIndex?: boolean
}