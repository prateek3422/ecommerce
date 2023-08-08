import { parseCookies } from 'nookies'
import React from 'react'

const account = () => {
  return (
    <div>account</div>
  )
}

export const getServerSideProps = async (ctx) => {
    const {token} =  parseCookies(ctx)
    if(!token){
        const {res} = ctx
        res.writeHead(302,{location:"/signin"})
        res.end()
    }
    return{
        props:{}
    }
  }

export default account

