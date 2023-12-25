import React from 'react'
import ProductDetails from '../features/product-list/components/ProductDetails'
import Navbar from '../features/navbar/Navbar'

export default function ProductDetailsPage() {
  return (
    <div>
        <Navbar>
        <ProductDetails></ProductDetails>
        </Navbar>
    </div>
  )
}
