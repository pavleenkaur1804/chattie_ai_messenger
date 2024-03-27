import openai from "./chatgpt";

const query = async (chatHistory: ChatCompletionRequestMessage[], chatId: string, model: string) => {
    try {
        console.log('model inside query api', model)
        console.log('chatHistory inside query api', chatHistory)

        const res = await openai.createChatCompletion({
            model:"davinci-002",
            messages: chatHistory,
            temperature: 0.9,
            top_p: 1,
            n: 1,
            max_tokens: 1000,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        console.log('res', res);
        const data: QueryResponse = {
            status: res.status,
            message: res.data.choices[0].toString(),
            error: false,
        }
        // Return the text from the response
        return data

    } catch (err) {
        console.log('err in queryAPI', err.response);
        // Throw the error to propagate it to the caller
        const data: QueryResponse = {
            status: err.response.status,
            message: err.response.statusText, 
            error: true
        }
        return data
    }
}

export default query;
