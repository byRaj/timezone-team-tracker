
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
    width: '16px',
    height: '16px',
    color: theme === 'dark' ? '#9ca3af' : '#6b7280'
  };

  const activeIconStyle = {
    ...iconStyle,
    color: theme === 'dark' ? '#ffffff' : '#1f2937'
  };

  return (
    <div style={containerStyle}>
      <Sun style={theme === 'light' ? activeIconStyle : iconStyle} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon style={theme === 'dark' ? activeIconStyle : iconStyle} />
    </div>
  );
};
