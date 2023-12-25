import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Protected({children}) {
  const userInfo = useSelector(state => state.user.userInfo)
  if(userInfo && userInfo.role !== 'admin'){
    return <Navigate to='/' ></Navigate>
  }
  return children
  
}
