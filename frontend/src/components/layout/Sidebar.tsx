import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const menuItems = [
        {
            path: '/dashboard',
            label: 'Inicio',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            path: '/carreras',
            label: 'Carreras',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            )
        },
        {
            path: '/modalidades',
            label: 'Modalidades',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            path: '/perfil',
            label: 'Perfil',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        }
    ];

    return (
        <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
            <div className="bg-[var(--bg-card)]/80 backdrop-blur-md py-8 px-4 rounded-[3rem] shadow-[var(--shadow-flat)] border border-white/40 flex flex-col items-center space-y-8">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            relative group flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300
                            ${isActive
                                ? 'bg-[#E30613] text-white shadow-[0_8px_16px_rgba(227,6,19,0.3)] scale-110'
                                : 'text-[var(--text-secondary)] hover:bg-[#E30613]/5 hover:text-[#E30613]'
                            }
                        `}
                    >
                        {item.icon}

                        {/* Tooltip Label */}
                        <div className="absolute left-16 px-4 py-2 bg-[#1A202C] text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-x-3 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-50 shadow-xl">
                            {item.label}
                        </div>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;