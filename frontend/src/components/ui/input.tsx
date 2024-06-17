import React, { RefObject } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'date';
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  inputRef?: RefObject<HTMLInputElement>;
}

const Input = ({ type, id, label, icon: Icon, placeholder, inputRef, ...restProps }: CustomInputProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor={id}>
        {label}
      </label>
      <div className="flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-3 bg-white">
        <Icon className="h-5 w-5 text-zinc-500" />
        <input
          ref={inputRef}
          id={id}
          type={type}
          className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder={placeholder}
          {...restProps}
        />
      </div>
    </div>
  );
};

export { Input }