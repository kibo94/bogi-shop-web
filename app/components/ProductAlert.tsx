'use client';
import React from 'react'
import { useProduct } from '../context/ProductContext';
function ProductAlert() {
    const { alert } = useProduct();
    return (
        <>
            {alert.show ? <div className="bg-green-100 border border-green-400 text-black-700 px-4 py-3 rounded fixed top-20 right-20 z-22" role="alert">
                <span className="block sm:inline">{alert.message}</span>
            </div> : null}
        </>
    )
}

export default ProductAlert