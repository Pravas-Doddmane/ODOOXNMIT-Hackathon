import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HomeIcon, UsersIcon, ClipboardListIcon as ClipboardDocumentListIcon, CogIcon, ClipboardCheckIcon as ClipboardDocumentCheckIcon, WrenchIcon, YoutubeIcon as CubeIcon, LogOutIcon } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Manufacturing Orders', href: '/manufacturing-orders', icon: ClipboardDocumentListIcon },
    { name: 'Work Orders', href: '/work-orders', icon: ClipboardDocumentCheckIcon },
    { name: 'Bill of Materials', href: '/boms', icon: CubeIcon },
    { name: 'Work Centers', href: '/work-centers', icon: WrenchIcon },
    { name: 'Stock Management', href: '/stock', icon: CogIcon },
    ...(user?.role === 'ADMIN' || user?.role === 'MANAGER' ? [
      { name: 'Users', href: '/users', icon: UsersIcon },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Manufacturing</h1>
        </div>
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-6">
            <h2 className="text-lg font-semibold text-gray-900">Welcome, {user?.name}</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user?.role}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;