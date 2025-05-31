export interface AsyncResponse {
  id: string;
  model: string;
  created_at: number;
  started_at: number | null;
  completed_at: number | null;
  response: any | null;
  failed_at: number | null;
  error_message: string | null;
  status: 'CREATED' | 'STARTED' | 'COMPLETED' | 'FAILED';
}

export interface ResearchPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
} 