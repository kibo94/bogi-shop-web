
'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import productImg from "../../../public/assets/images/product-img.png";
import Image from 'next/image';
function SingleProduct() {
    const params = useParams()
    const { id } = params;
    console.log(params)
    return (
        <div className='mt-20 singleProduct text-center'>
            <h1 className='text-4xl mb-6'>{id}</h1>
            <Image src={productImg} alt="product-img" width={500} height={200} className='m-auto' />
        </div>
    )
}

export default SingleProduct