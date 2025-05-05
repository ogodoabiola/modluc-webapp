import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="48" height="48" rx="8" fill="currentColor" fillOpacity="0.1" />
        <path
          d="M14 16V32H18V24H22V32H26V24H30V32H34V16H30V20H26V16H22V20H18V16H14Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-bold text-2xl tracking-tight">MODLUC</span>
    </div>
  );
} 