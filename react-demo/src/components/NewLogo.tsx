import React from 'react';

interface LogoProps {
  className?: string;
}

export default function NewLogo({ className }: LogoProps) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`outer-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB300" />
          <stop offset="25%" stopColor="#FF1744" />
          <stop offset="50%" stopColor="#D500F9" />
          <stop offset="75%" stopColor="#2979FF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <linearGradient id={`inner-${id}`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00B8D4" />
        </linearGradient>
      </defs>
      <path d="M 60 16 A 37 37 0 1 0 78 67" stroke={`url(#outer-${id})`} strokeWidth="9" strokeLinecap="round" />
      <path d="M 37 61 A 21 21 0 0 0 73 48" stroke={`url(#inner-${id})`} strokeWidth="9" strokeLinecap="round" />
      <path d="M 35 52 L 46 43 L 55 43 L 64 35 L 75 25" stroke="#FFB300" strokeWidth="3.5" />
      <circle cx="35" cy="52" r="4.5" fill="#FF4B4B" />
      <circle cx="46" cy="43" r="4.5" fill="#FFB300" />
      <circle cx="55" cy="43" r="4.5" fill="#FFD500" />
      <circle cx="64" cy="35" r="4.5" fill="#FFE600" />
      <path d="M 68 23 L 79 19 L 77 31 Z" fill="#2ECC71" stroke="#2ECC71" strokeLinejoin="round" strokeWidth="1" />
    </svg>
  );
}
