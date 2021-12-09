import { Routes, Route } from 'react-router-dom';

import { ConfirmRegistration } from '../auth/ConfirmRegistration';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { MyCrypto } from '../myCrypto/MyCrypto';
import { Unauthorized } from '../unauthorized';
import { PrivateRoute } from './PrivateRoute';


export const Router = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/confirm-registration" element={<ConfirmRegistration />} />
    <Route
      path="/my-crypto"
      element={<PrivateRoute element={<MyCrypto />} />}
    />
    <Route path="*" element={<Unauthorized />} />
  </Routes>
);