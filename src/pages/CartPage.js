import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from '../features/navbar/Navbar'
import { useSelector } from 'react-redux';

export default function CartPage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const CartItems = useSelector((state) => state.cart.items);
  const CartLoaded = useSelector((state) => state.cart.cartLoaded);
  return (
    <div>
      <Navbar>
      {userInfo && CartLoaded && CartItems && <Cart></Cart>}
      </Navbar>
    </div>
  )
}
