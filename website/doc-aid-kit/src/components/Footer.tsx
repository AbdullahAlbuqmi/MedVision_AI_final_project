import { useEffect, useState } from 'react';
import { getLanguage, t, type Language } from '@/lib/i18n';

export function Footer() {
  const [language, setLanguage] = useState<Language>(getLanguage());

  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage(getLanguage());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('logo', language)}. {t('rights', language)}.
          </div>
          <div className="flex gap-6 text-sm">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              {t('about', language)}
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              {t('contact', language)}
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              {t('privacy', language)}
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              {t('terms', language)}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
