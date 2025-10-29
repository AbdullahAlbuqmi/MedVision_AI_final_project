import { useEffect, useState } from 'react';
import { MessageSquare, Pill, ShieldAlert, Brain, Eye, Scan, Activity, Droplets } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { AuthGuard } from '@/components/AuthGuard';
import { getLanguage, t, type Language } from '@/lib/i18n';
import { Alert, AlertDescription } from '@/components/ui/alert';

const allTools = [
  { icon: MessageSquare, titleKey: 'healthAssistant', descKey: 'healthAssistantDesc', route: '/health-assistant' },
  { icon: Pill, titleKey: 'drugDescription', descKey: 'drugDescriptionDesc', route: '/drug-description' },
  { icon: ShieldAlert, titleKey: 'drugInteractions', descKey: 'drugInteractionsDesc', route: '/drug-interactions' },
  { icon: Scan, titleKey: 'chestXray', descKey: 'chestXrayDesc', route: '/chest-xray' },
  { icon: Droplets, titleKey: 'kidneyAnalysis', descKey: 'kidneyAnalysisDesc', route: '/kidney-analysis' },
  { icon: Activity, titleKey: 'dermatology', descKey: 'dermatologyDesc', route: '/dermatology' },
  { icon: Eye, titleKey: 'ophthalmology', descKey: 'ophthalmologyDesc', route: '/ophthalmology' },
  { icon: Brain, titleKey: 'brainAnalysis', descKey: 'brainAnalysisDesc', route: '/brain-analysis' },
];

function DoctorContent() {
  const [language, setLanguage] = useState<Language>(getLanguage());

  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage(getLanguage());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleToolClick = (route: string) => {
    if (route === '/health-assistant' || route === '/dermatology' || route === '/drug-interactions' || route === '/drug-description' || route === '/chest-xray' || route === '/kidney-analysis' || route === '/ophthalmology' || route === '/brain-analysis') {
      window.location.href = route;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <AlertDescription className="text-center font-medium">
              {t('signedInAs', language)} - {t('allToolsUnlocked', language)}
            </AlertDescription>
          </Alert>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('welcomeDoctor', language)}</h1>
            <p className="text-muted-foreground">{t('allToolsUnlocked', language)}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allTools.map((tool) => (
              <ToolCard
                key={tool.route}
                icon={tool.icon}
                title={t(tool.titleKey, language)}
                description={t(tool.descKey, language)}
                route={tool.route}
                onClick={() => handleToolClick(tool.route)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Doctor() {
  return (
    <AuthGuard requiredRole="doctor">
      <DoctorContent />
    </AuthGuard>
  );
}
