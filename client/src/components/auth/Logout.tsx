import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';

export const Logout = () => {
  const navigate = useNavigate();
  const { setUserId } = useUserContext();
  const logOut = () => {
    navigate('/login');
    setUserId(undefined);
  }

  return (
    <button onClick={logOut}>Logout</button>
  );
};
