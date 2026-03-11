# RIA SDK API Reference

## Table of Contents
- [Installation](#installation)
- [Setup](#setup)
- [Context API](#context-api)
- [State](#state)
- [Methods](#methods)
- [Types](#types)
- [Examples](#examples)

## Installation

```bash
npm install react-native-ria-sdk
# or
yarn add react-native-ria-sdk
```

## Setup

### 1. Wrap your app with the provider

```tsx
import { RiaChatBotProvider } from 'react-native-ria-sdk';
import type { RiaChatBotConfig } from 'react-native-ria-sdk';

const config: RiaChatBotConfig = {
  baseUrl: 'https://your-api.com',
  participantToken: 'optional-auth-token',
  participantType: 'Prospect', // or 'AnonymousUser'
  userInfo: {
    email: 'user@example.com',
    phone: '+1234567890',
    name: 'John Doe',
  },
  isVerifiedRenter: false,
  onError: (error) => {
    console.error('RIA SDK Error:', error);
  },
  onLog: (message, data) => {
    console.log('RIA SDK:', message, data);
  },
};

function App() {
  return (
    <RiaChatBotProvider config={config}>
      <YourApp />
    </RiaChatBotProvider>
  );
}
```

### 2. Use the hook in your components

```tsx
import { useRiaChatBot } from 'react-native-ria-sdk';

function ChatScreen() {
  const { state, showChatWithUsModal, fetchLivekitToken } = useRiaChatBot();
  
  // Access state
  const { chatMessages, showChatWithUsModal: isVisible } = state;
  
  // Call methods
  const handleOpenChat = () => {
    showChatWithUsModal('ChatScreen');
  };
  
  return (
    <View>
      <Button title="Open Chat" onPress={handleOpenChat} />
    </View>
  );
}
```

## Context API

### `useRiaChatBot()`

Returns the RIA ChatBot context with state and methods.

```tsx
const {
  state,
  // State setters
  showChatbotLoader,
  showChatWithUsModal,
  hideChatWithUsModal,
  // ... other methods
  // API methods
  fetchLivekitToken,
  checkPreviousChatSession,
  // ... other API methods
} = useRiaChatBot();
```

## State

### `RiaChatBotState`

```typescript
interface RiaChatBotState {
  chatbotLoading: boolean;
  showChatbotLoadingMessage: boolean;
  showChatWithUsModal: boolean;
  currentPropId: number | null;
  screenName: string;
  livekitToken: string | null;
  getLivekitToken: boolean;
  reconnectionAttempt: number;
  connectedToRoom: boolean;
  connectedToUltron: boolean;
  reconnectToRoom: boolean;
  previousChatSession: TPreviousChatSessionType | null;
  previousChatHistory: TPreviousChatMessageType[];
  chatMessages: TChatMessageType[];
  chatSessionId: string | null;
  liveAgentHandoffDetails: TLiveAgentHandoffDetailsType;
  isLiveAgentHandoff: boolean;
  isLiveAgentConnected: boolean;
  liveAgentToAIHandoff: boolean;
}
```

## Methods

### State Management Methods

#### `showChatbotLoader(showLoader: boolean, showMessage?: boolean)`
Show or hide the chatbot loader.

```tsx
const { showChatbotLoader } = useRiaChatBot();

// Show loader with message
showChatbotLoader(true, true);

// Hide loader
showChatbotLoader(false);
```

#### `showChatWithUsModal(screenName?: string)`
Display the chat modal.

```tsx
const { showChatWithUsModal } = useRiaChatBot();

showChatWithUsModal('HomeScreen');
```

#### `hideChatWithUsModal()`
Hide the chat modal.

```tsx
const { hideChatWithUsModal } = useRiaChatBot();

hideChatWithUsModal();
```

#### `setCurrentAIScreenName(screenName: string)`
Set the current screen name for analytics.

```tsx
const { setCurrentAIScreenName } = useRiaChatBot();

setCurrentAIScreenName('ProductDetailScreen');
```

#### `storeChatMessage(message: TChatMessageType | TChatMessageType[])`
Add message(s) to the chat history.

```tsx
const { storeChatMessage } = useRiaChatBot();

const newMessage: TChatMessageType = {
  id: '123',
  content: 'Hello!',
  user: 'PROSPECT',
  timestamp: '2:30 PM',
};

storeChatMessage(newMessage);

// Or add multiple messages
storeChatMessage([message1, message2]);
```

#### `clearChatMessages()`
Clear all chat messages.

```tsx
const { clearChatMessages } = useRiaChatBot();

clearChatMessages();
```

#### `updateMessageLike(messageId: string, likeStatus: number)`
Update the like status of a message locally (1 = like, -1 = dislike, 0 = neutral).

```tsx
const { updateMessageLike } = useRiaChatBot();

// Like a message
updateMessageLike('message-123', 1);

// Dislike a message
updateMessageLike('message-123', -1);

// Remove like/dislike
updateMessageLike('message-123', 0);
```

#### `setConnectedToRoom(connected: boolean)`
Set the LiveKit room connection status.

```tsx
const { setConnectedToRoom } = useRiaChatBot();

setConnectedToRoom(true);
```

#### `setIsLiveAgentConnected(connected: boolean)`
Set live agent connection status.

```tsx
const { setIsLiveAgentConnected } = useRiaChatBot();

setIsLiveAgentConnected(true);
```

#### `setLiveAgentHandoffStatus(status: boolean)`
Set live agent handoff status.

```tsx
const { setLiveAgentHandoffStatus } = useRiaChatBot();

setLiveAgentHandoffStatus(true);
```

#### `storeLiveAgentHandoffDetails(details: TLiveAgentHandoffDetailsType)`
Store live agent handoff details.

```tsx
const { storeLiveAgentHandoffDetails } = useRiaChatBot();

storeLiveAgentHandoffDetails({
  contact_id: '123',
  conversation_id: '456',
  email: 'agent@example.com',
  name: 'Agent Name',
  phone_number: '+1234567890',
  pubsub_token: 'token',
  salesforce_case_id: 'SF-123',
});
```

### API Methods

#### `fetchLivekitToken(modality?: string, reconnect?: boolean): Promise<void>`
Fetch a LiveKit access token.

```tsx
const { fetchLivekitToken } = useRiaChatBot();

// Fetch token for text chat
await fetchLivekitToken('text', false);

// Fetch token for reconnection
await fetchLivekitToken('text', true);
```

#### `checkPreviousChatSession(): Promise<void>`
Check for previous chat sessions.

```tsx
const { checkPreviousChatSession } = useRiaChatBot();

await checkPreviousChatSession();
```

#### `fetchPreviousChatHistory(chatSessionId: string): Promise<void>`
Fetch chat history for a session.

```tsx
const { fetchPreviousChatHistory } = useRiaChatBot();

await fetchPreviousChatHistory('session-123');
```

#### `toggleMessageLike(messageId: string, likeStatus: number): Promise<void>`
Send like/dislike to the backend.

```tsx
const { toggleMessageLike } = useRiaChatBot();

// Like a message
await toggleMessageLike('message-123', 1);

// Dislike a message
await toggleMessageLike('message-123', -1);
```

#### `sendMessageToChatwoot(messageContent: string, systemGenerated?: boolean): Promise<void>`
Send a message to Chatwoot (live agent).

```tsx
const { sendMessageToChatwoot } = useRiaChatBot();

await sendMessageToChatwoot('Hello, I need help!', false);
```

#### `changeChatOwnership(newParticipantToken: string): Promise<void>`
Transfer chat ownership (e.g., after login).

```tsx
const { changeChatOwnership } = useRiaChatBot();

await changeChatOwnership('new-auth-token');
```

## Types

### `TChatMessageType`

```typescript
interface TChatMessageType {
  user: 'AI' | 'PROSPECT' | 'LIVE_AGENT';
  timestamp?: string;
  content: string;
  id: string;
  likeStatus?: number; // 1 = like, -1 = dislike, 0 = neutral
  senderName?: string;
}
```

### `TLiveAgentHandoffDetailsType`

```typescript
interface TLiveAgentHandoffDetailsType {
  contact_id: string;
  conversation_id: string;
  email: string;
  name: string;
  phone_number: string;
  pubsub_token: string;
  salesforce_case_id: string;
}
```

### `TPreviousChatSessionType`

```typescript
interface TPreviousChatSessionType {
  id: string;
  created_at: string;
  ended_at: string | null;
  livekit_session_id: string;
  participant_id: string;
  participant_type: string;
  phone_number: string | null;
  started_at: string;
  summary: string | null;
  tags: string[] | null;
  updated_at: string;
}
```

### `RiaChatBotConfig`

```typescript
interface RiaChatBotConfig {
  baseUrl: string;
  participantToken?: string;
  participantType?: 'Prospect' | 'AnonymousUser';
  userInfo?: {
    email?: string;
    phone?: string;
    name?: string;
  };
  isVerifiedRenter?: boolean;
  onError?: (error: Error) => void;
  onLog?: (message: string, data?: any) => void;
}
```

## Examples

### Complete Chat Implementation

```tsx
import React, { useEffect } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { useRiaChatBot } from 'react-native-ria-sdk';

function ChatScreen() {
  const {
    state,
    showChatWithUsModal,
    hideChatWithUsModal,
    fetchLivekitToken,
    storeChatMessage,
    updateMessageLike,
    toggleMessageLike,
  } = useRiaChatBot();

  const {
    chatMessages,
    showChatWithUsModal: isModalVisible,
    chatbotLoading,
  } = state;

  useEffect(() => {
    // Fetch token on mount
    fetchLivekitToken('text', false);
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: text,
      user: 'PROSPECT' as const,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    storeChatMessage(newMessage);
  };

  const handleLikeMessage = async (messageId: string, status: number) => {
    // Update UI immediately
    updateMessageLike(messageId, status);
    
    // Sync with backend
    try {
      await toggleMessageLike(messageId, status);
    } catch (error) {
      // Revert on error
      updateMessageLike(messageId, 0);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
            <Button
              title="👍"
              onPress={() => handleLikeMessage(item.id, 1)}
            />
            <Button
              title="👎"
              onPress={() => handleLikeMessage(item.id, -1)}
            />
          </View>
        )}
      />
      
      <Button
        title="Open Chat"
        onPress={() => showChatWithUsModal('ChatScreen')}
        disabled={chatbotLoading}
      />
    </View>
  );
}
```

### Handling Previous Chat Sessions

```tsx
import React, { useEffect } from 'react';
import { useRiaChatBot } from 'react-native-ria-sdk';

function ChatHistory() {
  const {
    state,
    checkPreviousChatSession,
    fetchPreviousChatHistory,
  } = useRiaChatBot();

  const { previousChatSession, previousChatHistory } = state;

  useEffect(() => {
    checkPreviousChatSession();
  }, []);

  useEffect(() => {
    if (previousChatSession?.id) {
      fetchPreviousChatHistory(previousChatSession.id);
    }
  }, [previousChatSession]);

  return (
    <View>
      {previousChatHistory.map((msg) => (
        <Text key={msg.id}>{msg.content}</Text>
      ))}
    </View>
  );
}
```

### Live Agent Integration

```tsx
import React, { useEffect } from 'react';
import { useRiaChatBot } from 'react-native-ria-sdk';

function LiveAgentChat() {
  const {
    state,
    sendMessageToChatwoot,
    setIsLiveAgentConnected,
    storeLiveAgentHandoffDetails,
  } = useRiaChatBot();

  const {
    isLiveAgentConnected,
    isLiveAgentHandoff,
    liveAgentHandoffDetails,
  } = state;

  const handleLiveAgentHandoff = (details) => {
    storeLiveAgentHandoffDetails(details);
    setIsLiveAgentConnected(true);
  };

  const handleSendToAgent = async (message: string) => {
    if (isLiveAgentConnected) {
      await sendMessageToChatwoot(message, false);
    }
  };

  return (
    <View>
      {isLiveAgentConnected && (
        <Text>Connected to: {liveAgentHandoffDetails.name}</Text>
      )}
    </View>
  );
}
```

### Updating Config After Login

```tsx
import { useRiaChatBot } from 'react-native-ria-sdk';

function LoginScreen() {
  const { changeChatOwnership, apiService } = useRiaChatBot();

  const handleLogin = async (authToken: string, userInfo: any) => {
    // Update API service config
    apiService.updateConfig({
      participantToken: authToken,
      participantType: 'Prospect',
      userInfo: {
        email: userInfo.email,
        phone: userInfo.phone,
        name: userInfo.name,
      },
    });

    // Transfer chat ownership
    await changeChatOwnership(authToken);
  };

  return <View>...</View>;
}
```

## Error Handling

The SDK provides error handling through the config:

```tsx
const config: RiaChatBotConfig = {
  baseUrl: 'https://api.example.com',
  onError: (error) => {
    // Handle errors globally
    console.error('SDK Error:', error);
    // Show toast, log to analytics, etc.
  },
  onLog: (message, data) => {
    // Optional logging
    if (__DEV__) {
      console.log(message, data);
    }
  },
};
```

## Best Practices

1. **Always wrap your app with RiaChatBotProvider**
2. **Use try-catch for async operations**
3. **Update UI optimistically, then sync with backend**
4. **Handle errors gracefully with onError callback**
5. **Clear chat messages when appropriate (logout, session end)**
6. **Update participant token after authentication changes**

## Support

For issues or questions, please refer to:
- [Migration Guide](./MIGRATION_SUMMARY.md)
- [Architecture Documentation](./docs/CONTEXT_ARCHITECTURE.md)
