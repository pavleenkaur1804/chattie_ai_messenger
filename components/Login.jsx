"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

function Login() {
  return (
    <div className="bg-[cornflowerblue] h-screen flex flex-col 
    items-center justify-center text-center space-y-3">
      <Image
      src='https://firebasestorage.googleapis.com/v0/b/chattiemessenger.appspot.com/o/Chattie__Logo.png?alt=media&token=8c79af7b-ca60-4bf0-819a-5d8bf5566502'
      width={200}
      height={200}
      alt="logo"/>
      <button
      onClick={()=> signIn("google")} 
      className="text-white font-bold text-3xl animate-pulse"
      >Sign In to use Chattie_AI_Messenger</button>
    </div>
  )
}

export default Login
