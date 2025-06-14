
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db'
  };

  const iconStyle = {
    width: '12px',
    height: '12px',
    color: theme === 'dark' ? '#9ca3af' : '#6b7280',
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    opacity: 0.6
  };

  const activeIconStyle = {
    ...iconStyle,
    color: theme === 'dark' ? '#ffffff' : '#1f2937',
    transform: 'scale(1.2)',
    opacity: 1
  };

  const switchingStyle = {
    ...iconStyle,
    transform: 'scale(0.8) rotate(180deg)',
    opacity: 0.3
  };

  return (
    <div style={containerStyle}>
      <Sun style={theme === 'light' ? activeIconStyle : iconStyle} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
        style={{
          transition: 'all 0.2s ease',
          transform: 'scale(0.9)'
        }}
      />
      <Moon style={theme === 'dark' ? activeIconStyle : iconStyle} />
    </div>
  );
};
