export interface Modalidad {
  id: number;
  nombre: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface ModalidadForm {
  id?: number;
  nombre: string;
  estado: boolean;
}

export interface Carrera {
  id: number;
  nombre: string;
  modalidad: number;
  modalidad_nombre: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface CarreraForm {
  id?: number;
  nombre: string;
  modalidad: number;
  estado: boolean;
}

export interface ApiResponse<T> {
  is_success: boolean;
  message: string;
  data: T;
  form?: {
    [key: string]: {
      errors: { [field: string]: string[] };
    };
  };
}