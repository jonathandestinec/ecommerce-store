"use client"

import { productLayouts } from '@/data/product-layouts'
import { cn } from '@/lib/utils'
import { volkhov } from '@/styles/fonts'
import React, { useState } from 'react'
import ProductCard from './product-card'
import { products } from '@/data/products'

const ProductGrid = () => {

    const [productGridLayout, setProductGridLayout] = useState("")

    const handleChangeLayout = (name: string, __class: string) => {
        setProductGridLayout(__class)
    }

    return (
        <div className='col-span-7 w-full h-full'>

            {/* Top Tab */}
            <div className='flex items-center justify-between w-full md:mt-0 mt-10'>
                <div className='flex items-center justify-between gap-0.75 w-max'>
                    <h3 className={cn('md:text-[16px] text-[14px] text-black', volkhov.className)}>
                        Best Selling
                    </h3>

                    <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.86445 0.364453L6.55508 0.0550781C6.48164 -0.0183594 6.36289 -0.0183594 6.28945 0.0550781L3.45977 2.87852L0.630078 0.0550781C0.556641 -0.0183594 0.437891 -0.0183594 0.364453 0.0550781L0.0550781 0.364453C-0.0183594 0.437891 -0.0183594 0.556641 0.0550781 0.630078L3.32695 3.90195C3.40039 3.97539 3.51914 3.97539 3.59258 3.90195L6.86445 0.630078C6.93789 0.556641 6.93789 0.437891 6.86445 0.364453Z" fill="black" />
                    </svg>
                </div>

                <div className='hidden md:flex items-center justify-between gap-2.5'>
                    {
                        productLayouts.map((productLayout, index) => (
                            <div key={index} className={cn('size-8.5 bg-[#F2F2F2] flex items-center justify-center')} onClick={() => {
                                handleChangeLayout(productLayout.layoutName, productLayout.__class)
                            }}>
                                {productLayout.layoutIcon}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={cn('w-full ml-auto mr-auto grid md:grid-cols-2 gap-2 place-items-center mt-7.5', productGridLayout, "grid-cols-1")}>
                {
                    products.map((product, index) => (
                        <div key={index} className='w-full'>
                            <ProductCard product={product}/>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ProductGrid