export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  const saved = localStorage.getItem('medapp_theme');
  if (saved === 'light' || saved === 'dark') return saved;
  
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

export function setTheme(theme: Theme) {
  localStorage.setItem('medapp_theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function initTheme() {
  const theme = getTheme();
  setTheme(theme);
}
