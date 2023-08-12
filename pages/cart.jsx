import React from 'react'
import { useSelector } from 'react-redux'

const cart = () => {
    const selector = useSelector((state) =>state.Allcart)
  return (
    <div>cart</div>
  )
}

export default cart