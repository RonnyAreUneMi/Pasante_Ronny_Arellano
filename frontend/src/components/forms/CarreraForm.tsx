import React, { useState, useEffect } from 'react';
import { carreraService, modalidadService } from '../../services/api';
import { useToast } from '../ui/Toast';
import { Carrera, CarreraForm as ICarreraForm, Modalidad } from '../../types';

interface CarreraFormProps {
  carrera?: Carrera | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const CarreraForm: React.FC<CarreraFormProps> = ({ carrera, onSuccess, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [modalidadId, setModalidadId] = useState<number>(0);
  const [modalidades, setModalidades] = useState<Modalidad[]>([]);
  const [estado, setEstado] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchModalidades = async () => {
      try {
        const response = await modalidadService.getAll();
        if (response.data.is_success) {
          const data = response.data.data;
          const items = Array.isArray(data) ? data : (data as any).data || [];
          setModalidades(items.filter((m: Modalidad) => m.estado));

          if (!carrera && items.length > 0) {
            setModalidadId(items[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching modalidades:", error);
      }
    };

    fetchModalidades();
  }, [carrera]);

  useEffect(() => {
    if (carrera) {
      setNombre(carrera.nombre);
      setModalidadId(carrera.modalidad);
      setEstado(carrera.estado);
    }
  }, [carrera]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalidadId) {
      showToast({ title: 'Error', message: 'Seleccione una modalidad', type: 'error' });
      return;
    }
    setLoading(true);

    const data: ICarreraForm = {
      nombre,
      modalidad: modalidadId,
      estado
    };

    try {
      if (carrera) {
        await carreraService.update(carrera.id, data);
        showToast({ title: 'Éxito', message: 'Carrera actualizada', type: 'success' });
      } else {
        await carreraService.create(data);
        showToast({ title: 'Éxito', message: 'Carrera creada', type: 'success' });
      }
      onSuccess();
    } catch (error) {
      showToast({ title: 'Error', message: 'Error en la solicitud', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn p-2">
      <h2 className="text-2xl font-black text-[var(--text-primary)] mb-6 tracking-tighter uppercase">
        {carrera ? 'Editar' : 'Nueva'} <span className="text-[#E30613]">Carrera</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full neu-inset p-3.5 text-base font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-[#E30613]/20 transition-all outline-none"
            placeholder="Ej: Ingeniería en Software"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Modalidad</label>
          <select
            value={modalidadId}
            onChange={(e) => setModalidadId(Number(e.target.value))}
            className="w-full neu-inset p-3.5 text-base font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-[#E30613]/20 transition-all outline-none appearance-none bg-no-repeat bg-right"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23A0AEC0\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundSize: '1.5em', backgroundPosition: 'right 1rem center' }}
            required
          >
            <option value="" disabled>Seleccione una modalidad</option>
            {modalidades.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4 py-3 px-5 neu-inset rounded-2xl">
          <span className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest flex-1">Activa</span>
          <button
            type="button"
            onClick={() => setEstado(!estado)}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${estado ? 'bg-[#48BB78]' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${estado ? 'left-7.5' : 'left-0.5'}`}></div>
          </button>
        </div>

        <div className="flex items-center space-x-4 pt-6">
          <button type="submit" disabled={loading} className="flex-1 neu-button-primary !py-3 !text-sm">
            {loading ? 'Guardando...' : (carrera ? 'Actualizar' : 'Crear')}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 font-black text-[var(--text-muted)] text-sm uppercase hover:text-[#E30613] transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarreraForm;