"use client"

import { digitalNumbers } from '@/styles/fonts';
import { useState, useEffect, JSX } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownUnit {
  label: string;
  value: number;
}

// Set this to your actual event date/time
const TARGET_DATE: Date = new Date('2026-10-15T09:00:00');

function useCountdown(targetDate: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): void => {
      const difference: number = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft(); // run immediately so there's no flash of 00:00:00:00
    const interval: ReturnType<typeof setInterval> = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// pad to 2 digits
const pad = (num: number): string => String(num).padStart(2, '0');

export default function Countdown(): JSX.Element {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  const units: CountdownUnit[] = [
    { label: 'Days', value: days },
    { label: 'Hr', value: hours },
    { label: 'Mins', value: minutes },
    { label: 'Sec', value: seconds },
  ];

  return (
    <>
      {units.map((unit) => (
        <div key={unit.label} className='md:scale-100 scale-[65%]'>
          <div
            className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}
          >
            {pad(unit.value)}
          </div>
          <p className='text-[24px] mt-3.75 text-center text-[#484848]'>{unit.label}</p>
        </div>
      ))}
    </>
  );
}