import query from '../../lib/queryApi';
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin"
import { adminDb } from "../../firebaseAdmin";
import { db } from '../../firebase';
import {collection, getDocs, orderBy } from 'firebase/firestore'


type Data = {
    answer: string
}
type Message = {
    text: string,
    createdAt: admin.firestore.Timestamp,
    user: {
        _id: string,
        name: string,
        avatar: string
    }
};



export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    try{
        const { prompt, chatId, model, session } = req.body;
        console.log('chatId', chatId)
        console.log('prompt', prompt)
        console.log('model', model)
        console.log('session', session)
        if(!prompt){
            return res.status(400).json({answer: "Please provide a prompt!"});
        }
        if(!chatId){
            return res.status(400).json({answer: "Please provide a valid chat Id"});
        }
        const chatHistorySnapshot = await getDocs(
            collection(
                db,
                "users",
                session?.user?.email!,
                "chats",
                chatId,
                "messages"
            )
        );

        const chatHistory = [];

        chatHistorySnapshot.forEach((files) => {
            const data = files.data();
            const chats: ChatCompletionRequestMessage = {
                role: data.user._id === "Chattie" ? "system" : "user",
                content: data.text
            };
            chatHistory.push(chats);
        });
        console.log('chatHistory', chatHistory)
        const response: QueryResponse = await query(chatHistory, chatId, model)
      
        const message: Message = {
            text: response.error === true ? "Chattie was unable to find an answer for that!" : response.message,
            createdAt: admin.firestore.Timestamp.now(),
            user: {
                _id: "Chattie",
                name: "Chattie",
                avatar: "https://firebasestorage.googleapis.com/v0/b/chattiemessenger.appspot.com/o/Chattie__Logo.png?alt=media&token=8c79af7b-ca60-4bf0-819a-5d8bf5566502"
            }
        }
        console.log('message', message)
    
        await adminDb
        .collection('users')
        .doc(session?.user?.email!)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(message);
    
        res.status(200).json({ answer: response.error===true? response.message: message.text })

    } catch(err){
        console.error('err', err);
        res.status(500).json({ answer: 'An error occurred' }); // Return a generic error message
    }
    
}