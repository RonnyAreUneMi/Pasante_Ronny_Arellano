import axios from 'axios';
import { Modalidad, ModalidadForm, Carrera, CarreraForm, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const modalidadService = {
  getAll: (search?: string, limit: number = 10, offset: number = 0) =>
    apiClient.get<ApiResponse<{ data: Modalidad[]; recordsTotal: number; recordsFiltered: number }>>('/modalidades/data-table/', {
      params: { search, limit, offset }
    }),

  create: (data: ModalidadForm) =>
    apiClient.post<ApiResponse<Modalidad>>('/modalidades/save/', data),

  update: (id: number, data: ModalidadForm) =>
    apiClient.post<ApiResponse<Modalidad>>('/modalidades/save/', { ...data, id }),

  delete: (id: number) =>
    apiClient.delete<ApiResponse<null>>(`/modalidades/delete/?id=${id}`),
};

export const carreraService = {
  getAll: (search?: string, modalidad?: number | string, estado?: boolean | string, limit: number = 10, offset: number = 0) =>
    apiClient.get<ApiResponse<{ data: Carrera[]; recordsTotal: number; recordsFiltered: number }>>('/carreras/data-table/', {
      params: {
        search,
        modalidad: modalidad || undefined,
        estado: estado === '' ? undefined : estado,
        limit,
        offset
      }
    }),

  create: (data: CarreraForm) =>
    apiClient.post<ApiResponse<Carrera>>('/carreras/save/', data),

  update: (id: number, data: CarreraForm) =>
    apiClient.post<ApiResponse<Carrera>>('/carreras/save/', { ...data, id }),

  delete: (id: number) =>
    apiClient.delete<ApiResponse<null>>(`/carreras/delete/?id=${id}`),
};

export const dashboardService = {
  getStats: () => apiClient.get<ApiResponse<any>>('/dashboard/'),
};

export default apiClient;