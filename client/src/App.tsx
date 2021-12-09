import { Router } from './components/router/Router';

import { UserProvider } from './components/UserContext';

const App = () => (
  <UserProvider>
    <Router />
  </UserProvider>
);

export default App;
