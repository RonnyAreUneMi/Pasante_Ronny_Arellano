import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import ModalidadForm from '../components/forms/ModalidadForm';
import SearchInput from '../components/ui/SearchInput';
import { modalidadService } from '../services/api';
import { useToast } from '../components/ui/Toast';
import { Modalidad } from '../types';

const Modalidades: React.FC = () => {
  const [modalidades, setModalidades] = useState<Modalidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalidad, setSelectedModalidad] = useState<Modalidad | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 10;

  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const fetchModalidades = React.useCallback(async (page: number = 1, search?: string) => {
    setLoading(true);
    const offset = (page - 1) * pageSize;
    try {
      const response = await modalidadService.getAll(
        search !== undefined ? search : searchQuery,
        pageSize,
        offset
      );
      if (response.data.is_success) {
        const data = response.data.data;
        setModalidades(Array.isArray(data) ? data : (data as any).data || []);
        setTotalRecords((data as any).recordsTotal || 0);
      }
    } catch (error) {
      console.error("Error fetching modalidades:", error);
      showToast({ title: 'Error', message: 'Error al cargar las modalidades', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [showToast, searchQuery, pageSize]);

  useEffect(() => {
    fetchModalidades(1);
  }, [fetchModalidades]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchModalidades(1, query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchModalidades(page);
  };

  const handleAdd = () => {
    setSelectedModalidad(null);
    setIsModalOpen(true);
  };

  const handleEdit = (modalidad: Modalidad) => {
    setSelectedModalidad(modalidad);
    setIsModalOpen(true);
  };

  const handleDelete = async (modalidad: Modalidad) => {
    if (window.confirm(`¿Estás seguro de eliminar la modalidad "${modalidad.nombre}"?`)) {
      try {
        await modalidadService.delete(modalidad.id);
        showToast({ title: 'Éxito', message: 'Modalidad eliminada correctamente', type: 'success' });
        fetchModalidades(currentPage);
      } catch (error) {
        showToast({ title: 'Error', message: 'Error al eliminar la modalidad', type: 'error' });
      }
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchModalidades(currentPage);
  };

  const columns = [
    {
      key: 'nombre',
      header: 'Nombre de la Modalidad',
      render: (item: Modalidad) => (
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#4299E1] flex items-center justify-center font-black shadow-inner">
            {item.nombre.charAt(0)}
          </div>
          <span className="text-lg font-black tracking-tighter">{item.nombre}</span>
        </div>
      )
    },
    {
      key: 'estado',
      header: 'Estado Operativo',
      render: (item: Modalidad) => (
        <span className={`
                    px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                    ${item.estado
            ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm'
            : 'bg-gray-100 text-gray-500 border border-gray-200 shadow-sm'
          }
                `}>
          {item.estado ? 'Operativo' : 'Inactivo'}
        </span>
      )
    }
  ];

  const stats = {
    total: totalRecords || modalidades.length,
    activas: modalidades.filter(m => m.estado).length,
    inactivas: modalidades.filter(m => !m.estado).length
  };

  return (
    <Layout title="Gestión de Modalidades">
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Total Modalidades', value: stats.total, color: 'text-[var(--text-primary)]', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
            { label: 'Mod. Activas', value: stats.activas, color: 'text-[#4299E1]', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Mod. Inactivas', value: stats.inactivas, color: 'text-[var(--text-muted)]', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
          ].map((s, idx) => (
            <div key={idx} className="neu-card p-8 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">{s.label}</p>
                <p className={`text-4xl font-black ${s.color} tracking-tighter`}>{s.value}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-main)] shadow-[var(--shadow-inset)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[#4299E1] transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="neu-card p-10 space-y-10">
          <div className="px-4">
            {/* Cabecera Principal */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-2">Lista de Modalidades</h2>
                <div className="h-1.5 w-20 bg-[#4299E1] rounded-full"></div>
              </div>

              <button
                onClick={handleAdd}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-[#4299E1] text-white rounded-2xl hover:bg-[#3182CE] hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-[0_12px_24px_rgba(66,153,225,0.3)] border border-white/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs font-black uppercase tracking-widest">Agregar</span>
              </button>
            </div>

            {/* Buscador Desplazado Abajo */}
            <div className="animate-slideUp max-w-2xl">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3 px-2">Filtrar modalidades:</p>
              <SearchInput
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Escribe el nombre de la modalidad..."
                className="w-full"
              />
            </div>
          </div>

          <div className="pt-4">
            <Table
              data={modalidades}
              columns={columns}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              currentPage={currentPage}
              pageSize={pageSize}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalidadForm
          modalidad={selectedModalidad}
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
};

export default Modalidades;