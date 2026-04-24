import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthOrLanding = location.pathname === '/' || location.pathname.startsWith('/auth');

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <div className={`fixed left-4 z-[60] ${isAuthOrLanding ? 'top-4' : 'top-20'}`}>
      <Button variant="outline" size="sm" onClick={goBack} className="shadow-sm">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </div>
  );
}
