import axios from 'axios';
import type { AsyncResponse, ApiConfig } from '../types';

const config: ApiConfig = {
  baseUrl: 'https://api.perplexity.ai',
  apiKey: '',
};

const createApi = (apiKey: string) => axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

export const submitAsyncRequest = async (prompt: string, apiKey: string): Promise<AsyncResponse> => {
  const api = createApi(apiKey);
  const response = await api.post('/async/chat/completions', {
    request: {
      model: 'sonar-deep-research',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    },
  });
  return response.data;
};

export const getAsyncResponse = async (requestId: string, apiKey: string): Promise<AsyncResponse> => {
  const api = createApi(apiKey);
  const response = await api.get(`/async/chat/completions/${requestId}`);
  return response.data;
}; 