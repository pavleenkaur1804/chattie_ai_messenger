import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore"

type Props = {
    id: string;
}

function ChatRow({ id }: Props) {

    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        collection(db, "users", session?.user?.email, "chats", id, "messages"),
    )

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(id.toString()));
    }, [pathname, id])

    const removeChat = async () => {
        await deleteDoc(doc(db, "users", session?.user?.email, "chats", id.toString()));
        router.replace("/");
    }

    return (
        <Link
            href={`/chat/${id}`}
            className={`chatRow justify-center`}
        >
            <ChatBubbleLeftIcon className="h-4 w-5" />
            <p className="flex-1 hidden md:inline-flex truncate">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
            </p>
            <TrashIcon
                onClick={removeChat}
                className="h-5 w-5 text-gray-700 hover:text-red-700" />
        </Link>
    )
}

export default ChatRow
