import { useEffect, useState } from 'react';
import { MessageSquare, Pill, ShieldAlert, Stethoscope, Brain, Eye, Scan, Activity } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getLanguage, t, type Language } from '@/lib/i18n';
import { getSession } from '@/lib/auth';
import albuqmiImage from '@/assets/team/albuqmi.jpg';
import reemImage from '@/assets/team/reem-alsaif.jpeg';
import khalidSImage from '@/assets/team/khalid-alshuraim.jpeg';
import razanImage from '@/assets/team/razan-albishri.jpeg';
import khalidKImage from '@/assets/team/khalid-khubrani.png';

const publicTools = [
  { icon: MessageSquare, titleKey: 'healthAssistant', descKey: 'healthAssistantDesc', route: '/health-assistant' },
  { icon: Pill, titleKey: 'drugDescription', descKey: 'drugDescriptionDesc', route: '/drug-description' },
  { icon: ShieldAlert, titleKey: 'drugInteractions', descKey: 'drugInteractionsDesc', route: '/drug-interactions' },
];

const doctorTools = [
  { icon: Scan, titleKey: 'chestXray', descKey: 'chestXrayDesc', route: '/chest-xray' },
  { icon: Stethoscope, titleKey: 'clinicalChat', descKey: 'clinicalChatDesc', route: '/advanced-clinical-chat' },
  { icon: Activity, titleKey: 'dermatology', descKey: 'dermatologyDesc', route: '/dermatology' },
  { icon: Eye, titleKey: 'ophthalmology', descKey: 'ophthalmologyDesc', route: '/ophthalmology' },
  { icon: Brain, titleKey: 'neuro', descKey: 'neuroDesc', route: '/neuro' },
];

export default function Index() {
  const [language, setLanguage] = useState<Language>(getLanguage());
  const [hasAnimated, setHasAnimated] = useState(false);
  const session = getSession();

  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage(getLanguage());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animated = sessionStorage.getItem('hasAnimated');
    if (!animated) {
      setHasAnimated(false);
      sessionStorage.setItem('hasAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  const handleToolClick = (route: string) => {
    window.location.href = route;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`bg-gradient-to-b from-secondary/30 to-background py-20 ${!hasAnimated ? 'animate-fade-in' : ''}`}>
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {t('heroTitle', language)}
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {t('heroSubtitle', language)}
              </p>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16">
          <div className="container px-4">
            <h2 className={`mb-12 text-center text-3xl font-bold ${!hasAnimated ? 'animate-slide-up' : ''}`}>
              {t('ourTools', language)}
            </h2>

            {/* Public Tools */}
            <div className="mb-16">
              <h3 className="mb-6 text-xl font-semibold text-primary">
                {t('publicTools', language)}
              </h3>
              <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${!hasAnimated ? 'animate-slide-up' : ''}`}>
                {publicTools.map((tool, index) => (
                  <div
                    key={tool.route}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={!hasAnimated ? 'animate-fade-in' : ''}
                  >
                    <ToolCard
                      icon={tool.icon}
                      title={t(tool.titleKey, language)}
                      description={t(tool.descKey, language)}
                      route={tool.route}
                      onClick={() => handleToolClick(tool.route)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Tools */}
            <div>
              <h3 className="mb-6 text-xl font-semibold text-primary">
                {t('doctorTools', language)}
              </h3>
              <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${!hasAnimated ? 'animate-slide-up' : ''}`}>
                {doctorTools.map((tool, index) => (
                  <div
                    key={tool.route}
                    style={{ animationDelay: `${(index + 3) * 100}ms` }}
                    className={!hasAnimated ? 'animate-fade-in' : ''}
                  >
                    <ToolCard
                      icon={tool.icon}
                      title={t(tool.titleKey, language)}
                      description={t(tool.descKey, language)}
                      route={tool.route}
                      locked={!session}
                      lockedMessage={t('lockedMessage', language)}
                      onClick={() => handleToolClick(tool.route)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section id="vision-mission" className={`py-16 bg-secondary/10 ${!hasAnimated ? 'animate-fade-in' : ''}`}>
          <div className="container px-4">
            <h2 className={`mb-12 text-center text-3xl font-bold ${!hasAnimated ? 'animate-slide-up' : ''}`}>
              {t('visionMissionTitle', language)}
            </h2>
            <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">
              <div className={`rounded-2xl bg-card p-8 shadow-sm border ${!hasAnimated ? 'animate-fade-in' : ''}`} style={{ animationDelay: '100ms' }}>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t('visionTitle', language)}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{t('visionText', language)}</p>
              </div>
              <div className={`rounded-2xl bg-card p-8 shadow-sm border ${!hasAnimated ? 'animate-fade-in' : ''}`} style={{ animationDelay: '200ms' }}>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t('missionTitle', language)}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{t('missionText', language)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className={`py-16 ${!hasAnimated ? 'animate-fade-in' : ''}`}>
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-2 ${!hasAnimated ? 'animate-slide-up' : ''}`}>
                {t('teamTitle', language)}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">{t('teamSubtitle', language)}</p>
              <p className={`mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground ${!hasAnimated ? 'animate-fade-in' : ''}`} style={{ animationDelay: '100ms' }}>
                {t('teamIntro', language)}
              </p>
            </div>
            
            <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
              {[
                { name: t('teamMember1', language), linkedin: 'https://www.linkedin.com/in/abdullah-albuqmi', image: albuqmiImage, alt: 'Abdullah Albuqami' },
                { name: t('teamMember2', language), linkedin: 'https://www.linkedin.com/in/reem-alsaif-0013b7305', image: reemImage, alt: 'Reem Alsaif' },
                { name: t('teamMember3', language), linkedin: 'https://www.linkedin.com/in/khalid-alshuraim', image: khalidSImage, alt: 'Khalid Alshuraim' },
                { name: t('teamMember4', language), linkedin: 'https://www.linkedin.com/in/razan-albishri-7b59a922b', image: razanImage, alt: 'Razan Albishri' },
                { name: t('teamMember5', language), linkedin: 'https://www.linkedin.com/in/khalid-khubrani-66900131a', image: khalidKImage, alt: 'Khalid Khubrani' },
              ].map((member, index) => (
                <div
                  key={member.name}
                  className={`flex flex-col items-center ${!hasAnimated ? 'animate-fade-in' : ''}`}
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <Avatar className="w-32 h-32 mb-4 border-2 border-border">
                    <AvatarImage src={member.image} alt={member.alt} className="object-cover" />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <h4 className="font-semibold text-center">{member.name}</h4>
                    <svg className="w-6 h-6 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              ))}
            </div>

            <p className={`text-center text-xl font-medium ${!hasAnimated ? 'animate-fade-in' : ''}`} style={{ animationDelay: '700ms' }}>
              {t('teamClosing', language)}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
