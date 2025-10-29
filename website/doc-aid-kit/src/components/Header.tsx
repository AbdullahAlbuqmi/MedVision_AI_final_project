import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Globe, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getLanguage, setLanguage, t, type Language } from '@/lib/i18n';
import { getTheme, setTheme, type Theme } from '@/lib/theme';
import { getSession, logout } from '@/lib/auth';

export function Header() {
  const [language, setLanguageState] = useState<Language>(getLanguage());
  const [theme, setThemeState] = useState<Theme>(getTheme());
  const [session, setSession] = useState(getSession());
  const navigate = useNavigate();

  useEffect(() => {
    setLanguage(language);
  }, [language]);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguageState(newLang);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
  };

  const handleLogoClick = () => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate('/');
    } else if (currentSession.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/doctor');
    }
  };

  const handleLogout = () => {
    logout();
    setSession(null);
    // Force full page reload to reset all state
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div 
          onClick={handleLogoClick}
          className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
        >
          <img src={logo} alt="MedVision AI" className="h-14 w-14 object-contain" />
          <span className="text-xl font-bold text-primary">{t('logo', language)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLanguageToggle}
            aria-label={t('language', language)}
          >
            <Globe className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label={t('theme', language)}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === 'ar' ? 'start' : 'end'} className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                    {t('profile', language)}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                  {t('logout', language)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link to="/login">{t('forDoctors', language)}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
