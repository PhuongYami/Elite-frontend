import React, { useState } from 'react';
import { 
    MessageSquare, Search, MoreVertical, Paperclip, 
    Send, Video, Phone, Smile, ArrowLeft
} from 'lucide-react';

const mockConversations = [
    {
        id: 1,
        name: 'Emma Johnson',
        avatar: '/api/placeholder/400/400',
        lastMessage: 'Hey, how are you doing?',
        timestamp: '2h ago',
        unread: 3
    },
    {
        id: 2,
        name: 'Liam Chen',
        avatar: '/api/placeholder/400/400',
        lastMessage: 'Looking forward to our date!',
        timestamp: 'Yesterday',
        unread: 1
    },
    {
        id: 3,
        name: 'Sofia Rodriguez',
        avatar: '/api/placeholder/400/400',
        lastMessage: 'Thanks for the recommendation!',
        timestamp: '3d ago',
        unread: 0
    }
];

const mockMessages = [
    { id: 1, sender: 'Emma Johnson', text: 'Hey, how are you doing?', timestamp: '2h ago', isMe: false },
    { id: 2, sender: 'Me', text: 'I\'m great! How about you?', timestamp: '2h ago', isMe: true },
    { id: 3, sender: 'Emma Johnson', text: 'Just planning my weekend. Thinking about hiking.', timestamp: '1h ago', isMe: false },
];

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [showConversationList, setShowConversationList] = useState(true);

    const handleConversationSelect = (conversationId) => {
        setSelectedConversation(conversationId);
        setShowConversationList(false);
    };

    const handleBackToConversations = () => {
        setShowConversationList(true);
        setSelectedConversation(null);
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
            {/* Conversations List */}
            <div 
                className={`
                    w-full md:w-96 bg-white border-r border-neutral-200 p-4 md:p-6 
                    ${showConversationList ? 'block' : 'hidden md:block'}
                `}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-thin text-neutral-800">Messages</h2>
                    <button className="text-neutral-600 hover:text-neutral-800">
                        <MessageSquare />
                    </button>
                </div>

                <div className="relative mb-6">
                    <input 
                        type="text" 
                        placeholder="Search conversations" 
                        className="w-full border border-neutral-200 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                    />
                    <Search className="absolute left-3 top-3 text-neutral-500" size={16} />
                </div>

                <div className="space-y-4">
                    {mockConversations.map(conversation => (
                        <ConversationItem 
                            key={conversation.id} 
                            conversation={conversation}
                            isSelected={selectedConversation === conversation.id}
                            onClick={() => handleConversationSelect(conversation.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div 
                className={`
                    flex-1 flex flex-col 
                    ${!showConversationList ? 'block' : 'hidden md:flex'}
                `}
            >
                {selectedConversation ? (
                    <>
                        {/* Mobile Back Button */}
                        <div className="md:hidden bg-white border-b border-neutral-200 p-4 flex items-center">
                            <button 
                                onClick={handleBackToConversations} 
                                className="mr-4 text-neutral-600 hover:text-neutral-800"
                            >
                                <ArrowLeft />
                            </button>
                            <div className="flex items-center space-x-3">
                                <img 
                                    src="/api/placeholder/400/400" 
                                    alt="User Avatar" 
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-base font-light text-neutral-800">Emma Johnson</h3>
                                    <p className="text-xs text-neutral-500">Active now</p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Header */}
                        <div className="hidden md:flex bg-white border-b border-neutral-200 p-6 justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img 
                                    src="/api/placeholder/400/400" 
                                    alt="User Avatar" 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-light text-neutral-800">Emma Johnson</h3>
                                    <p className="text-sm text-neutral-500">Active now</p>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button className="text-neutral-600 hover:text-neutral-800">
                                    <Phone />
                                </button>
                                <button className="text-neutral-600 hover:text-neutral-800">
                                    <Video />
                                </button>
                                <button className="text-neutral-600 hover:text-neutral-800">
                                    <MoreVertical />
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                            {mockMessages.map(message => (
                                <MessageBubble key={message.id} message={message} />
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="bg-white p-4 md:p-6 border-t border-neutral-200">
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <button className="text-neutral-600 hover:text-neutral-800">
                                    <Paperclip size={20} />
                                </button>
                                <button className="text-neutral-600 hover:text-neutral-800">
                                    <Smile size={20} />
                                </button>
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    className="flex-1 border border-neutral-200 rounded-full px-3 py-2 md:px-4 md:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                                />
                                <button 
                                    className="bg-neutral-800 text-white rounded-full p-2 md:p-3 hover:bg-neutral-700"
                                    disabled={!messageInput}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-neutral-100">
                        <p className="text-neutral-600 text-base md:text-xl text-center">
                            Select a conversation to start messaging
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ConversationItem = ({ conversation, isSelected, onClick }) => (
    <div 
        className={`
            flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg cursor-pointer 
            ${isSelected 
                ? 'bg-neutral-100' 
                : 'hover:bg-neutral-50'
            }
        `}
        onClick={onClick}
    >
        <img 
            src={conversation.avatar} 
            alt={conversation.name} 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <h4 className="text-sm md:text-base text-neutral-800 font-medium">{conversation.name}</h4>
                <span className="text-[10px] md:text-xs text-neutral-500">{conversation.timestamp}</span>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm text-neutral-600 truncate">{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                    <span className="bg-neutral-800 text-white text-[10px] md:text-xs rounded-full px-1.5 py-0.5 md:px-2 md:py-1">
                        {conversation.unread}
                    </span>
                )}
            </div>
        </div>
    </div>
);

const MessageBubble = ({ message }) => (
    <div className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
        <div 
            className={`
                max-w-[250px] md:max-w-md p-3 md:p-4 rounded-2xl 
                ${message.isMe 
                    ? 'bg-neutral-800 text-white' 
                    : 'bg-neutral-100 text-neutral-800'
                }
            `}
        >
            <p className="text-xs md:text-sm">{message.text}</p>
            <p className="text-[10px] md:text-xs mt-1 md:mt-2 opacity-60">{message.timestamp}</p>
        </div>
    </div>
);

export default Messages;