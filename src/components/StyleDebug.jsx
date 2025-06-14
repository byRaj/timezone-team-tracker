
import React from 'react';

export const StyleDebug = () => {
  return (
    <div className="fixed top-0 right-0 z-50 p-2 bg-red-500 text-white text-xs">
      <div>CSS Loaded: {document.querySelector('style') ? 'Yes' : 'No'}</div>
      <div>Tailwind: {getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)' ? 'Yes' : 'No'}</div>
      <div className="debug-css-loaded w-2 h-2"></div>
    </div>
  );
};
