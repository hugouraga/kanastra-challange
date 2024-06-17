import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const navItem = tv({
  base: [
    'font-medium text-base rounded-3xl p-2 px-4 duration-200 hover:text-slate-500',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:bg-slate-200',
    'active:bg-slate-200 active:opacity-80',
  ],
  variants: {
    variant: {
      focus: 'bg-slate-200',
      noFocus: 'bg-slate-white',
    },
  },
  defaultVariants: {
    variant: 'focus',
  },
});

interface NavItemProps {
  path: string;
  text: string;
  variant?: 'focus' | 'noFocus';
}

const NavItem: React.FC<NavItemProps> = ({ path, text }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  const className = navItem({ variant: isActive ? 'focus' : 'noFocus' });

  return (
    <Link to={path} className={className}>
      {text}
    </Link>
  );
};

export { NavItem };
