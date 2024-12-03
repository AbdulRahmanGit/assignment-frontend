import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, userType }) => {
  const { user } = useAuth();

  if (!user || user.userType !== userType) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

