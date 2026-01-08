import React from 'react';
import Layout from '../components/layout/Layout';

const Profile: React.FC = () => {
    return (
        <Layout title="Perfil de Usuario">
            <div className="max-w-3xl mx-auto py-10">
                <div className="neu-card p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E30613]/5 rounded-full -mr-32 -mt-32"></div>

                    <div className="flex flex-col items-center mb-12 relative z-10">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[#E30613] to-[#C00510] flex items-center justify-center text-white text-5xl font-black shadow-[0_15px_35px_rgba(227,6,19,0.4)] mb-6 rotate-3 group-hover:rotate-0 transition-all duration-500">
                                A
                            </div>
                            <div className="absolute bottom-4 right-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center text-[#E30613] cursor-pointer hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase">Administrador</h2>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-xs mt-2">Nivel de Acceso: Superusuario</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="neu-inset p-6 rounded-[2rem]">
                            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-2">Correo Electrónico</p>
                            <p className="text-[var(--text-primary)] font-black text-lg">admin@ube.edu.ec</p>
                        </div>

                        <div className="neu-inset p-6 rounded-[2rem]">
                            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-2">Institución</p>
                            <p className="text-[var(--text-primary)] font-black text-lg truncate">Univ. Bolivariana de Ecuador (UBE)</p>
                        </div>

                        <div className="neu-inset p-6 rounded-[2rem]">
                            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-2">Último Acceso</p>
                            <p className="text-[var(--text-primary)] font-black text-lg">Hoy, 10:24 AM</p>
                        </div>

                        <div className="neu-inset p-6 rounded-[2rem]">
                            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-2">Estado de Cuenta</p>
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                <p className="text-green-500 font-black text-lg uppercase tracking-tighter">Activa</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between relative z-10">
                        <button className="text-[var(--text-muted)] font-black uppercase tracking-widest text-xs hover:text-[#E30613] transition-colors">
                            Editar Ajustes de Seguridad
                        </button>
                        <button className="neu-button-primary !bg-[#1A202C] !text-white hover:!bg-black !shadow-none !py-4 !px-10">
                            Cerrar Sesión Segura
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
