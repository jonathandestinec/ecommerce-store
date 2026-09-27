'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { products } from '@/data/products'
import ProductCard from './product-card'
import { formatNaira } from '@/lib/currency'

const colors = ['#ff6c6c', '#ff7629', '#fff06c', '#9bff6c', '#6cff9e', '#6cffdc', '#6cb9ff', '#6cf6ff', '#6ca7ff', '#6c7bff', '#8a6cff', '#b66cff', '#fc6cff', '#ff6c6c']
const columnClass: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
}
const filterGroups = [
  { title: 'Brands', items: ['Minimog', 'Retrolie', 'Brook', 'Learts', 'Vagabond', 'Abby'] },
  { title: 'Collections', items: ['All products', 'Best sellers', 'New arrivals', 'Accessories'] },
  { title: 'Tags', items: ['Fashion', 'Hats', 'Sandal', 'Belt', 'Bags', 'Sneakers', 'Denim', 'Sunglasses', 'Beachwear'] },
]

export default function ProductGrid() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<string | null>(null)
  const [sort, setSort] = useState('featured')
  const [columns, setColumns] = useState(3)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Brands: true, Collections: true, Tags: true })

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const colorMatches = !selectedColor || product.colors?.includes(selectedColor)
      const [minimum, maximum] = priceRange?.split('-').map(Number) ?? [0, Infinity]
      const priceMatches = !priceRange || (product.price >= minimum && product.price <= maximum)
      return colorMatches && priceMatches
    })
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [selectedColor, priceRange, sort])

  const priceOptions = [
    { bounds: '0-66451', label: `Under ${formatNaira(66451)}` },
    { bounds: '66451-132901', label: `${formatNaira(66451)}–${formatNaira(132901)}` },
    { bounds: '132901-199352', label: `${formatNaira(132901)}–${formatNaira(199352)}` },
    { bounds: '199352-265803', label: `${formatNaira(199352)}–${formatNaira(265803)}` },
    { bounds: '398704-531606', label: `${formatNaira(398704)}–${formatNaira(531606)}` },
  ]

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 pb-16 pt-10 md:grid-cols-[210px_minmax(0,1fr)] md:gap-10 md:px-7 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside aria-label="Product filters" className="grid content-start gap-4 md:gap-7">
        <div className="hidden content-start gap-6 md:grid md:gap-7">
        <h2 className="font-serif text-xl text-[#222]">Filters</h2>

        <fieldset>
          <legend className="mb-3 text-sm font-medium">Size</legend>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL'].map((size) => <span key={size} className="grid size-8 place-items-center rounded border border-[#ddd] text-xs text-[#666]">{size}</span>)}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-medium">Colors</legend>
          <div className="grid max-w-46.25 grid-cols-7 gap-2">
            {colors.map((color, index) => <button key={`${color}-${index}`} type="button" onClick={() => setSelectedColor(selectedColor === color ? null : color)} aria-label={`Filter by color ${color}`} aria-pressed={selectedColor === color} className={`grid size-5 place-items-center rounded-full ${selectedColor === color ? 'ring-1 ring-black ring-offset-2' : ''}`} style={{ backgroundColor: color }} />)}
          </div>
          {selectedColor && <button type="button" onClick={() => setSelectedColor(null)} className="mt-2 text-xs text-[#777] underline">Clear color</button>}
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Prices</legend>
          <div className="grid gap-1.5">
            {priceOptions.map(({ bounds, label }) => <button key={bounds} type="button" aria-pressed={priceRange === bounds} onClick={() => setPriceRange(priceRange === bounds ? null : bounds)} className={`w-fit text-left text-xs transition hover:text-black ${priceRange === bounds ? 'font-semibold text-black' : 'text-[#888]'}`}>{label}</button>)}
          </div>
        </fieldset>

        {filterGroups.map((group) => <section key={group.title} className="border-t border-[#eee] pt-4">
          <button type="button" aria-expanded={expanded[group.title]} onClick={() => setExpanded((current) => ({ ...current, [group.title]: !current[group.title] }))} className="flex w-full items-center justify-between text-left text-sm font-medium">
            {group.title}{expanded[group.title] ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {expanded[group.title] && <div className={`mt-3 ${group.title === 'Tags' ? 'flex flex-wrap gap-x-3 gap-y-2' : 'grid grid-cols-2 gap-y-2'}`}>
            {group.items.map((item) => <span key={item} className="w-fit text-left text-xs text-[#888]">{item}</span>)}
          </div>}
        </section>)}
        </div>

        <details className="group border-y border-[#eee] py-3 md:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">Filters<ChevronDown className="size-4 transition-transform group-open:rotate-180" /></summary>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 pb-2">
            <fieldset><legend className="mb-2 text-xs font-medium">Colors</legend><div className="grid max-w-37.5 grid-cols-7 gap-2">{colors.map((color, index) => <button key={`${color}-${index}`} type="button" onClick={() => setSelectedColor(selectedColor === color ? null : color)} aria-label={`Filter by color ${color}`} aria-pressed={selectedColor === color} className={`size-4 rounded-full ${selectedColor === color ? 'ring-1 ring-black ring-offset-2' : ''}`} style={{ backgroundColor: color }} />)}</div></fieldset>
            <fieldset><legend className="mb-2 text-xs font-medium">Prices</legend><div className="grid gap-1.5">{priceOptions.map(({ bounds, label }) => <button key={bounds} type="button" aria-pressed={priceRange === bounds} onClick={() => setPriceRange(priceRange === bounds ? null : bounds)} className={`w-fit text-left text-xs ${priceRange === bounds ? 'font-semibold text-black' : 'text-[#888]'}`}>{label}</button>)}</div></fieldset>
          </div>
        </details>
      </aside>

      <section aria-label="Fashion products" className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-[#777]">
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded border border-transparent bg-transparent py-2 text-xs text-[#333] focus:border-[#ddd] focus:outline-none">
              <option value="featured">Best selling</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
            </select>
          </label>
          <div className="hidden items-center gap-2 sm:flex" aria-label="Product grid layout">
            {[1, 2, 3, 4, 5].map((count) => <button key={count} type="button" onClick={() => setColumns(count)} aria-label={`${count} column${count === 1 ? '' : 's'} grid`} aria-pressed={columns === count} className={`grid size-9 place-items-center rounded transition ${columns === count ? 'bg-[#eee]' : 'hover:bg-[#f5f5f5]'}`}>
              {count === 1 ? <span className="flex w-3.5 flex-col gap-[3px]" aria-hidden="true">{[0, 1, 2].map((line) => <span key={line} className="h-[2px] w-full bg-[#333]" />)}</span> : <span className="flex h-3.5 items-stretch gap-[2px]" aria-hidden="true">{Array.from({ length: count }, (_, index) => <span key={index} className="w-[2px] bg-[#333]" />)}</span>}
            </button>)}
          </div>
        </div>

        {visibleProducts.length > 0 ? <div className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 ${columnClass[columns]}`}>
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div> : <div className="grid min-h-64 place-items-center text-center text-sm text-[#888]">No products match those filters.</div>}

        <div className="mt-12 flex items-center justify-center gap-2" aria-label="Product pages">
          <button type="button" aria-current="page" className="grid size-8 place-items-center rounded-full bg-[#f5f5f5] text-xs">1</button>
          <span className="px-1 text-xs text-[#888]">Showing {visibleProducts.length} of {products.length} products</span>
        </div>
      </section>
    </div>
  )
}
