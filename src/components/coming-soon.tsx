"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { BackgroundAnimation } from "@/components/ui-animation";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 2 months from now
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 2);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#ff6b6b] mb-1">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-sm text-white/70">{label}</div>
        </div>
      ))}
    </div>
  );
}

export function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1333]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1333] via-[#2a1f4d] to-[#0c0817] animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff6b6b]/5 to-transparent animate-pulse"></div>
      </div>
      <BackgroundAnimation />
      <div className="max-w-md w-full space-y-12 text-center relative z-10">
        <div className="space-y-4 flex flex-col items-center">
          <Logo className="w-full max-w-[300px]" />
          <p className="text-lg text-white/80">Innovation is on its way</p>
        </div>
        
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Coming Soon</CardTitle>
            <CardDescription className="text-white/70">
              We&apos;re working hard to bring you something amazing. Be the first to know when we launch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CountdownTimer />
          </CardContent>
          <CardFooter className="flex justify-center border-t border-white/10 pt-4">
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/modluc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <LinkedinIcon className="h-6 w-6" />
              </a>
            </div>
          </CardFooter>
        </Card>
        
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Modluc. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
} 