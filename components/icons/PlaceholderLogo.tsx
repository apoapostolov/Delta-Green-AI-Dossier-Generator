import React from 'react';

export const PlaceholderLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 60"
    {...props}
  >
    <rect width="100%" height="100%" fill="#111827" />
    <text 
        x="50%" 
        y="50%" 
        dy=".3em" 
        textAnchor="middle" 
        fill="#F9B518" 
        fontFamily="Arial Black, Impact, sans-serif"
        fontSize="18"
        letterSpacing="1"
    >
        AI CHARACTER CREATOR
    </text>
     <text 
        x="50%" 
        y="80%" 
        dy=".3em" 
        textAnchor="middle" 
        fill="#9CA3AF" 
        fontFamily="Arial, sans-serif"
        fontSize="8"
        letterSpacing="0.5"
    >
        TEMPLATE
    </text>
  </svg>
);
