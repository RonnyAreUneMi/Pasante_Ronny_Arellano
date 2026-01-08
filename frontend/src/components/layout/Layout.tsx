import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    title
}) => {
    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            <Sidebar />
            <Header title={title} />

            {/* Main Content Area - Adjusted for Left Sidebar */}
            <main className="pl-32 pr-8 pt-28 pb-12 min-h-screen max-w-[1600px] mx-auto">
                <div className="animate-slideUp">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
