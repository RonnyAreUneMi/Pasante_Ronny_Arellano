import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  title?: string;
  actions?: React.ReactNode;

  // Pagination Props
  currentPage?: number;
  pageSize?: number;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
}

function Table<T extends { id: number }>({
  data,
  columns,
  loading = false,
  onEdit,
  onDelete,
  title,
  actions,
  currentPage = 1,
  pageSize = 10,
  totalRecords = 0,
  onPageChange,
}: TableProps<T>) {

  const totalPages = Math.ceil(totalRecords / pageSize);
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 p-12">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-8 border-gray-200 dark:border-gray-800 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-[#E30613] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {(title || actions) && (
        <div className="flex items-center justify-between mb-10 px-4">
          {title && (
            <div>
              <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter uppercase">{title}</h2>
              <div className="h-1.5 w-20 bg-[#E30613] mt-2 rounded-full"></div>
            </div>
          )}
          {actions && <div className="flex items-center space-x-4">{actions}</div>}
        </div>
      )}

      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-8 py-4 text-left text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-8 py-4 text-center text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">
                  Gestión
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="group">
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className="px-8 py-6 text-base font-bold text-[var(--text-primary)] bg-[var(--bg-card)] first:rounded-l-[2rem] last:rounded-r-[2rem] shadow-[var(--shadow-flat)] transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-xl"
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] || '')
                    }
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-8 py-6 bg-[var(--bg-card)] last:rounded-r-[2rem] shadow-[var(--shadow-flat)] group-hover:scale-[1.01] group-hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-center space-x-4">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="
                            p-3 rounded-2xl text-[#4299E1]
                            shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-flat)]
                            active:shadow-[var(--shadow-button-active)] active:scale-90
                            transition-all duration-300
                          "
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="
                            p-3 rounded-2xl text-[#F56565]
                            shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-flat)]
                            active:shadow-[var(--shadow-button-active)] active:scale-90
                            transition-all duration-300
                          "
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="neu-card m-12 py-24 text-center animate-fadeIn">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[var(--bg-main)] flex items-center justify-center shadow-[var(--shadow-inset)]">
              <svg className="w-10 h-10 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">No se encontraron resultados</p>
            <p className="text-[var(--text-secondary)] mt-3 font-bold">Prueba ajustando los filtros o realizando una nueva búsqueda.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalRecords > 0 && onPageChange && (
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-white/50 rounded-[2.5rem] shadow-[var(--shadow-inset)] border border-white/40 gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">Visualización</p>
            <p className="text-sm font-bold text-[var(--text-primary)]">
              Mostrando <span className="text-[#E30613]">{startRecord}-{endRecord}</span> de <span className="text-[#E30613]">{totalRecords}</span> registros
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                p-4 rounded-2xl transition-all duration-300
                ${currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[var(--text-primary)] hover:bg-[#E30613] hover:text-white shadow-[var(--shadow-button)] hover:shadow-xl active:scale-90'}
              `}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="px-6 py-3 bg-[var(--bg-main)] rounded-2xl shadow-[var(--shadow-inset)] text-sm font-black text-[var(--text-primary)]">
              Página <span className="text-[#E30613]">{currentPage}</span> de {totalPages || 1}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                p-4 rounded-2xl transition-all duration-300
                ${currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[var(--text-primary)] hover:bg-[#E30613] hover:text-white shadow-[var(--shadow-button)] hover:shadow-xl active:scale-90'}
              `}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;