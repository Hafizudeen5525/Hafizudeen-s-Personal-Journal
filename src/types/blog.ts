export type PostStream = 
  | 'Math & Quants' 
  | 'Personal & Life' 
  | 'Articles I Like' 
  | 'Achievements' 
  | 'Musings';

export interface Post {
  id: string;
  title: string;
  slug: string;
  stream: PostStream;
  excerpt: string;
  content: string;
  publishedDate: string;
  readTime: string;
  status: 'published' | 'draft';
  featured: boolean;
  tags: string[];
  externalUrl?: string; // For articles/papers read
  sourceAuthor?: string; // Author of referenced article/book
  mathHighlight?: string; // Core equation/theorem (e.g. "E[X] = \sum x P(X=x)")
  keyTakeaway?: string;
}

export interface ReadingItem {
  id: string;
  title: string;
  author: string;
  type: 'Paper' | 'Book' | 'Essay' | 'Article';
  url: string;
  status: 'Recommended' | 'Read' | 'Currently Reading';
  notes: string;
  rating: number; // 1-5
  dateAdded: string;
  streamCategory: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  category: 'Quant & Code' | 'Academic' | 'Career' | 'Personal';
  description: string;
  metrics?: string;
}

export interface SiteProfile {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  email: string;
  location: string;
  interests: string[];
  socialLinks: {
    github?: string;
    twitter?: string;
    substack?: string;
    linkedin?: string;
  };
  pinnedThoughts: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
  isOwner: boolean;
}

export interface BlogData {
  profile: SiteProfile;
  posts: Post[];
  readingShelf: ReadingItem[];
  milestones: Milestone[];
  messages: ContactMessage[];
}
