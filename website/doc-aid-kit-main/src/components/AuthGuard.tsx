import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, type UserRole } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    
    if (!session) {
      navigate('/login');
      return;
    }

    if (requiredRole && session.role !== requiredRole && session.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [navigate, requiredRole]);

  const session = getSession();
  if (!session) return null;
  if (requiredRole && session.role !== requiredRole && session.role !== 'admin') return null;

  return <>{children}</>;
}
