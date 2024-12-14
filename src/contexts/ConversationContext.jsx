import React, { createContext, useState, useContext } from 'react';

// Create the Conversation Context
const ConversationContext = createContext({
    selectedConversation: null,
    selectConversation: () => {}
});

// Context Provider Component
export const ConversationProvider = ({ children }) => {
    const [selectedConversation, setSelectedConversation] = useState(null);

    const selectConversation = (conversation) => {
        setSelectedConversation(conversation);
    };

    return (
        <ConversationContext.Provider 
            value={{ 
                selectedConversation, 
                selectConversation 
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

// Custom hook to use conversation context
export const useConversation = () => {
    const context = useContext(ConversationContext);
    
    // Provide default values if context is not used within a provider
    if (context === undefined) {
        return {
            selectedConversation: null,
            selectConversation: () => {
                console.warn('selectConversation used outside ConversationProvider');
            }
        };
    }
    
    return context;
};