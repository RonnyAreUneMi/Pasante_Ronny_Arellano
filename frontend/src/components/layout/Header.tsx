import React from 'react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({
    title
}) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 60 && currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`
            fixed top-0 left-0 right-0 h-28 bg-transparent z-40 px-8 pointer-events-none
            transition-all duration-500 ease-in-out
            ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}>
            <div className="h-full max-w-[1600px] mx-auto flex items-center justify-between pointer-events-auto">
                {/* Logo & Title Integration */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-5 animate-fadeIn">
                        <div className="w-16 h-16 bg-[#E30613] rounded-3xl flex items-center justify-center shadow-[0_12px_24px_rgba(227,6,19,0.3)] border-2 border-white/60">
                            <img src="/ube_logo.svg" alt="Logo UBE" className="w-10 h-10 brightness-0 invert" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[10px] font-black text-[#E30613] uppercase tracking-[0.4em] mb-1">Universidad Bolivariana</p>
                            <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter uppercase leading-none">{title}</h1>
                        </div>
                    </div>
                </div>

                {/* Status Indicator (Optional) */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 px-6 py-3 bg-white rounded-2xl shadow-[var(--shadow-flat)] text-[10px] font-black uppercase tracking-widest text-green-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>Sistema Activo</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
