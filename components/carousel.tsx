'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = ['/assets/deals/woman1.png', '/assets/deals/woman2.png', '/assets/deals/woman3.png']

export default function DealsCarousel() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const move = (step: number) => {
    setDirection(step > 0 ? 'next' : 'prev')
    setActive((index) => (index + step + slides.length) % slides.length)
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 md:w-[calc(100%+320px)] md:grid-cols-[auto_1fr] md:items-end md:gap-5 lg:w-[calc(100%+380px)] 2xl:w-[calc(100%+430px)]">
      <div className="order-2 flex justify-center gap-3 md:order-1 md:pb-0">
        <button type="button" onClick={() => move(-1)} aria-label="Previous deal" className="grid size-10 place-items-center rounded-full bg-white text-[#777] shadow-md transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black md:size-12"><ChevronLeft /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next deal" className="grid size-10 place-items-center rounded-full bg-white text-black shadow-md transition hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black md:size-12"><ChevronRight /></button>
      </div>
      <div className="order-1 min-w-0 md:order-2">
        <div key={active} className={`grid h-[330px] grid-cols-[1.08fr_.92fr] grid-rows-[84%_16%] gap-x-3 overflow-hidden sm:h-[390px] md:h-[min(32vw,580px)] md:grid-cols-[1fr_.92fr_.92fr] md:gap-x-4 ${direction === 'next' ? 'animate-[deal-scene-enter-next_.48s_cubic-bezier(.22,1,.36,1)_both]' : 'animate-[deal-scene-enter-previous_.48s_cubic-bezier(.22,1,.36,1)_both]'}`}>
          {[0, 1, 2].map((offset) => {
            const index = (active + offset) % slides.length
            const placement = offset === 0 ? 'col-start-1 row-start-1 row-span-2 h-full' : offset === 1 ? 'col-start-2 row-start-1 h-full' : 'col-start-3 row-start-1 h-full'
            return <button key={`${active}-${offset}`} type="button" onClick={() => { if (offset === 0) return; setDirection(offset === 1 ? 'next' : 'prev'); setActive(index) }} aria-label={`Show deal ${index + 1}`} aria-current={offset === 0} className={`group relative min-w-0 overflow-hidden bg-[#eee] text-left ${placement} ${offset === 2 ? 'hidden md:block' : ''}`}>
              <Image src={slides[index]} alt={`Spring collection look ${index + 1}`} fill sizes="(max-width: 768px) 45vw, 240px" className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]" />
              {offset === 0 && <span className="absolute bottom-3 left-3 bg-white px-3 py-2 text-left shadow-sm sm:bottom-4 sm:left-4 sm:px-4 sm:py-3"><span className="flex items-center gap-2 text-[9px] text-[#777] sm:text-xs">{String(index + 1).padStart(2, '0')} <span className="h-px w-5 bg-[#777]" /> Spring Sale</span><span className="mt-1 block text-base text-[#484848] sm:text-xl">30% OFF</span></span>}
            </button>
          })}
          <div className="col-start-2 row-start-2 flex items-center justify-start gap-2 md:col-span-2 md:gap-3" role="tablist" aria-label="Choose a deal">
            {slides.map((_, index) => <button key={index} type="button" role="tab" aria-label={`Deal ${index + 1}`} aria-selected={index === active} onClick={() => { if (index === active) return; setDirection(index === (active + 1) % slides.length ? 'next' : 'prev'); setActive(index) }} className={`grid size-5 place-items-center rounded-full ${index === active ? 'border border-black' : ''}`}><span className={`size-2 rounded-full ${index === active ? 'bg-black' : 'bg-[#b6b6b6]'}`} /></button>)}
          </div>
        </div>
      </div>
    </div>
  )
}
