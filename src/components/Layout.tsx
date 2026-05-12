import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen pb-24 bg-natural">
      <div className="max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-natural border-x border-brand-secondary shadow-2xl">
        <Outlet />
        <BottomNav />
      </div>
    </div>
  );
}
