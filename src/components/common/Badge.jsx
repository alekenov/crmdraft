import React from 'react';

const variants = {
  primary: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800'
};

const Badge = ({ 
  children, 
  variant = 'primary',
  className = "" 
}) => (
  <span className={`
    px-2 py-0.5 rounded-full text-xs font-medium
    ${variants[variant]}
    ${className}
  `}>
    {children}
  </span>
);

export default Badge; 