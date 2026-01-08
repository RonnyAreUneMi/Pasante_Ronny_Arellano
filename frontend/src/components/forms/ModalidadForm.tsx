import React, { useState, useEffect } from 'react';
import { modalidadService } from '../../services/api';
import { useToast } from '../ui/Toast';
import { Modalidad, ModalidadForm as IModalidadForm } from '../../types';

interface ModalidadFormProps {
  modalidad?: Modalidad | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ModalidadForm: React.FC<ModalidadFormProps> = ({ modalidad, onSuccess, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (modalidad) {
      setNombre(modalidad.nombre);
      setEstado(modalidad.estado);
    }
  }, [modalidad]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data: IModalidadForm = {
      nombre,
      estado
    };

    try {
      if (modalidad) {
        await modalidadService.update(modalidad.id, data);
        showToast({ title: 'Éxito', message: 'Modalidad actualizada', type: 'success' });
      } else {
        await modalidadService.create(data);
        showToast({ title: 'Éxito', message: 'Modalidad creada', type: 'success' });
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
        {modalidad ? 'Editar' : 'Nueva'} <span className="text-[#4299E1]">Modalidad</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full neu-inset p-3.5 text-base font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-[#4299E1]/20 transition-all outline-none"
            placeholder="Ej: Online (Asincrónico)"
            required
          />
        </div>

        <div className="flex items-center space-x-4 py-3 px-5 neu-inset rounded-2xl">
          <span className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest flex-1">Estado Operativo</span>
          <button
            type="button"
            onClick={() => setEstado(!estado)}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${estado ? 'bg-[#48BB78]' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${estado ? 'left-7.5' : 'left-0.5'}`}></div>
          </button>
        </div>

        <div className="flex items-center space-x-4 pt-6">
          <button type="submit" disabled={loading} className="flex-1 neu-button-primary !bg-[#4299E1] !py-3 !text-sm">
            {loading ? 'Guardando...' : (modalidad ? 'Actualizar' : 'Crear')}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 font-black text-[var(--text-muted)] text-sm uppercase hover:text-[#4299E1] transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalidadForm;