import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import AiTherapist from '../AI/therapist';

const TherapistChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (messageText) => {
        try {
            setIsLoading(true);

            // Add user message to chat
            const userMessage = {
                role: 'user',
                content: messageText,
            };
            setMessages(prev => [...prev, userMessage]);

            // Get AI response
            const response = await AiTherapist(messageText);

            // Add AI response to chat
            const aiMessage = {
                role: 'assistant',
                content: response,
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Error getting AI response:', error);
            setMessages(prev => [...prev, {
                role: 'error',
                content: 'Sorry, I encountered an error. Please try again.',
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center p-3">
            <div className="w-[600px] h-[600px] max-w-5xl bg-gray-100/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 flex flex-col">
                {/* Chat messages area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent">
                    {messages.length === 0 ? (
                        // Skeleton messages when chat is empty
                        <>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-xl p-4 shadow-md backdrop-blur-md bg-gray-200/90">
                                    <p className="leading-relaxed text-sm">Hello! I&apos;m your AI therapist. How are you feeling today?</p>
                                </div>
                            </div>
                            <div className="flex justify-end opacity-40">
                                <div className="max-w-[70%] rounded-xl p-4 shadow-md backdrop-blur-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                                    <p className="leading-relaxed text-sm text-white">I&apos;ve been feeling a bit stressed lately...</p>
                                </div>
                            </div>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-xl p-4 shadow-md backdrop-blur-md bg-gray-200/90">
                                    <p className="leading-relaxed text-sm">I understand. Let&apos;s talk about what&apos;s causing your stress...</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-xl p-4 shadow-md backdrop-blur-md 
                                        ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white'
                                            : message.role === 'error'
                                                ? 'bg-red-500/90 text-white'
                                                : 'bg-gray-200/90 text-gray-800'
                                        } 
                                        transform hover:scale-[1.02] transition-all duration-300 ease-in-out`}
                                >
                                    <p className="leading-relaxed text-sm">{message.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start animate-pulse">
                            <div className="bg-gray-200/90 rounded-xl p-4 shadow-md">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:150ms]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:300ms]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat input area */}
                <div className="w-full bg-gray-50/90 p-4 rounded-b-2xl border-t border-gray-200">
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default TherapistChat;