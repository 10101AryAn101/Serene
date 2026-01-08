import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const UNSPLASH_API_BASE = 'https://api.unsplash.com';
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

if (!UNSPLASH_API_KEY) {
  throw new Error('Missing VITE_UNSPLASH_API_KEY environment variable');
}

const unsplashClient = axios.create({
  baseURL: UNSPLASH_API_BASE,
  headers: {
    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
  },
});

// Fetch paginated images from Unsplash
export const useFetchImages = (page = 1, perPage = 12) => {
  return useQuery({
    queryKey: ['images', page, perPage],
    queryFn: async () => {
      const response = await unsplashClient.get('/photos', {
        params: {
          page,
          per_page: perPage,
          order_by: 'latest',
        },
      });

      return response.data.map((img) => ({
        id: img.id,
        url: img.urls.regular,
        title: img.alt_description || 'Untitled',
        photographer: img.user?.name || 'Unknown',
        photographerUrl: img.user?.portfolio_url,
        unsplashUrl: img.links?.html,
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (was cacheTime)
  });
};

// Fetch a random image from Unsplash
export const useFetchRandomImages = (count = 20) => {
  return useQuery({
    queryKey: ['randomImages', count],
    queryFn: async () => {
      const response = await unsplashClient.get('/photos/random', {
        params: {
          count,
        },
      });

      // Handle both single image and array responses
      const images = Array.isArray(response.data) ? response.data : [response.data];

      return images.map((img) => ({
        id: img.id,
        url: img.urls.regular,
        title: img.alt_description || 'Untitled',
        photographer: img.user?.name || 'Unknown',
        photographerUrl: img.user?.portfolio_url,
        unsplashUrl: img.links?.html,
      }));
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

// Search images on Unsplash
export const useSearchImages = (query, page = 1, perPage = 12) => {
  return useQuery({
    queryKey: ['searchImages', query, page, perPage],
    queryFn: async () => {
      if (!query.trim()) {
        return [];
      }

      const response = await unsplashClient.get('/search/photos', {
        params: {
          query,
          page,
          per_page: perPage,
        },
      });

      return response.data.results.map((img) => ({
        id: img.id,
        url: img.urls.regular,
        title: img.alt_description || 'Untitled',
        photographer: img.user?.name || 'Unknown',
        photographerUrl: img.user?.portfolio_url,
        unsplashUrl: img.links?.html,
      }));
    },
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
