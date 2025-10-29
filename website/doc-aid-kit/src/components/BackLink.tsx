import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getLanguage, t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface BackLinkProps {
  to?: string;
  labelKey?: string;
  className?: string;
}

export function BackLink({ 
  to = '/doctor', 
  labelKey = 'backDashboard',
  className 
}: BackLinkProps) {
  const navigate = useNavigate();
  const language = getLanguage();
  const isRTL = language === 'ar';

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(to)}
      className={cn("mb-6", className)}
      role="link"
    >
      <ArrowLeft 
        className={cn(
          "h-4 w-4",
          isRTL ? "ml-2 rotate-180" : "mr-2"
        )} 
      />
      {t(labelKey, language)}
    </Button>
  );
}
