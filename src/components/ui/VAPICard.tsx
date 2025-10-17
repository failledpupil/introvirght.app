import React from 'react';
import { useVAPITheme } from '../../hooks/useVAPITheme';
import { getVAPICardClasses, getVAPIDataAttributes } from '../../utils/vapiThemeUtils';

export interface VAPICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

/**
 * VAPI-aware card component that adapts to theme
 */
export const VAPICard: React.FC<VAPICardProps> = ({
  children,
  hoverable = false,
  className,
  ...props
}) => {
  const { isActive, config } = useVAPITheme();

  const cardClasses = getVAPICardClasses(isActive, hoverable, className);
  const dataAttributes = getVAPIDataAttributes(config);

  return (
    <div
      className={`${cardClasses} transition-all duration-300 ${
        hoverable ? 'hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer' : ''
      }`}
      {...dataAttributes}
      {...props}
    >
      <div className="relative">
        {hoverable && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
        )}
        {children}
      </div>
    </div>
  );
};

export default VAPICard;