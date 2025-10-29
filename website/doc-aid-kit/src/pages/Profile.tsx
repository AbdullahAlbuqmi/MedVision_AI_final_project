import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { getSession, updateUserProfile, updateUserPassword, getUsers } from '@/lib/auth';
import { getLanguage, t } from '@/lib/i18n';

export default function Profile() {
  const navigate = useNavigate();
  const language = getLanguage();
  const [session, setSession] = useState(getSession());
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate('/login');
      return;
    }
    setSession(currentSession);
    setDisplayName(currentSession.name || '');
  }, [navigate]);

  const handleUpdateName = () => {
    if (!session || !displayName.trim()) return;
    
    setIsUpdatingName(true);
    const result = updateUserProfile(session.userId, displayName.trim());
    
    if (result.success) {
      toast({
        title: t('nameUpdated', language),
      });
      // Update local session state
      const updatedSession = getSession();
      if (updatedSession) {
        setSession(updatedSession);
      }
    } else {
      toast({
        title: result.error || 'Error updating name',
        variant: 'destructive',
      });
    }
    setIsUpdatingName(false);
  };

  const handleChangePassword = () => {
    if (!session) return;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: t('passwordMismatchError', language),
        variant: 'destructive',
      });
      return;
    }

    setIsUpdatingPassword(true);
    const result = updateUserPassword(session.userId, currentPassword, newPassword);
    
    if (result.success) {
      toast({
        title: t('passwordUpdated', language),
        description: t('securityNote', language),
      });
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast({
        title: t('currentPasswordError', language),
        variant: 'destructive',
      });
    }
    setIsUpdatingPassword(false);
  };

  if (!session) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('profileTitle', language)}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('profile', language)}</CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'إدارة معلومات حسابك الشخصي'
                  : 'Manage your account information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email (Read-only) */}
              <div className="space-y-2">
                <Label>{t('email', language)}</Label>
                <Input value={session.email} disabled className="bg-muted" />
              </div>

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName">{t('displayName', language)}</Label>
                <div className="flex gap-2">
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t('displayName', language)}
                  />
                  <Button 
                    onClick={handleUpdateName} 
                    disabled={isUpdatingName || !displayName.trim()}
                  >
                    {t('save', language)}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('changePassword', language)}</CardTitle>
              <CardDescription>
                {language === 'ar'
                  ? 'قم بتحديث كلمة المرور الخاصة بك'
                  : 'Update your password'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t('currentPassword', language)}</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">{t('newPassword', language)}</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword', language)}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleChangePassword} 
                disabled={isUpdatingPassword}
                className="w-full"
              >
                {t('changePassword', language)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
