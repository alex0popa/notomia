import { createContext, useContext, useState } from 'react';

type State = {
  userId?: string,
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>
}

const INITIAL_STATE: State = {
  userId: undefined,
  setUserId: () => {}
}

const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [userId, setUserId] = useState<State['userId']>(undefined );

  const value = { userId, setUserId };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
