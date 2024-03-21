import { PlusIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { addDoc, collection, doc as firestoreDoc, serverTimestamp, setDoc, getDocs, query, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { db } from '../firebase'

function NewChat() {
    const { data: session } = useSession();
    const router = useRouter();

    const createNewChat = async () => { 
       
        const doc = await addDoc(collection(db, "users", session?.user?.email, "chats"),{
            messages:[],
            userId: session?.user?.email,
            createdAt: serverTimestamp()
        });
        
        router.push(`/chat/${doc.id}`);
    };

    return (
        <div onClick={createNewChat} className='border-gray-700 border chatRow'>
            <PlusIcon className='h-4 w-4'/>
            <p>New Chat</p>
        </div>
    );
}

export default NewChat;
