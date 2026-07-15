import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  applyTheme: () => void;
}

const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',

      setTheme: (theme) => {
        set({ theme });
        // Apply immediately
        const effective = theme === 'system' ? getSystemTheme() : theme;
        document.documentElement.classList.toggle('dark', effective === 'dark');
      },

      applyTheme: () => {
        const { theme } = get();
        const effective = theme === 'system' ? getSystemTheme() : theme;
        document.documentElement.classList.toggle('dark', effective === 'dark');
      },
    }),
    {
      name: 'floatit-theme',
    }
  )
);

// Apply theme on initial load (called from main.tsx equivalent)
export const initTheme = () => {
  const stored = localStorage.getItem('floatit-theme');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const theme: Theme = parsed?.state?.theme || 'light';
      const effective = theme === 'system' ? getSystemTheme() : theme;
      document.documentElement.classList.toggle('dark', effective === 'dark');
    } catch {
      // ignore parse errors
    }
  }
};
