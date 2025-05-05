import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/modlucLogo.png"
        alt="Modluc Logo"
        width={300}
        height={80}
        priority
      />
    </div>
  );
} 