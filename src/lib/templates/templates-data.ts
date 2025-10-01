// lib/templates/templates-data.ts
export interface TemplateInfo {
  id: 'classic' | 'modern' | 'creative' | 'minimalist';
  name: string;
  description: string;
  category: 'professional' | 'modern' | 'creative' | 'minimal';
  features: string[];
  bestFor: string[];
  previewImage: string;
}

export const templates: TemplateInfo[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Timeless, ATS-friendly format trusted by recruiters worldwide. Clean, professional, and optimized for automated systems.',
    category: 'professional',
    features: ['ATS Optimized', 'Clean Layout', 'Professional Typography', 'Industry Standard'],
    bestFor: ['Corporate Jobs', 'Finance', 'Healthcare', 'Government', 'Legal'],
    previewImage: '/images/templates/classic.jpg'
  },
  {
    id: 'modern', 
    name: 'Modern Clean',
    description: 'Contemporary design with smart spacing and modern aesthetics. Perfect for tech companies and creative industries.',
    category: 'modern',
    features: ['Modern Layout', 'Smart Spacing', 'Visual Hierarchy', 'Mobile Friendly'],
    bestFor: ['Tech Companies', 'Startups', 'Design Roles', 'Marketing', 'Consulting'],
    previewImage: '/images/templates/mordern.jpg'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Showcase your creativity with this visually engaging template. Great for portfolios and creative professionals.',
    category: 'creative',
    features: ['Visual Design', 'Portfolio Ready', 'Creative Layout', 'Color Accents'],
    bestFor: ['Designers', 'Artists', 'Creatives', 'Marketing', 'Media'],
    previewImage: '/images/templates/creative.jpg'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Elegant',
    description: 'Clean, minimal design that focuses on your content. Elegant and distraction-free for maximum impact.',
    category: 'minimal',
    features: ['Minimal Design', 'Content Focused', 'Elegant Typography', 'Quick Scanning'],
    bestFor: ['Executives', 'Consultants', 'Academic Roles', 'Minimalist Lovers'],
    previewImage: '/images/templates/minimalist.jpg'
  },
];