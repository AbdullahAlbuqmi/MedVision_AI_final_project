import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getLanguage, t, type Language } from '@/lib/i18n';
import { login, getSession, type UserRole } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [language, setLanguage] = useState<Language>(getLanguage());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('doctor');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage(getLanguage());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate(session.role === 'admin' ? '/admin' : '/doctor');
    }
  }, [navigate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = t('emailRequired', language);
    }
    
    if (!password) {
      newErrors.password = t('passwordRequired', language);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const result = login(email, password);
    
    if (result.success && result.role) {
      // Show info toast if selected role doesn't match stored role
      if (result.role !== role) {
        toast({
          title: t('loginButton', language),
          description: t('roleAutoDetected', language),
        });
      } else {
        toast({
          title: t('loginButton', language),
          description: `${t('welcomeDoctor', language)}`,
        });
      }
      navigate(result.role === 'admin' ? '/admin' : '/doctor');
    } else {
      setErrors({ form: result.error || t('invalidCredentials', language) });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t('loginTitle', language)}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Enter your credentials to access the platform' 
                : 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى المنصة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email', language)}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'en' ? 'doctor@example.com' : 'doctor@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password', language)}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">{t('role', language)}</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">{t('doctor', language)}</SelectItem>
                    <SelectItem value="admin">{t('admin', language)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {errors.form && (
                <p className="text-sm text-destructive text-center">{errors.form}</p>
              )}

              <Button type="submit" className="w-full">
                {t('loginButton', language)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
