"use client"

import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"
import NewChat from './NewChat'
import ChatRow from './ChatRow'
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from '../firebase'
import { collection, query,orderBy } from "firebase/firestore"


function Sidebar() {
    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(
        session && query (collection(db, "users", session?.user?.email, "chats"), orderBy("createdAt", "asc") )
    );
    
    console.log(chats && chats.docs)

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
           <NewChat/>
        </div>
      {/** New Chat */}
      <div>{/** Model Selection */}</div>
      {/** Map through the chatRows*/}
      {chats && chats.docs.map(chat =>(
      <ChatRow key = {chat.id} id ={chat.id}/>
      ))}
      </div>
      {session?.user && (
                <Image
                onClick={()=>signOut()}
                className='h-20 w-20 rounded-full cursor-pointer mx-auto mb-2 hover:Lopacity-50'
                    src={session.user.image}
                    height={100}
                    width={100}
                    alt="profilepicture"
                />
            )}
    </div>
  )
}

export default Sidebar
