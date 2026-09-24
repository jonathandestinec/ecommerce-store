import Footer from '@/components/footer'
import PageTitle from '@/components/page-title'
import ProductGrid from '@/components/product-grid'
import { productLayouts } from '@/data/product-layouts'
import { cn } from '@/lib/utils'
import { poppins, volkhov } from '@/styles/fonts'
import { ChevronUp } from 'lucide-react'
import React from 'react'

const page = () => {

    return (
        <div>

            <PageTitle title='Fashion' />

            <div className={cn('w-full max-w-7xl h-max md:mt-17.5 ml-auto mr-auto', poppins.className)}>

                {/* Inner */}
                <div className=''>
                    <div className='grid grid-cols-1 md:grid-cols-10 w-full ml-auto mr-auto md:px-0 px-5 box-border'>

                        {/* Selection Panel */}
                        <div className='col-span-3 h-full pr-7.5 md:row-start-1 row-start-2'>

                            <h1 className={`${volkhov.className} md:mt-0 mt-10 text-[25px] md:text-[30px] text-[#484848] text-left`}>Filters</h1>

                            <div className=''>
                                <p className='text-[16px] md:text-[18px] mt-8.25'>
                                    Size
                                </p>

                                <div className='grid grid-cols-3 gap-3 pag-[16px] w-max mt-4'>

                                    {
                                        ["S", "M", "L", "XL"].map((i, index) => (
                                            <div key={index} className={cn('size-10.5 rounded-[5px] border border-[#8A8A8A] text-[#8A8A8A] flex items-center justify-center cursor-pointer', poppins.className)}>
                                                {i}
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>

                            <div className='mt-7'>
                                <p className='text-[16px] md:text-[18px] mt-8.25'>
                                    Colors
                                </p>

                                <div className='grid grid-cols-7 gap-3 w-max mt-4 place-items-center'>

                                    {
                                        [
                                            "#FF6C6C",
                                            "#FF7629",
                                            "#FFF06C",
                                            "#9BFF6C",
                                            "#6CFF9E",
                                            "#6CFFDC",
                                            "#6CB9FF",
                                            "#6CF6FF",
                                            "#6CA7FF",
                                            "#6C7BFF",
                                            "#8A6CFF",
                                            "#B66CFF",
                                            "#FC6CFF",
                                            "#FF6C6C",
                                        ].map((i, index) => (
                                            <div
                                                key={index} className={cn("size-7.5 rounded-full cursor-pointer")}
                                                style={{ backgroundColor: i }}
                                            >
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>

                            <div className='mt-7'>
                                <p className='text-[16px] md:text-[18px] mt-8.25'>
                                    Prices
                                </p>

                                <ul className='mt-5'>
                                    {
                                        [
                                            "$0-$50",
                                            "$50-$100",
                                            "$100-$150",
                                            "$150-$200",
                                            "$300-$400",
                                        ].map((i, index) => (
                                            <li key={index} className='text-[14px] md:text-[16px] text-[#8A8A8A] mb-2.5'>{i}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div className='mt-7'>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='text-[16px] md:text-[18px]'>
                                        Brands
                                    </p>

                                    <ChevronUp />
                                </div>

                                <div className='grid grid-cols-3 mt-3.75'>
                                    {
                                        [
                                            "Minimog",
                                            "Retrolie",
                                            "Brook",
                                            "Learts",
                                            "Vagabond",
                                            "Abby"
                                        ].map((i, index) => (
                                            <h3 key={index} className='text-[16px] text-[#8A8A8A]'>
                                                {i}
                                            </h3>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className='mt-7'>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='text-[16px] md:text-[18px]'>
                                        Collections
                                    </p>

                                    <ChevronUp />
                                </div>

                                <div className='grid grid-cols-1 mt-3.75'>
                                    {
                                        [
                                            "All products",
                                            "Best sellers",
                                            "New arrivals",
                                            "Accessories",
                                        ].map((i, index) => (
                                            <h3 key={index} className='text-[14px] md:text-[16px] text-[#8A8A8A]'>
                                                {i}
                                            </h3>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className='mt-7'>
                                <p className='text-[16px] md:text-[18px]'>
                                    Tags
                                </p>

                                <div className='flex flex-wrap gap-[16.32px] mt-3.75'>
                                    {
                                        [
                                            "Fashion",
                                            "Hats",
                                            "Sandal",
                                            "Belt",
                                            "Bags",
                                            "Snacker",
                                            "Denim",
                                            "Minimog",
                                            "Vagabond",
                                            "Sunglasses",
                                            "Beachwear",
                                        ].map((i, index) => (
                                            <h3 key={index} className='text-[14px] md:text-[16px] text-[#8A8A8A]'>
                                                {i}
                                            </h3>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>

                        {/* Product Grid */}
                        <ProductGrid/>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default page