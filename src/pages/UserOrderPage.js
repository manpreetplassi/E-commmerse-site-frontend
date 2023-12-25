import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/userInfo/conponents/UserOrders'
import { useSelector } from 'react-redux';

export default function UserOrderPage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const orders = useSelector((state) => state.order.usersOrders);
  
  return (
    <Navbar>
      {userInfo && orders && <UserOrders></UserOrders>}
    </Navbar>
  )
}