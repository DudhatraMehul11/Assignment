import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoutes';
import Navbar from './Navbar';

const ProtectedWithNavbar = () => (
  <ProtectedRoute>
    <Navbar />
    <Outlet />
  </ProtectedRoute>
);

export default ProtectedWithNavbar;
