
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
    color: theme === 'dark' ? '#ffffff' : '#1f2937',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: theme === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const svgStyle = {
    width: '1.2em',
    height: '1.2em',
    transition: 'transform 0.3s ease'
  };

  return (
    <button
      style={buttonStyle}
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={svgStyle}
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z" />
      </svg>
    </button>
  );
};
