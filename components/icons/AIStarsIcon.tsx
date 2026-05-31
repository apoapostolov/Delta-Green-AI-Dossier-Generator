import React from 'react';

export const AIStarsIcon: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => (
  <i className={`fa-solid fa-wand-magic-sparkles ${className || ''}`} {...props}></i>
);
