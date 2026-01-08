import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { dashboardService } from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DashboardStats {
    careers: {
        total: number;
        active: number;
        inactive: number;
    };
    modalities: {
        total: number;
        active: number;
        inactive: number;
    };
    activity: Array<{
        type: string;
        nombre: string;
        action: string;
        updated_at: string;
    }>;
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await dashboardService.getStats();
                if (response.data.is_success) {
                    setStats(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading || !stats) {
        return (
            <Layout title="Dashboard">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-16 h-16 border-4 border-[#E30613]/20 border-t-[#E30613] rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    const careerChartData = {
        labels: ['Activas', 'Inactivas'],
        datasets: [
            {
                data: [stats.careers.active, stats.careers.inactive],
                backgroundColor: ['#48BB78', '#F56565'],
                borderColor: '#ffffff',
                borderWidth: 4,
                hoverOffset: 15
            },
        ],
    };

    const modalityChartData = {
        labels: ['Activas', 'Inactivas'],
        datasets: [
            {
                data: [stats.modalities.active, stats.modalities.inactive],
                backgroundColor: ['#4299E1', '#CBD5E0'],
                borderColor: '#ffffff',
                borderWidth: 4,
                hoverOffset: 15
            },
        ],
    };

    // Use any for options to avoid strict Chart.js typing issues between versions
    const chartOptions: any = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 25,
                    color: '#1A202C',
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#1A202C',
                bodyColor: '#1A202C',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                cornerRadius: 12
            }
        },
        maintainAspectRatio: false,
        cutout: '0%' // Ensures it's a full Pie, not a Doughnut
    };

    return (
        <Layout title="Resumen Ejecutivo">
            <div className="space-y-10">
                {/* Dashboard Hero */}
                <div className="neu-card p-12 bg-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#E30613]/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#E30613]/10 transition-all duration-700"></div>
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black text-[var(--text-primary)] tracking-tight uppercase">
                            Panel de <span className="text-[#E30613]">Control</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] mt-4 text-xl font-bold opacity-80 max-w-2xl">
                            Visualización técnica de indicadores académicos y estado del sistema.
                        </p>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Career Stats */}
                    <div className="neu-card p-10 bg-white">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)]">Estado de Carreras</h3>
                            <div className="neu-inset px-5 py-2 rounded-xl">
                                <span className="text-2xl font-black text-[#E30613]">{stats.careers.total}</span>
                                <span className="ml-2 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Total</span>
                            </div>
                        </div>
                        <div className="h-[350px] relative">
                            <Pie data={careerChartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Modality Stats */}
                    <div className="neu-card p-10 bg-white">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)]">Estado de Modalidades</h3>
                            <div className="neu-inset px-5 py-2 rounded-xl">
                                <span className="text-2xl font-black text-[#4299E1]">{stats.modalities.total}</span>
                                <span className="ml-2 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Total</span>
                            </div>
                        </div>
                        <div className="h-[350px] relative">
                            <Pie data={modalityChartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="neu-card p-10 bg-white">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)] mb-8">Actividad Reciente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stats.activity.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-6 p-6 rounded-3xl bg-[var(--bg-main)]/50 border border-white hover:bg-white hover:shadow-lg transition-all duration-300">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${item.type === 'carrera' ? 'bg-[#E30613]' : 'bg-[#4299E1]'} text-white`}>
                                    {item.type === 'carrera' ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-[var(--text-primary)] text-lg">{item.nombre}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--text-muted)] mt-1">
                                        Acción: <span className={item.type === 'carrera' ? 'text-[#E30613]' : 'text-[#4299E1]'}>{item.action}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-[var(--text-primary)]">{new Date(item.updated_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</p>
                                    <p className="text-[9px] font-black text-[var(--text-muted)] uppercase">{new Date(item.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
