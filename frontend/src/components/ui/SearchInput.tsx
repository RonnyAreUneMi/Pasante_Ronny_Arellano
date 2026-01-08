import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = "Buscar...",
    className = ""
}) => {
    return (
        <div className={`relative group ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    w-full px-8 py-4 pl-14
                    bg-white text-[var(--text-primary)] 
                    rounded-full shadow-[var(--shadow-inset)]
                    focus:ring-4 focus:ring-[#E30613]/10
                    transition-all duration-500 outline-none border-none text-sm font-bold
                "
            />
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[#E30613] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    );
};

export default SearchInput;
