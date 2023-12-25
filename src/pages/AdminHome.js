import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/adminPanel/components/AdminProductList'

export default function Home() {
  return (
    <div>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
    </div>
  )
}
