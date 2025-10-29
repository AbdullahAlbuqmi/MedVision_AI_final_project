import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  route: string;
  locked?: boolean;
  lockedMessage?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function ToolCard({
  icon: Icon,
  title,
  description,
  locked = false,
  lockedMessage,
  onClick,
}: ToolCardProps) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        locked ? 'cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'
      )}
      onClick={locked ? undefined : onClick}
    >
      <div className={cn('p-6', locked && 'blur-sm')}>
        <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {locked && lockedMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="rounded-lg bg-muted px-4 py-2 text-sm font-medium">
            {lockedMessage}
          </div>
        </div>
      )}
    </Card>
  );
}
