'use client';
import React from 'react'
import { ProductModel } from '../models/product'
import productImg from "../../public/assets/images/product-img.png";
import Image from 'next/image';
import { useProduct } from '../context/ProductContext';

interface CartProductsProps {
    cart: ProductModel[]
}
function CartProducts() {
    const { cart } = useProduct();
    console.log(cart)
    return (
        <div className='cartProducts'>
            {cart.map(c => <div className="cartItem">
                <Image src={productImg} alt="product-img" />
                <h2>
                    {c.name}
                </h2>
                <h3 className='price'>{c.price * c.quantity} din</h3>
                <div className="quantity">{c.quantity}</div>
            </div>
            )}
        </div>
    )
}

export default CartProducts