import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/40 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal Card - Main Container */}
      <div className="relative w-full max-w-2xl neu-card bg-white overflow-hidden animate-slideUp flex flex-col max-h-[90vh] shadow-2xl">

        {/* Persistent Close Button - Outside scroll area */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-[110] p-2.5 rounded-2xl bg-white/80 backdrop-blur-sm text-[var(--text-muted)] hover:text-[#E30613] hover:bg-white shadow-lg transition-all active:scale-90 flex items-center justify-center border border-gray-100"
          title="Cerrar (Esc)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 pt-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;