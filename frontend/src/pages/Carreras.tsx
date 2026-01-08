import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import CarreraForm from '../components/forms/CarreraForm';
import SearchInput from '../components/ui/SearchInput';
import { carreraService, modalidadService } from '../services/api';
import { useToast } from '../components/ui/Toast';
import { Carrera, Modalidad } from '../types';

const Carreras: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [modalidades, setModalidades] = useState<Modalidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarrera, setSelectedCarrera] = useState<Carrera | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Estados de Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalidad, setFilterModalidad] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');

  const { showToast } = useToast();

  const fetchCarreras = React.useCallback(async (page: number = 1, currentSize: number = pageSize, search?: string, mod?: string, est?: string) => {
    setLoading(true);
    const offset = (page - 1) * currentSize;
    try {
      const response = await carreraService.getAll(
        search !== undefined ? search : searchQuery,
        mod !== undefined ? mod : filterModalidad,
        est !== undefined ? est : filterEstado,
        currentSize,
        offset
      );
      if (response.data.is_success) {
        const data = response.data.data;
        setCarreras(Array.isArray(data) ? data : (data as any).data || []);
        setTotalRecords((data as any).recordsTotal || 0);
      }
    } catch (error) {
      console.error("Error fetching carreras:", error);
      showToast({ title: 'Error', message: 'Error al cargar las carreras', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [showToast, searchQuery, filterModalidad, filterEstado, pageSize]);

  const fetchModalidades = React.useCallback(async () => {
    try {
      const response = await modalidadService.getAll();
      if (response.data.is_success) {
        const data = response.data.data;
        setModalidades(Array.isArray(data) ? data : (data as any).data || []);
      }
    } catch (error) {
      console.error("Error fetching modalidades:", error);
    }
  }, []);

  useEffect(() => {
    fetchCarreras(1, pageSize);
    fetchModalidades();
  }, [fetchCarreras, fetchModalidades]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchCarreras(1, pageSize, query);
  };

  const handleFilterMod = (val: string) => {
    setFilterModalidad(val);
    setCurrentPage(1);
    fetchCarreras(1, pageSize, undefined, val);
  };

  const handleFilterEst = (val: string) => {
    setFilterEstado(val);
    setCurrentPage(1);
    fetchCarreras(1, pageSize, undefined, undefined, val);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCarreras(page, pageSize);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    fetchCarreras(1, newSize);
  };

  const handleAdd = () => {
    setSelectedCarrera(null);
    setIsModalOpen(true);
  };

  const handleEdit = (carrera: Carrera) => {
    setSelectedCarrera(carrera);
    setIsModalOpen(true);
  };

  const handleDelete = async (carrera: Carrera) => {
    if (window.confirm(`¿Estás seguro de eliminar la carrera "${carrera.nombre}"?`)) {
      try {
        await carreraService.delete(carrera.id);
        showToast({ title: 'Éxito', message: 'Carrera eliminada correctamente', type: 'success' });
        fetchCarreras(currentPage, pageSize);
      } catch (error) {
        showToast({ title: 'Error', message: 'Error al eliminar la carrera', type: 'error' });
      }
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchCarreras(currentPage, pageSize);
  };

  const columns = [
    {
      key: 'nombre',
      header: 'Especialidad / Carrera',
      render: (item: Carrera) => (
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#E30613]/10 text-[#E30613] flex items-center justify-center font-black">
            {item.nombre.charAt(0)}
          </div>
          <span className="text-lg font-black tracking-tighter">{item.nombre}</span>
        </div>
      )
    },
    {
      key: 'modalidad_nombre',
      header: 'Modalidad',
      render: (item: Carrera) => (
        <span className="text-sm font-bold text-[var(--text-secondary)]">
          {item.modalidad_nombre}
        </span>
      )
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (item: Carrera) => (
        <span className={`
                    px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                    ${item.estado
            ? 'bg-green-100 text-green-600 border border-green-200'
            : 'bg-red-100 text-red-600 border border-red-200'
          }
                `}>
          {item.estado ? 'Activo' : 'Inactivo'}
        </span>
      )
    }
  ];

  const stats = {
    total: totalRecords || carreras.length,
    activas: carreras.filter(c => c.estado).length,
    inactivas: carreras.filter(c => !c.estado).length
  };

  return (
    <Layout title="Gestión de Carreras">
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Total Registros', value: stats.total, color: 'text-[var(--text-primary)]', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Carreras Activas', value: stats.activas, color: 'text-green-500', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'En Inventario', value: stats.inactivas, color: 'text-red-400', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
          ].map((s, idx) => (
            <div key={idx} className="neu-card p-8 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">{s.label}</p>
                <p className={`text-4xl font-black ${s.color} tracking-tighter`}>{s.value}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-main)] shadow-[var(--shadow-inset)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[#E30613] transition-colors">
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-2">Directorio de Carreras</h2>
                <div className="h-1.5 w-20 bg-[#E30613] rounded-full"></div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-[var(--shadow-flat)]">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Ver:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="bg-transparent border-none text-xs font-black text-[#E30613] focus:ring-0 outline-none cursor-pointer"
                  >
                    {[2, 5, 10, 25, 50].map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center space-x-3 px-8 py-4 bg-[#E30613] text-white rounded-2xl hover:bg-[#C00510] hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-[0_12px_24px_rgba(227,6,19,0.3)] border border-white/20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest">Agregar</span>
                </button>
              </div>
            </div>

            {/* Panel de Filtros */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-[#F1F5F9]/50 rounded-[2.5rem] shadow-[var(--shadow-inset)] border border-white/40">

              {/* Buscador */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] px-2">Búsqueda rápida</p>
                <SearchInput
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Escribe el nombre..."
                  className="w-full"
                />
              </div>

              {/* Filtro por Modalidad */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] px-2">Por Modalidad</p>
                <select
                  value={filterModalidad}
                  onChange={(e) => handleFilterMod(e.target.value)}
                  className="w-full h-[60px] px-6 bg-white rounded-full shadow-[var(--shadow-flat)] border-none text-sm font-bold text-[var(--text-primary)] focus:ring-4 focus:ring-[#E30613]/10 outline-none appearance-none cursor-pointer"
                >
                  <option value="">Todas las modalidades</option>
                  {modalidades.map((mod) => (
                    <option key={mod.id} value={mod.id}>{mod.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Estado */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] px-2">Estado Operativo</p>
                <div className="flex bg-white rounded-full p-1.5 shadow-[var(--shadow-flat)] h-[60px]">
                  {[
                    { val: '', label: 'Todos' },
                    { val: 'true', label: 'Activas' },
                    { val: 'false', label: 'Inactivas' }
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      onClick={() => handleFilterEst(btn.val)}
                      className={`
                        flex-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300
                        ${filterEstado === btn.val
                          ? 'bg-[#E30613] text-white shadow-lg'
                          : 'text-[var(--text-muted)] hover:text-[#E30613]'}
                      `}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4">
            <Table
              data={carreras}
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
        <CarreraForm
          carrera={selectedCarrera}
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
};

export default Carreras;