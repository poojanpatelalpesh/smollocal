import React from 'react';
import Navbar from '../pages/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;