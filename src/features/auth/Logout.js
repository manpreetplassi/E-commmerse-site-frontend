import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAsync } from './authSlice'
import { Navigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(signOutAsync())
    window.location.reload(true)
  },[dispatch])
  return (
    <>
    {<Navigate to='/' replace={true}></Navigate>}
    </>
  )
}
