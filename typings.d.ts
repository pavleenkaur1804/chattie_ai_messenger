interface Message {
    text: String;
    createdAt: admin.firestore.Timestamp;
    user:{
        _id: string,
        name: string,
        avatar: string
    }
}

interface ChatCompletionRequestMessage {
    role: "user" | "system";
    content: string;
}

interface QueryResponse  {
    status: number,
    message: string,
    error: boolean,
}
