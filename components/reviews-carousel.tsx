'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { customerReviews } from '@/data/reviews'
import { volkhov } from '@/styles/fonts'

function SideReview({ index, side }: { index: number; side: 'left' | 'right' }) {
  const review = customerReviews[index]
  return <div className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} top-1/2 z-0 hidden h-64 w-[40%] -translate-y-1/2 items-center gap-5 rounded-lg bg-white p-5 text-left shadow-[0_15px_45px_rgba(46,33,61,.08)] md:flex`}>
    <Image src={review.customerProfilePhoto} alt="" width={128} height={128} className="size-28 shrink-0 object-cover" />
    <div className="min-w-0">
      <p className="line-clamp-3 text-xs leading-5 text-[#777]">{review.customerQuote}</p>
      <p className="mt-2 text-sm tracking-tight text-[#FCA120]">{'★'.repeat(review.customerRating)}</p>
      <p className={`${volkhov.className} mt-1 text-base text-[#484848]`}>{review.customerName}</p>
    </div>
  </div>
}

export default function ReviewsCarousel() {
  const [active, setActive] = useState(Math.max(0, customerReviews.findIndex((review) => review.id === 2)))
  const [direction, setDirection] = useState<'next' | 'previous'>('next')
  const review = customerReviews[active]
  const previous = (active - 1 + customerReviews.length) % customerReviews.length
  const next = (active + 1) % customerReviews.length
  const move = (step: number) => {
    setDirection(step > 0 ? 'next' : 'previous')
    setActive((index) => (index + step + customerReviews.length) % customerReviews.length)
  }

  return <section className="w-full bg-[#FAFAFA] px-5 py-14 md:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto grid max-w-3xl gap-2 text-center">
        <h2 className={`${volkhov.className} text-3xl text-[#484848] md:text-5xl`}>This Is What Our Customers Say</h2>
        <p className="text-sm text-[#8A8A8A] md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis</p>
      </div>

      <div className="relative mx-auto mt-10 flex min-h-[360px] max-w-7xl items-center justify-center md:mt-12 md:min-h-[330px]">
        <SideReview index={previous} side="left" />
        <SideReview index={next} side="right" />

        <article key={review.id} aria-live="polite" className={`relative z-10 grid w-full items-center gap-5 rounded-lg bg-white p-6 shadow-[0_15px_45px_rgba(46,33,61,.1)] sm:p-8 md:w-[68%] md:grid-cols-[.9fr_1.2fr] md:gap-8 md:p-8 ${direction === 'next' ? 'animate-[review-enter-next_.42s_cubic-bezier(.22,1,.36,1)_both]' : 'animate-[review-enter-previous_.42s_cubic-bezier(.22,1,.36,1)_both]'}`}>
          <div className="relative mx-auto aspect-square w-36 max-w-full md:w-full">
            <span aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 bg-[#d8d8d8]" />
            <Image src={review.customerProfilePhoto} alt={review.customerName} fill sizes="(max-width: 640px) 144px, 260px" className="object-cover" />
          </div>
          <div>
            <p className="text-sm leading-6 text-[#484848] md:text-[15px]">{review.customerQuote}</p>
            <p className="mt-3 text-lg tracking-tight text-[#FCA120]" aria-label={`${review.customerRating} out of 5 stars`}>{'★'.repeat(review.customerRating)}<span className="text-[#ddd]">{'★'.repeat(5-review.customerRating)}</span></p>
            <div className="mt-4 h-px w-36 bg-[#484848]" />
            <h3 className={`${volkhov.className} mt-3 text-xl text-[#484848] md:text-2xl`}>{review.customerName}</h3>
            <p className="mt-1 text-xs text-[#777]">{review.customerOccupation}</p>
          </div>
        </article>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={() => move(-1)} aria-label="Previous customer review" className="grid size-10 place-items-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white"><ChevronLeft /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next customer review" className="grid size-10 place-items-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white"><ChevronRight /></button>
      </div>
    </div>
  </section>
}
