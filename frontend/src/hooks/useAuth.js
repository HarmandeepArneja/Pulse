import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  const role = user?.publicMetadata?.role || 'EMPLOYEE';
  const isManager = role === 'MANAGER';
  const isAdmin = role === 'ADMIN';

  const checkPermission = (requiredRole) => {
    if (!isSignedIn) {
      navigate('/login');
      return false;
    }

    if (requiredRole && role !== requiredRole) {
      toast.error('You do not have permission to access this resource');
      navigate('/dashboard');
      return false;
    }

    return true;
  };

  const getHomeRoute = () => {
    if (isAdmin) return '/company';
    if (isManager) return '/manager';
    return '/dashboard';
  };

  return {
    user,
    isLoaded,
    isSignedIn,
    role,
    isManager,
    isAdmin,
    checkPermission,
    getHomeRoute,
  };
}
