import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const geminiApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || env.API_KEY || '';
    const openRouterApiKey = env.VITE_OPENROUTER_API_KEY || env.OPENROUTER_API_KEY || '';
    const openCodeGoApiKey = env.VITE_OPENCODE_GO_API_KEY || env.OPENCODE_GO_API_KEY || '';
    const deepSeekApiKey = env.VITE_DEEPSEEK_API_KEY || env.DEEPSEEK_API_KEY || '';
    return {
      server: {
        port: 3002,
        strictPort: true,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(geminiApiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        'process.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || ''),
        'process.env.OPENROUTER_API_KEY': JSON.stringify(openRouterApiKey),
        'process.env.VITE_OPENROUTER_API_KEY': JSON.stringify(env.VITE_OPENROUTER_API_KEY || ''),
        'process.env.OPENCODE_GO_API_KEY': JSON.stringify(openCodeGoApiKey),
        'process.env.VITE_OPENCODE_GO_API_KEY': JSON.stringify(env.VITE_OPENCODE_GO_API_KEY || ''),
        'process.env.DEEPSEEK_API_KEY': JSON.stringify(deepSeekApiKey),
        'process.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(env.VITE_DEEPSEEK_API_KEY || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
