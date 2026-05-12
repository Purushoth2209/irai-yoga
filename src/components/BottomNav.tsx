import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Calendar, MessageSquare, User } from 'lucide-react';
import { clsx } from 'clsx';

export default function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: MessageSquare, label: 'Chats', path: '/chats' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-brand-secondary px-6 py-2 pb-8 flex justify-between items-center z-50 card-shadow transition-all">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center gap-1 transition-colors',
              isActive ? 'text-brand-primary' : 'text-slate-400'
            )
          }
        >
          <item.icon size={22} />
          <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
