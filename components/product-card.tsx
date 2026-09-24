import { cn } from '@/lib/utils'
import { volkhov } from '@/styles/fonts'
import { Product } from '@/types'
import Image from 'next/image'
import React from 'react'

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className='w-full h-max overflow-hidden ml-auto mr-auto flex justify-center p-3'>
            <div>
                <Image src={product.image} width={600} height={600} alt='' className='object-cover' />

                <p className={cn("text-[16px] mt-5", volkhov.className)}>
                    {product.name}
                </p>

                <div className='mt-5 flex items-center justify-between gap-[7.67px] w-max'>
                    <p className={cn("text-[16px]")}>
                        ${product.price}.00
                    </p>

                    {
                        product.discount && (
                            <p className={cn("text-[16px] text-[#666666] line-through")}>
                                ${product.price}.00
                            </p>
                        )
                    }
                </div>

                <div className='flex items-center justify-between gap-1.25 w-max mt-3.25'>
                    {/* Indicators */}
                    {
                        product.colors?.map((color, index) => (
                            <div
                                key={index}
                                className={`md:size-6.5 size-6 rounded-full border-black border flex items-center justify-center cursor-pointer`}
                            >
                                <div
                                    style={{ backgroundColor: color }}
                                    className={`md:size-4 size-4 rounded-full`}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductCard