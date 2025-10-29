import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '@/lib/auth';

export default function ClinicalChatRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (session?.role === 'doctor') {
      navigate('/doctor', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return null;
}
