import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Initialize the chat model
const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",
    apiKey:  import.meta.env.VITE_GEMINI_API_KEY,
    temperature: 0.7,
    maxOutputTokens: 2048,
});

// Create the therapist system prompt
const systemPrompt = `You are an empathetic and professional AI therapist. Your responses should be:
- Compassionate and understanding
- Non-judgmental
- Professional while maintaining warmth
- Focused on active listening and reflection
- Encouraging but not prescriptive
- Mindful of therapeutic boundaries

Remember that you cannot diagnose conditions or replace a human mental health professional. If someone is in crisis, direct them to appropriate emergency services.`;

async function therapistChat(userInput) {
    try {
        const messages = [{
            role: "system",
            content: systemPrompt
        }, {
            role: "user",
            content: userInput
        }];

        const response = await model.invoke(messages);
        return response.content;

    } catch (error) {
        console.error("Error in therapist chat:", error);
        return "I apologize, but I'm having trouble processing your request. If you're in crisis, please contact emergency services or a mental health professional.";
    }
}

// Example usage
async function AiTherapist(userInput) {
    const response = await therapistChat(userInput);
    return response;
}

export default AiTherapist;