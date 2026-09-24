'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages: string[] = [
  '/assets/deals/woman1.png',
  '/assets/deals/woman2.png',
  '/assets/deals/woman3.png',
];

type Direction = 'next' | 'prev';

export default function DealsCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>('next');

  const length: number = carouselImages.length;

  // Returns the image that belongs in a slot `offset` positions after the current one
  const getSlotImage = (offset: number): string => {
    const index: number = (currentIndex + offset + length) % length;
    return carouselImages[index];
  };

  const goToPrev = (): void => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const goToNext = (): void => {
    setDirection('next');
    setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='w-full md:w-333 relative md:flex items-center justify-start block gap-6 md:ml-0 md:mr-0 ml-auto mr-auto'>

      {/* Control Buttons */}
      <div className='bottom-0 w-max flex flex-col items-center justify-end md:h-full h-max md:mb-0 mb-3'>
        <div className=' flex items-center justify-between md:gap-4 gap-2'>
          {/* Left control Button */}
          <div
            onClick={goToPrev}
            className='md:size-12 size-10 shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-full flex items-center justify-center cursor-pointer'
          >
            <ChevronLeft className=' text-[#B6B6B6]' />
          </div>

          {/* Right control Button */}
          <div
            onClick={goToNext}
            className='md:size-12 size-10 shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-full flex items-center justify-center cursor-pointer'
          >
            <ChevronRight className=' text-black' />
          </div>
        </div>
      </div>

      {/* carousel Images */}
      <div className=' w-full md:h-125 h-70 grid grid-flow-col md:auto-cols-87.5 auto-cols-max min-w-0 grid-rows-6 md:gap-6 gap-3 scrollbar-none relative overflow-hidden'>

        {/* Slot 0 — large card */}
        <div className='relative row-span-6 flex items-center justify-center overflow-clip md:w-full w-max'>
          <Image
            key={`slot0-${currentIndex}`}
            src={getSlotImage(0)}
            alt={`slide ${currentIndex + 1}`}
            className={`md:w-max w-auto h-full ${direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
            width={400}
            height={500}
          />
        </div>

        {/* Slot 1 */}
        <div className='row-span-5 overflow-clip'>
          <Image
            key={`slot1-${currentIndex}`}
            src={getSlotImage(1)}
            alt={`slide ${((currentIndex + 1) % length) + 1}`}
            className={`md:w-max w-auto h-full ${direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
            width={400}
            height={500}
          />
        </div>

        {/* Slot 2 */}
        <div className='row-span-5 overflow-clip'>
          <Image
            key={`slot2-${currentIndex}`}
            src={getSlotImage(2)}
            alt={`slide ${((currentIndex + 2) % length) + 1}`}
            className={`md:w-max w-auto h-full ${direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
            width={400}
            height={500}
          />
        </div>

        <div className='row-span-5 overflow-clip'></div>

        {/* Discount Card */}
        <div className='absolute bottom-0 left-0 md:w-54.25 w-34 md:h-32.5 h-20 bg-white ml-6 mb-6 flex items-center justify-center md:p-0 p-5'>
          <div className=''>
            <div className=' md:flex md:flex-row flex-col items-center justify-between gap-3'>
              <h5 className=' md:text-[16px] text-[12px]'>{String(currentIndex + 1).padStart(2, '0')}</h5>
              <svg width="27" height="1" viewBox="0 0 27 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0.5H27" stroke="#484848" />
              </svg>
              <h5 className=' md:text-[16px] text-[12px]'>Spring Sale</h5>
            </div>
            <h3 className='md:text-[28px] text-[18px]'>30% OFF</h3>
          </div>
        </div>

        {/* Indicators */}
        <div className='col-start-2 row-start-6 col-span-1 row-span-1 w-max md:gap-5 gap-2 h-7.5 self-end flex items-end justify-between absolute z-10'>
          {carouselImages.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 'next' : 'prev');
                setCurrentIndex(i);
              }}
              className={`md:w-6.75 md:h-6.75 size-3 rounded-full ring-black flex items-center justify-center cursor-pointer ${i === currentIndex ? 'border' : 'border-0'}`}
            >
              <div className={`md:w-2.75 md:h-2.75 size-1.5 rounded-full ${i === currentIndex ? 'bg-black' : 'bg-[#B6B6B6]'}`} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(24px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-24px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        :global(.animate-slide-in-right) {
          animation: slideInRight 0.35s ease-out;
        }
        :global(.animate-slide-in-left) {
          animation: slideInLeft 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}