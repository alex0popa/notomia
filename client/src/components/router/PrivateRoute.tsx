import { Navigate } from 'react-router-dom';

import { useUserContext } from '../UserContext';

export const PrivateRoute = ({ element }: { element:JSX.Element }) => {
  const { userId } = useUserContext();

  return userId ? element : <Navigate to="/unauthorized" />;
};
