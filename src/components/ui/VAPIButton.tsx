import React from 'react';
import { useVAPITheme } from '../../hooks/useVAPITheme';
import { getVAPIButtonClasses } from '../../utils/vapiThemeUtils';

export interface VAPIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

/**
 * VAPI-aware button component that adapts to theme
 */
export const VAPIButton: React.FC<VAPIButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const { isActive } = useVAPITheme();

  const buttonClasses = getVAPIButtonClasses(variant, size, isActive, className);

  return (
    <button
      className={`${buttonClasses} group relative overflow-hidden`}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default VAPIButton;