import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

const dark = {
  bg: '#040508', bgSec: '#0A0D12', bgTer: '#121419', bgCard: '#0A0D12', bgInput: '#121419', bgHover: '#1A1D24',
  border: '#121419', border2: '#1C1E23', border3: '#23252A',
  text: '#FFFFFF', textSec: '#F3F4F6', textTer: '#E5E7EB', textMuted: '#8B8D93', textDim: '#6A6C73', textSubtle: '#A0A2A8',
  green: '#2ECC71', greenHover: '#27ae60', greenBg: '#178544',
  blue: '#2979FF', red: '#FF3B30', orange: '#FF7A00', gold: '#F1D683', purple: '#A770EF',
  overlay: 'rgba(0,0,0,0.6)', backdrop: 'rgba(4,5,8,0.95)',
  navBg: 'rgba(4,5,8,0.95)', profileBg: '#020305',
  badgeNews: '#1A2332', badgeNewsText: '#4A9EFF',
  badgeAnalyst: '#1A3322', badgeAnalystText: '#2ECC71',
  badgeCreator: '#24133D', badgeCreatorText: '#A770EF',
};

const light = {
  bg: '#FFFFFF', bgSec: '#F5F6F8', bgTer: '#EBEDF0', bgCard: '#FFFFFF', bgInput: '#F0F1F3', bgHover: '#E8E9EC',
  border: '#E5E7EB', border2: '#D1D5DB', border3: '#C4C8CF',
  text: '#111318', textSec: '#1F2128', textTer: '#374151', textMuted: '#6B7280', textDim: '#9CA3AF', textSubtle: '#4B5563',
  green: '#16A34A', greenHover: '#15803D', greenBg: '#16A34A',
  blue: '#2563EB', red: '#DC2626', orange: '#EA580C', gold: '#CA8A04', purple: '#7C3AED',
  overlay: 'rgba(0,0,0,0.3)', backdrop: 'rgba(255,255,255,0.95)',
  navBg: 'rgba(255,255,255,0.95)', profileBg: '#FFFFFF',
  badgeNews: '#E0EEFF', badgeNewsText: '#1D4ED8',
  badgeAnalyst: '#DCFCE7', badgeAnalystText: '#16A34A',
  badgeCreator: '#F3E8FF', badgeCreatorText: '#7C3AED',
};

export type ThemeColors = typeof dark;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  t: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
  t: dark,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('trenduplive-theme');
    return (saved === 'light' ? 'light' : 'dark') as Theme;
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('trenduplive-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = theme === 'dark' ? dark : light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark', t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
