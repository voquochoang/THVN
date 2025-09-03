export interface Theme {
  id: string;
  name: string;
  prompt: string;
  thumbnail: string;
}

export interface ThemeCategory {
  id:string;
  name: string;
  themes: Theme[];
}

export type GenerationStatus = 'loading' | 'done' | 'error';

export interface GenerationResult {
  status: GenerationStatus;
  themeName: string;
  imageUrl?: string;
  error?: string;
}

export type GenerationResults = Record<string, GenerationResult>;
