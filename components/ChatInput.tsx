"use client";

import { PaperAirplaneIcon } from "@heroicons/react/16/solid"
import { FormEvent, useState } from "react"
import { useSession } from "next-auth/react"
import { addDoc, serverTimestamp, collection } from "firebase/firestore"
import { db } from "../firebase";
import {toast } from 'react-hot-toast'

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession();

    //  use SWR
    const model = "text-dawinchi"
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return;
        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user:{
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://'ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, 'users',session?.user?.email,"chats", chatId, "messages" ),
        message )
const notification = toast.loading('Your solution is being processed!')
        // Toater Notification
        await fetch(`/api/askQuestions`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({
                prompt: input, chatId, model, session
            })
        }).then((response)=>{
       console.log('data ffrom fetch', response)
           toast.success('Success Response', {
                id:notification,
            })
            toast.error(response.statusText)
            //  Toast notification to say loading
        }).catch((err)=> toast.error(err))
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage}
                className="p-5 space-x-5 flex">
                <input
                    className="bg-transparent focus:outline-none flex-1
                    diabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={!session}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..."
                />
                <button
                    disabled={!prompt || !session}
                    type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </button>
            </form>
            <div> {/* Model Selection */}</div>
        </div>
    )
}

export default ChatInput
