import React from 'react';
import { cn } from '../../utils/cn';
import { useVAPITheme } from '../../hooks/useVAPITheme';
import { isVAPIThemeActive } from '../../utils/vapiThemeUtils';
import logoIconLight from '../../assets/branding/introvirght-modern-icon.svg';
import logoIconDark from '../../assets/branding/introvirght-modern-icon-dark.svg';
import logoWordmarkLight from '../../assets/branding/introvirght-modern-wordmark.svg';
import logoWordmarkDark from '../../assets/branding/introvirght-modern-wordmark-dark.svg';
import logoFullLight from '../../assets/branding/introvirght-modern-full.svg';
import logoFullDark from '../../assets/branding/introvirght-modern-full-dark.svg';

export interface LogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark' | 'auto';
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  xs: { icon: 'h-10 w-10', wordmark: 'h-8 w-auto', full: 'h-10 w-auto' },
  sm: { icon: 'h-14 w-14', wordmark: 'h-10 w-auto', full: 'h-14 w-auto' },
  md: { icon: 'h-16 w-16', wordmark: 'h-12 w-auto', full: 'h-16 w-auto' },
  lg: { icon: 'h-20 w-20', wordmark: 'h-16 w-auto', full: 'h-20 w-auto' },
  xl: { icon: 'h-28 w-28', wordmark: 'h-20 w-auto', full: 'h-24 w-auto' },
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'auto',
  animated = false,
  className,
}) => {
  const vapi = useVAPITheme();
  const [isDark, setIsDark] = React.useState(false);
  const [isVAPIActive, setIsVAPIActive] = React.useState(false);

  React.useEffect(() => {
    if (theme === 'auto') {
      // Check system preference, document class, and VAPI theme
      const checkThemeMode = () => {
        const vapiActive = isVAPIThemeActive() || vapi.isActive;
        const hasDarkClass = document.documentElement.classList.contains('dark');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        setIsVAPIActive(vapiActive);
        // VAPI themes are always dark, so use dark logo variant
        setIsDark(vapiActive || hasDarkClass || prefersDark);
      };

      checkThemeMode();

      // Watch for changes
      const observer = new MutationObserver(checkThemeMode);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      });

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', checkThemeMode);

      return () => {
        observer.disconnect();
        mediaQuery.removeEventListener('change', checkThemeMode);
      };
    } else {
      setIsDark(theme === 'dark');
      setIsVAPIActive(vapi.isActive);
    }
  }, [theme, vapi.isActive]);

  // Select the appropriate logo based on variant and theme
  const getLogoSrc = () => {
    const isDarkMode = theme === 'dark' || (theme === 'auto' && isDark);

    switch (variant) {
      case 'icon':
        return isDarkMode ? logoIconDark : logoIconLight;
      case 'wordmark':
        return isDarkMode ? logoWordmarkDark : logoWordmarkLight;
      case 'full':
      default:
        return isDarkMode ? logoFullDark : logoFullLight;
    }
  };

  const logoSrc = getLogoSrc();
  const sizeClass = sizeMap[size][variant];

  return (
    <div className={cn(
      'logo-container relative inline-flex items-center justify-center',
      animated && 'group cursor-pointer',
      className
    )}>
      <img
        src={logoSrc}
        alt="Introvirght - Digital Diary for Deep Thinkers"
        className={cn(
          sizeClass,
          'object-contain select-none',
          'transition-all duration-500 ease-out',
          animated && [
            'group-hover:scale-110',
            'group-hover:rotate-2',
            'group-hover:drop-shadow-2xl',
            'active:scale-95',
          ],
          isVAPIActive && 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]',
          !isVAPIActive && 'drop-shadow-lg',
        )}
        draggable={false}
        loading="eager"
        style={{
          filter: isVAPIActive
            ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
            : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
        }}
      />
      {animated && (
        <div className={cn(
          'absolute inset-0 rounded-full opacity-0',
          'group-hover:opacity-100 transition-opacity duration-500',
          'bg-gradient-to-r from-blue-500/10 via-blue-400/20 to-blue-300/10',
          'blur-xl -z-10 scale-150'
        )} />
      )}
    </div>
  );


};

export default Logo;
