import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Primary uses the mapped 'primary' color (e3d5ca)
    primary: "bg-primary text-neutralDark hover:bg-[#d6c5b8] focus:ring-primary shadow-lg shadow-primary/20",
    secondary: "bg-secondary text-neutralDark hover:bg-[#c2b5aa] focus:ring-secondary",
    // Outline updated for ADA: Dark border/text for visibility on light backgrounds
    outline: "border-2 border-neutralDark text-neutralDark hover:bg-neutralDark/5 focus:ring-neutralDark",
    text: "text-neutralDark hover:text-primary underline-offset-4 hover:underline p-0 shadow-none"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  // If className contains bg/text overrides, they will take precedence via Tailwind cascade if placed last
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};