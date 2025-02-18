import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import AiTherapist from '../AI/therapist';

const TherapistChat = () => {
    const [messages, setMessages] = useState([]);
    const [isEmerOpen, setIsEerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const mentalHealthContacts = [
        // National Mental Health Helplines (Free & 24/7 Support)
        {
            name: "KIRAN Mental Health Helpline",
            contact: "1800-599-0019",
            details: "National 24/7 support for mental health concerns."
        },
        {
            name: "Tele MANAS",
            contact: ["14416", "1-800-891-4416"],
            details: "Government mental health support initiative."
        },
        {
            name: "Vandrevala Foundation Helpline",
            contact: ["1860-266-2345", "9999-666-555"],
            details: "24/7 mental health support and suicide prevention."
        },
        {
            name: "Snehi (Emotional Support Helpline)",
            contact: "+91-9582208181",
            details: "Available 10 AM - 10 PM for emotional and psychological support."
        },
        {
            name: "AASRA",
            contact: ["+91-9820466726", "WhatsApp: +91-9820466726"],
            details: "24/7 suicide prevention and mental health support."
        },
        {
            name: "iCall (TISS Mental Health Support)",
            contact: "9152987821",
            details: "Professional counseling over phone/email."
        },

        // Mental Health Helplines in Kolkata
        {
            name: "Lifeline Foundation (Suicide Prevention Kolkata)",
            contact: "+91-9830011222",
            details: "Offers free crisis support for depression, anxiety, and suicidal thoughts."
        },
        {
            name: "Manotsav Foundation Kolkata",
            contact: "1800-890-1717",
            details: "Mental health support from trained professionals."
        },
        {
            name: "NIBS (National Institute of Behavioural Sciences)",
            contact: "033-22865203",
            details: "Open 12 PM - 8 PM (except government holidays)."
        },

        // Therapy & Counseling Services in Kolkata
        {
            name: "Happy n Healthys",
            contact: "+91-9875642323",
            website: "https://happynhealthys.com/",
            details: "Professional mental health therapy services."
        },
        {
            name: "Mindful Practices Kolkata",
            contact: "+91-9674917283",
            details: "Psychological therapy and emotional counseling."
        },
        {
            name: "Hope Trust Kolkata",
            contact: "+91-9393222286",
            details: "Substance abuse and mental health therapy."
        },
        {
            name: "Talk to Me Kolkata",
            contact: "+91-8584022222",
            details: "Individual therapy, stress, and anxiety management."
        },
        {
            name: "Mpower - The Foundation Kolkata",
            contact: "+91-9830451122",
            details: "Provides therapy for various mental health conditions."
        }
    ];

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

    const handleMentalHealthContacts = () => {
        console.log("check")
        setIsEerOpen((curr) => !curr)
        let emerContact = mentalHealthContacts.map((org, i) => {
            console.log(org)
            return (
                <div key={i} className="w-full rounded-xl p-2 shadow-md backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300 ease-in-out">
                    <p className="leading-relaxed text-sm">{org.name}</p>
                    <p className="leading-relaxed text-sm">{org.contact}</p>
                    <p className="leading-relaxed text-sm">{org.details}</p>
                </div>
            )
        })
        const aiMessage = {
            role: 'assistant',
            content: emerContact,
        };
        setMessages(prev => [...prev, aiMessage])
    }

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
                    {/* {isEmerOpen? emerContact : ""} */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat input area */}
                <div className="flex flex-row justify-between items-center w-full bg-gray-50/90 p-4 rounded-b-2xl border-t border-gray-200">
                    <ChatInput onSendMessage={handleSendMessage} />
                    <button
                        onClick={() => handleMentalHealthContacts()}
                        className="px-4 py-2 h-10 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full overflow-hidden transition-all duration-300 hover:opacity-90"
                    >
                        Emergency Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TherapistChat;