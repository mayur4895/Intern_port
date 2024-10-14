'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, LineChart, Package, Settings } from 'lucide-react';
import { FaPlusCircle } from 'react-icons/fa';

const links = [
  { href: '/hire-talent/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
  { href: '/hire-talent/dashboard/new-post', label: 'Create post', icon: <FaPlusCircle className="h-5 w-5" /> },
  { href: '/hire-talent/dashboard/posts', label: 'View Posts', icon: <Package className="h-5 w-5" /> },
  { href: '#charts', label: 'Charts', icon: <LineChart className="h-5 w-5" /> },
  { href: '#settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
];

const Asidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const renderLink = (href: string, label: string, icon: React.ReactNode, ) => (
    <Link
      href={href}
      className={`text-sm flex items-end gap-2 p-2 m-1 w-[90%] relative ${
        isActive(href) ? 'overflow-hidden mx-2 bg-white rounded-md text-black' : 'text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
      {isActive(href) && <div className="top-[1.8px] right-0 absolute h-8 w-[2px] bg-blue-100" />}
    </Link>
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden md:w-52 flex-col border-r bg-indigo-900 text-zinc-800 lg:flex">
      <nav className="flex flex-col items-start gap-5 w-full sm:py-5">
        <Link href="#" className="group flex shrink-0 gap-2 p-2 text-sm font-semibold md:text-base text-white">
          <Building2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span>Modern</span>
        </Link>

        {links.map(link =>   <React.Fragment key={link.href}>
            {renderLink(link.href, link.label, link.icon)}
          </React.Fragment>)}
      </nav>
    </aside>
  );
};

export default Asidebar;
