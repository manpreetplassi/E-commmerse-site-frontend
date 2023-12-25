import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/userInfo/conponents/UserProfile'
import { useSelector } from 'react-redux';

export default function UserProfilePage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <>
    <Navbar>
    {userInfo && <div  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white shadow-xl">
      <UserProfile></UserProfile>
    </div>
    }
    </Navbar>
    </>
  )
}
